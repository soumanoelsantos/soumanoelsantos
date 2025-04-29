
import React from 'react';
import ResultsCard from './ResultsCard';
import ActionPlanCard from './ActionPlanCard';
import DownloadPdfButton from './DownloadPdfButton';
import ResetDiagnosticButton from './ResetDiagnosticButton';
import BackToMemberAreaButton from './BackToMemberAreaButton';
import { AnswersDataType } from '@/types/diagnostic';

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
  const handleReset = () => {
    // This will be handled by the ResetDiagnosticButton component
  };

  return (
    <div ref={pdfRef} className="mt-10 space-y-8">
      <ResultsCard results={results} />
      <ActionPlanCard actionPlan={actionPlan} answersData={answersData} />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <DownloadPdfButton pdfRef={pdfRef} />
        <BackToMemberAreaButton />
        <ResetDiagnosticButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default DiagnosticResults;
