
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
      console.log('📋 Dados das metas:', data);
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
      console.log('🎯 INÍCIO - Criando meta de pré-vendas:', goalData);
      
      // Verificar autenticação
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ Erro de autenticação:', userError);
        toast({
          title: "Erro",
          description: "Usuário não autenticado",
          variant: "destructive",
        });
        return false;
      }

      console.log('✅ Usuário autenticado:', user.id);

      // Preparar dados para inserção
      const insertData = {
        user_id: user.id,
        goal_type_id: goalData.goal_type_id,
        seller_id: goalData.seller_id || null,
        month: goalData.month,
        year: goalData.year,
        target_value: goalData.target_value,
        current_value: 0
      };

      console.log('💾 Dados para inserção:', insertData);

      // Tentar inserir
      const { data: insertResult, error: insertError } = await supabase
        .from('pre_sales_goals')
        .insert(insertData)
        .select(`
          *,
          goal_type:goal_types(*),
          seller:sellers(id, name)
        `)
        .single();

      if (insertError) {
        console.error('❌ Erro na inserção:', insertError);
        
        // Se for erro de duplicata, tentar update
        if (insertError.code === '23505') {
          console.log('⚠️ Meta duplicada, tentando atualizar...');
          
          let updateQuery = supabase
            .from('pre_sales_goals')
            .update({ 
              target_value: goalData.target_value,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id)
            .eq('goal_type_id', goalData.goal_type_id)
            .eq('month', goalData.month)
            .eq('year', goalData.year);

          if (goalData.seller_id) {
            updateQuery = updateQuery.eq('seller_id', goalData.seller_id);
          } else {
            updateQuery = updateQuery.is('seller_id', null);
          }

          const { data: updateResult, error: updateError } = await updateQuery
            .select(`
              *,
              goal_type:goal_types(*),
              seller:sellers(id, name)
            `)
            .single();

          if (updateError) {
            console.error('❌ Erro no update:', updateError);
            toast({
              title: "Erro",
              description: `Erro ao atualizar meta: ${updateError.message}`,
              variant: "destructive",
            });
            return false;
          }

          console.log('✅ Meta atualizada:', updateResult);
          toast({
            title: "Sucesso",
            description: "Meta atualizada com sucesso!",
          });
          
          // Atualizar lista local
          await fetchPreSalesGoals();
          return true;
        }
        
        toast({
          title: "Erro",
          description: `Erro ao criar meta: ${insertError.message}`,
          variant: "destructive",
        });
        return false;
      }

      console.log('✅ Meta criada com sucesso:', insertResult);
      toast({
        title: "Sucesso",
        description: "Meta criada com sucesso!",
      });
      
      // Atualizar lista local
      await fetchPreSalesGoals();
      return true;
      
    } catch (error) {
      console.error('❌ Erro geral ao criar meta:', error);
      toast({
        title: "Erro",
        description: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
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
