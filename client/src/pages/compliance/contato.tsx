import { AdBanner } from "@/components/AdBanner";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContatoPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.error || "Falha ao enviar mensagem",
          variant: "destructive",
        });
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Sucesso",
        description: "Sua mensagem foi enviada! Responderemos em breve.",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
                contatus.responseqi@gmail.com
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
            {success ? (
              <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg text-center">
                <p className="font-bold mb-2">Mensagem Enviada!</p>
                <p className="text-sm">Obrigado por entrar em contato. Responderemos em breve.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    placeholder="Como podemos ajudar?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:translate-y-0.5 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
}
