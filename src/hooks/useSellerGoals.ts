
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SellerMonthlyGoal } from '@/types/sellers';
import { useToast } from '@/components/ui/use-toast';

export const useSellerGoals = (sellerId?: string) => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<SellerMonthlyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoals = async () => {
    if (!sellerId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('seller_monthly_goals')
        .select('*')
        .eq('seller_id', sellerId)
        .order('year', { ascending: false })
        .order('month', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as metas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addGoal = async (goalData: {
    seller_id: string;
    month: number;
    year: number;
    sales_goal: number;
    revenue_goal: number;
    billing_goal: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('seller_monthly_goals')
        .upsert(goalData)
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => {
        const existing = prev.find(g => g.month === goalData.month && g.year === goalData.year);
        if (existing) {
          return prev.map(g => g.id === existing.id ? data : g);
        } else {
          return [...prev, data];
        }
      });

      toast({
        title: "Sucesso",
        description: "Meta salva com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a meta",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateGoal = async (goalId: string, data: Partial<SellerMonthlyGoal>) => {
    try {
      const { data: updatedGoal, error } = await supabase
        .from('seller_monthly_goals')
        .update(data)
        .eq('id', goalId)
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => prev.map(g => g.id === goalId ? updatedGoal : g));
      
      toast({
        title: "Sucesso",
        description: "Meta atualizada com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a meta",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('seller_monthly_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;

      setGoals(prev => prev.filter(g => g.id !== goalId));
      toast({
        title: "Sucesso",
        description: "Meta removida com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a meta",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [sellerId]);

  return {
    goals,
    isLoading,
    addGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals,
  };
};
