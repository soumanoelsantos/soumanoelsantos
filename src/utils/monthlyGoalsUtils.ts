
import { MonthlyGoal } from '@/types/goals';

export const processGoalsData = (data: any[]): MonthlyGoal[] => {
  return data.map(goal => ({
    ...goal,
    goal_type: goal.goal_type as 'meta' | 'supermeta',
    target_type: goal.target_type as 'quantity' | 'financial',
    financial_category: goal.financial_category as 'faturamento' | 'receita' | undefined,
    currency: goal.currency as 'BRL' | 'USD' | undefined,
    // Garantir que valores numéricos sejam números
    target_value: Number(goal.target_value) || 0,
    current_value: Number(goal.current_value) || 0
  })) as MonthlyGoal[];
};

export const validateTargetValue = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};
