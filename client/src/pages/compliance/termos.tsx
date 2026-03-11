import { AdBanner } from "@/components/AdBanner";

export default function TermosPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Termos de Uso</h1>
        <p className="text-muted-foreground mb-12">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-blue max-w-none text-foreground/80 mb-16">
          <p>
            Ao acessar e usar O Portal, você concorda em cumprir os presentes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concorda com algum destes termos, está proibido de usar ou acessar este site.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">1. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) n'O Portal, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">2. Conteúdo Gerado por IA</h2>
          <p>
            O conteúdo disponibilizado nesta plataforma é majoritariamente gerado, resumido ou analisado por Inteligência Artificial a partir de fontes públicas. Embora envidemos esforços contínuos para garantir a precisão, não garantimos que as informações sejam 100% livres de erros ou alucinações de IA. O uso das informações é de inteira responsabilidade do usuário.
          </p>

          <h2 className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">3. Modificações</h2>
          <p>
            O Portal pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>
        </div>

        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
}
