
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { AnswersDataType } from '@/types/diagnostic';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

interface AnswersDisplayProps {
  answersData: AnswersDataType;
}

const AnswersDisplay = ({ answersData }: AnswersDisplayProps) => {
  if (!answersData || Object.keys(answersData).length === 0) {
    return null;
  }

  // Map the answer value to a human-readable label and icon
  const getAnswerIcon = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />;
      case 'unsatisfactory':
        return <XCircle className="h-5 w-5 text-red-500 shrink-0" />;
      case 'partial':
        return <MinusCircle className="h-5 w-5 text-yellow-500 shrink-0" />;
      default:
        return null;
    }
  };

  const getAnswerLabel = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return 'Satisfatório';
      case 'unsatisfactory':
        return 'Insatisfatório';
      case 'partial':
        return 'Parcial';
      default:
        return 'Não respondido';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Suas Respostas</h3>
        <p className="text-sm text-gray-600">Veja abaixo todas as perguntas e respostas do diagnóstico</p>
      </div>
      
      <Accordion type="multiple" className="px-4 py-2">
        {Object.entries(answersData).map(([sectionKey, sectionData]) => (
          <AccordionItem value={sectionKey} key={sectionKey}>
            <AccordionTrigger className="text-left font-medium">
              {sectionData.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-1">
                {sectionData.answers?.map((answer, index) => (
                  <div key={index} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="mt-0.5">
                      {getAnswerIcon(answer.answer)}
                    </div>
                    <div>
                      <p className="text-gray-700">{answer.question}</p>
                      <p className="text-sm text-gray-500">{getAnswerLabel(answer.answer)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AnswersDisplay;
