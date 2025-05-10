
import React from 'react';

const SwotPdfCta: React.FC = () => {
  return (
    <div className="mt-12 border-t pt-6">
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Transforme sua empresa em uma máquina de vendas
        </h2>
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
  );
};

export default SwotPdfCta;
