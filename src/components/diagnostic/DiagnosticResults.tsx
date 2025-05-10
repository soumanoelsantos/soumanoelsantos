
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
import { FileEdit } from 'lucide-react';

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
  const { resetDiagnostic, regenerateActionPlan } = useDiagnostic();

  const handleReset = () => {
    // Pass the reset function from useDiagnostic hook
    resetDiagnostic();
  };

  const hasActionPlan = actionPlan && Object.keys(actionPlan).length > 0;

  return (
    <div ref={pdfRef} className="mt-10 space-y-8 pdf-container">
      <div className="pdf-results-card">
        <ResultsCard results={results} />
      </div>
      
      {hasActionPlan ? (
        <div className="pdf-action-plan">
          <ActionPlanCard actionPlan={actionPlan} answersData={answersData} />
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-amber-800 mb-4">Plano de Ação</h3>
          <ActionButton 
            onClick={regenerateActionPlan} 
            variant="primary"
            icon={FileEdit}
          >
            Criar Plano de Ação Personalizado
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
