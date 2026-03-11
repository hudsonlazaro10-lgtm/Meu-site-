import { useParams } from "wouter";
import { useArticle } from "@/hooks/use-articles";
import { SkeletonArticle } from "@/components/SkeletonArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { AdBanner } from "@/components/AdBanner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { Share2, BookmarkPlus, MessageCircle, Clock } from "lucide-react";
import { useEffect } from "react";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useArticle(slug || "");

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (isLoading) {
    return <SkeletonArticle />;
  }

  if (!data || !data.article) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Artigo não encontrado</h1>
        <p className="text-muted-foreground text-lg mb-8">O conteúdo que você está procurando não existe ou foi removido.</p>
        <button onClick={() => window.history.back()} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
          Voltar
        </button>
      </div>
    );
  }

  const { article, related } = data;

  // Split markdown content to insert an ad in the middle
  const paragraphs = article.content ? article.content.split('\n\n') : [];
  const middleIndex = Math.max(1, Math.floor(paragraphs.length / 2));
  const firstHalf = paragraphs.slice(0, middleIndex).join('\n\n');
  const secondHalf = paragraphs.slice(middleIndex).join('\n\n');

  // Fallback image
  const imgUrl = article.imageUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80";

  return (
    <div className="bg-background pb-16 animate-in fade-in duration-500">
      {/* Top Ad */}
      <div className="py-4 border-b border-border/50 bg-muted/30 flex justify-center">
        <AdBanner variant="horizontal" />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Article Header */}
        <header className="mb-10 text-center md:text-left">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {article.tags.map(tag => (
                <span key={tag} className="text-accent text-sm font-bold tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-8 leading-relaxed text-balance">
            {article.summary}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-border py-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg font-serif">
                IA
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Equipe Portal IA</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(article.createdAt), "d 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 justify-center md:justify-end">
              <button className="p-2.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group" aria-label="Compartilhar">
                <Share2 className="w-5 h-5 group-active:scale-90 transition-transform" />
              </button>
              <button className="p-2.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group" aria-label="Salvar">
                <BookmarkPlus className="w-5 h-5 group-active:scale-90 transition-transform" />
              </button>
              <button className="p-2.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group" aria-label="Comentar">
                <MessageCircle className="w-5 h-5 group-active:scale-90 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative aspect-[21/9]">
          <img 
            src={imgUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white/80 text-xs text-right">
            Imagem gerada ou selecionada por IA
          </figcaption>
        </figure>

        {/* Content Layout with Sidebar for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="prose prose-lg md:prose-xl prose-blue max-w-none prose-headings:font-serif prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown>{firstHalf}</ReactMarkdown>
              
              <div className="my-10 clear-both flex justify-center">
                <AdBanner variant="rectangle" />
              </div>
              
              <ReactMarkdown>{secondHalf}</ReactMarkdown>
            </div>
          </div>
          
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <AdBanner variant="rectangle" />
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h4 className="font-serif font-bold text-lg mb-4 border-b border-border pb-2">Newsletter</h4>
                <p className="text-sm text-muted-foreground mb-4">Receba as principais notícias analisadas pela nossa IA diretamente no seu email.</p>
                <input 
                  type="email" 
                  placeholder="Seu melhor email" 
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all mb-3 text-sm"
                />
                <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]">
                  Inscrever-se
                </button>
              </div>
              <AdBanner variant="vertical" className="h-[400px]" />
            </div>
          </aside>
        </div>
      </article>

      {/* Bottom Ad */}
      <div className="py-8 bg-muted/20 border-y border-border/50 flex justify-center mb-12">
        <AdBanner variant="horizontal" />
      </div>

      {/* Related Articles */}
      {related && related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-center relative inline-block">
              Recomendados para Você
              <span className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {related.map(relArticle => (
              <ArticleCard key={relArticle.id} article={relArticle} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
