import { Link, useLocation } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Newspaper, Search, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AdBanner } from "./AdBanner";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const categories = ["Brasil", "Mundo", "Política", "Economia", "Tecnologia", "Cultura", "Esportes"];

  // Close mobile menu on route change
  useState(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="hidden sm:inline-block">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </span>
          <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-background/80 hover:text-background cursor-pointer transition-colors">Edição Digital</span>
            <span className="text-background/80 hover:text-background cursor-pointer transition-colors">Assine</span>
            <span className="text-background/80 hover:text-background cursor-pointer transition-colors">Entrar</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center group">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg mr-3 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <Newspaper size={28} />
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-none text-foreground group-hover:text-primary transition-colors">
                  O Portal
                </h1>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground block -mt-1">
                  Jornalismo IA
                </span>
              </div>
            </Link>

            <div className="flex items-center">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors hidden sm:block">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 py-3 overflow-x-auto no-scrollbar border-t border-border/50">
            {categories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className="text-sm font-semibold text-muted-foreground hover:text-primary uppercase tracking-wider whitespace-nowrap transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {categories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className="text-base font-semibold text-foreground flex items-center justify-between border-b border-border/50 pb-3"
                onClick={(e) => e.preventDefault()}
              >
                {cat}
                <ChevronRight size={16} className="text-muted-foreground" />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background/80 pt-16 pb-8 border-t-[6px] border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center mb-6">
                <div className="bg-primary text-primary-foreground p-1.5 rounded mr-2">
                  <Newspaper size={24} />
                </div>
                <span className="font-serif text-2xl font-bold text-background">O Portal</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm text-background/60">
                A primeira plataforma de notícias totalmente alimentada por Inteligência Artificial do Brasil. Informação em tempo real com análises profundas.
              </p>
            </div>
            
            <div>
              <h4 className="text-background font-bold uppercase tracking-wider mb-6 font-serif">Institucional</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
                <li><Link href="/suporte" className="hover:text-primary transition-colors">Suporte</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-background font-bold uppercase tracking-wider mb-6 font-serif">Políticas</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Política de Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-background/50">
            <p>&copy; {new Date().getFullYear()} O Portal Notícias IA. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-background transition-colors">Twitter</a>
              <a href="#" className="hover:text-background transition-colors">Facebook</a>
              <a href="#" className="hover:text-background transition-colors">Instagram</a>
              <a href="#" className="hover:text-background transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
