
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import ActionButton from "@/components/ui/action-button";
import { Save, RefreshCw, Download } from "lucide-react";
import { SwotData } from "@/types/swot";
import { generatePDF } from '@/utils/pdfGenerator';
import { useToast } from "@/hooks/use-toast";
import SwotQuadrantPdfPreview from './SwotQuadrantPdfPreview';

interface SwotActionsProps {
  onSave: () => void;
  onReset: () => void;
  swotData: SwotData;
}

const SwotActions: React.FC<SwotActionsProps> = ({ onSave, onReset, swotData }) => {
  const { toast } = useToast();
  const pdfQuadrantRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadSwotQuadrants = () => {
    try {
      if (pdfQuadrantRef.current) {
        // Use the PDF generator utility to create and download the PDF
        generatePDF(pdfQuadrantRef.current, "quadrantes_swot.pdf");
        
        toast({
          title: "PDF gerado com sucesso",
          description: "Os quadrantes da análise SWOT foram baixados em formato PDF",
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF dos quadrantes",
      });
    }
  };
  
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reiniciar análise
        </Button>
        <Button 
          variant="outline"
          onClick={handleDownloadSwotQuadrants}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Baixar quadrantes em PDF
        </Button>
        <ActionButton 
          variant="primary"
          icon={Save}
          onClick={onSave}
        >
          Salvar análise
        </ActionButton>
      </div>
      
      {/* Hidden element for PDF generation */}
      <div className="hidden">
        <div ref={pdfQuadrantRef}>
          <SwotQuadrantPdfPreview swotData={swotData} />
        </div>
      </div>
    </>
  );
};

export default SwotActions;
