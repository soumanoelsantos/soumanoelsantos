
import { useToast } from '@/hooks/use-toast';
import { ActionItem } from '../NewDiagnosticTestContent';
import type { ActionCategory } from '@/utils/actionGeneration/types';

export const useActionOperations = (
  actions: ActionItem[],
  setActions: (actions: ActionItem[]) => void,
  onUpdatePlan: (plan: ActionItem[]) => void
) => {
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: ActionItem['status']) => {
    const updatedActions = actions.map(action => 
      action.id === id ? { ...action, status, concluida: status === 'realizado' } : action
    );
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
  };

  const handleStepComplete = (id: string, stepIndex: number, completed: boolean) => {
    const updatedActions = actions.map(action => {
      if (action.id === id) {
        const comoFazer = action.comoFazer || [];
        const completedSteps = action.completedSteps || new Array(comoFazer.length).fill(false);
        completedSteps[stepIndex] = completed;
        
        // Only mark as completed if ALL steps are completed
        const allCompleted = completedSteps.every(step => step === true) && 
                           completedSteps.length > 0 && 
                           completedSteps.length === comoFazer.length;
        
        // Properly type the status values
        let newStatus: ActionItem['status'];
        if (allCompleted) {
          newStatus = 'realizado';
        } else if (completedSteps.some(step => step === true)) {
          newStatus = 'em_andamento';
        } else {
          newStatus = 'pendente';
        }
        
        return { 
          ...action, 
          completedSteps, 
          status: newStatus,
          concluida: allCompleted 
        };
      }
      return action;
    });
    
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
  };

  const handleDelete = (id: string) => {
    const updatedActions = actions.filter(action => action.id !== id);
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    
    toast({
      title: "Ação removida",
      description: "A ação foi removida com sucesso.",
    });
  };

  const handleAddAction = (newAction: Partial<ActionItem>) => {
    if (!newAction.acao) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha pelo menos o nome da ação.",
      });
      return false;
    }

    const actionToAdd: ActionItem = {
      id: `action_${Date.now()}`,
      acao: newAction.acao || '',
      categoria: newAction.categoria as ActionCategory || 'gestao',
      prioridade: newAction.prioridade as ActionItem['prioridade'] || 'media',
      prazo: newAction.prazo || '1 semana',
      responsavel: newAction.responsavel || 'A definir',
      recursos: newAction.recursos || 'A definir',
      metricas: newAction.metricas || 'A definir',
      beneficios: newAction.beneficios || 'A definir',
      dataVencimento: new Date(),
      concluida: false,
      detalhesImplementacao: newAction.detalhesImplementacao || '',
      dicaIA: newAction.dicaIA || 'Implemente esta ação seguindo as melhores práticas.',
      status: newAction.status as ActionItem['status'] || 'pendente',
      semana: newAction.semana || 1,
      comoFazer: newAction.comoFazer || [],
      completedSteps: []
    };

    const updatedActions = [...actions, actionToAdd];
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    
    toast({
      title: "Ação adicionada",
      description: "Nova ação foi adicionada com sucesso.",
    });

    return true;
  };

  return {
    handleStatusChange,
    handleStepComplete,
    handleDelete,
    handleAddAction
  };
};
