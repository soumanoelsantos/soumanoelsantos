
import React from 'react';

interface HelpContentProps {
  strategy: string;
  category: string;
}

interface HelpContentResult {
  steps: string[];
  tips: string[];
}

/**
 * Utility component that generates detailed help content for PDF strategies
 */
export const generatePdfHelpContent = (strategy: string, category: string): HelpContentResult => {
  let steps = [];
  let tips = [];
  
  if (category === 'strengthsOpportunities') {
    steps = [
      "Faça um levantamento detalhado dos recursos disponíveis para executar esta estratégia.",
      "Defina métricas específicas de sucesso para acompanhar o progresso.",
      "Estabeleça um cronograma realista com marcos claros para implementação.",
      "Identifique os responsáveis por cada etapa do processo.",
      "Reserve um orçamento adequado para garantir a execução bem-sucedida."
    ];
    
    tips = [
      "Realize uma pesquisa de mercado para validar sua estratégia antes de investir recursos significativos.",
      "Consulte especialistas no setor para obter insights valiosos.",
      "Monitore as tendências do mercado para garantir que a oportunidade continue relevante."
    ];
  } else if (category === 'strengthsThreats') {
    steps = [
      "Faça uma análise detalhada da ameaça e seu potencial impacto no seu negócio.",
      "Identifique quais forças podem ser utilizadas para neutralizar ou mitigar a ameaça.",
      "Desenvolva um plano de contingência detalhado para lidar com cenários adversos.",
      "Atribua responsabilidades claras para monitoramento contínuo da ameaça.",
      "Estabeleça um sistema de alerta precoce para detectar mudanças no ambiente de ameaça."
    ];
    
    tips = [
      "Mantenha-se informado sobre mudanças no ambiente competitivo e regulatório.",
      "Fortaleça relacionamentos com parceiros estratégicos que possam ajudar a neutralizar ameaças.",
      "Invista em inovação contínua para manter-se à frente das mudanças do mercado."
    ];
  } else if (category === 'weaknessesOpportunities') {
    steps = [
      "Identifique claramente qual fraqueza precisa ser superada para aproveitar a oportunidade.",
      "Desenvolva um plano de desenvolvimento de competências ou recursos necessários.",
      "Considere parcerias estratégicas que possam compensar suas fraquezas.",
      "Estabeleça um cronograma realista para desenvolver as capacidades necessárias.",
      "Defina métricas claras para medir seu progresso na superação da fraqueza."
    ];
    
    tips = [
      "Contrate especialistas ou consultores para acelerar o desenvolvimento de capacidades.",
      "Considere aquisições estratégicas que possam rapidamente preencher suas lacunas.",
      "Invista em treinamento e desenvolvimento da sua equipe."
    ];
  } else if (category === 'weaknessesThreats') {
    steps = [
      "Priorize as fraquezas que mais expõem seu negócio às ameaças identificadas.",
      "Desenvolva um plano detalhado de mitigação de riscos e fortalecimento.",
      "Identifique recursos e habilidades necessários para fortalecer áreas vulneráveis.",
      "Considere reestruturação organizacional se necessário.",
      "Estabeleça sistemas de monitoramento para acompanhar tanto suas fraquezas quanto as ameaças externas."
    ];
    
    tips = [
      "Considere uma estratégia defensiva até que suas fraquezas sejam abordadas adequadamente.",
      "Busque alianças estratégicas que ofereçam proteção contra ameaças específicas.",
      "Invista em desenvolvimento de resiliência organizacional."
    ];
  }
  
  return { steps, tips };
};

interface StrategyHelpContentProps {
  strategy: string;
  category: string;
  borderColor: string;
}

export const StrategyHelpContent: React.FC<StrategyHelpContentProps> = ({ 
  strategy, 
  category,
  borderColor 
}) => {
  const { steps, tips } = generatePdfHelpContent(strategy, category);
  
  return (
    <div className={`mt-2 ml-4 p-2 bg-gray-50 rounded border-l-2 ${borderColor}`}>
      <div className="text-sm font-medium text-gray-700 mb-1">Como fazer:</div>
      
      <div className="text-xs text-gray-600 ml-2">
        <div className="mb-2">
          <div className="italic">Passos:</div>
          <ol className="list-decimal ml-4 mt-1">
            {steps.map((step, idx) => (
              <li key={`step-${idx}`}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div>
          <div className="italic">Dicas:</div>
          <ul className="list-disc ml-4 mt-1">
            {tips.map((tip, idx) => (
              <li key={`tip-${idx}`}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
