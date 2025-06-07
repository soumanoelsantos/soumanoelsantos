
import React from 'react';
import ResultsCard from './ResultsCard';
import DownloadPdfButton from './DownloadPdfButton';
import ResetDiagnosticButton from './ResetDiagnosticButton';
import BackToMemberAreaButton from './BackToMemberAreaButton';
import { AnswersDataType } from '@/types/diagnostic';
import { useDiagnostic } from '@/hooks/useDiagnostic';
import AnswersDisplay from './AnswersDisplay';
import ActionPlanManager from './ActionPlanManager';
import { ActionItem } from './NewDiagnosticTestContent';

interface DiagnosticResultsProps {
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
  answersData?: AnswersDataType;
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DiagnosticResults = ({ results, answersData, pdfRef }: DiagnosticResultsProps) => {
  const { resetDiagnostic, actionPlan } = useDiagnostic();

  const handleReset = () => {
    resetDiagnostic();
  };

  // Convert actionPlan to ActionItem[] - actionPlan should already be ActionItem[]
  const convertedActionPlan: ActionItem[] = Array.isArray(actionPlan) 
    ? actionPlan 
    : [];

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

      {/* Display action plan if available */}
      {convertedActionPlan.length > 0 && (
        <div className="pdf-action-plan">
          <ActionPlanManager actionPlan={convertedActionPlan} />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <DownloadPdfButton pdfRef={pdfRef} />
        <BackToMemberAreaButton />
        <ResetDiagnosticButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default DiagnosticResults;
