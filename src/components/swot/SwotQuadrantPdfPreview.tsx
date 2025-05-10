
import React from 'react';
import { SwotData } from "@/types/swot";

interface SwotQuadrantPdfPreviewProps {
  swotData: SwotData;
}

const SwotQuadrantPdfPreview: React.FC<SwotQuadrantPdfPreviewProps> = ({ swotData }) => {
  return (
    <div className="swot-pdf-container p-8 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Análise SWOT</h1>
        <p className="text-sm text-gray-600 mt-1">Quadrantes preenchidos</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-yellow-50 p-2">FORÇAS</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            O que temos de melhor na empresa
          </p>
          <ul className="space-y-1">
            {swotData.strengths.map((item, index) => (
              item.text && (
                <li key={`pdf-strength-${index}`} className="p-2 text-gray-700">
                  • {item.text}
                </li>
              )
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-gray-50 p-2">FRAQUEZAS</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            O que está ruim na empresa
          </p>
          <ul className="space-y-1">
            {swotData.weaknesses.map((item, index) => (
              item.text && (
                <li key={`pdf-weakness-${index}`} className="p-2 text-gray-700">
                  • {item.text}
                </li>
              )
            ))}
          </ul>
        </div>
        
        {/* Opportunities */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-blue-50 p-2">OPORTUNIDADES</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            O que acontece fora que posso aproveitar
          </p>
          <ul className="space-y-1">
            {swotData.opportunities.map((item, index) => (
              item.text && (
                <li key={`pdf-opportunity-${index}`} className="p-2 text-gray-700">
                  • {item.text}
                </li>
              )
            ))}
          </ul>
        </div>
        
        {/* Threats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-red-50 p-2">AMEAÇAS</h2>
          <p className="text-sm text-gray-600 italic mb-3">
            O que acontece fora e pode me prejudicar
          </p>
          <ul className="space-y-1">
            {swotData.threats.map((item, index) => (
              item.text && (
                <li key={`pdf-threat-${index}`} className="p-2 text-gray-700">
                  • {item.text}
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
      
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
};

export default SwotQuadrantPdfPreview;
