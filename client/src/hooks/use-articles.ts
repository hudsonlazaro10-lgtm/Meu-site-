import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useArticles() {
  return useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(api.articles.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      return parseWithLogging(api.articles.list.responses[200], data, "articles.list");
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: [api.articles.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.articles.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch article");
      
      const data = await res.json();
      return parseWithLogging(api.articles.get.responses[200], data, "articles.get");
    },
    // Don't retry since 404 is a valid state (not found)
    retry: false,
  });
}

export function useGenerateHome() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.articles.generateHome.path, {
        method: api.articles.generateHome.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to generate home articles");
      const data = await res.json();
      return parseWithLogging(api.articles.generateHome.responses[200], data, "articles.generateHome");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.articles.list.path] });
    },
  });
}
