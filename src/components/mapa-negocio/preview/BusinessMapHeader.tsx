
import React from "react";

interface BusinessMapHeaderProps {
  empresa: string;
  showEmpresa: boolean;
}

const BusinessMapHeader = ({ empresa, showEmpresa }: BusinessMapHeaderProps) => {
  return (
    <div className="business-map-header mb-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">MAPA DO NEGÓCIO</h2>
      <p className="text-center text-gray-600">Business Model Canvas com Cultura e Clareza</p>
      
      {showEmpresa && (
        <div className="bg-gray-200 p-2 mt-4 text-center">
          <strong className="text-gray-800">Empresa:</strong> {empresa}
        </div>
      )}
    </div>
  );
};

export default BusinessMapHeader;
