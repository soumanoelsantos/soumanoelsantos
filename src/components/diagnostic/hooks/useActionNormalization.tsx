
import { ActionItem } from '../NewDiagnosticTestContent';
import type { ActionCategory } from '@/utils/actionGeneration/types';

export const useActionNormalization = (initialActionPlan: ActionItem[]) => {
  // Ensure all action items have the required structure and normalize legacy categories
  const normalizedActionPlan = initialActionPlan.map(action => {
    let normalizedCategory: ActionCategory = action.categoria;
    
    // Consolidate legacy categories using string comparison
    if ((action.categoria as string) === 'pre_venda') {
      normalizedCategory = 'pre-venda';
    }
    if ((action.categoria as string) === 'encantamento_cliente') {
      normalizedCategory = 'encantamento-cliente';
    }
    
    return {
      ...action,
      categoria: normalizedCategory,
      comoFazer: action.comoFazer || ['Definir plano de implementação', 'Executar plano', 'Monitorar resultados'],
      completedSteps: action.completedSteps || [],
      prioridade: action.prioridade || 'media',
      status: action.status || 'pendente',
      responsavel: action.responsavel || 'A definir',
      prazo: action.prazo || '1 semana',
      metricas: action.metricas || 'A definir',
      beneficios: action.beneficios || 'A definir',
      detalhesImplementacao: action.detalhesImplementacao || '',
      dicaIA: action.dicaIA || 'Implemente esta ação seguindo as melhores práticas.',
      semana: action.semana || 1,
      dataVencimento: action.dataVencimento ? new Date(action.dataVencimento) : new Date(),
      concluida: action.concluida || false
    };
  });

  return normalizedActionPlan;
};
