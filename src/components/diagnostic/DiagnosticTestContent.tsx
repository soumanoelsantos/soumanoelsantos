
import React, { useRef } from "react";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import DiagnosticForm from "@/components/diagnostic/DiagnosticForm";
import DiagnosticResults from "@/components/diagnostic/DiagnosticResults";
import { DiagnosticSections as DiagnosticSectionsType } from "@/types/diagnostic";

interface DiagnosticTestContentProps {
  sections: DiagnosticSectionsType;
  results: any;
  setResults: React.Dispatch<React.SetStateAction<any>>;
  showResults: boolean;
  answersData: any;
  setAnswersData: React.Dispatch<React.SetStateAction<any>>;
  actionPlan: any;
  handleSubmit: () => void;
  isGeneratingPlan?: boolean;
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
  isGeneratingPlan = false
}: DiagnosticTestContentProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <DiagnosticHeader />
      
      {!showResults ? (
        <DiagnosticForm 
          sections={sections}
          results={results}
          setResults={setResults}
          setAnswersData={setAnswersData}
          onSubmit={handleSubmit}
        />
      ) : isGeneratingPlan ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1d365c]"></div>
          <p className="mt-4 text-lg text-gray-800">Gerando plano de ação avançado...</p>
          <p className="text-sm text-gray-600">Isso pode levar alguns instantes.</p>
        </div>
      ) : (
        <DiagnosticResults 
          results={results} 
          actionPlan={actionPlan}
          answersData={answersData}
          pdfRef={pdfRef}
        />
      )}
    </div>
  );
};

export default DiagnosticTestContent;
