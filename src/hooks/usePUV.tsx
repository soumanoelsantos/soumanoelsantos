
import { useState, useEffect } from 'react';
import { PUVFormData } from '@/types/puv';
import { useStorage } from '@/hooks/useStorage';

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
  
  // Use our storage hook
  const storage = useStorage<PUVFormData>({
    dataKey: 'puv_data',
    successMessage: "Proposta Única de Valor salva com sucesso!",
    errorMessage: "Não foi possível salvar sua Proposta Única de Valor."
  });

  // Load saved PUV data when component mounts
  useEffect(() => {
    const loadSavedPUVData = async () => {
      const savedData = await storage.loadData();
      if (savedData) {
        console.log("Loaded PUV data:", savedData);
        setPuvData(savedData);
      }
    };

    loadSavedPUVData();
  }, [storage]);

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
    return await storage.saveData(puvData);
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
