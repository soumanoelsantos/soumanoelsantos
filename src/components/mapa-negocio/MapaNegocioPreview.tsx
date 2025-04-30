
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

  // Helper function to check if a field should be displayed
  const shouldDisplayField = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "" && value !== "Não preenchido";
  };

  // Get filled fields count for grid layout calculations
  const getFilledFieldsCount = (): number => {
    let count = 0;
    Object.values(data).forEach(value => {
      if (shouldDisplayField(value)) count++;
    });
    return count;
  };

  const filledFieldsCount = getFilledFieldsCount();

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
          
          {shouldDisplayField(data.empresa) && (
            <div className="bg-gray-200 p-2 mt-4 text-center">
              <strong className="text-gray-800">Empresa:</strong> {data.empresa}
            </div>
          )}
        </div>

        <div className="business-map-grid grid grid-cols-7 gap-2 mb-2">
          {/* Top Row - Only render if data exists */}
          {shouldDisplayField(data.missao) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Missão</h3>
              <p className="text-xs">{data.missao}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.visao) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Visão</h3>
              <p className="text-xs">{data.visao}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.parceirosChave) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Parceiros Chave</h3>
              <p className="text-xs">{data.parceirosChave}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.atividadesChaves) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Atividades Chaves</h3>
              <p className="text-xs">{data.atividadesChaves}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.valuePropositions) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Value Propositions</h3>
              <p className="text-xs">{data.valuePropositions}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.relacaoConsumidor) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Relação com o Consumidor</h3>
              <p className="text-xs">{data.relacaoConsumidor}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.segmentoConsumidores) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Segmento de Consumidores</h3>
              <p className="text-xs">{data.segmentoConsumidores}</p>
            </Card>
          )}
        </div>

        <div className="business-map-grid grid grid-cols-7 gap-2 mb-2">
          {/* Middle Row */}
          {shouldDisplayField(data.valores) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Valores</h3>
              <p className="text-xs">{data.valores}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.recursosChave) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300" style={{gridColumn: shouldDisplayField(data.valores) ? "3 / 4" : "span 1"}}>
              <h3 className="font-semibold text-sm mb-1">Recursos Chave</h3>
              <p className="text-xs">{data.recursosChave}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.canaisDistribuicao) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300" style={{gridColumn: "7 / 8"}}>
              <h3 className="font-semibold text-sm mb-1">Canais/Distribuição</h3>
              <p className="text-xs">{data.canaisDistribuicao}</p>
            </Card>
          )}
        </div>

        <div className="business-map-grid grid grid-cols-7 gap-2 mb-2">
          {/* Bottom Row 1 */}
          {shouldDisplayField(data.posicionamentoMercado) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Posicionamento de Mercado</h3>
              <p className="text-xs">{data.posicionamentoMercado}</p>
            </Card>
          )}
        </div>

        <div className="business-map-grid grid grid-cols-7 gap-2">
          {/* Bottom Row 2 */}
          {shouldDisplayField(data.estruturaCustos) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300" style={{gridColumn: "4 / 5"}}>
              <h3 className="font-semibold text-sm mb-1">Estrutura de Custos</h3>
              <p className="text-xs">{data.estruturaCustos}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.fontesReceita) && (
            <Card className="map-card col-span-3 p-2 bg-white border border-gray-300" style={{gridColumn: "5 / 8"}}>
              <h3 className="font-semibold text-sm mb-1">Fontes de Receita</h3>
              <p className="text-xs">{data.fontesReceita}</p>
            </Card>
          )}
        </div>
        
        <div className="business-map-grid grid grid-cols-7 gap-2 mt-2">
          {/* Bottom Row 3 */}
          {shouldDisplayField(data.vantagemCompetitiva) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Vantagem Competitiva</h3>
              <p className="text-xs">{data.vantagemCompetitiva}</p>
            </Card>
          )}
          
          {shouldDisplayField(data.competenciasEssenciais) && (
            <Card className="map-card col-span-1 p-2 bg-white border border-gray-300">
              <h3 className="font-semibold text-sm mb-1">Competências Essenciais</h3>
              <p className="text-xs">{data.competenciasEssenciais}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapaNegocioPreview;
