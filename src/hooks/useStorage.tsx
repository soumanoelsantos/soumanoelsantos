
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  saveDataToSupabase, 
  loadDataFromSupabase,
  checkUserToolCompletion
} from '@/utils/storage';

export interface UseStorageOptions {
  dataKey: string;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useStorage<T>(options: UseStorageOptions) {
  const { dataKey, loadingMessage, successMessage, errorMessage } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasData, setHasData] = useState<boolean>(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const loadData = async (): Promise<T | null> => {
    if (!userId) {
      return null;
    }

    try {
      setIsLoading(true);
      const loadedData = await loadDataFromSupabase(userId, dataKey);
      
      if (loadedData) {
        setData(loadedData);
        setHasData(true);
        return loadedData;
      } else {
        setHasData(false);
        return null;
      }
    } catch (error) {
      console.error(`Error loading ${dataKey} data:`, error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: errorMessage || "Não foi possível carregar os dados salvos anteriormente."
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (dataToSave: T): Promise<boolean> => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar os dados."
      });
      return false;
    }

    try {
      setIsLoading(true);
      
      const customLoadingMessage = loadingMessage || "Salvando dados...";
      if (loadingMessage) {
        toast({
          title: "Processando",
          description: customLoadingMessage
        });
      }
      
      const success = await saveDataToSupabase(userId, dataKey, dataToSave);
      
      if (success) {
        setData(dataToSave);
        setHasData(true);
        
        const customSuccessMessage = successMessage || "Seus dados foram salvos com sucesso.";
        toast({
          title: "Dados salvos!",
          description: customSuccessMessage
        });
      }
      
      return success;
    } catch (error) {
      console.error(`Error saving ${dataKey} data:`, error);
      const customErrorMessage = errorMessage || "Ocorreu um erro ao salvar os dados. Tente novamente.";
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: customErrorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkDataExists = async (): Promise<boolean> => {
    if (!userId) {
      return false;
    }

    try {
      const result = await checkUserToolCompletion(userId, [dataKey]);
      setHasData(!!result[dataKey]);
      return !!result[dataKey];
    } catch (error) {
      console.error(`Error checking if ${dataKey} exists:`, error);
      return false;
    }
  };

  return {
    data,
    setData,
    isLoading,
    hasData,
    loadData,
    saveData,
    checkDataExists
  };
}
