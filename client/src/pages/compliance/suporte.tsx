import { AdBanner } from "@/components/AdBanner";
import { HelpCircle, FileText, Settings } from "lucide-react";

export default function SuportePage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Central de Suporte</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Como podemos ajudar você hoje? Encontre respostas rápidas para as dúvidas mais comuns.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dúvidas Frequentes</h3>
            <p className="text-sm text-muted-foreground">Respostas para as perguntas mais comuns sobre nossa plataforma.</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Guias de Leitura</h3>
            <p className="text-sm text-muted-foreground">Aprenda a aproveitar ao máximo o conteúdo gerado por nossa IA.</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Configurações</h3>
            <p className="text-sm text-muted-foreground">Gerencie sua conta, preferências e alertas de e-mail.</p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-muted-foreground bg-card p-8 rounded-2xl border border-border mb-12">
          <h2 className="text-2xl font-serif font-bold text-foreground">Como o Portal IA funciona?</h2>
          <p>Nosso sistema monitora as principais agências de notícias do mundo em tempo real. Uma vez identificada uma notícia relevante, nossos modelos de linguagem processam as informações, removem vieses e constroem um artigo completo, estruturado e fácil de ler. Todo o processo acontece em questão de segundos, garantindo que você tenha a informação mais atualizada possível.</p>
          
          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">As imagens também são geradas por IA?</h2>
          <p>Sim! Utilizamos modelos avançados de geração de imagens que criam ilustrações conceituais exclusivas para cada artigo, garantindo um visual único para o portal respeitando direitos autorais.</p>
        </div>

        <div className="flex justify-center">
          <AdBanner variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
