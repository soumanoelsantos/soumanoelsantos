
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseStorageOptions<T = any> {
  dataKey: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useStorage = <T = any>({ dataKey, successMessage, errorMessage }: UseStorageOptions<T>) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const saveData = async (data: T): Promise<boolean> => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar os dados.",
      });
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_tools_data')
        .upsert({
          user_id: userId,
          [dataKey]: data,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      if (successMessage) {
        toast({
          title: "Dados salvos!",
          description: successMessage,
        });
      }

      return true;
    } catch (error) {
      console.error(`Erro ao salvar ${dataKey}:`, error);
      
      if (errorMessage) {
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: errorMessage,
        });
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async (): Promise<T | null> => {
    if (!userId) return null;

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('user_tools_data')
        .select(dataKey)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data?.[dataKey] || null;
    } catch (error) {
      console.error(`Erro ao carregar ${dataKey}:`, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveData,
    loadData,
    isLoading
  };
};
