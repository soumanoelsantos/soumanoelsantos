
import React from "react";

const PUVFooter = () => {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>Programa Maximus - Documento gerado em {new Date().toLocaleDateString('pt-BR')}</p>
    </div>
  );
};

export default PUVFooter;
