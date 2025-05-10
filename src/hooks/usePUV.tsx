
import { useState, useEffect, useRef } from 'react';
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
  const dataLoaded = useRef(false);
  
  // Use our storage hook
  const storage = useStorage<PUVFormData>({
    dataKey: 'puv_data',
    successMessage: "Proposta Única de Valor salva com sucesso!",
    errorMessage: "Não foi possível salvar sua Proposta Única de Valor."
  });

  // Check if any field has been filled
  const hasAnyData = (data: PUVFormData): boolean => {
    return Object.values(data).some(value => value && value.trim() !== '');
  };

  // Load saved PUV data when component mounts
  useEffect(() => {
    const loadSavedPUVData = async () => {
      if (dataLoaded.current) return; // Prevent multiple data loading attempts
      
      try {
        const savedData = await storage.loadData();
        if (savedData) {
          console.log("Loaded PUV data:", savedData);
          setPuvData(savedData);
          
          // Show preview directly if data exists
          if (hasAnyData(savedData)) {
            setShowPreview(true);
          }
        }
        
        dataLoaded.current = true;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da Proposta Única de Valor."
        });
        console.error("Error loading PUV data:", error);
        dataLoaded.current = true; // Mark as loaded even on error to prevent infinite loading
      }
    };

    loadSavedPUVData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    isLoading: storage.isLoading && !dataLoaded.current
  };
};
