import { useState } from 'react';
import { ActionItem } from '../NewDiagnosticTestContent';
import { useActionNormalization } from './useActionNormalization';
import { useActionFiltering } from './useActionFiltering';
import { useActionOperations } from './useActionOperations';
import { useActionEditing } from './useActionEditing';
import { useActionDragAndDrop } from './useActionDragAndDrop';

export const useActionPlanManager = (
  initialActionPlan: ActionItem[],
  onUpdatePlan: (plan: ActionItem[]) => void
) => {
  const normalizedActionPlan = useActionNormalization(initialActionPlan);
  const [actions, setActions] = useState<ActionItem[]>(normalizedActionPlan);

  const {
    filteredActions,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm
  } = useActionFiltering(actions);

  const {
    handleStatusChange,
    handleStepComplete,
    handleDelete,
    handleAddAction
  } = useActionOperations(actions, setActions, onUpdatePlan);

  const {
    editingAction,
    setEditingAction,
    handleEdit,
    handleSaveEdit
  } = useActionEditing(actions, setActions, onUpdatePlan);

  const { handleDragEnd } = useActionDragAndDrop(
    actions,
    filteredActions,
    // We need to expose setFilteredActions from useActionFiltering, but for now we'll handle this internally
    () => {}, // placeholder
    setActions,
    onUpdatePlan
  );

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
