
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { MonthlyGoal, CreateGoalData } from '@/types/goals';
import { 
  fetchMonthlyGoals, 
  createMonthlyGoal, 
  updateMonthlyGoal, 
  deleteMonthlyGoal 
} from '@/services/monthlyGoalsService';
import { processGoalsData, validateTargetValue } from '@/utils/monthlyGoalsUtils';

export const useMonthlyGoals = (month?: number, year?: number) => {
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const fetchGoals = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const data = await fetchMonthlyGoals(userId, month, year);
      const typedGoals = processGoalsData(data);
      
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

    if (!validateTargetValue(goalData.target_value)) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "O valor da meta deve ser um número válido maior que zero",
      });
      return false;
    }

    try {
      await createMonthlyGoal(userId, goalData);

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
      await updateMonthlyGoal(goalId, updates);

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
      await deleteMonthlyGoal(goalId);

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
