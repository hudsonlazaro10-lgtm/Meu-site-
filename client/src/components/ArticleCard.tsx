import { Link } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Article } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({ article, featured = false, className }: ArticleCardProps) {
  // Unsplash fallback based on article ID if no image URL is provided
  const fallbackImages = [
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&q=80",
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1557425955-df376b5903c8?w=800&q=80"
  ];
  
  const imgUrl = article.imageUrl || fallbackImages[article.id % fallbackImages.length];

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} className={cn("group block", className)}>
        <article className="relative overflow-hidden rounded-2xl shadow-xl shadow-black/5 flex flex-col md:flex-row bg-card border hover:shadow-2xl transition-all duration-300 group-hover:border-primary/20">
          <div className="md:w-3/5 relative aspect-video md:aspect-auto overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
            <img 
              src={imgUrl} 
              alt={article.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-center">
            {article.tags && article.tags.length > 0 && (
              <span className="text-accent text-sm font-bold tracking-wider uppercase mb-4 block">
                {article.tags[0]}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-foreground group-hover:text-primary transition-colors text-balance leading-tight">
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-6 line-clamp-3 md:text-lg">
              {article.summary}
            </p>
            <div className="flex items-center text-sm font-medium text-muted-foreground mt-auto">
              <span className="bg-primary/5 text-primary px-3 py-1 rounded-full">
                {format(new Date(article.createdAt), "d 'de' MMMM, yyyy", { locale: ptBR })}
              </span>
              <span className="ml-auto flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">
                Ler artigo <ArrowRight className="ml-1 w-4 h-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className={cn("group block h-full", className)}>
      <article className="h-full flex flex-col rounded-xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={imgUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {article.tags && article.tags.length > 0 && (
            <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm">
              <span className="text-xs font-bold text-accent tracking-wider uppercase">
                {article.tags[0]}
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold font-serif mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
            {article.summary}
          </p>
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>{format(new Date(article.createdAt), "dd MMM yyyy", { locale: ptBR })}</span>
            <span className="text-primary font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Ler <ArrowRight className="ml-1 w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
