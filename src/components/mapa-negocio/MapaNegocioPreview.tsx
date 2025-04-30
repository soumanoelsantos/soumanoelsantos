
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { BusinessMapData } from "@/types/businessMap";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "../ui/action-button";

interface MapaNegocioPreviewProps {
  data: BusinessMapData;
  previewRef: React.RefObject<HTMLDivElement>;
  onEditClick: () => void;
}

const MapaNegocioPreview = ({ data, previewRef, onEditClick }: MapaNegocioPreviewProps) => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu mapa de negócio está sendo gerado.",
    });

    // Generate the PDF in landscape orientation
    generatePDF(previewRef.current);
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
          Baixar Mapa em PDF
        </ActionButton>
      </div>

      <div ref={previewRef} className="business-map bg-white p-8">
        <div className="business-map-header mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">MAPA DO NEGÓCIO</h2>
          <p className="text-center text-gray-600">Business Model Canvas com Cultura e Clareza</p>
          
          <div className="bg-gray-200 p-2 mt-4 text-center">
            <strong className="text-gray-800">Empresa:</strong> {data.empresa || "Sua Empresa"}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {/* Top Row */}
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Missão</h3>
            <p className="text-xs">{data.missao || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Visão</h3>
            <p className="text-xs">{data.visao || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Parceiros Chave</h3>
            <p className="text-xs">{data.parceirosChave || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Atividades Chaves</h3>
            <p className="text-xs">{data.atividadesChaves || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Value Propositions</h3>
            <p className="text-xs">{data.valuePropositions || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Relação com o Consumidor</h3>
            <p className="text-xs">{data.relacaoConsumidor || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Segmento de Consumidores</h3>
            <p className="text-xs">{data.segmentoConsumidores || "Não preenchido"}</p>
          </Card>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {/* Middle Row */}
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Valores</h3>
            <p className="text-xs">{data.valores || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-2 p-2 bg-white border border-gray-300" style={{gridColumn: "span 2"}}>
            {/* Empty cell for spacing */}
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Recursos Chave</h3>
            <p className="text-xs">{data.recursosChave || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-2 p-2 bg-white border border-gray-300" style={{gridColumn: "span 2"}}>
            {/* Empty cell for spacing */}
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Canais/Distribuição</h3>
            <p className="text-xs">{data.canaisDistribuicao || "Não preenchido"}</p>
          </Card>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {/* Bottom Row 1 */}
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Posicionamento de Mercado</h3>
            <p className="text-xs">{data.posicionamentoMercado || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-4 p-2 bg-white border border-gray-300" style={{gridColumn: "span 4"}}>
            {/* Empty cell for spacing */}
          </Card>
          
          <Card className="col-span-2 p-2 bg-white border border-gray-300" style={{gridColumn: "span 2"}}>
            {/* Empty cell for spacing */}
          </Card>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {/* Bottom Row 2 */}
          <Card className="col-span-3 p-2 bg-white border border-gray-300" style={{gridColumn: "span 3"}}>
            {/* Empty cell for spacing */}
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Estrutura de Custos</h3>
            <p className="text-xs">{data.estruturaCustos || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-3 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Fontes de Receita</h3>
            <p className="text-xs">{data.fontesReceita || "Não preenchido"}</p>
          </Card>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Bottom Row 3 */}
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Vantagem Competitiva</h3>
            <p className="text-xs">{data.vantagemCompetitiva || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-1 p-2 bg-white border border-gray-300">
            <h3 className="font-semibold text-sm mb-1">Competências Essenciais</h3>
            <p className="text-xs">{data.competenciasEssenciais || "Não preenchido"}</p>
          </Card>
          
          <Card className="col-span-5 p-2 bg-white border border-gray-300" style={{gridColumn: "span 5"}}>
            {/* Empty cell for spacing */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapaNegocioPreview;
