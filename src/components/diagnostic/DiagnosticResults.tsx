
import React from 'react';
import ResultsCard from './ResultsCard';
import ActionPlanCard from './ActionPlanCard';
import DownloadPdfButton from './DownloadPdfButton';
import ResetDiagnosticButton from './ResetDiagnosticButton';
import BackToMemberAreaButton from './BackToMemberAreaButton';
import { AnswersDataType } from '@/types/diagnostic';
import CTASection from '../CTASection';
import { useDiagnostic } from '@/hooks/useDiagnostic';
import ActionButton from '../ui/action-button';
import { FileEdit, Loader2, RefreshCw } from 'lucide-react';
import AnswersDisplay from './AnswersDisplay';

interface DiagnosticResultsProps {
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
  actionPlan: {
    [key: string]: string[];
  };
  answersData?: AnswersDataType;
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DiagnosticResults = ({ results, actionPlan, answersData, pdfRef }: DiagnosticResultsProps) => {
  const { resetDiagnostic, regenerateActionPlan, isGeneratingPlan, planGenerationAttempted } = useDiagnostic();

  const handleReset = () => {
    resetDiagnostic();
  };

  const handleRegenerateActionPlan = () => {
    regenerateActionPlan();
  };

  const hasActionPlan = actionPlan && Object.keys(actionPlan).length > 0 && 
    Object.values(actionPlan).some(items => items && items.length > 0);

  // Function to get a more specific error message
  const getErrorMessage = () => {
    return "Não foi possível gerar o plano de ação. Isso pode ter ocorrido devido a uma falha na conexão com nosso serviço de IA ou problemas ao processar as informações do diagnóstico. Por favor, tente novamente.";
  };

  return (
    <div ref={pdfRef} className="mt-10 space-y-8 pdf-container">
      <div className="pdf-results-card">
        <ResultsCard results={results} />
      </div>
      
      {/* Display all questions and answers */}
      {answersData && Object.keys(answersData).length > 0 && (
        <div className="pdf-answers">
          <AnswersDisplay answersData={answersData} />
        </div>
      )}
      
      {isGeneratingPlan ? (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">Gerando Plano de Ação</h3>
            <p className="text-blue-700">
              Estamos analisando seus dados para criar um plano personalizado...
            </p>
          </div>
        </div>
      ) : hasActionPlan ? (
        <div className="pdf-action-plan">
          <ActionPlanCard actionPlan={actionPlan} answersData={answersData} />
          <div className="mt-4 flex justify-end">
            <ActionButton
              onClick={handleRegenerateActionPlan}
              variant="outline"
              size="sm"
              icon={RefreshCw}
              disabled={isGeneratingPlan}
            >
              Regenerar Plano
            </ActionButton>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-amber-800 mb-4">Plano de Ação</h3>
          <p className="text-amber-700 mb-4">
            {planGenerationAttempted ? 
              getErrorMessage() : 
              "Gere um plano de ação detalhado e personalizado com base nos resultados do diagnóstico da sua empresa."}
          </p>
          <ActionButton 
            onClick={handleRegenerateActionPlan} 
            variant="primary"
            icon={isGeneratingPlan ? Loader2 : FileEdit}
            disabled={isGeneratingPlan}
            className="w-full sm:w-auto"
          >
            {isGeneratingPlan ? (
              <span className="flex items-center gap-2">
                Criando Plano de Ação... <span className="animate-pulse">Analisando Dados</span>
              </span>
            ) : (
              planGenerationAttempted ? "Tentar Novamente" : "Gerar Plano de Ação Personalizado"
            )}
          </ActionButton>
        </div>
      )}
      
      {/* Marketing CTA Section with photo */}
      <div className="pdf-marketing-section">
        <CTASection source="diagnostic_results" />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <DownloadPdfButton pdfRef={pdfRef} />
        <BackToMemberAreaButton />
        <ResetDiagnosticButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default DiagnosticResults;
