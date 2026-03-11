import { AdBanner } from "@/components/AdBanner";

export default function PrivacidadePage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-12">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-blue max-w-none text-foreground/80 mb-16">
          <p>
            A sua privacidade é importante para nós. É política d'O Portal respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site O Portal e outros sites que possuímos e operamos.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Coleta de Informações</h2>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou em integrações essenciais de plataforma, como serviços de publicidade (Google AdSense), que podem coletar dados anonimizados.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Links Externos</h2>
          <p>
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>
        </div>

        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
}
