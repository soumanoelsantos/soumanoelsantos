
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhaseQuestion from "./PhaseQuestion";
import { PhaseTest } from "../../types/phaseTest";
import { useToast } from "@/hooks/use-toast";

interface PhaseQuestionListProps {
  currentPhase: PhaseTest;
  currentPhaseIndex: number;
  phaseTestLength: number;
  answers: { [key: number]: number[] };
  onAnswer: (questionIndex: number, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PhaseQuestionList = ({
  currentPhase,
  currentPhaseIndex,
  phaseTestLength,
  answers,
  onAnswer,
  onNext,
  onPrevious
}: PhaseQuestionListProps) => {
  const { toast } = useToast();
  
  const handleNext = () => {
    // Check if all questions in the current phase have been answered
    const currentPhaseAnswers = answers[currentPhaseIndex];
    if (!currentPhaseAnswers) {
      toast({
        title: "Erro ao processar respostas",
        description: "Houve um problema ao processar suas respostas. Por favor, tente novamente.",
        variant: "destructive"
      });
      return;
    }
    
    const allAnswered = currentPhaseAnswers.every(answer => answer !== 0);
    
    if (!allAnswered) {
      toast({
        title: "Responda todas as perguntas",
        description: "Por favor, responda todas as perguntas antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    onNext();
  };

  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <CardTitle>
          {currentPhase.phase} ({currentPhaseIndex + 1}/{phaseTestLength})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentPhase.questions.map((question, qIndex) => (
            <PhaseQuestion
              key={qIndex}
              question={question}
              questionIndex={qIndex}
              selectedAnswer={answers[currentPhaseIndex]?.[qIndex] || 0}
              onAnswer={onAnswer}
            />
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={currentPhaseIndex === 0}
          >
            Anterior
          </Button>
          <Button 
            type="button"
            onClick={handleNext}
          >
            {currentPhaseIndex < phaseTestLength - 1 ? "Próximo" : "Ver Resultado"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseQuestionList;
