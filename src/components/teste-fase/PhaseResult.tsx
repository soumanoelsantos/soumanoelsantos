
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { Download, RefreshCw, Info, Loader2, FileEdit } from "lucide-react";
import { PhaseTestResult } from "../../types/phaseTest";
import { useAuth } from "@/hooks/useAuth";
import PhaseInfo from "./PhaseInfo";
import PhaseRecommendations from "./PhaseRecommendations";
import NavigationButtons from "./NavigationButtons";
import QuestionsAnswersList from "./QuestionsAnswersList";
import ActionButton from "@/components/ui/action-button";
import { usePhaseActionPlan } from "@/hooks/phase-test/usePhaseActionPlan";

interface PhaseResultProps {
  result: PhaseTestResult | null;
  onResetTest: () => void;
}

const PhaseResult = ({ result, onResetTest }: PhaseResultProps) => {
  const { userId } = useAuth();
  
  const {
    isGeneratingPlan,
    showEnhancedPlan,
    setShowEnhancedPlan,
    enhancedActionPlan,
    handleGenerateActionPlan,
    handleRegenerateActionPlan
  } = usePhaseActionPlan(userId, result);
  
  if (!result) return null;

  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PhaseInfo 
            phaseName={result.phaseName} 
            score={result.score} 
            description={result.description} 
          />
          
          <QuestionsAnswersList answers={result.answers || []} />
          
          <PhaseRecommendations recommendations={result.recommendations} />
          
          {/* Action Plan Section */}
          <Card className="mt-8">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-center">Plano de Ação</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isGeneratingPlan ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                  <p>Gerando seu plano de ação personalizado...</p>
                </div>
              ) : showEnhancedPlan && enhancedActionPlan && enhancedActionPlan.length > 0 ? (
                <>
                  <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <h3 className="text-lg font-semibold">Ações Recomendadas</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          // PDF download functionality will be implemented later
                          console.log("Download PDF");
                        }}
                      >
                        <Download className="h-4 w-4" />
                        <span>Baixar PDF</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={handleRegenerateActionPlan}
                        disabled={isGeneratingPlan}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Regenerar Plano</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {enhancedActionPlan.map((action, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-800">{action}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <p className="mb-6 text-center max-w-lg">
                    Gere um plano de ação personalizado baseado no diagnóstico da fase da sua empresa para implementar estratégias eficazes para o seu negócio.
                  </p>
                  <ActionButton 
                    variant="secondary"
                    icon={FileEdit}
                    onClick={handleGenerateActionPlan}
                    disabled={isGeneratingPlan}
                  >
                    Gerar Plano de Ação Personalizado
                  </ActionButton>
                </div>
              )}
            </CardContent>
          </Card>
          
          <NavigationButtons onResetTest={onResetTest} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseResult;
