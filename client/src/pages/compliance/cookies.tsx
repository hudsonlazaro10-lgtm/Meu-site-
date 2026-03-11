import { AdBanner } from "@/components/AdBanner";

export default function CookiesPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Política de Cookies</h1>
        <p className="text-muted-foreground mb-12">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-blue max-w-none text-foreground/80 mb-16">
          <p>
            O Portal utiliza cookies e tecnologias semelhantes para melhorar a sua experiência, personalizar conteúdo e exibir anúncios relevantes. Esta Política explica o que são cookies e como os usamos.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando você visita um site. Eles permitem que a plataforma memorize suas ações e preferências com o tempo.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Como utilizamos os Cookies?</h2>
          <ul>
            <li><strong>Essenciais:</strong> Necessários para o funcionamento básico do portal.</li>
            <li><strong>Desempenho:</strong> Ajudam-nos a entender como os visitantes interagem com a plataforma, coletando informações de forma anônima.</li>
            <li><strong>Funcionalidade:</strong> Permitem memorizar escolhas do usuário (como o idioma ou a região).</li>
            <li><strong>Publicidade:</strong> Usados para fornecer anúncios relevantes (ex: Google AdSense), limitando o número de vezes que você vê um anúncio.</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Gerenciamento de Cookies</h2>
          <p>
            Você pode configurar seu navegador para recusar todos os cookies ou indicar quando um cookie está sendo enviado. No entanto, algumas partes do Portal podem não funcionar corretamente sem eles.
          </p>
        </div>

        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
}
