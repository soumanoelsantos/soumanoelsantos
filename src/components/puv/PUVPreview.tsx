
import React from "react";
import { PUVFormData } from "@/types/puv";
import { ArrowLeft, Download } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "../ui/action-button";

interface PUVPreviewProps {
  data: PUVFormData;
  previewRef: React.RefObject<HTMLDivElement>;
  onEditClick: () => void;
}

const PUVPreview = ({ data, previewRef, onEditClick }: PUVPreviewProps) => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    toast({
      title: "Download iniciado!",
      description: "O PDF da sua Proposta Única de Valor está sendo gerado.",
    });

    generatePDF(previewRef.current);
  };

  // Função para formatar o texto da PUV
  const formatPUVText = () => {
    // Apenas inclui os campos que foram preenchidos
    const parts = [];
    if (data.meus) parts.push(`Meus ${data.meus}`);
    if (data.ajudam) parts.push(`ajudam ${data.ajudam}`);
    if (data.queDesejam) parts.push(`que desejam ${data.queDesejam}`);
    if (data.para) parts.push(`para ${data.para}`);
    if (data.dor) parts.push(`${data.dor}`);
    if (data.e) parts.push(`e ${data.e}`);
    if (data.ganho) parts.push(`${data.ganho}`);
    
    return parts.join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <ActionButton 
          onClick={onEditClick}
          variant="secondary"
          icon={ArrowLeft}
        >
          Editar Dados
        </ActionButton>
        
        <ActionButton 
          onClick={handleDownloadPDF}
          variant="primary"
          icon={Download}
        >
          Baixar PUV em PDF
        </ActionButton>
      </div>

      <div ref={previewRef} className="puv-preview bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
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

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Programa Maximus - Documento gerado em {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
};

export default PUVPreview;
