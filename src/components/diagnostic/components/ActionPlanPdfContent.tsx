
import React from 'react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionPlanPdfContentProps {
  companyName: string;
  actions: ActionItem[];
}

const ActionPlanPdfContent = ({ companyName, actions }: ActionPlanPdfContentProps) => {
  const groupedActions = actions.reduce((acc, action) => {
    if (!acc[action.categoria]) {
      acc[action.categoria] = [];
    }
    acc[action.categoria].push(action);
    return acc;
  }, {} as Record<string, ActionItem[]>);

  const categoryNames = {
    comercial: 'Comercial',
    marketing: 'Marketing',
    gestao: 'Gestão',
    financeiro: 'Financeiro',
    rh: 'Recursos Humanos',
    operacional: 'Operacional',
    tecnologia: 'Tecnologia',
    cultura: 'Cultura Organizacional'
  };

  const priorityColors = {
    alta: '#ef4444',
    media: '#f59e0b',
    baixa: '#10b981'
  };

  const statusNames = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    realizado: 'Realizado',
    atrasado: 'Atrasado'
  };

  return (
    <div className="pdf-export bg-white text-black p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-black mb-2">
          Plano de Aceleração Empresarial
        </h1>
        <h2 className="text-xl text-gray-700 mb-4">{companyName}</h2>
        <div className="text-sm text-gray-600">
          <p>Total de ações: {actions.length}</p>
          <p>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-black mb-4">Resumo Executivo</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border p-3 rounded">
            <p className="font-semibold text-black">Total de Ações</p>
            <p className="text-2xl font-bold text-black">{actions.length}</p>
          </div>
          <div className="border p-3 rounded">
            <p className="font-semibold text-black">Categorias</p>
            <p className="text-2xl font-bold text-black">{Object.keys(groupedActions).length}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-black mb-2">Distribuição por Categoria</h4>
          {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
            <div key={categoria} className="flex justify-between py-1 border-b">
              <span className="text-black">{categoryNames[categoria as keyof typeof categoryNames]}</span>
              <span className="font-semibold text-black">{categoryActions.length} ações</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions by Category */}
      {Object.entries(groupedActions).map(([categoria, categoryActions]) => (
        <div key={categoria} className="mb-8 page-break-inside-avoid">
          <h3 className="text-xl font-bold text-black mb-4 border-b pb-2">
            {categoryNames[categoria as keyof typeof categoryNames]}
          </h3>
          
          <div className="space-y-4">
            {categoryActions.slice(0, 20).map((action, index) => (
              <div key={action.id} className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-black text-sm flex-1 mr-4">
                    {index + 1}. {action.acao}
                  </h4>
                  <div className="flex gap-2">
                    <span 
                      className="px-2 py-1 rounded text-xs text-white font-medium"
                      style={{ backgroundColor: priorityColors[action.prioridade] }}
                    >
                      {action.prioridade.charAt(0).toUpperCase() + action.prioridade.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-black mb-3">
                  <div>
                    <strong className="text-black">Responsável:</strong> {action.responsavel}
                  </div>
                  <div>
                    <strong className="text-black">Prazo:</strong> {action.prazo}
                  </div>
                  <div>
                    <strong className="text-black">Status:</strong> {statusNames[action.status]}
                  </div>
                  <div>
                    <strong className="text-black">Recursos:</strong> {action.recursos}
                  </div>
                </div>

                <div className="mb-3">
                  <strong className="text-black text-xs">Benefícios:</strong>
                  <p className="text-xs text-black mt-1">{action.beneficios}</p>
                </div>

                <div className="mb-3">
                  <strong className="text-black text-xs">Métricas:</strong>
                  <p className="text-xs text-black mt-1">{action.metricas}</p>
                </div>

                {action.comoFazer && action.comoFazer.length > 0 && (
                  <div className="mb-3">
                    <strong className="text-black text-xs">Como fazer na prática:</strong>
                    <ol className="list-decimal list-inside text-xs text-black mt-1 space-y-1">
                      {action.comoFazer.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-black">{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {action.dicaIA && (
                  <div className="bg-blue-50 p-2 rounded">
                    <strong className="text-black text-xs">💡 Dica da IA:</strong>
                    <p className="text-xs text-black mt-1">{action.dicaIA}</p>
                  </div>
                )}
              </div>
            ))}
            
            {categoryActions.length > 20 && (
              <div className="text-center py-4 border-t">
                <p className="text-sm text-gray-600">
                  E mais {categoryActions.length - 20} ações nesta categoria...
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center mt-12 pt-6 border-t">
        <p className="text-sm text-gray-600">
          Plano gerado em {new Date().toLocaleDateString('pt-BR')} - {companyName}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Este plano foi criado especificamente para acelerar o crescimento da sua empresa
        </p>
      </div>
    </div>
  );
};

export default ActionPlanPdfContent;
