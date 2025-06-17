
import { useState, useEffect } from 'react';
import { ActionItem } from '../NewDiagnosticTestContent';

export const useActionFiltering = (actions: ActionItem[]) => {
  const [filteredActions, setFilteredActions] = useState<ActionItem[]>(actions);
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered actions when filters change
  useEffect(() => {
    let filtered = actions;

    if (filterCategory !== 'todas') {
      filtered = filtered.filter(action => {
        // Handle both new and legacy category formats using string comparison
        return action.categoria === filterCategory || 
               (filterCategory === 'pre-venda' && (action.categoria as string) === 'pre_venda') ||
               (filterCategory === 'encantamento-cliente' && (action.categoria as string) === 'encantamento_cliente');
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

  return {
    filteredActions,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm
  };
};
