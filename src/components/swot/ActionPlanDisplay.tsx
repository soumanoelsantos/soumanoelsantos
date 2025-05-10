
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ActionPlanDisplayProps {
  actionPlan: Record<string, string[]>;
}

const ActionPlanDisplay: React.FC<ActionPlanDisplayProps> = ({ actionPlan }) => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [helpContent, setHelpContent] = useState<string>("");
  const [helpTitle, setHelpTitle] = useState<string>("");

  const handleOpenHelp = (category: string, strategy: string, index: number) => {
    const dialogId = `${category}-${index}`;
    setHelpTitle(`Como implementar esta estratégia`);
    setHelpContent(generatePersonalizedHelpContent(strategy, category));
    setOpenDialogs(prev => ({ ...prev, [dialogId]: true }));
  };

  const handleCloseDialog = (dialogId: string) => {
    setOpenDialogs(prev => ({ ...prev, [dialogId]: false }));
  };

  // Generate personalized help content based on the specific strategy
  const generatePersonalizedHelpContent = (strategy: string, category: string) => {
    // Start with strategy-specific content
    let content = `<p class="mb-4">Guia detalhado para implementar: <strong>${strategy}</strong></p>`;
    content += '<div class="space-y-4">';
    
    // Generate personalized steps based on the strategy content
    if (strategy.toLowerCase().includes('funil de vendas') || strategy.toLowerCase().includes('anúncios')) {
      content += `
        <h3 class="text-md font-semibold">Passo a passo para criar um funil de vendas com anúncios:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Acesse <a href="https://business.facebook.com" target="_blank" class="text-blue-600 underline">business.facebook.com</a> e crie sua conta Meta Business.</li>
          <li>Configure uma conta de anúncios no Gerenciador de Negócios Meta.</li>
          <li>Defina seu público-alvo com base nas características demográficas e interesses relacionados ao seu produto.</li>
          <li>Crie pelo menos 5 criativos diferentes (imagens/vídeos) para testar qual tem melhor performance.</li>
          <li>Configure um orçamento diário inicial entre R$30-R$50 para testes.</li>
          <li>Crie uma landing page específica para converter os visitantes (use Elementor, Unbounce ou similar).</li>
          <li>Após 3-5 dias, analise o desempenho dos criativos e desligue os que estão com custo por resultado mais alto.</li>
          <li>Aumente gradualmente o orçamento nos anúncios que estão performando melhor.</li>
          <li>Implemente um sistema de captura de leads na landing page conectado ao seu CRM ou WhatsApp.</li>
          <li>Monte uma sequência de follow-up para os leads que não converteram imediatamente.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Ferramentas recomendadas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Meta Business Suite para gerenciar os anúncios</li>
          <li>Google Analytics para acompanhar o comportamento na landing page</li>
          <li>Plataforma de automação como ActiveCampaign ou RD Station para follow-up</li>
          <li>Hotjar para análise de comportamento do usuário na landing page</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('parcerias') || strategy.toLowerCase().includes('parceria')) {
      content += `
        <h3 class="text-md font-semibold">Como estabelecer parcerias estratégicas eficazes:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Identifique potenciais parceiros que atendem o mesmo público, mas não competem diretamente.</li>
          <li>Pesquise cada potencial parceiro: tamanho do público, reputação no mercado, valores da marca.</li>
          <li>Prepare uma proposta de valor clara mostrando os benefícios mútuos da parceria.</li>
          <li>Faça uma abordagem personalizada via email ou LinkedIn para o responsável por parcerias.</li>
          <li>Na primeira reunião, foque em entender as necessidades do potencial parceiro.</li>
          <li>Estruture um modelo de parceria com métricas de sucesso claras para ambos.</li>
          <li>Formalize a parceria com um contrato simples estabelecendo responsabilidades e divisão de resultados.</li>
          <li>Implemente um sistema de acompanhamento e reporte regular dos resultados.</li>
          <li>Mantenha comunicação constante para fortalecer o relacionamento.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Tipos de parcerias a considerar:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Co-marketing (criação de conteúdo conjunto)</li>
          <li>Programa de afiliados (comissão por vendas)</li>
          <li>Eventos colaborativos (webinars, workshops)</li>
          <li>Pacotes de serviços combinados</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('marketing') || strategy.toLowerCase().includes('conteúdo')) {
      content += `
        <h3 class="text-md font-semibold">Como implementar uma estratégia de marketing de conteúdo:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Defina as 3-5 personas principais do seu negócio com detalhes demográficos e psicográficos.</li>
          <li>Realize uma pesquisa de palavras-chave para identificar os termos mais buscados pelo seu público.</li>
          <li>Crie um calendário editorial com temas divididos em conteúdo para topo, meio e fundo de funil.</li>
          <li>Desenvolva conteúdos em diferentes formatos: blog posts, vídeos, podcasts, infográficos, etc.</li>
          <li>Estabeleça uma frequência consistente de publicação (ex: 2 posts por semana).</li>
          <li>Otimize cada conteúdo para SEO com palavras-chave principais e secundárias.</li>
          <li>Distribua o conteúdo nas redes sociais relevantes para seu público.</li>
          <li>Crie materiais ricos (e-books, webinars) para captura de leads.</li>
          <li>Implemente uma estratégia de email marketing para nutrir os leads.</li>
          <li>Analise os resultados mensalmente e ajuste a estratégia com base nos dados.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Ferramentas recomendadas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Semrush ou Ahrefs para pesquisa de palavras-chave</li>
          <li>Google Analytics para análise de tráfego</li>
          <li>Buffer ou Hootsuite para agendamento de posts</li>
          <li>Canva para criação de imagens</li>
          <li>Mailchimp ou ActiveCampaign para email marketing</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('pesquisa') || strategy.toLowerCase().includes('mercado')) {
      content += `
        <h3 class="text-md font-semibold">Como conduzir uma pesquisa de mercado eficaz:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Defina claramente os objetivos da sua pesquisa de mercado (problema a resolver).</li>
          <li>Identifique o tipo de dados necessários: demográficos, comportamentais, de percepção, etc.</li>
          <li>Escolha os métodos de pesquisa apropriados: questionários online, entrevistas, grupos focais.</li>
          <li>Desenvolva as perguntas da pesquisa, evitando questões tendenciosas.</li>
          <li>Determine o tamanho da amostra necessário para resultados confiáveis (mínimo 100 respondentes).</li>
          <li>Use ferramentas como Google Forms, Typeform ou SurveyMonkey para criar o questionário.</li>
          <li>Distribua a pesquisa através de email, redes sociais, ou site.</li>
          <li>Ofereça um incentivo para aumentar a taxa de resposta (desconto, sorteio, etc).</li>
          <li>Colete e organize os dados em planilhas para análise.</li>
          <li>Identifique padrões, tendências e insights a partir dos dados coletados.</li>
          <li>Elabore um relatório com conclusões claras e ações recomendadas.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Fontes adicionais de dados:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>IBGE para dados demográficos</li>
          <li>Google Trends para análise de tendências de busca</li>
          <li>Relatórios setoriais de associações da indústria</li>
          <li>Análise de concorrentes (preços, ofertas, diferenciais)</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('inovação') || strategy.toLowerCase().includes('produto')) {
      content += `
        <h3 class="text-md font-semibold">Como implementar inovação em produtos ou serviços:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Realize sessões regulares de brainstorming com sua equipe (1-2x por mês).</li>
          <li>Implemente um sistema de coleta de feedback contínuo dos clientes.</li>
          <li>Analise as reclamações e sugestões recebidas para identificar oportunidades de melhoria.</li>
          <li>Estude as tendências do seu setor através de relatórios, eventos e publicações especializadas.</li>
          <li>Mapeie as dores não resolvidas dos seus clientes através de entrevistas e pesquisas.</li>
          <li>Desenvolva protótipos rápidos de novas ideias para testar com um grupo seleto de clientes.</li>
          <li>Utilize metodologias ágeis como Design Thinking e Lean Startup para desenvolvimento.</li>
          <li>Estabeleça métricas claras para avaliar o sucesso das inovações implementadas.</li>
          <li>Crie um cronograma de lançamentos com fases de testes e ajustes.</li>
          <li>Documente lições aprendidas de cada ciclo de inovação para melhorar o processo.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Ferramentas para inovação:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Miro ou Mural para sessões virtuais de ideação</li>
          <li>Trello para gerenciamento do pipeline de inovação</li>
          <li>UserTesting para testes com usuários reais</li>
          <li>Figma para prototipar interfaces digitais</li>
          <li>SurveyMonkey ou Typeform para coletar feedback</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('diversificar') || strategy.toLowerCase().includes('diversificação')) {
      content += `
        <h3 class="text-md font-semibold">Como diversificar ofertas ou mercados de forma estratégica:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Conduza uma análise SWOT completa do seu negócio atual para identificar capacidades subutilizadas.</li>
          <li>Pesquise mercados adjacentes onde suas competências atuais possam ser aplicadas.</li>
          <li>Identifique produtos ou serviços complementares que seus clientes atuais já compram de outros.</li>
          <li>Avalie seus recursos disponíveis (financeiros, humanos, tecnológicos) para diversificação.</li>
          <li>Desenvolva um plano de negócios detalhado para cada nova oferta ou mercado.</li>
          <li>Teste conceitos em pequena escala antes de fazer grandes investimentos.</li>
          <li>Estabeleça parcerias estratégicas para acelerar a entrada em novos mercados.</li>
          <li>Crie um cronograma de expansão realista com marcos claros.</li>
          <li>Defina indicadores de desempenho para monitorar o sucesso de cada nova iniciativa.</li>
          <li>Documente e compartilhe aprendizados entre as diferentes linhas de negócio.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Estratégias de diversificação:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Horizontal: Novos produtos para clientes atuais</li>
          <li>Vertical: Assumir etapas anteriores ou posteriores da cadeia de valor</li>
          <li>Concêntrica: Novos produtos relacionados com a tecnologia atual</li>
          <li>Conglomerada: Novos produtos não relacionados para novos mercados</li>
        </ul>
      `;
    } else if (strategy.toLowerCase().includes('capacitação') || strategy.toLowerCase().includes('treinamento')) {
      content += `
        <h3 class="text-md font-semibold">Como implementar programas de treinamento e capacitação:</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Realize uma avaliação de necessidades de treinamento com sua equipe.</li>
          <li>Priorize as habilidades mais críticas para os objetivos estratégicos do negócio.</li>
          <li>Defina os objetivos de aprendizagem específicos para cada treinamento.</li>
          <li>Escolha os formatos de treinamento mais adequados: presencial, online, on-the-job, mentoria.</li>
          <li>Desenvolva ou adquira conteúdos de qualidade alinhados aos objetivos de aprendizagem.</li>
          <li>Crie um calendário anual de capacitação com frequência regular.</li>
          <li>Implemente mecanismos de avaliação para medir a eficácia dos treinamentos.</li>
          <li>Estabeleça um sistema de reconhecimento para incentivar a aplicação do conhecimento.</li>
          <li>Colete feedback dos participantes para melhorar continuamente os programas.</li>
          <li>Crie uma biblioteca de recursos para aprendizado contínuo.</li>
        </ol>
        
        <h3 class="text-md font-semibold mt-4">Plataformas de treinamento recomendadas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>Udemy for Business para cursos diversos</li>
          <li>LinkedIn Learning para habilidades profissionais</li>
          <li>Alura para treinamentos técnicos</li>
          <li>Hotmart para cursos especializados em português</li>
          <li>Google Classroom para organização de conteúdos próprios</li>
        </ul>
      `;
    } else {
      // Fallback generic content based on category
      switch (category) {
        case 'strengthsOpportunities':
          content += `
            <h3 class="text-md font-semibold">Passos para implementar esta estratégia SO:</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Analise detalhadamente quais são os pontos fortes que você utilizará nesta estratégia.</li>
              <li>Identifique precisamente como esses pontos fortes se conectam com a oportunidade específica.</li>
              <li>Estabeleça métricas claras para acompanhar o sucesso da implementação.</li>
              <li>Desenvolva um cronograma detalhado com marcos para execução.</li>
              <li>Atribua responsabilidades específicas para cada etapa do processo.</li>
              <li>Defina o orçamento necessário para implementação completa.</li>
              <li>Identifique possíveis obstáculos e prepare planos de contingência.</li>
              <li>Estabeleça ciclos regulares de revisão e ajustes (quinzenais ou mensais).</li>
              <li>Documente todo o processo para criar casos de sucesso internos.</li>
            </ol>
          `;
          break;
          
        case 'strengthsThreats':
          content += `
            <h3 class="text-md font-semibold">Passos para implementar esta estratégia ST:</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Analise a natureza exata da ameaça que você está enfrentando.</li>
              <li>Identifique quais forças específicas podem neutralizar ou mitigar esta ameaça.</li>
              <li>Desenvolva um plano de resposta com ações preventivas e reativas.</li>
              <li>Estabeleça um sistema de alerta para monitorar indicadores da ameaça.</li>
              <li>Prepare sua equipe para responder rapidamente se a ameaça se intensificar.</li>
              <li>Comunique claramente para stakeholders como você está protegendo o negócio.</li>
              <li>Implemente ciclos regulares de revisão de riscos e resposta a ameaças.</li>
              <li>Documente lições aprendidas para aprimorar sua resiliência.</li>
            </ol>
          `;
          break;
          
        case 'weaknessesOpportunities':
          content += `
            <h3 class="text-md font-semibold">Passos para implementar esta estratégia WO:</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Avalie precisamente o impacto negativo que sua fraqueza tem atualmente.</li>
              <li>Identifique como a oportunidade pode ajudar a superar ou compensar esta fraqueza.</li>
              <li>Desenvolva um plano de capacitação ou aquisição de recursos necessários.</li>
              <li>Busque benchmarks e melhores práticas do mercado para acelerar seu desenvolvimento.</li>
              <li>Estabeleça parcerias estratégicas para complementar suas lacunas.</li>
              <li>Defina indicadores claros para acompanhar a superação da fraqueza.</li>
              <li>Implemente ciclos rápidos de feedback e ajuste (abordagem ágil).</li>
              <li>Celebre e comunique pequenas vitórias para manter o momentum.</li>
            </ol>
          `;
          break;
          
        case 'weaknessesThreats':
          content += `
            <h3 class="text-md font-semibold">Passos para implementar esta estratégia WT:</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Priorize as fraquezas que mais expõem seu negócio à ameaça identificada.</li>
              <li>Desenvolva um plano defensivo de curto prazo para mitigar riscos imediatos.</li>
              <li>Identifique recursos mínimos necessários para fortalecer pontos vulneráveis.</li>
              <li>Busque mentoria ou consultoria especializada na área problemática.</li>
              <li>Implemente sistemas de monitoramento constante das áreas vulneráveis.</li>
              <li>Desenvolva planos de contingência detalhados para cenários críticos.</li>
              <li>Estabeleça parcerias que possam oferecer proteção durante o período de vulnerabilidade.</li>
              <li>Crie um plano de desenvolvimento de médio prazo para transformar a fraqueza em neutralidade ou força.</li>
            </ol>
          `;
          break;
      }
    }
    
    // Add general implementation tips based on category
    content += `
      <h3 class="text-md font-semibold mt-4">Dicas para implementação bem-sucedida:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>Documente cada etapa do processo para facilitar ajustes futuros</li>
        <li>Estabeleça prazos realistas para cada etapa da implementação</li>
        <li>Designe um responsável principal para coordenar a execução</li>
        <li>Implemente revisões regulares para ajustar o curso conforme necessário</li>
        <li>Celebre os marcos alcançados para manter a motivação da equipe</li>
      </ul>
      
      <h3 class="text-md font-semibold mt-4">Recursos recomendados:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>Ferramentas de gestão de projetos como Trello, Asana ou ClickUp</li>
        <li>Templates de planos de ação em Excel ou Google Sheets</li>
        <li>Grupos profissionais para networking e benchmarking</li>
        <li>Livros e cursos especializados na área específica da estratégia</li>
      </ul>
    `;
    
    content += '</div>';
    
    return content;
  };

  return (
    <div className="space-y-6">
      {/* SO Strategies */}
      {actionPlan.strengthsOpportunities && actionPlan.strengthsOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias SO (Forças + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para aproveitar oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsOpportunities?.map((strategy, index) => (
              <li key={`so-${index}`} className="bg-green-50 border border-green-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1" 
                    onClick={() => handleOpenHelp('strengthsOpportunities', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ST Strategies */}
      {actionPlan.strengthsThreats && actionPlan.strengthsThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias ST (Forças + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para reduzir o impacto das ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsThreats?.map((strategy, index) => (
              <li key={`st-${index}`} className="bg-yellow-50 border border-yellow-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('strengthsThreats', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WO Strategies */}
      {actionPlan.weaknessesOpportunities && actionPlan.weaknessesOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WO (Fraquezas + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para superar fraquezas aproveitando oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesOpportunities?.map((strategy, index) => (
              <li key={`wo-${index}`} className="bg-blue-50 border border-blue-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('weaknessesOpportunities', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WT Strategies */}
      {actionPlan.weaknessesThreats && actionPlan.weaknessesThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WT (Fraquezas + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para minimizar fraquezas e evitar ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesThreats?.map((strategy, index) => (
              <li key={`wt-${index}`} className="bg-red-50 border border-red-100 p-3 rounded-md text-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">{strategy}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 flex items-center h-auto py-1"
                    onClick={() => handleOpenHelp('weaknessesThreats', strategy, index)}
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Como fazer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Help Dialog */}
      <Dialog open={Object.values(openDialogs).some(v => v)} onOpenChange={() => setOpenDialogs({})}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{helpTitle}</DialogTitle>
            <DialogDescription className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: helpContent }} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionPlanDisplay;
