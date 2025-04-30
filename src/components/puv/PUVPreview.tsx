
import React from "react";
import { PUVFormData } from "@/types/puv";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";
import PUVHeader from "./PUVHeader";
import PUVContent from "./PUVContent";
import PUVFooter from "./PUVFooter";
import PUVActions from "./PUVActions";

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

  return (
    <div className="space-y-6">
      <PUVActions 
        onEditClick={onEditClick} 
        onDownloadClick={handleDownloadPDF} 
      />

      <div ref={previewRef} className="puv-preview bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <PUVHeader data={data} />
        <PUVContent data={data} />
        <PUVFooter />
      </div>
    </div>
  );
};

export default PUVPreview;
