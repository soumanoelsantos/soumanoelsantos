
import React from 'react';
import ResultsCard from './ResultsCard';
import ActionPlanCard from './ActionPlanCard';
import DownloadPdfButton from './DownloadPdfButton';

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
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DiagnosticResults = ({ results, actionPlan, pdfRef }: DiagnosticResultsProps) => {
  return (
    <div ref={pdfRef} className="mt-10 space-y-8">
      <ResultsCard results={results} />
      <ActionPlanCard actionPlan={actionPlan} />
      <DownloadPdfButton pdfRef={pdfRef} />
    </div>
  );
};

export default DiagnosticResults;
