import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useToast } from '@/hooks/use-toast';
import { ActionItem } from '../NewDiagnosticTestContent';

export const useActionPlanManager = (
  initialActionPlan: ActionItem[],
  onUpdatePlan: (plan: ActionItem[]) => void
) => {
  const { toast } = useToast();

  // Ensure all action items have the required structure and normalize legacy categories
  const normalizedActionPlan = initialActionPlan.map(action => {
    let normalizedCategory = action.categoria;
    
    // Consolidate legacy categories
    if (action.categoria === 'pre_venda') {
      normalizedCategory = 'pre-venda';
    }
    if (action.categoria === 'encantamento_cliente') {
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

  const [actions, setActions] = useState<ActionItem[]>(normalizedActionPlan);
  const [filteredActions, setFilteredActions] = useState<ActionItem[]>(normalizedActionPlan);
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);

  // Update filtered actions when filters change
  useEffect(() => {
    let filtered = actions;

    if (filterCategory !== 'todas') {
      filtered = filtered.filter(action => {
        // Handle both new and legacy category formats
        return action.categoria === filterCategory || 
               (filterCategory === 'pre-venda' && action.categoria === 'pre_venda') ||
               (filterCategory === 'encantamento-cliente' && action.categoria === 'encantamento_cliente');
      });
    }

    if (filterStatus !== 'todos') {
      filtered = filtered.filter(action => action.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(action => 
        action.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActions(filtered);
  }, [actions, filterCategory, filterStatus, searchTerm]);

  const handleDragEnd = (activeId: string, overId: string) => {
    const oldIndex = filteredActions.findIndex(item => item.id === activeId);
    const newIndex = filteredActions.findIndex(item => item.id === overId);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const reorderedActions = arrayMove(filteredActions, oldIndex, newIndex);
      setFilteredActions(reorderedActions);
      
      // Update the main actions array to maintain the new order
      const updatedActions = [...actions];
      const activeItem = actions.find(item => item.id === activeId);
      const overItem = actions.find(item => item.id === overId);
      
      if (activeItem && overItem) {
        const activeIndex = actions.findIndex(item => item.id === activeId);
        const overIndex = actions.findIndex(item => item.id === overId);
        const newActions = arrayMove(actions, activeIndex, overIndex);
        setActions(newActions);
        onUpdatePlan(newActions);
      }
      
      toast({
        title: "Ordem atualizada",
        description: "A ordem das ações foi atualizada com sucesso.",
      });
    }
  };

  const handleEdit = (action: ActionItem) => {
    setEditingAction(action);
  };

  const handleSaveEdit = () => {
    if (!editingAction) return;

    const updatedActions = actions.map(action => 
      action.id === editingAction.id ? editingAction : action
    );
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    setEditingAction(null);
    
    toast({
      title: "Ação atualizada",
      description: "A ação foi atualizada com sucesso.",
    });
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
      categoria: newAction.categoria as ActionItem['categoria'] || 'gestao',
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
    actions,
    filteredActions,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    editingAction,
    setEditingAction,
    handleDragEnd,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleStatusChange,
    handleStepComplete,
    handleAddAction
  };
};
