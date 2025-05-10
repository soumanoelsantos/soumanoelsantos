
import React, { useRef } from 'react';
import DiagnosticForm from '@/components/diagnostic/DiagnosticForm';
import DiagnosticResults from '@/components/diagnostic/DiagnosticResults';
import { Loader2 } from 'lucide-react';

interface DiagnosticTestContentProps {
  sections: any;
  results: any;
  setResults: React.Dispatch<React.SetStateAction<any>>;
  showResults: boolean;
  answersData: any;
  setAnswersData: React.Dispatch<React.SetStateAction<any>>;
  actionPlan: any;
  handleSubmit: () => void;
  isGeneratingPlan: boolean;
  isSubmitting?: boolean;
}

const DiagnosticTestContent = ({
  sections,
  results,
  setResults,
  showResults,
  answersData,
  setAnswersData,
  actionPlan,
  handleSubmit,
  isGeneratingPlan,
  isSubmitting = false
}: DiagnosticTestContentProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  if (showResults) {
    return (
      <div className="pb-20">
        <DiagnosticResults
          results={results}
          actionPlan={actionPlan}
          answersData={answersData}
          pdfRef={pdfRef}
        />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <DiagnosticForm
        sections={sections}
        results={results}
        setResults={setResults}
        setAnswersData={setAnswersData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default DiagnosticTestContent;
