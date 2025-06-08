
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Lightbulb, ListChecks } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionItemExpandedContentProps {
  action: ActionItem;
  onStepComplete: (actionId: string, stepIndex: number, completed: boolean) => void;
}

const ActionItemExpandedContent = ({ action, onStepComplete }: ActionItemExpandedContentProps) => {
  const handleStepToggle = (stepIndex: number, completed: boolean) => {
    onStepComplete(action.id, stepIndex, completed);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      {/* Metrics and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Métricas Esperadas</h5>
          <p className="text-sm text-gray-600">{action.metricas}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Benefícios</h5>
          <p className="text-sm text-gray-600">{action.beneficios}</p>
        </div>
      </div>

      {/* AI Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Dica da IA</h5>
            <p className="text-sm text-blue-800">{action.dicaIA}</p>
          </div>
        </div>
      </div>

      {/* How to Do Steps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="h-4 w-4 text-gray-700" />
          <h5 className="font-medium text-gray-900">Como Fazer na Prática</h5>
        </div>
        <div className="space-y-2">
          {action.comoFazer?.map((step, stepIndex) => (
            <div key={stepIndex} className="flex items-start gap-2">
              <Checkbox
                checked={action.completedSteps?.[stepIndex] || false}
                onCheckedChange={(checked) => handleStepToggle(stepIndex, !!checked)}
                className="mt-0.5"
              />
              <span className={`text-sm ${action.completedSteps?.[stepIndex] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h5 className="font-medium text-gray-900 mb-2">Recursos Necessários</h5>
        <p className="text-sm text-gray-600">{action.recursos}</p>
      </div>

      {/* Implementation Details */}
      <div>
        <h5 className="font-medium text-gray-900 mb-2">Detalhes da Implementação</h5>
        <p className="text-sm text-gray-600">{action.detalhesImplementacao}</p>
      </div>
    </div>
  );
};

export default ActionItemExpandedContent;
