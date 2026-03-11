import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const CONTACT_EMAIL = "contatus.responseqi@gmail.com";

// Create email transporter - adjust based on your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || CONTACT_EMAIL,
    pass: process.env.EMAIL_PASSWORD || "",
  },
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

async function sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email not configured - skipping send");
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
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
        return res.status(404).json({ message: "Article not found" });
      }

      if (!article.content) {
        const generatedContent = await generateArticleContent(article.title, article.summary);
        article = await storage.updateArticleContent(article.id, generatedContent);
      }

      const relatedStubs = await generateRelatedArticles(article.tags?.[0] || article.title, 12);
      const relatedArticles = [];
      
      for (const stub of relatedStubs) {
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

  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;

      const schema = z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
      });

      const data = schema.parse({ name, email, message });
      const contact = await storage.createContactMessage(data);

      // Send confirmation email to user
      await sendEmail(
        email,
        "Recebemos sua mensagem - O Portal Notícias IA",
        `<h2>Olá ${name}!</h2><p>Obrigado por entrar em contato conosco. Recebemos sua mensagem e em breve retornaremos.</p><p>Equipe O Portal</p>`
      );

      // Send notification to admin
      await sendEmail(
        CONTACT_EMAIL,
        `Novo contato: ${name}`,
        `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`
      );

      res.status(201).json({ success: true, message: "Mensagem enviada com sucesso!" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors[0].message });
      }
      console.error(err);
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  });

  // Support ticket submission
  app.post("/api/support", async (req: Request, res: Response) => {
    try {
      const { name, email, subject, description, category } = req.body;

      const schema = z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
        description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
        category: z.enum(["tecnico", "conteudo", "acesso", "outro"], { errorMap: () => ({ message: "Categoria inválida" }) }),
      });

      const data = schema.parse({ name, email, subject, description, category });
      const ticket = await storage.createSupportTicket(data);

      // Send confirmation email
      await sendEmail(
        email,
        `Suporte: ${subject} - Ticket #${ticket.id}`,
        `<h2>Seu Ticket de Suporte foi Criado</h2><p><strong>Número do Ticket:</strong> #${ticket.id}</p><p><strong>Assunto:</strong> ${subject}</p><p>Acompanharemos seu pedido e entraremos em contato em breve.</p><p>Equipe de Suporte</p>`
      );

      // Send notification to admin
      await sendEmail(
        CONTACT_EMAIL,
        `Novo Ticket #${ticket.id}: ${subject}`,
        `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Categoria:</strong> ${category}</p><p><strong>Assunto:</strong> ${subject}</p><p><strong>Descrição:</strong></p><p>${description.replace(/\n/g, "<br>")}</p>`
      );

      res.status(201).json({ success: true, ticketId: ticket.id, message: "Ticket criado com sucesso!" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors[0].message });
      }
      console.error(err);
      res.status(500).json({ error: "Erro ao criar ticket" });
    }
  });

  return httpServer;
}
