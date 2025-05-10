import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, RefreshCw, Info } from 'lucide-react';
import ActionPlanDisplay from '@/components/swot/ActionPlanDisplay';
import { useSwotActionPlan } from '@/hooks/swot/useSwotActionPlan';
import { SwotData } from '@/types/swot';
import { generatePDF } from '@/utils/pdfGenerator';
import ActionButton from '@/components/ui/action-button';
import SwotPdfPreview from './SwotPdfPreview';
import SwotCompanyInfoDialog from './SwotCompanyInfoDialog';

interface SwotActionPlanProps {
  swotData: SwotData;
  isLoading: boolean;
}

const SwotActionPlan: React.FC<SwotActionPlanProps> = ({ swotData, isLoading }) => {
  const { 
    actionPlan, 
    generating, 
    handleGenerateAndSaveActionPlan, 
    handleRegenerateActionPlan,
    hasContent,
    companyInfoDialogOpen,
    setCompanyInfoDialogOpen,
    handleCompanyInfoSubmit,
    savedActionPlan
  } = useSwotActionPlan(swotData, isLoading);
  
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      generatePDF(pdfRef.current, 'plano_acao_swot.pdf');
    }
  };

  const hasActionPlan = actionPlan && Object.keys(actionPlan).length > 0 && 
    Object.values(actionPlan).some(strategies => strategies && strategies.length > 0);

  if (!hasContent(swotData)) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-center">Plano de Ação</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="mb-4 text-gray-600">
            Preencha sua análise SWOT para gerar um plano de ação personalizado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mt-8">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-center">Plano de Ação</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {generating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
              <p>Gerando seu plano de ação personalizado...</p>
            </div>
          ) : hasActionPlan ? (
            <>
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                <h3 className="text-lg font-semibold">Estratégias Recomendadas</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleRegenerateActionPlan}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Regenerar Plano</span>
                  </Button>
                </div>
              </div>
              <ActionPlanDisplay actionPlan={actionPlan} />
            </>
          ) : (
            <div className="flex flex-col items-center py-8">
              <p className="mb-6 text-center max-w-lg">
                Gere um plano de ação personalizado baseado na sua análise SWOT para implementar estratégias eficazes para o seu negócio.
              </p>
              <ActionButton 
                variant="secondary"
                icon={Info}
                onClick={handleGenerateAndSaveActionPlan}
                disabled={generating}
              >
                Gerar Plano de Ação Personalizado
              </ActionButton>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden PDF Preview for download */}
      <div className="hidden">
        <SwotPdfPreview 
          ref={pdfRef} 
          swotData={swotData} 
          actionPlan={actionPlan} 
        />
      </div>

      {/* Company Info Collection Dialog */}
      <SwotCompanyInfoDialog
        open={companyInfoDialogOpen}
        onOpenChange={setCompanyInfoDialogOpen}
        onSubmit={handleCompanyInfoSubmit}
      />
    </>
  );
};

export default SwotActionPlan;
