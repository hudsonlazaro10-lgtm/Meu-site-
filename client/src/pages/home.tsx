import { useEffect } from "react";
import { useArticles, useGenerateHome } from "@/hooks/use-articles";
import { ArticleCard } from "@/components/ArticleCard";
import { AdBanner } from "@/components/AdBanner";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: articles, isLoading, refetch } = useArticles();
  const { mutate: generateHome, isPending: isGenerating } = useGenerateHome();

  // Trigger home generation if DB is empty
  useEffect(() => {
    if (articles && articles.length === 0 && !isGenerating) {
      generateHome(undefined, {
        onSuccess: () => refetch()
      });
    }
  }, [articles, isGenerating, generateHome, refetch]);

  if (isLoading || isGenerating || (articles && articles.length === 0)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-card p-8 rounded-2xl shadow-xl shadow-black/5 max-w-md w-full border border-border">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
            Iniciando o Portal
          </h2>
          <p className="text-muted-foreground text-sm">
            Nossa Inteligência Artificial está preparando as principais notícias do dia. Por favor, aguarde alguns instantes...
          </p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) return null;

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4);

  return (
    <div className="pb-16 animate-in fade-in duration-700">
      <div className="py-6 border-b border-border/50 bg-muted/30">
        <AdBanner variant="horizontal" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold relative inline-block">
            Principais Destaques
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
          </h2>
        </div>

        {/* Featured Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <ArticleCard article={featuredArticle} featured />
          </div>
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="bg-card rounded-xl border border-border/50 p-5 shadow-sm h-full flex flex-col">
              <h3 className="font-serif text-lg font-bold border-b border-border pb-3 mb-4 text-foreground flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                Últimas Atualizações
              </h3>
              <div className="space-y-6 flex-grow">
                {secondaryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mid-page Ad */}
        <div className="my-16 flex justify-center">
          <AdBanner variant="horizontal" />
        </div>

        {/* Grid Section */}
        {gridArticles.length > 0 && (
          <>
            <h2 className="text-2xl font-serif font-bold mb-8 relative inline-block">
              Mais Notícias
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-muted-foreground/30 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
