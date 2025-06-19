
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GoalType, CreateGoalTypeData } from '@/types/preSalesGoals';
import { useToast } from '@/components/ui/use-toast';

export const useGoalTypes = () => {
  const { toast } = useToast();
  const [goalTypes, setGoalTypes] = useState<GoalType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoalTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('goal_types')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setGoalTypes(data || []);
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
    try {
      const { data, error } = await supabase
        .from('goal_types')
        .insert({
          ...goalTypeData,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      setGoalTypes(prev => [...prev, data]);
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

      setGoalTypes(prev => prev.map(gt => gt.id === goalTypeId ? updatedGoalType : gt));
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
  }, []);

  return {
    goalTypes,
    isLoading,
    createGoalType,
    updateGoalType,
    deleteGoalType,
    refetch: fetchGoalTypes,
  };
};
