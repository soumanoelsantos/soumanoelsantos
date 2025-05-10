
import React, { forwardRef } from 'react';
import { SwotData } from "@/types/swot";

interface SwotPdfPreviewProps {
  swotData: SwotData;
  actionPlan: Record<string, string[]>;
}

const SwotPdfPreview = forwardRef<HTMLDivElement, SwotPdfPreviewProps>(
  ({ actionPlan, swotData }, ref) => {
  // Generate detailed help content for PDF
  const generatePdfHelpContent = (strategy: string, category: string) => {
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

  return (
    <div ref={ref} className="swot-pdf-container p-8 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Plano de Ação SWOT</h1>
        <p className="text-sm text-gray-600 mt-1">Baseado na sua análise SWOT</p>
      </div>
      
      {/* SO Strategies */}
      {actionPlan.strengthsOpportunities && actionPlan.strengthsOpportunities.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-green-50 p-2">Estratégias SO (Forças + Oportunidades)</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para aproveitar oportunidades
          </p>
          <ul className="space-y-1">
            {actionPlan.strengthsOpportunities?.map((strategy, index) => {
              const { steps, tips } = generatePdfHelpContent(strategy, 'strengthsOpportunities');
              return (
                <li key={`pdf-so-${index}`} className="p-2 text-gray-700 mb-5">
                  <div className="font-medium">• {strategy}</div>
                  
                  {/* Como Fazer section for PDF */}
                  <div className="mt-2 ml-4 p-2 bg-gray-50 rounded border-l-2 border-green-400">
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
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ST Strategies */}
      {actionPlan.strengthsThreats && actionPlan.strengthsThreats.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-yellow-50 p-2">Estratégias ST (Forças + Ameaças)</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para reduzir o impacto das ameaças
          </p>
          <ul className="space-y-1">
            {actionPlan.strengthsThreats?.map((strategy, index) => {
              const { steps, tips } = generatePdfHelpContent(strategy, 'strengthsThreats');
              return (
                <li key={`pdf-st-${index}`} className="p-2 text-gray-700 mb-5">
                  <div className="font-medium">• {strategy}</div>
                  
                  {/* Como Fazer section for PDF */}
                  <div className="mt-2 ml-4 p-2 bg-gray-50 rounded border-l-2 border-yellow-400">
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
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* WO Strategies */}
      {actionPlan.weaknessesOpportunities && actionPlan.weaknessesOpportunities.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-blue-50 p-2">Estratégias WO (Fraquezas + Oportunidades)</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para superar fraquezas aproveitando oportunidades
          </p>
          <ul className="space-y-1">
            {actionPlan.weaknessesOpportunities?.map((strategy, index) => {
              const { steps, tips } = generatePdfHelpContent(strategy, 'weaknessesOpportunities');
              return (
                <li key={`pdf-wo-${index}`} className="p-2 text-gray-700 mb-5">
                  <div className="font-medium">• {strategy}</div>
                  
                  {/* Como Fazer section for PDF */}
                  <div className="mt-2 ml-4 p-2 bg-gray-50 rounded border-l-2 border-blue-400">
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
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* WT Strategies */}
      {actionPlan.weaknessesThreats && actionPlan.weaknessesThreats.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-red-50 p-2">Estratégias WT (Fraquezas + Ameaças)</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para minimizar fraquezas e evitar ameaças
          </p>
          <ul className="space-y-1">
            {actionPlan.weaknessesThreats?.map((strategy, index) => {
              const { steps, tips } = generatePdfHelpContent(strategy, 'weaknessesThreats');
              return (
                <li key={`pdf-wt-${index}`} className="p-2 text-gray-700 mb-5">
                  <div className="font-medium">• {strategy}</div>
                  
                  {/* Como Fazer section for PDF */}
                  <div className="mt-2 ml-4 p-2 bg-gray-50 rounded border-l-2 border-red-400">
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
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* CTA Section in PDF with text-only layout */}
      <div className="mt-12 border-t pt-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Transforme sua empresa em uma máquina de vendas</h2>
          <p className="mt-2 text-gray-700">
            Exclusivo para empresas com faturamento acima de R$ 50 mil por mês
          </p>
          <p className="mt-4 text-gray-700">
            Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
          </p>
          <a 
            href="https://soumanoelsantos.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block py-3 px-6 bg-yellow-500 text-gray-900 font-medium rounded-md no-underline hover:bg-yellow-600 transition-colors"
          >
            Agendar diagnóstico gratuito
          </a>
          <p className="mt-2 text-sm text-gray-600">
            Clique acima e agende agora – As vagas são limitadas!
          </p>
        </div>
      </div>
    </div>
  );
});

SwotPdfPreview.displayName = 'SwotPdfPreview';

export default SwotPdfPreview;
