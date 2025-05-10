
import React from 'react';

interface SwotPdfPreviewProps {
  actionPlan: Record<string, string[]>;
}

const SwotPdfPreview: React.FC<SwotPdfPreviewProps> = ({ actionPlan }) => {
  return (
    <div className="swot-pdf-container p-8 bg-white">
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
            {actionPlan.strengthsOpportunities?.map((strategy, index) => (
              <li key={`pdf-so-${index}`} className="p-2 text-gray-700">
                • {strategy}
              </li>
            ))}
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
            {actionPlan.strengthsThreats?.map((strategy, index) => (
              <li key={`pdf-st-${index}`} className="p-2 text-gray-700">
                • {strategy}
              </li>
            ))}
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
            {actionPlan.weaknessesOpportunities?.map((strategy, index) => (
              <li key={`pdf-wo-${index}`} className="p-2 text-gray-700">
                • {strategy}
              </li>
            ))}
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
            {actionPlan.weaknessesThreats?.map((strategy, index) => (
              <li key={`pdf-wt-${index}`} className="p-2 text-gray-700">
                • {strategy}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* CTA Section in PDF */}
      <div className="mt-12 border-t pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 rounded-lg p-6">
          <img 
            src="/lovable-uploads/eefe48b8-a593-4c67-bc73-6a207ae52ace.png" 
            alt="Transformação de negócio" 
            className="w-full md:w-1/3 rounded-lg" 
          />
          <div>
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
    </div>
  );
};

export default SwotPdfPreview;
