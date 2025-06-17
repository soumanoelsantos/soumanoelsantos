
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ActionItem } from '../NewDiagnosticTestContent';

export const useActionEditing = (
  actions: ActionItem[],
  setActions: (actions: ActionItem[]) => void,
  onUpdatePlan: (plan: ActionItem[]) => void
) => {
  const { toast } = useToast();
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);

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

  return {
    editingAction,
    setEditingAction,
    handleEdit,
    handleSaveEdit
  };
};
