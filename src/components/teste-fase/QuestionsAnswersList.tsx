
import React from "react";
import { PhaseAnswer } from "../../types/phaseTest";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionsAnswersListProps {
  answers: PhaseAnswer[];
}

const QuestionsAnswersList = ({ answers }: QuestionsAnswersListProps) => {
  if (!answers || answers.length === 0) return null;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-3">Respostas do diagnóstico</h3>
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <div key={index} className="flex gap-2 items-start">
            {answer.value === 1 ? (
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            )}
            <span className="text-gray-700">{answer.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAnswersList;
