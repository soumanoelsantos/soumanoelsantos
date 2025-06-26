
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
      console.log('🔍 Buscando metas de pré-vendas...');
      
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
        console.log('🔍 Filtrando por mês/ano:', { month, year });
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Erro ao buscar metas:', error);
        throw error;
      }
      
      console.log('✅ Metas carregadas:', data?.length || 0);
      setPreSalesGoals((data || []) as PreSalesGoal[]);
    } catch (error) {
      console.error('❌ Erro ao carregar metas de pré-vendas:', error);
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
      console.log('🔍 Criando meta de pré-vendas:', goalData);
      
      // Obter o usuário autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ Erro de autenticação:', userError);
        throw new Error('Usuário não autenticado');
      }

      // Verificar se já existe uma meta similar
      const { data: existingGoal, error: checkError } = await supabase
        .from('pre_sales_goals')
        .select('id')
        .eq('goal_type_id', goalData.goal_type_id)
        .eq('month', goalData.month)
        .eq('year', goalData.year)
        .eq('user_id', user.id);

      if (goalData.seller_id) {
        // Para metas individuais, verificar seller_id também
        const { data: existingIndividualGoal } = await supabase
          .from('pre_sales_goals')
          .select('id')
          .eq('goal_type_id', goalData.goal_type_id)
          .eq('seller_id', goalData.seller_id)
          .eq('month', goalData.month)
          .eq('year', goalData.year)
          .eq('user_id', user.id);

        if (existingIndividualGoal && existingIndividualGoal.length > 0) {
          console.log('⚠️ Meta individual já existe, atualizando...');
          const { error: updateError } = await supabase
            .from('pre_sales_goals')
            .update({ target_value: goalData.target_value })
            .eq('id', existingIndividualGoal[0].id);

          if (updateError) throw updateError;
          await fetchPreSalesGoals();
          return true;
        }
      } else {
        // Para metas da empresa (sem seller_id)
        const { data: existingCompanyGoal } = await supabase
          .from('pre_sales_goals')
          .select('id')
          .eq('goal_type_id', goalData.goal_type_id)
          .eq('month', goalData.month)
          .eq('year', goalData.year)
          .eq('user_id', user.id)
          .is('seller_id', null);

        if (existingCompanyGoal && existingCompanyGoal.length > 0) {
          console.log('⚠️ Meta da empresa já existe, atualizando...');
          const { error: updateError } = await supabase
            .from('pre_sales_goals')
            .update({ target_value: goalData.target_value })
            .eq('id', existingCompanyGoal[0].id);

          if (updateError) throw updateError;
          await fetchPreSalesGoals();
          return true;
        }
      }

      // Criar nova meta
      const insertData = {
        ...goalData,
        user_id: user.id,
      };

      console.log('💾 Inserindo nova meta:', insertData);

      const { data, error } = await supabase
        .from('pre_sales_goals')
        .insert(insertData)
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `)
        .single();

      if (error) {
        console.error('❌ Erro ao inserir meta:', error);
        throw error;
      }

      console.log('✅ Meta criada com sucesso:', data);
      setPreSalesGoals(prev => [data as PreSalesGoal, ...prev]);
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao criar meta de pré-vendas:', error);
      toast({
        title: "Erro",
        description: `Não foi possível criar a meta: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
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
