
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
      let query = supabase
        .from('monthly_goals')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId);

      if (month && year) {
        query = query.eq('month', month).eq('year', year);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion para garantir que os tipos estão corretos
      const typedGoals = (data || []).map(goal => ({
        ...goal,
        goal_type: goal.goal_type as 'meta' | 'supermeta',
        target_type: goal.target_type as 'quantity' | 'financial'
      })) as MonthlyGoal[];
      
      setGoals(typedGoals);
    } catch (error: any) {
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
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('monthly_goals')
        .insert({
          ...goalData,
          user_id: userId,
        });

      if (error) throw error;

      toast({
        title: "Meta criada",
        description: "Meta criada com sucesso!",
      });

      fetchGoals();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar meta",
        description: error.message,
      });
      return false;
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<MonthlyGoal>) => {
    try {
      const { error } = await supabase
        .from('monthly_goals')
        .update(updates)
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Meta atualizada",
        description: "Meta atualizada com sucesso!",
      });

      fetchGoals();
      return true;
    } catch (error: any) {
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
