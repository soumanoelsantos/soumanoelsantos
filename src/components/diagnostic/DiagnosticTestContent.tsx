
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
}

const DiagnosticTestContent = ({
  sections,
  results,
  setResults,
  showResults,
  answersData,
  setAnswersData,
  actionPlan,
  handleSubmit
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
      ) : (
        <DiagnosticResults 
          results={results} 
          actionPlan={actionPlan}
          pdfRef={pdfRef}
        />
      )}
    </div>
  );
};

export default DiagnosticTestContent;
