
import React from "react";
import { BusinessMapData } from "@/types/businessMap";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";
import PreviewActions from "./preview/PreviewActions";
import BusinessMapHeader from "./preview/BusinessMapHeader";
import BusinessMapGrid from "./preview/BusinessMapGrid";

interface MapaNegocioPreviewProps {
  data: BusinessMapData;
  previewRef: React.RefObject<HTMLDivElement>;
  onEditClick: () => void;
}

const MapaNegocioPreview = ({ data, previewRef, onEditClick }: MapaNegocioPreviewProps) => {
  const { toast } = useToast();

  // Helper function to check if a field should be displayed
  const shouldDisplayField = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "" && value !== "Não preenchido";
  };

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu mapa de negócio está sendo gerado.",
    });

    // Generate the PDF in landscape orientation
    generatePDF(previewRef.current);
  };

  const topRowFields = [
    { key: "missao", title: "Missão" },
    { key: "visao", title: "Visão" },
    { key: "parceirosChave", title: "Parceiros Chave" },
    { key: "atividadesChaves", title: "Atividades Chaves" },
    { key: "valuePropositions", title: "Value Propositions" },
    { key: "relacaoConsumidor", title: "Relação com o Consumidor" },
    { key: "segmentoConsumidores", title: "Segmento de Consumidores" },
  ];

  const middleRowFields = [
    { key: "valores", title: "Valores" },
    { 
      key: "recursosChave", 
      title: "Recursos Chave", 
      style: {gridColumn: shouldDisplayField(data.valores) ? "3 / 4" : "span 1"}
    },
    { 
      key: "canaisDistribuicao", 
      title: "Canais/Distribuição",
      style: {gridColumn: "7 / 8"} 
    },
  ];

  const bottomRow1Fields = [
    { key: "posicionamentoMercado", title: "Posicionamento de Mercado" },
  ];

  const bottomRow2Fields = [
    { 
      key: "estruturaCustos", 
      title: "Estrutura de Custos",
      style: {gridColumn: "4 / 5"} 
    },
    { 
      key: "fontesReceita", 
      title: "Fontes de Receita",
      style: {gridColumn: "5 / 8"} 
    },
  ];

  const bottomRow3Fields = [
    { key: "vantagemCompetitiva", title: "Vantagem Competitiva" },
    { key: "competenciasEssenciais", title: "Competências Essenciais" },
  ];

  return (
    <div className="space-y-6">
      <PreviewActions 
        onEditClick={onEditClick} 
        onDownloadClick={handleDownloadPDF} 
      />

      <div ref={previewRef} className="business-map bg-white p-8">
        <BusinessMapHeader 
          empresa={data.empresa} 
          showEmpresa={shouldDisplayField(data.empresa)} 
        />

        <BusinessMapGrid 
          data={data} 
          fields={topRowFields} 
          className="mb-2" 
        />

        <BusinessMapGrid 
          data={data} 
          fields={middleRowFields} 
          className="mb-2" 
        />

        <BusinessMapGrid 
          data={data} 
          fields={bottomRow1Fields} 
          className="mb-2" 
        />

        <BusinessMapGrid 
          data={data} 
          fields={bottomRow2Fields} 
          className="mb-2" 
        />

        <BusinessMapGrid 
          data={data} 
          fields={bottomRow3Fields} 
          className="mt-2" 
        />
      </div>
    </div>
  );
};

export default MapaNegocioPreview;
