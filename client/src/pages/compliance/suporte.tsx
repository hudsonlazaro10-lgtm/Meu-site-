import { AdBanner } from "@/components/AdBanner";
import { HelpCircle, FileText, Settings, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SuportePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    category: "tecnico",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.error || "Falha ao criar ticket",
          variant: "destructive",
        });
        return;
      }

      const result = await response.json();
      setSuccess(true);
      setTicketId(result.ticketId);
      setFormData({
        name: "",
        email: "",
        subject: "",
        description: "",
        category: "tecnico",
      });
      toast({
        title: "Sucesso",
        description: `Ticket #${result.ticketId} criado! Entraremos em contato em breve.`,
      });

      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 5000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar ticket",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Central de Suporte</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Como podemos ajudar você hoje? Encontre respostas rápidas para as dúvidas mais comuns.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer" onClick={() => setShowForm(true)}>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Abrir Ticket</h3>
            <p className="text-sm text-muted-foreground">Crie um novo ticket de suporte para seu problema.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dúvidas Frequentes</h3>
            <p className="text-sm text-muted-foreground">Respostas para as perguntas mais comuns.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Guias de Leitura</h3>
            <p className="text-sm text-muted-foreground">Aprenda a usar o portal ao máximo.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Preferências</h3>
            <p className="text-sm text-muted-foreground">Gerencie suas configurações.</p>
          </div>
        </div>

        {showForm && (
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Criar Novo Ticket</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg text-center">
                <p className="font-bold mb-2">Ticket Criado com Sucesso!</p>
                <p className="text-sm mb-2">Número do Ticket: <strong>#{ticketId}</strong></p>
                <p className="text-sm">Você receberá um email com mais informações. Nossa equipe está cuidando do seu pedido.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      placeholder="Seu nome"
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  >
                    <option value="tecnico">Problema Técnico</option>
                    <option value="conteudo">Problema com Conteúdo</option>
                    <option value="acesso">Acesso/Login</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assunto</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="Assunto do seu problema"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Descrição Detalhada</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    placeholder="Descreva seu problema com detalhes..."
                    required
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:translate-y-0.5 disabled:opacity-50"
                  >
                    {loading ? "Criando Ticket..." : "Criar Ticket"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 bg-muted text-foreground font-bold rounded-lg hover:bg-muted/80 transition-all shadow-md"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="prose prose-blue max-w-none text-muted-foreground bg-card p-8 rounded-2xl border border-border mb-12">
          <h2 className="text-2xl font-serif font-bold text-foreground">Como o Portal IA funciona?</h2>
          <p>Nosso sistema monitora as principais agências de notícias do mundo em tempo real. Uma vez identificada uma notícia relevante, nossos modelos de linguagem processam as informações, removem vieses e constroem um artigo completo, estruturado e fácil de ler. Todo o processo acontece em questão de segundos, garantindo que você tenha a informação mais atualizada possível.</p>
          
          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">As imagens também são geradas por IA?</h2>
          <p>Sim! Utilizamos modelos avançados de geração de imagens que criam ilustrações conceituais exclusivas para cada artigo, garantindo um visual único para o portal respeitando direitos autorais.</p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8">Como crio um ticket de suporte?</h2>
          <p>Clique no botão "Abrir Ticket" acima e preencha o formulário com suas informações. Descreva seu problema em detalhes para que nossa equipe possa ajudá-lo mais rapidamente. Você receberá um número de ticket e poderá acompanhar o status por email.</p>
        </div>

        <div className="flex justify-center">
          <AdBanner variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
