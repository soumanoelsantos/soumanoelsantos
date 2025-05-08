
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { loadCrmColumns, saveCrmColumns } from '@/utils/storage';
import { LEAD_STATUSES } from '@/constants/crmConstants';

export interface CrmColumn {
  id: string;
  name: string;
  order: number;
}

export const useCrmColumns = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [columns, setColumns] = useState<CrmColumn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load columns from database or use defaults
  useEffect(() => {
    const loadColumns = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const savedColumns = await loadCrmColumns(userId);
        
        if (savedColumns && savedColumns.length > 0) {
          setColumns(savedColumns);
        } else {
          // Use default columns if none are saved
          const defaultColumns = LEAD_STATUSES.map((status, index) => ({
            id: status.toLowerCase().replace(/\s+/g, '-'),
            name: status,
            order: index
          }));
          setColumns(defaultColumns);
        }
      } catch (error) {
        console.error('Error loading CRM columns:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadColumns();
  }, [userId]);
  
  const saveColumns = async (newColumns: CrmColumn[]) => {
    if (!userId) return false;
    
    try {
      const result = await saveCrmColumns(userId, newColumns);
      
      if (result.success) {
        setColumns(newColumns);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error saving CRM columns:', error);
      return false;
    }
  };
  
  const addColumn = async (name: string) => {
    const newColumn: CrmColumn = {
      id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name,
      order: columns.length
    };
    
    const newColumns = [...columns, newColumn];
    const success = await saveColumns(newColumns);
    
    if (success) {
      toast({
        title: 'Coluna adicionada',
        description: `A coluna "${name}" foi adicionada com sucesso.`
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar coluna',
        description: 'Não foi possível adicionar a coluna.'
      });
    }
    
    return success;
  };
  
  const editColumn = async (id: string, newName: string) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    
    if (columnIndex === -1) return false;
    
    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      name: newName
    };
    
    const success = await saveColumns(newColumns);
    
    if (success) {
      toast({
        title: 'Coluna atualizada',
        description: `A coluna foi renomeada para "${newName}" com sucesso.`
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao renomear coluna',
        description: 'Não foi possível renomear a coluna.'
      });
    }
    
    return success;
  };
  
  const deleteColumn = async (id: string) => {
    const columnToDelete = columns.find(col => col.id === id);
    
    if (!columnToDelete) return false;
    
    const newColumns = columns.filter(col => col.id !== id);
    
    // Reorder remaining columns
    const reorderedColumns = newColumns.map((col, index) => ({
      ...col,
      order: index
    }));
    
    const success = await saveColumns(reorderedColumns);
    
    if (success) {
      toast({
        title: 'Coluna removida',
        description: `A coluna "${columnToDelete.name}" foi removida com sucesso.`
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao remover coluna',
        description: 'Não foi possível remover a coluna.'
      });
    }
    
    return success;
  };
  
  return {
    columns,
    isLoading,
    addColumn,
    editColumn,
    deleteColumn
  };
};
