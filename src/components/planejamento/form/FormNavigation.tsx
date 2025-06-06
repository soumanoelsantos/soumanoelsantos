
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bot, Sparkles } from "lucide-react";

interface FormNavigationProps {
  perguntaAtual: number;
  totalPerguntas: number;
  iaAtiva: boolean;
  onAnterior: () => void;
  onProxima: () => void;
  onGerarDica: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  perguntaAtual,
  totalPerguntas,
  iaAtiva,
  onAnterior,
  onProxima,
  onGerarDica
}) => {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button
        variant="outline"
        onClick={onAnterior}
        disabled={perguntaAtual === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Anterior
      </Button>

      <Button
        variant="outline"
        onClick={onGerarDica}
        disabled={iaAtiva}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {iaAtiva ? (
          <>
            <Bot className="mr-2 h-4 w-4 animate-pulse" />
            Gerando dica...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Dica da IA
          </>
        )}
      </Button>

      <Button onClick={onProxima}>
        {perguntaAtual === totalPerguntas - 1 ? "Finalizar" : "Próxima"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormNavigation;
