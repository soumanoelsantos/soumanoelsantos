
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ActionCalendar, CreateActionData, ActionFilters } from '@/types/actionCalendar';
import { toast } from 'sonner';
import { isOverdueBrazilian } from '@/utils/brazilianDateUtils';

export const useActionCalendar = () => {
  const [actions, setActions] = useState<ActionCalendar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  const fetchActions = async (filters?: ActionFilters) => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('action_calendar')
        .select('*')
        .eq('user_id', userId);

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.department && filters.department !== 'all') {
        query = query.eq('department', filters.department);
      }
      
      if (filters?.responsible_person && filters.responsible_person !== 'all') {
        query = query.eq('responsible_person', filters.responsible_person);
      }
      
      if (filters?.date_range) {
        query = query
          .gte('due_date', filters.date_range.start)
          .lte('due_date', filters.date_range.end);
      }

      // Order by due_date chronologically
      query = query.order('due_date', { ascending: true });

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform data to match our ActionCalendar type
      const transformedActions: ActionCalendar[] = (data || []).map(action => {
        let status = action.status as ActionCalendar['status'];
        
        // Update status based on due date if not completed (usando fuso brasileiro)
        if (status !== 'concluida' && isOverdueBrazilian(action.due_date)) {
          status = 'atrasada';
        }
        
        return {
          ...action,
          status
        } as ActionCalendar;
      });
      
      setActions(transformedActions);
    } catch (error) {
      console.error('Erro ao buscar ações:', error);
      toast.error('Erro ao carregar ações');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, [userId]);

  const createAction = async (data: CreateActionData) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: newAction, error } = await supabase
        .from('action_calendar')
        .insert({
          ...data,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      const transformedAction: ActionCalendar = {
        ...newAction,
        status: newAction.status as ActionCalendar['status']
      };

      setActions(prev => [transformedAction, ...prev].sort((a, b) => 
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      ));
      
      toast.success('Ação criada com sucesso!');
      return transformedAction;
    } catch (error) {
      console.error('Erro ao criar ação:', error);
      toast.error('Erro ao criar ação');
      throw error;
    }
  };

  const updateAction = async (id: string, data: Partial<CreateActionData>) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: updatedAction, error } = await supabase
        .from('action_calendar')
        .update(data)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      const transformedAction: ActionCalendar = {
        ...updatedAction,
        status: updatedAction.status as ActionCalendar['status']
      };

      setActions(prev => prev.map(action => 
        action.id === id ? transformedAction : action
      ).sort((a, b) => 
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      ));
      
      toast.success('Ação atualizada com sucesso!');
      return transformedAction;
    } catch (error) {
      console.error('Erro ao atualizar ação:', error);
      toast.error('Erro ao atualizar ação');
      throw error;
    }
  };

  const deleteAction = async (id: string) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { error } = await supabase
        .from('action_calendar')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      setActions(prev => prev.filter(action => action.id !== id));
      toast.success('Ação excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir ação:', error);
      toast.error('Erro ao excluir ação');
      throw error;
    }
  };

  const toggleActionPublic = async (id: string, isPublic: boolean) => {
    return updateAction(id, { is_public: isPublic });
  };

  return {
    actions,
    isLoading,
    createAction,
    updateAction,
    deleteAction,
    toggleActionPublic,
    refetch: fetchActions,
  };
};
