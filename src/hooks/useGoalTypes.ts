
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GoalType, CreateGoalTypeData } from '@/types/preSalesGoals';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

export const useGoalTypes = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [goalTypes, setGoalTypes] = useState<GoalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoalTypes = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('goal_types')
        .select('*')
        .eq('user_id', userId)
        .order('name');

      if (error) throw error;
      
      // Cast the data to proper GoalType interface
      const typedGoalTypes: GoalType[] = (data || []).map(item => ({
        ...item,
        target_scope: item.target_scope as 'individual' | 'empresa',
        is_percentage: Boolean(item.is_percentage)
      }));
      
      setGoalTypes(typedGoalTypes);
    } catch (error) {
      console.error('Erro ao carregar tipos de metas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os tipos de metas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createGoalType = async (goalTypeData: CreateGoalTypeData) => {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from('goal_types')
        .insert({
          ...goalTypeData,
          user_id: userId,
          is_percentage: goalTypeData.is_percentage || false,
        })
        .select()
        .single();

      if (error) throw error;

      // Cast the returned data to proper GoalType interface
      const typedGoalType: GoalType = {
        ...data,
        target_scope: data.target_scope as 'individual' | 'empresa',
        is_percentage: Boolean(data.is_percentage)
      };

      setGoalTypes(prev => [...prev, typedGoalType]);
      toast({
        title: "Sucesso",
        description: "Tipo de meta criado com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar tipo de meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o tipo de meta",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateGoalType = async (goalTypeId: string, data: Partial<GoalType>) => {
    try {
      const { data: updatedGoalType, error } = await supabase
        .from('goal_types')
        .update(data)
        .eq('id', goalTypeId)
        .select()
        .single();

      if (error) throw error;

      // Cast the returned data to proper GoalType interface
      const typedGoalType: GoalType = {
        ...updatedGoalType,
        target_scope: updatedGoalType.target_scope as 'individual' | 'empresa',
        is_percentage: Boolean(updatedGoalType.is_percentage)
      };

      setGoalTypes(prev => prev.map(gt => gt.id === goalTypeId ? typedGoalType : gt));
      toast({
        title: "Sucesso",
        description: "Tipo de meta atualizado com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tipo de meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o tipo de meta",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteGoalType = async (goalTypeId: string) => {
    try {
      const { error } = await supabase
        .from('goal_types')
        .delete()
        .eq('id', goalTypeId);

      if (error) throw error;

      setGoalTypes(prev => prev.filter(gt => gt.id !== goalTypeId));
      toast({
        title: "Sucesso",
        description: "Tipo de meta removido com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover tipo de meta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o tipo de meta",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchGoalTypes();
  }, [userId]);

  return {
    goalTypes,
    isLoading,
    createGoalType,
    updateGoalType,
    deleteGoalType,
    refetch: fetchGoalTypes,
  };
};
