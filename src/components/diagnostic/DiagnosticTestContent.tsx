
import React from "react";
import DiagnosticSections from "./DiagnosticSections";
import DiagnosticResults from "./DiagnosticResults";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Component Props
interface DiagnosticTestContentProps {
  sections: {
    [key: string]: {
      title: string;
      questions: string[];
      pointValue: number;
    };
  };
  results: any | null;
  setResults: (results: any) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void; 
  answersData: any;
  setAnswersData: (answersData: any) => void;
  handleSubmit: (results: any, answersData: any) => void;
  resetDiagnostic?: () => void;
  isGeneratingPlan: boolean;
}

const DiagnosticTestContent = ({
  sections,
  results,
  setResults,
  showResults,
  setShowResults,
  answersData,
  setAnswersData,
  handleSubmit,
  resetDiagnostic,
  isGeneratingPlan,
}: DiagnosticTestContentProps) => {
  const navigate = useNavigate();
  
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

  const handleReset = () => {
    if (resetDiagnostic) {
      console.log("Resetting diagnostic via resetDiagnostic function");
      resetDiagnostic();
    } else {
      // Fallback for backward compatibility
      console.log("Using fallback reset mechanism");
      setResults(null);
      setShowResults(false);
      setAnswersData({});
    }
    // Navigate back to the test page
    navigate("/teste");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-[#1d365c]">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Diagnóstico do Negócio
        </CardTitle>
        <CardDescription className="text-center text-white">
          Avalie o estágio atual da sua empresa em 4 áreas-chave
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!showResults ? (
          <DiagnosticSections
            sections={sections}
            answersData={answersData}
            setAnswersData={setAnswersData}
            onSubmit={handleSubmit}
          />
        ) : (
          results ? (
            <DiagnosticResults 
              results={results} 
              answersData={answersData} 
              onRestart={handleReset} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-xl font-semibold text-center">Não foi possível carregar os resultados</h2>
              <p className="text-gray-600 text-center mt-2 mb-6">
                Houve um erro ao carregar os resultados do diagnóstico.
              </p>
              <Button 
                onClick={handleReset}
                className="bg-[#1d365c] hover:bg-[#152a49] text-white"
              >
                Iniciar Novo Diagnóstico
              </Button>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosticTestContent;
