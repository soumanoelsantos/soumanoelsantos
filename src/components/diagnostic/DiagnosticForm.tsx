
import React from "react";
import { Button } from "@/components/ui/button";
import DiagnosticSections from "@/components/diagnostic/DiagnosticSections";
import { DiagnosticSections as DiagnosticSectionsType } from "@/types/diagnostic";
import ActionButton from "@/components/ui/action-button";
import { Loader2 } from "lucide-react";

interface DiagnosticFormProps {
  sections: DiagnosticSectionsType;
  results: any;
  setResults: React.Dispatch<React.SetStateAction<any>>;
  setAnswersData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const DiagnosticForm = ({ 
  sections, 
  results, 
  setResults, 
  setAnswersData, 
  onSubmit,
  isSubmitting
}: DiagnosticFormProps) => {
  return (
    <>
      <DiagnosticSections 
        sections={sections} 
        results={results} 
        setResults={setResults}
        setAnswersData={setAnswersData}
      />

      <div className="flex justify-center mt-8">
        <ActionButton 
          onClick={onSubmit} 
          size="lg"
          variant="secondary"
          disabled={isSubmitting}
          icon={isSubmitting ? Loader2 : undefined}
          className="transition-all"
        >
          {isSubmitting ? (
            <span>Processando...</span>
          ) : (
            <span>Finalizar e Ver Resultados</span>
          )}
        </ActionButton>
      </div>
    </>
  );
};

export default DiagnosticForm;
