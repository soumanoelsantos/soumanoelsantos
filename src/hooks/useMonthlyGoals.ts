
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MonthlyGoal, CreateGoalData } from '@/types/goals';

export const useMonthlyGoals = (month: number, year: number) => {
  const { userId } = useAuth();
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadGoals = async () => {
    if (!userId) {
      console.log('🔍 [DEBUG] Usuário não autenticado, não carregando metas');
      setIsLoading(false);
      return;
    }

    console.log('🔍 [DEBUG] Buscando metas para usuário:', userId);
    console.log('🔍 [DEBUG] Mês/Ano:', { month, year });

    try {
      const { data, error } = await supabase
        .from('monthly_goals')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId)
        .eq('month', month)
        .eq('year', year)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [DEBUG] Erro ao buscar metas:', error);
        setGoals([]);
        return;
      }

      console.log('📊 [DEBUG] Dados retornados da query:', data);
      
      const processedGoals = data || [];
      console.log('✅ [DEBUG] Metas processadas:', processedGoals);
      
      setGoals(processedGoals);
    } catch (error) {
      console.error('💥 [DEBUG] Erro inesperado ao carregar metas:', error);
      setGoals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (goalData: CreateGoalData): Promise<boolean> => {
    if (!userId) return false;

    console.log('📝 [DEBUG] Criando nova meta:', goalData);

    try {
      const { error } = await supabase
        .from('monthly_goals')
        .insert({
          user_id: userId,
          ...goalData
        });

      if (error) {
        console.error('❌ [DEBUG] Erro ao criar meta:', error);
        return false;
      }

      console.log('✅ [DEBUG] Meta criada com sucesso!');
      await loadGoals(); // Recarregar as metas
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro inesperado ao criar meta:', error);
      return false;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<MonthlyGoal>): Promise<boolean> => {
    if (!userId) return false;

    console.log('📝 [DEBUG] Atualizando meta:', { goalId, updates });

    try {
      const { error } = await supabase
        .from('monthly_goals')
        .update(updates)
        .eq('id', goalId)
        .eq('user_id', userId);

      if (error) {
        console.error('❌ [DEBUG] Erro ao atualizar meta:', error);
        return false;
      }

      console.log('✅ [DEBUG] Meta atualizada com sucesso!');
      await loadGoals(); // Recarregar as metas
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro inesperado ao atualizar meta:', error);
      return false;
    }
  };

  const deleteGoal = async (goalId: string): Promise<boolean> => {
    if (!userId) return false;

    console.log('🗑️ [DEBUG] Deletando meta:', goalId);

    try {
      const { error } = await supabase
        .from('monthly_goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', userId);

      if (error) {
        console.error('❌ [DEBUG] Erro ao deletar meta:', error);
        return false;
      }

      console.log('✅ [DEBUG] Meta deletada com sucesso!');
      await loadGoals(); // Recarregar as metas
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro inesperado ao deletar meta:', error);
      return false;
    }
  };

  useEffect(() => {
    loadGoals();
  }, [userId, month, year]);

  return {
    goals,
    isLoading,
    createGoal,
    updateGoal,
    deleteGoal,
    refetch: loadGoals
  };
};

