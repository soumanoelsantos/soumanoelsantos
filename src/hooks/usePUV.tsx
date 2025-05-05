
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { PUVFormData } from '@/types/puv';
import { savePuvData, loadPuvData } from '@/utils/savingUtils';

// Initial empty state for the PUV form
const initialPUVState: PUVFormData = {
  colaborador: '',
  gestor: '',
  meus: '',
  ajudam: '',
  queDesejam: '',
  para: '',
  dor: '',
  e: '',
  ganho: ''
};

export const usePUV = () => {
  const [puvData, setPuvData] = useState<PUVFormData>(initialPUVState);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  const { toast } = useToast();

  // Load saved PUV data when component mounts
  useEffect(() => {
    const loadSavedPUVData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const savedData = await loadPuvData(userId);
        
        if (savedData) {
          console.log("Loaded PUV data:", savedData);
          setPuvData(savedData);
        }
      } catch (error) {
        console.error("Error loading PUV data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados salvos anteriormente."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedPUVData();
  }, [userId, toast]);

  // Handle data changes in the form
  const handleDataChange = (newData: PUVFormData) => {
    setPuvData(newData);
  };

  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  // Save PUV data to Supabase
  const savePUV = async () => {
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
      const success = await savePuvData(userId, puvData);
      return success;
    } catch (error) {
      console.error("Error saving PUV data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar os dados. Tente novamente."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    puvData,
    handleDataChange,
    showPreview,
    togglePreview,
    savePUV,
    isLoading
  };
};
