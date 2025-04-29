
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActionPlanCardProps {
  actionPlan: {
    [key: string]: string[];
  };
}

const ActionPlanCard = ({ actionPlan }: ActionPlanCardProps) => {
  return (
    <Card className="bg-dark-primary/5 border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle className="text-xl text-center">Plano de Ação</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {Object.entries(actionPlan).map(([key, actions]) => (
            <div key={key} className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-semibold mb-2">
                {key === 'processos' ? 'PROCESSOS' : 
                 key === 'resultados' ? 'RESULTADOS' : 
                 key === 'sistemaGestao' ? 'SISTEMA DE GESTÃO' : 'PESSOAS'}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {Array.isArray(actions) && actions.map((action, index) => (
                  <li key={index} className="text-white">{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPlanCard;
