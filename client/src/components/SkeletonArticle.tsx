import { Loader2 } from "lucide-react";

export function SkeletonArticle() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-1000">
      {/* Category Tag Skeleton */}
      <div className="h-6 w-24 bg-muted animate-pulse rounded-full mb-6 mx-auto md:mx-0" />
      
      {/* Title Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-12 md:h-16 w-full bg-muted animate-pulse rounded-lg" />
        <div className="h-12 md:h-16 w-4/5 bg-muted animate-pulse rounded-lg mx-auto md:mx-0" />
      </div>
      
      {/* Meta info skeleton */}
      <div className="flex items-center justify-center md:justify-start space-x-4 mb-10">
        <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* AI Generating Indicator */}
      <div className="w-full aspect-video bg-gradient-to-br from-muted/50 to-muted animate-pulse rounded-2xl mb-12 flex flex-col items-center justify-center shadow-inner border border-border/50 p-6 text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          Nossa IA está trabalhando...
        </h3>
        <p className="text-muted-foreground max-w-md">
          Estamos elaborando este artigo exclusivamente para você. Esse processo pode levar de 10 a 20 segundos. Agradecemos a paciência!
        </p>
      </div>
      
      {/* Content Skeleton */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-[90%] bg-muted animate-pulse rounded" />
          <div className="h-5 w-[95%] bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-3 pt-4">
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-[85%] bg-muted animate-pulse rounded" />
          <div className="h-5 w-[92%] bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-3 pt-4">
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-[75%] bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
