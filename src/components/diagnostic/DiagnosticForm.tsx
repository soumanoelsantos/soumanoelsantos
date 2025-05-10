
import React from "react";
import { Button } from "@/components/ui/button";
import DiagnosticSections from "@/components/diagnostic/DiagnosticSections";
import { DiagnosticSections as DiagnosticSectionsType } from "@/types/diagnostic";

interface DiagnosticFormProps {
  sections: DiagnosticSectionsType;
  results: any;
  setResults: React.Dispatch<React.SetStateAction<any>>;
  setAnswersData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
}

const DiagnosticForm = ({ 
  sections, 
  results, 
  setResults, 
  setAnswersData, 
  onSubmit 
}: DiagnosticFormProps) => {
  // Create a compatible props object for DiagnosticSections
  const diagnosticSectionsProps = {
    sections,
    answersData: {}, // This should ideally come from somewhere
    setAnswersData,
    onSubmit: () => onSubmit()
  };

  return (
    <>
      <DiagnosticSections {...diagnosticSectionsProps} />

      <div className="flex justify-center mt-8">
        <Button 
          onClick={onSubmit} 
          size="lg" 
          className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
        >
          Finalizar e Ver Resultados
        </Button>
      </div>
    </>
  );
};

export default DiagnosticForm;
