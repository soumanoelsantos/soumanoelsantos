
import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { SwotData } from "@/types/swot";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from '@/utils/pdfGenerator';
import CTASection from "@/components/CTASection";
import ActionPlanDisplay from './ActionPlanDisplay';
import SwotPdfPreview from './SwotPdfPreview';
import { useSwotActionPlan } from '@/hooks/useSwotActionPlan';

interface SwotActionPlanProps {
  swotData: SwotData;
  isLoading: boolean;
}

const SwotActionPlan: React.FC<SwotActionPlanProps> = ({ swotData, isLoading }) => {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const { 
    actionPlan, 
    generating, 
    handleRegenerateActionPlan,
    hasContent 
  } = useSwotActionPlan(swotData, isLoading);

  // Handle "Download Plan" button click to generate PDF
  const handleDownloadPlan = () => {
    try {
      if (pdfRef.current) {
        // Use the PDF generator utility to create and download the PDF
        generatePDF(pdfRef.current, "plano_acao_swot.pdf");
        
        toast({
          title: "PDF gerado com sucesso",
          description: "O plano de ação SWOT foi baixado em formato PDF",
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF do plano de ação",
      });
    }
  };

  // Show loading state if no data or generating
  if (isLoading || !hasContent(swotData)) {
    return null; // Don't show anything if there's no data yet
  }

  return (
    <>
      <Card className="mt-8">
        <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-50">
          <CardTitle className="text-xl text-gray-800 flex justify-between items-center">
            <span>Plano de Ação baseado na sua análise SWOT</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2" 
                onClick={handleRegenerateActionPlan}
                disabled={generating}
              >
                <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
                {generating ? 'Gerando...' : 'Regenerar'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2" 
                onClick={handleDownloadPlan}
              >
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {generating ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Gerando plano de ação detalhado...</p>
              </div>
            </div>
          ) : (
            <ActionPlanDisplay actionPlan={actionPlan} />
          )}
        </CardContent>
      </Card>

      {/* Hidden element for PDF generation */}
      <div className="hidden">
        <div ref={pdfRef}>
          <SwotPdfPreview actionPlan={actionPlan} />
        </div>
      </div>
      
      {/* CTA Section displayed in the page */}
      <div className="mt-12">
        <CTASection source="analise_swot" />
      </div>
    </>
  );
};

export default SwotActionPlan;
