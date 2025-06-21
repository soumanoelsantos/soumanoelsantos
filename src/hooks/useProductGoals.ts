import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ProductGoal {
  id: string;
  user_id: string;
  product_id: string;
  quantity_goal: number;
  revenue_goal: number;
  billing_goal: number;
  currency: 'BRL' | 'USD';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Dados do produto relacionado
  product?: {
    id: string;
    name: string;
  };
}

export interface CreateProductGoalData {
  product_id: string;
  quantity_goal: number;
  revenue_goal: number;
  billing_goal: number;
  currency: 'BRL' | 'USD';
}

export const useProductGoals = () => {
  const [productGoals, setProductGoals] = useState<ProductGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const fetchProductGoals = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_goals')
        .select(`
          *,
          product:products (
            id,
            name
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Garantir que a propriedade currency seja do tipo correto
      const typedData = (data || []).map(item => ({
        ...item,
        currency: (item.currency === 'USD' ? 'USD' : 'BRL') as 'BRL' | 'USD'
      }));

      setProductGoals(typedData);
    } catch (error: any) {
      console.error('Erro ao carregar metas de produtos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar metas",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProductGoal = async (goalData: CreateProductGoalData) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('product_goals')
        .insert({
          ...goalData,
          user_id: userId,
        });

      if (error) throw error;

      toast({
        title: "Meta criada",
        description: "Meta do produto criada com sucesso!",
      });

      fetchProductGoals();
      return true;
    } catch (error: any) {
      console.error('Erro ao criar meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar meta",
        description: error.message,
      });
      return false;
    }
  };

  const updateProductGoal = async (goalId: string, goalData: Partial<CreateProductGoalData>) => {
    try {
      const { error } = await supabase
        .from('product_goals')
        .update(goalData)
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Meta atualizada",
        description: "Meta do produto atualizada com sucesso!",
      });

      fetchProductGoals();
      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar meta",
        description: error.message,
      });
      return false;
    }
  };

  const deleteProductGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('product_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Meta removida",
        description: "Meta do produto removida com sucesso!",
      });

      fetchProductGoals();
      return true;
    } catch (error: any) {
      console.error('Erro ao remover meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao remover meta",
        description: error.message,
      });
      return false;
    }
  };

  const toggleGoalStatus = async (goalId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('product_goals')
        .update({ is_active: isActive })
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: isActive ? "Meta ativada" : "Meta desativada",
        description: `Meta do produto ${isActive ? 'ativada' : 'desativada'} com sucesso!`,
      });

      fetchProductGoals();
      return true;
    } catch (error: any) {
      console.error('Erro ao alterar status da meta:', error);
      toast({
        variant: "destructive",
        title: "Erro ao alterar status",
        description: error.message,
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProductGoals();
  }, [userId]);

  return {
    productGoals,
    isLoading,
    createProductGoal,
    updateProductGoal,
    deleteProductGoal,
    toggleGoalStatus,
    refetch: fetchProductGoals,
  };
};
