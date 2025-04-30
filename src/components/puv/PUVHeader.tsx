
import React from "react";
import { PUVFormData } from "@/types/puv";

interface PUVHeaderProps {
  data: PUVFormData;
}

const PUVHeader = ({ data }: PUVHeaderProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">PROPOSTA ÚNICA DE VALOR</h2>
        <p className="text-sm text-gray-600">PUV - Estrutura para elaboração da Proposta Única de Valor</p>
      </div>

      {(data.colaborador || data.gestor) && (
        <div className="grid grid-cols-2 gap-4 mb-8 border-b pb-4">
          {data.colaborador && (
            <div>
              <span className="font-bold text-gray-700">Colaborador:</span> {data.colaborador}
            </div>
          )}
          {data.gestor && (
            <div>
              <span className="font-bold text-gray-700">Gestor:</span> {data.gestor}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PUVHeader;
