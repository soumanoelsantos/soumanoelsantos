
import React from "react";
import { PUVFormData } from "@/types/puv";

interface PUVContentProps {
  data: PUVFormData;
}

const PUVContent = ({ data }: PUVContentProps) => {
  // Função para formatar o texto da PUV de forma mais coesa e discursiva
  const formatPUVText = () => {
    if (!data.meus && !data.ajudam) return "";
    
    let text = "";
    
    // Começamos com "Meus [produtos]"
    if (data.meus) {
      text = `Meus ${data.meus}`;
    }
    
    // Adicionamos "ajudam [segmento]"
    if (data.ajudam) {
      text += text ? ` ajudam ${data.ajudam}` : `Ajudam ${data.ajudam}`;
    }
    
    // Adicionamos "que desejam [necessidades]"
    if (data.queDesejam) {
      text += ` que desejam ${data.queDesejam}`;
    }
    
    // Adicionamos "para [verbo]"
    if (data.para) {
      text += ` para ${data.para}`;
    }
    
    // Adicionamos a dor do cliente
    if (data.dor) {
      text += ` ${data.dor}`;
    }
    
    // Adicionamos "e [verbo]"
    if (data.e) {
      text += ` e ${data.e}`;
    }
    
    // Adicionamos o ganho do cliente
    if (data.ganho) {
      text += ` ${data.ganho}`;
    }
    
    // Garantimos que a primeira letra esteja em maiúsculo e que terminamos com um ponto
    if (text) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
      if (!text.endsWith('.')) {
        text += '.';
      }
    }
    
    return text;
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 bg-[#1d365c] text-white p-2">Estrutura para elaboração da Proposta Única de Valor</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {data.meus && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">Meus:</span> {data.meus}</p>
              <p className="text-sm text-gray-500">(PRODUTOS OU SERVIÇOS)</p>
            </div>
          )}
          
          {data.ajudam && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">Ajudam:</span> {data.ajudam}</p>
              <p className="text-sm text-gray-500">(SEGMENTO DO CLIENTE)</p>
            </div>
          )}
          
          {data.queDesejam && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">Que desejam:</span> {data.queDesejam}</p>
              <p className="text-sm text-gray-500">(NECESSIDADES DO CLIENTE)</p>
            </div>
          )}
          
          {data.para && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">Para:</span> {data.para}</p>
              <p className="text-sm text-gray-500">(SEU PRÓPRIO VERBO – Exemplo: Reduzir, Evitar)</p>
            </div>
          )}
          
          {data.dor && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">_:</span> {data.dor}</p>
              <p className="text-sm text-gray-500">(UMA DOR DO CLIENTE)</p>
            </div>
          )}
          
          {data.e && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">e:</span> {data.e}</p>
              <p className="text-sm text-gray-500">(SEU PRÓPRIO VERBO – Exemplo: Aumentar, Possibilitar)</p>
            </div>
          )}
          
          {data.ganho && (
            <div className="border-b border-gray-200 pb-2">
              <p><span className="font-bold">_:</span> {data.ganho}</p>
              <p className="text-sm text-gray-500">(UM GANHO DO CLIENTE)</p>
            </div>
          )}
        </div>
      </div>

      {formatPUVText().length > 0 && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-center">Sua Proposta Única de Valor</h3>
          <p className="text-center font-medium">{formatPUVText()}</p>
        </div>
      )}
    </>
  );
};

export default PUVContent;
