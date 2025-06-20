
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { MonthlyGoal, CreateGoalData } from '@/types/goals';

export const useMonthlyGoals = (month?: number, year?: number) => {
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const fetchGoals = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      console.log('🔍 [DEBUG] Buscando metas para usuário:', userId);
      
      let query = supabase
        .from('monthly_goals')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId);

      // Se month e year foram fornecidos, buscar metas do período específico
      // E TAMBÉM metas atemporais de produtos (que não foram concluídas)
      if (month && year) {
        query = query.or(`and(month.eq.${month},year.eq.${year}),and(product_id.not.is.null,current_value.lt.target_value)`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [DEBUG] Erro na query:', error);
        throw error;
      }
      
      console.log('📊 [DEBUG] Dados retornados da query:', data);
      
      // Properly type the data with the new columns
      const typedGoals = (data || []).map(goal => ({
        ...goal,
        goal_type: goal.goal_type as 'meta' | 'supermeta',
        target_type: goal.target_type as 'quantity' | 'financial',
        financial_category: goal.financial_category as 'faturamento' | 'receita' | undefined,
        currency: goal.currency as 'BRL' | 'USD' | undefined,
        // Garantir que valores numéricos sejam números
        target_value: Number(goal.target_value) || 0,
        current_value: Number(goal.current_value) || 0
      })) as MonthlyGoal[];
      
      console.log('✅ [DEBUG] Metas processadas:', typedGoals);
      setGoals(typedGoals);
    } catch (error: any) {
      console.error('❌ [DEBUG] Erro ao carregar metas:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar metas",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (goalData: CreateGoalData) => {
    if (!userId) {
      console.log('❌ [DEBUG] Sem userId para criar meta');
      return false;
    }

    try {
      console.log('📤 [DEBUG] Dados para inserção:', {
        ...goalData,
        user_id: userId,
      });

      // Garantir que target_value seja um número válido
      const targetValue = Number(goalData.target_value);
      if (isNaN(targetValue) || targetValue <= 0) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "O valor da meta deve ser um número válido maior que zero",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('monthly_goals')
        .insert({
          user_id: userId,
          month: goalData.month,
          year: goalData.year,
          product_id: goalData.product_id || null,
          goal_type: goalData.goal_type,
          target_type: goalData.target_type,
          financial_category: goalData.financial_category || null,
          currency: goalData.currency || null,
          target_value: targetValue,
          current_value: 0,
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [DEBUG] Erro detalhado na inserção:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Meta criada com sucesso:', data);

      toast({
        title: "Meta criada",
        description: goalData.product_id 
          ? "Meta atemporal de produto criada com sucesso!" 
          : "Meta criada com sucesso!",
      });

      fetchGoals();
      return true;
    } catch (error: any) {
      console.error('💥 [DEBUG] Erro completo ao criar meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar meta",
        description: error.message || 'Erro desconhecido ao criar meta',
      });
      return false;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<MonthlyGoal>) => {
    try {
      // Garantir que valores numéricos sejam tratados corretamente
      const cleanUpdates = { ...updates };
      if (cleanUpdates.target_value !== undefined) {
        cleanUpdates.target_value = Number(cleanUpdates.target_value);
      }
      if (cleanUpdates.current_value !== undefined) {
        cleanUpdates.current_value = Number(cleanUpdates.current_value);
      }

      const { error } = await supabase
        .from('monthly_goals')
        .update(cleanUpdates)
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Meta atualizada",
        description: "Meta atualizada com sucesso!",
      });

      fetchGoals();
      return true;
    } catch (error: any) {
      console.error('❌ [DEBUG] Erro ao atualizar meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar meta",
        description: error.message,
      });
      return false;
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('monthly_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Meta removida",
        description: "Meta removida com sucesso!",
      });

      fetchGoals();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao remover meta",
        description: error.message,
      });
      return false;
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [userId, month, year]);

  return {
    goals,
    isLoading,
    createGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals,
  };
};
