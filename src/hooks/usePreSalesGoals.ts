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

      console.log('✅ Usuário autenticado:', user.id);

      // Preparar dados para inserção direta
      const insertData = {
        user_id: user.id,
        goal_type_id: goalData.goal_type_id,
        seller_id: goalData.seller_id || null,
        month: goalData.month,
        year: goalData.year,
        target_value: goalData.target_value,
        current_value: 0
      };

      console.log('💾 Inserindo meta:', insertData);

      // Tentar inserir diretamente
      const { data, error } = await supabase
        .from('pre_sales_goals')
        .insert(insertData)
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `);

      if (error) {
        console.error('❌ Erro ao inserir meta:', error);
        
        // Se der erro de duplicata, tentar atualizar
        if (error.code === '23505') {
          console.log('⚠️ Meta já existe, tentando atualizar...');
          
          let updateQuery = supabase
            .from('pre_sales_goals')
            .update({ target_value: goalData.target_value })
            .eq('goal_type_id', goalData.goal_type_id)
            .eq('month', goalData.month)
            .eq('year', goalData.year)
            .eq('user_id', user.id);

          if (goalData.seller_id) {
            updateQuery = updateQuery.eq('seller_id', goalData.seller_id);
          } else {
            updateQuery = updateQuery.is('seller_id', null);
          }

          const { data: updateData, error: updateError } = await updateQuery
            .select(`
              *,
              goal_type:goal_types(*),
              seller:sellers(id, name)
            `);

          if (updateError) {
            console.error('❌ Erro ao atualizar meta:', updateError);
            throw updateError;
          }

          console.log('✅ Meta atualizada com sucesso:', updateData);
          await fetchPreSalesGoals();
          return true;
        }
        
        throw error;
      }

      console.log('✅ Meta criada com sucesso:', data);
      
      if (data && data.length > 0) {
        setPreSalesGoals(prev => [data[0] as PreSalesGoal, ...prev]);
      }
      
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
