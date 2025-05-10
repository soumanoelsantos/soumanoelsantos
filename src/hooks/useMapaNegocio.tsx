
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { BusinessMapData } from '@/types/businessMap';
import { useStorage } from '@/hooks/useStorage';

// Default empty state for the business map
const defaultBusinessMap: BusinessMapData = {
  empresa: '',
  missao: '',
  visao: '',
  valores: '',
  parceirosChave: '',
  atividadesChaves: '',
  recursosChave: '',
  valuePropositions: '',
  relacaoConsumidor: '',
  canaisDistribuicao: '',
  segmentoConsumidores: '',
  estruturaCustos: '',
  fontesReceita: '',
  vantagemCompetitiva: '',
  competenciasEssenciais: '',
  posicionamentoMercado: ''
};

export const useMapaNegocio = () => {
  const [businessMap, setBusinessMap] = useState<BusinessMapData>(defaultBusinessMap);
  const [showPreview, setShowPreview] = useState(false);
  
  // Use our new storage hook
  const storage = useStorage<BusinessMapData>({
    dataKey: 'business_map_data',
    successMessage: "Mapa de Negócio salvo com sucesso!",
    errorMessage: "Não foi possível salvar seu Mapa de Negócio."
  });

  // Check if any field has been filled
  const hasAnyData = (data: BusinessMapData): boolean => {
    return Object.values(data).some(value => value && value.trim() !== '');
  };

  // Load saved business map data when component mounts
  useEffect(() => {
    const loadSavedBusinessMap = async () => {
      const savedData = await storage.loadData();
      if (savedData) {
        console.log("Loaded business map data:", savedData);
        setBusinessMap(savedData);
        
        // Show preview directly if data exists
        if (hasAnyData(savedData)) {
          setShowPreview(true);
        }
      }
    };

    loadSavedBusinessMap();
  }, []);

  // Handle changes to the business map form fields
  const handleBusinessMapChange = (field: keyof BusinessMapData, value: string) => {
    setBusinessMap(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  // Save business map data to Supabase
  const saveBusinessMap = async () => {
    return await storage.saveData(businessMap);
  };

  return {
    businessMap,
    handleBusinessMapChange,
    showPreview,
    togglePreview,
    saveBusinessMap,
    isLoading: storage.isLoading
  };
};
