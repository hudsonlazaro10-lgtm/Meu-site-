import { db } from "./db";
import { articles, contactMessages, supportTickets, type Article, type InsertArticle, type ContactMessage, type InsertContactMessage, type SupportTicket, type InsertSupportTicket } from "@shared/schema";
import { eq, inArray, sql } from "drizzle-orm";

export interface IStorage {
  getArticle(slug: string): Promise<Article | undefined>;
  getArticles(limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticleContent(id: number, content: string): Promise<Article>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  getSupportTickets(): Promise<SupportTicket[]>;
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

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [msg] = await db.insert(contactMessages).values(message).returning();
    return msg;
  }

  async createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket> {
    const [supportTicket] = await db.insert(supportTickets).values(ticket).returning();
    return supportTicket;
  }

  async getSupportTickets(): Promise<SupportTicket[]> {
    return await db.select().from(supportTickets).orderBy(sql`${supportTickets.createdAt} DESC`);
  }
}

export const storage = new DatabaseStorage();
