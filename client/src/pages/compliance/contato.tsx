import { AdBanner } from "@/components/AdBanner";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Fale Conosco</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="prose prose-blue max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              Tem alguma dúvida, sugestão ou encontrou algum problema no portal? Entre em contato com a nossa equipe. Nossa plataforma é gerenciada por Inteligência Artificial, mas nossa equipe humana está pronta para ajudar.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center text-foreground font-medium">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                contato@oportal.com.br
              </div>
              <div className="flex items-center text-foreground font-medium">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                +55 (11) 9999-9999
              </div>
              <div className="flex items-center text-foreground font-medium">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                São Paulo, SP - Brasil
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Seu nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Como podemos ajudar?"></textarea>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:translate-y-0.5">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
        
        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
}
