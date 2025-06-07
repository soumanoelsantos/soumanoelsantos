
import React from 'react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionPlanPdfContentProps {
  companyName: string;
  actions: ActionItem[];
}

const ActionPlanPdfContent = ({ companyName, actions }: ActionPlanPdfContentProps) => {
  const totalActions = actions.length;
  const completedActions = actions.filter(a => a.status === 'realizado').length;
  const inProgressActions = actions.filter(a => a.status === 'em_andamento').length;
  const completionPercentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  return (
    <div className="action-plan-section p-8 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plano de Aceleração Empresarial</h1>
        <h2 className="text-xl text-gray-600">{companyName}</h2>
        <p className="text-gray-500 mt-2">{totalActions} ações estratégicas para acelerar seu negócio</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Resumo do Progresso</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalActions}</div>
            <div className="text-sm text-gray-600">Total de Ações</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedActions}</div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{inProgressActions}</div>
            <div className="text-sm text-gray-600">Em Andamento</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">Progresso</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {actions.map((action, index) => (
          <div key={action.id} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900">
                {index + 1}. {action.acao}
              </h4>
              <div className="flex space-x-2 mt-2">
                <span className="badge text-xs px-2 py-1 rounded">{action.categoria}</span>
                <span className="badge text-xs px-2 py-1 rounded">{action.prioridade}</span>
                <span className="badge text-xs px-2 py-1 rounded">{action.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <strong>Prazo:</strong> {action.prazo}
              </div>
              <div>
                <strong>Responsável:</strong> {action.responsavel}
              </div>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm">Métricas de Sucesso:</h5>
              <p className="text-xs text-gray-600">{action.metricas}</p>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-sm">Como Fazer na Prática:</h5>
              <ul className="list-decimal list-inside text-xs space-y-1 mt-1">
                {(action.comoFazer || []).map((step, stepIndex) => (
                  <li key={stepIndex} className="text-gray-700">{step}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-2 rounded text-xs">
              <strong>💡 Dica da IA:</strong> {action.dicaIA}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionPlanPdfContent;
