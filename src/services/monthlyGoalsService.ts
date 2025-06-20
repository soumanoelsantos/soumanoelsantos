
import { supabase } from '@/integrations/supabase/client';
import { CreateGoalData, MonthlyGoal } from '@/types/goals';

export const fetchMonthlyGoals = async (userId: string, month?: number, year?: number) => {
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
  return data || [];
};

export const createMonthlyGoal = async (userId: string, goalData: CreateGoalData) => {
  console.log('📤 [DEBUG] Dados para inserção:', {
    ...goalData,
    user_id: userId,
  });

  // Garantir que target_value seja um número válido
  const targetValue = Number(goalData.target_value);
  if (isNaN(targetValue) || targetValue <= 0) {
    throw new Error("O valor da meta deve ser um número válido maior que zero");
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
  return data;
};

export const updateMonthlyGoal = async (goalId: string, updates: Partial<MonthlyGoal>) => {
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

  if (error) {
    console.error('❌ [DEBUG] Erro ao atualizar meta:', error);
    throw error;
  }

  return true;
};

export const deleteMonthlyGoal = async (goalId: string) => {
  const { error } = await supabase
    .from('monthly_goals')
    .delete()
    .eq('id', goalId);

  if (error) throw error;
  return true;
};
