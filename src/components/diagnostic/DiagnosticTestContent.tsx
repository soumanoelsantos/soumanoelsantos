
import React from "react";
import DiagnosticSections from "./DiagnosticSections";
import DiagnosticResults from "./DiagnosticResults";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Component Props
interface DiagnosticTestContentProps {
  sections: any[];
  results: any | null;
  setResults: (results: any) => void;
  showResults: boolean;
  answersData: any;
  setAnswersData: (answersData: any) => void;
  handleSubmit: (results: any, answersData: any) => void;
  isGeneratingPlan: boolean;
}

const DiagnosticTestContent = ({
  sections,
  results,
  setResults,
  showResults,
  answersData,
  setAnswersData,
  handleSubmit,
  isGeneratingPlan,
}: DiagnosticTestContentProps) => {
  if (isGeneratingPlan) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold text-center">Processando seu diagnóstico...</h2>
        <p className="text-gray-600 text-center mt-2">
          Estamos analisando suas respostas para gerar resultados personalizados.
        </p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Diagnóstico do Negócio
        </CardTitle>
        <CardDescription className="text-center">
          Avalie o estágio atual da sua empresa em 4 áreas-chave
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <DiagnosticSections
            sections={sections}
            answersData={answersData}
            setAnswersData={setAnswersData}
            onSubmit={handleSubmit}
          />
        ) : (
          <DiagnosticResults 
            results={results} 
            answersData={answersData} 
            onRestart={() => {
              setResults(null);
              setShowResults(false);
              setAnswersData({});
            }} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosticTestContent;
