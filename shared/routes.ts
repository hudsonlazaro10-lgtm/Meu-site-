import { z } from "zod";
import { insertArticleSchema, type Article } from "./schema";

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  articles: {
    list: {
      method: "GET" as const,
      path: "/api/articles" as const,
      responses: {
        200: z.array(z.custom<Article>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/articles/:slug" as const,
      responses: {
        200: z.object({
          article: z.custom<Article>(),
          related: z.array(z.custom<Article>()),
        }),
        404: errorSchemas.notFound,
      },
    },
    generateHome: {
      method: "POST" as const,
      path: "/api/articles/generate-home" as const,
      responses: {
        200: z.object({ success: z.boolean() }),
      }
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
