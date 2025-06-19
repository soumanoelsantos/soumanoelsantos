
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PreSalesGoal, CreatePreSalesGoalData } from '@/types/preSalesGoals';
import { useToast } from '@/components/ui/use-toast';

export const usePreSalesGoals = (month?: number, year?: number) => {
  const { toast } = useToast();
  const [preSalesGoals, setPreSalesGoals] = useState<PreSalesGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPreSalesGoals = async () => {
    try {
      let query = supabase
        .from('pre_sales_goals')
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `)
        .order('created_at', { ascending: false });

      if (month && year) {
        query = query.eq('month', month).eq('year', year);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPreSalesGoals((data || []) as PreSalesGoal[]);
    } catch (error) {
      console.error('Erro ao carregar metas de pré-vendas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as metas de pré-vendas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPreSalesGoal = async (goalData: CreatePreSalesGoalData) => {
    try {
      const { data, error } = await supabase
        .from('pre_sales_goals')
        .insert({
          ...goalData,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `)
        .single();

      if (error) throw error;

      setPreSalesGoals(prev => [data as PreSalesGoal, ...prev]);
      toast({
        title: "Sucesso",
        description: "Meta de pré-vendas criada com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar meta de pré-vendas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a meta de pré-vendas",
        variant: "destructive",
      });
      return false;
    }
  };

  const updatePreSalesGoal = async (goalId: string, data: Partial<PreSalesGoal>) => {
    try {
      const { data: updatedGoal, error } = await supabase
        .from('pre_sales_goals')
        .update(data)
        .eq('id', goalId)
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `)
        .single();

      if (error) throw error;

      setPreSalesGoals(prev => prev.map(g => g.id === goalId ? updatedGoal as PreSalesGoal : g));
      toast({
        title: "Sucesso",
        description: "Meta de pré-vendas atualizada com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar meta de pré-vendas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a meta de pré-vendas",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePreSalesGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('pre_sales_goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;

      setPreSalesGoals(prev => prev.filter(g => g.id !== goalId));
      toast({
        title: "Sucesso",
        description: "Meta de pré-vendas removida com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover meta de pré-vendas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a meta de pré-vendas",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPreSalesGoals();
  }, [month, year]);

  return {
    preSalesGoals,
    isLoading,
    createPreSalesGoal,
    updatePreSalesGoal,
    deletePreSalesGoal,
    refetch: fetchPreSalesGoals,
  };
};
