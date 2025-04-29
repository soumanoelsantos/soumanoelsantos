
import React from 'react';

const DiagnosticHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Diagnóstico do Negócio</h1>
      </div>
      <div>
        <img 
          src="/lovable-uploads/ebf1e28d-7009-45f3-8434-92ff40656582.png" 
          alt="Logo Universidade de Vendas" 
          className="h-16 w-auto"
        />
      </div>
    </div>
  );
};

export default DiagnosticHeader;
