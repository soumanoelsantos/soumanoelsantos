
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { BusinessMapData } from '@/types/businessMap';
import { saveBusinessMapData, loadBusinessMapData } from '@/utils/storage/businessMapUtils';

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
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  const { toast } = useToast();

  // Load saved business map data when component mounts
  useEffect(() => {
    const loadSavedBusinessMap = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const savedData = await loadBusinessMapData(userId);
        
        if (savedData) {
          console.log("Loaded business map data:", savedData);
          setBusinessMap(savedData);
        }
      } catch (error) {
        console.error("Error loading business map data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados salvos anteriormente."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedBusinessMap();
  }, [userId, toast]);

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
      const success = await saveBusinessMapData(userId, businessMap);
      return success;
    } catch (error) {
      console.error("Error saving business map data:", error);
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
    businessMap,
    handleBusinessMapChange,
    showPreview,
    togglePreview,
    saveBusinessMap,
    isLoading
  };
};
