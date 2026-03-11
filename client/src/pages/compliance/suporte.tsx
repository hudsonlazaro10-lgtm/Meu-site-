import { AdBanner } from "@/components/AdBanner";
import { HelpCircle, FileText, Settings, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SuportePage() {
  const [showForm, setShowForm] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  
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

  const faqs = [
    {
      question: "Como funciona o sistema de recomendações de notícias?",
      answer: "O Portal utiliza algoritmos de inteligência artificial que analisam seus padrões de leitura e preferências para recomendar artigos relevantes. Quanto mais você lê, mais preciso se torna o sistema de recomendação."
    },
    {
      question: "Os artigos são 100% gerados por IA?",
      answer: "Sim, nossos artigos são gerados por modelos de inteligência artificial baseados em fontes de notícias confiáveis. Cada artigo é estruturado com título, resumo, corpo e conclusão, mantendo padrões jornalísticos."
    },
    {
      question: "Posso comentar ou compartilhar os artigos?",
      answer: "No momento, o Portal se concentra em oferecer conteúdo de alta qualidade. Funcionalidades de comentários e compartilhamento estão em desenvolvimento e serão lançadas em breve."
    },
    {
      question: "Como a IA evita notícias falsas?",
      answer: "Nossos sistemas cruzam informações de múltiplas fontes confiáveis e aplicam filtros de validação. No entanto, recomendamos sempre consultar múltiplas fontes para formar sua opinião."
    },
    {
      question: "Qual é a frequência de atualização das notícias?",
      answer: "Novos artigos são gerados continuamente, com enfoque em tópicos em tendência. O sistema atualiza em tempo real, garantindo que você tenha as informações mais atualizadas possível."
    },
    {
      question: "Posso acessar o Portal no meu celular?",
      answer: "Sim! O Portal é completamente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Basta acessar através do navegador do seu dispositivo."
    }
  ];

  const guides = [
    {
      title: "Navegação no Portal",
      content: "Explore o Portal através das categorias no menu superior: Brasil, Mundo, Política, Economia, Tecnologia, Cultura e Esportes. Cada categoria contém artigos específicos gerados por IA sobre tópicos relevantes."
    },
    {
      title: "Ciclo Infinito de Notícias",
      content: "Um dos diferenciais do Portal é o ciclo infinito. Cada artigo exibe 12 notícias relacionadas abaixo. Ao clicar em qualquer uma delas, você acessa um novo artigo completo, que também apresenta suas próprias 12 relacionadas, criando uma experiência contínua de descoberta."
    },
    {
      title: "Dicas para Melhor Leitura",
      content: "Leia o resumo primeiro para entender o contexto do artigo. Utilize as tags para encontrar tópicos relacionados. Volte para a home para explorar diferentes categorias e ampliar seu conhecimento."
    },
    {
      title: "Qualidade do Conteúdo",
      content: "Nossos artigos são otimizados para SEO e estruturados para fácil leitura. Cada parágrafo é pensado para informar e engajar. As imagens são geradas por IA para complementar o conteúdo."
    }
  ];

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
        setLoading(false);
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
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer" onClick={() => setShowForm(!showForm)}>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Abrir Ticket</h3>
            <p className="text-sm text-muted-foreground">Crie um novo ticket de suporte.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer" onClick={() => setExpandedFAQ(expandedFAQ === 0 ? null : 0)}>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dúvidas Frequentes</h3>
            <p className="text-sm text-muted-foreground">Respostas para dúvidas comuns.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer" onClick={() => setExpandedGuide(expandedGuide === 0 ? null : 0)}>
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Guias de Leitura</h3>
            <p className="text-sm text-muted-foreground">Dicas e recomendações.</p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer" onClick={() => setShowPreferences(!showPreferences)}>
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

        {expandedFAQ === 0 && (
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6">Dúvidas Frequentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    {expandedFAQ === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedFAQ === idx && (
                    <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {expandedGuide === 0 && (
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6">Guias de Leitura</h2>
            <div className="space-y-4">
              {guides.map((guide, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4">
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>{guide.title}</span>
                    {expandedGuide === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedGuide === idx && (
                    <p className="mt-4 text-muted-foreground">{guide.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {showPreferences && (
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Suas Preferências</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Categorias de Interesse</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Brasil", "Mundo", "Política", "Economia", "Tecnologia", "Cultura", "Esportes"].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Notificações</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Receber alertas de notícias importantes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">Atualizações sobre novos recursos</span>
                  </label>
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md">
                Salvar Preferências
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <AdBanner variant="horizontal" />
        </div>
      </div>
    </div>
  );
}
