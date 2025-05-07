
import { useState, useEffect } from 'react';
import { PUVFormData } from '@/types/puv';
import { useStorage } from '@/hooks/useStorage';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  // Use our storage hook
  const storage = useStorage<PUVFormData>({
    dataKey: 'puv_data',
    successMessage: "Proposta Única de Valor salva com sucesso!",
    errorMessage: "Não foi possível salvar sua Proposta Única de Valor."
  });

  // Load saved PUV data when component mounts
  useEffect(() => {
    const loadSavedPUVData = async () => {
      try {
        const savedData = await storage.loadData();
        if (savedData) {
          console.log("Loaded PUV data:", savedData);
          setPuvData(savedData);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da Proposta Única de Valor."
        });
        console.error("Error loading PUV data:", error);
      }
    };

    loadSavedPUVData();
  }, [storage]); // eslint-disable-line react-hooks/exhaustive-deps

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
    try {
      return await storage.saveData(puvData);
    } catch (error) {
      console.error("Error saving PUV data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a Proposta Única de Valor."
      });
      return false;
    }
  };

  return {
    puvData,
    handleDataChange,
    showPreview,
    togglePreview,
    savePUV,
    isLoading: storage.isLoading
  };
};
