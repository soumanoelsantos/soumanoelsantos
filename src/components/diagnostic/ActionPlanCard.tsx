
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnswersDataType } from '@/types/diagnostic';

interface ActionPlanCardProps {
  actionPlan: {
    [key: string]: string[];
  };
  answersData?: AnswersDataType;
}

const ActionPlanCard = ({ actionPlan, answersData }: ActionPlanCardProps) => {
  // Function to get appropriate color class for answer
  const getAnswerColorClass = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return 'answer-satisfactory';
      case 'unsatisfactory':
        return 'answer-unsatisfactory';
      case 'nonexistent':
        return 'answer-nonexistent';
      default:
        return '';
    }
  };

  // Function to get human-readable answer text
  const getAnswerText = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return 'Existe e é satisfatório';
      case 'unsatisfactory':
        return 'Existe, mas não é satisfatório';
      case 'nonexistent':
        return 'Não existe';
      default:
        return answer;
    }
  };

  return (
    <Card className="bg-white border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] text-white card-header">
        <CardTitle className="text-xl text-center text-white">Plano de Ação</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {Object.entries(actionPlan).map(([key, actions]) => (
            <div key={key} className="border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold mb-2 pdf-header text-gray-800">
                {key === 'processos' ? 'PROCESSOS' : 
                 key === 'resultados' ? 'RESULTADOS' : 
                 key === 'sistemaGestao' ? 'SISTEMA DE GESTÃO' : 'PESSOAS'}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {Array.isArray(actions) && actions.map((action, index) => (
                  <li key={index} className="text-gray-800">{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {answersData && (
          <div className="mt-8 answers-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Respostas do Diagnóstico</h2>
            {Object.entries(answersData).map(([sectionKey, section]) => (
              <div key={sectionKey} className="mb-8 border-b border-gray-300 pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.answers.map((item, index) => (
                    <li key={index} className="text-gray-800">
                      <span className="question-text">Pergunta: </span> 
                      {item.question}
                      <br />
                      <span className="question-text">Resposta: </span> 
                      <span className={getAnswerColorClass(item.answer)}>
                        {getAnswerText(item.answer)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionPlanCard;
