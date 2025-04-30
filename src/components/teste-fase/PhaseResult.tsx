
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PhaseTestResult } from "../../types/phaseTest";
import ActionButton from "../ui/action-button";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface PhaseResultProps {
  result: PhaseTestResult | null;
  onResetTest: () => void;
}

const PhaseResult = ({ result, onResetTest }: PhaseResultProps) => {
  const navigate = useNavigate();
  
  if (!result) return null;

  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Sua empresa está na: {result.phaseName}
            </h2>
            <p className="text-gray-700 mb-2">
              Compatibilidade com esta fase: {Math.round(result.score)}%
            </p>
            <p className="text-gray-600">{result.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendações para esta fase:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex gap-4 flex-wrap">
            <ActionButton 
              onClick={onResetTest} 
              variant="outline"
              icon={RefreshCw}
            >
              Reiniciar Teste
            </ActionButton>
            <ActionButton 
              onClick={() => navigate("/membros")}
              variant="secondary"
              icon={ArrowLeft}
            >
              Voltar para Área de Membros
            </ActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseResult;
