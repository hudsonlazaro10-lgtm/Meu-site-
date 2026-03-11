import { db } from "./db";
import { articles, type Article, type InsertArticle } from "@shared/schema";
import { eq, inArray, sql } from "drizzle-orm";

export interface IStorage {
  getArticle(slug: string): Promise<Article | undefined>;
  getArticles(limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticleContent(id: number, content: string): Promise<Article>;
}

export class DatabaseStorage implements IStorage {
  async getArticle(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async getArticles(limit: number = 20): Promise<Article[]> {
    return await db.select().from(articles).orderBy(sql`${articles.createdAt} DESC`).limit(limit);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }
  
  async updateArticleContent(id: number, content: string): Promise<Article> {
    const [article] = await db.update(articles)
      .set({ content })
      .where(eq(articles.id, id))
      .returning();
    return article;
  }
}

export const storage = new DatabaseStorage();
