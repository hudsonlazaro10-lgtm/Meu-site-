import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

async function generateArticleContent(title: string, summary: string): Promise<string> {
  const prompt = `Você é um redator e desenvolvedor especialista em portais de notícias digitais, em português.
Escreva um artigo de notícias completo e engajador baseado no título: "${title}" e resumo: "${summary}".
O artigo deve conter:
- Um título chamativo (máx. 12 palavras).
- Um resumo introdutório de 2-3 parágrafos.
- Subtítulos H2/H3, listas, exemplos ou dados (pode inventar dados plausíveis já que é gerado por IA).
- Conclusão com chamada para ação.

Retorne o artigo em formato HTML válido (sem a tag <html> ou <body>, apenas o conteúdo do artigo com tags como <h1>, <h2>, <p>, <ul>, <li>, etc). Não inclua crases markdown no output.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5.1",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0]?.message?.content || "<p>Falha ao gerar o conteúdo.</p>";
}

async function generateRelatedArticles(topic: string, count: number = 12): Promise<{ title: string, summary: string, tags: string[], slug: string }[]> {
  const prompt = `Gere ${count} manchetes e resumos de notícias relacionadas ao tópico geral: "${topic}".
Para cada notícia, forneça:
1. title (máx. 12 palavras)
2. summary (2-3 linhas)
3. tags (array de 3-5 strings)
4. slug (URL amigável baseada no título)

Retorne estritamente um JSON com a seguinte estrutura:
{
  "articles": [
    { "title": "...", "summary": "...", "tags": ["...", "..."], "slug": "..." }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-5.1",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  try {
    const data = JSON.parse(response.choices[0]?.message?.content || '{"articles":[]}');
    return data.articles;
  } catch (e) {
    console.error("Failed to parse related articles JSON", e);
    return [];
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.articles.generateHome.path, async (req: Request, res: Response) => {
    try {
      const existing = await storage.getArticles(1);
      if (existing.length > 0) {
        return res.json({ success: true });
      }

      // Generate initial seed articles
      const related = await generateRelatedArticles("Tecnologia e Inovação", 12);
      
      for (const item of related) {
        await storage.createArticle({
          title: item.title,
          summary: item.summary,
          tags: item.tags,
          slug: item.slug,
          imageUrl: `https://picsum.photos/seed/${item.slug}/800/400`,
        });
      }

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to generate home articles" });
    }
  });

  app.get(api.articles.list.path, async (req: Request, res: Response) => {
    try {
      const articles = await storage.getArticles(20);
      res.json(articles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.articles.get.path, async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      let article = await storage.getArticle(slug);

      if (!article) {
        // Se o artigo não existe (alguém digitou uma URL aleatória), podemos criá-lo sob demanda
        // Mas o fluxo normal é que o stub já exista.
        return res.status(404).json({ message: "Article not found" });
      }

      // If content is null, generate it now (JIT generation)
      if (!article.content) {
        const generatedContent = await generateArticleContent(article.title, article.summary);
        article = await storage.updateArticleContent(article.id, generatedContent);
      }

      // We need 12 related articles.
      // Generate stubs for the related articles
      const relatedStubs = await generateRelatedArticles(article.tags?.[0] || article.title, 12);
      const relatedArticles = [];
      
      for (const stub of relatedStubs) {
        // Try to create the stub. Ignore unique constraint violations if slug already exists.
        try {
          const created = await storage.createArticle({
             title: stub.title,
             summary: stub.summary,
             tags: stub.tags,
             slug: stub.slug,
             imageUrl: `https://picsum.photos/seed/${stub.slug}/800/400`,
          });
          relatedArticles.push(created);
        } catch (e: any) {
           // Probably duplicate slug, just fetch it
           const existing = await storage.getArticle(stub.slug);
           if (existing) relatedArticles.push(existing);
        }
      }

      res.json({
        article,
        related: relatedArticles.slice(0, 12),
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
