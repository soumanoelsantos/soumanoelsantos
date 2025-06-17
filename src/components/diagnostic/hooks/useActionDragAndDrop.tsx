
import { arrayMove } from '@dnd-kit/sortable';
import { useToast } from '@/hooks/use-toast';
import { ActionItem } from '../NewDiagnosticTestContent';

export const useActionDragAndDrop = (
  actions: ActionItem[],
  filteredActions: ActionItem[],
  setFilteredActions: (actions: ActionItem[]) => void,
  setActions: (actions: ActionItem[]) => void,
  onUpdatePlan: (plan: ActionItem[]) => void
) => {
  const { toast } = useToast();

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

  return {
    handleDragEnd
  };
};
