
import React from 'react';

const DiagnosticHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Diagnóstico do Negócio</h1>
        <p className="text-gray-600">
          Descubra os pontos fortes e oportunidades de melhoria da sua empresa
        </p>
      </div>
      <div className="flex-shrink-0">
        <img
          src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
          alt="Manoel Santos - CRO"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
        />
      </div>
    </div>
  );
};

export default DiagnosticHeader;
