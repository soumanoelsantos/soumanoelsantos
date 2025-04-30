
import React from "react";
import { Button } from "@/components/ui/button";

interface PhaseQuestionProps {
  question: string;
  questionIndex: number;
  selectedAnswer: number;
  onAnswer: (questionIndex: number, value: number) => void;
}

const PhaseQuestion = ({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onAnswer 
}: PhaseQuestionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="mb-3 font-medium text-gray-700">{question}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          variant={selectedAnswer === 1 ? "default" : "outline"}
          onClick={() => onAnswer(questionIndex, 1)}
          className={selectedAnswer === 1 ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Sim
        </Button>
        <Button
          type="button"
          variant={selectedAnswer === 2 ? "default" : "outline"}
          onClick={() => onAnswer(questionIndex, 2)}
          className={selectedAnswer === 2 ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Não
        </Button>
      </div>
    </div>
  );
};

export default PhaseQuestion;
