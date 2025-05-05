
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { saveSwotData, loadSwotData } from '@/utils/savingUtils';

// Default empty state for SWOT analysis
const defaultSwotData = {
  strengths: [''],
  weaknesses: [''],
  opportunities: [''],
  threats: ['']
};

export const useSwot = () => {
  const [swotData, setSwotData] = useState(defaultSwotData);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  const { toast } = useToast();

  // Load saved SWOT data when component mounts
  useEffect(() => {
    const loadSavedSwotData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const savedData = await loadSwotData(userId);
        
        if (savedData) {
          console.log("Loaded SWOT data:", savedData);
          setSwotData(savedData);
        }
      } catch (error) {
        console.error("Error loading SWOT data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados salvos anteriormente."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSwotData();
  }, [userId, toast]);

  // Update a specific SWOT field
  const updateField = (
    category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', 
    index: number, 
    value: string
  ) => {
    setSwotData(prev => {
      const newItems = [...prev[category]];
      newItems[index] = value;
      return { ...prev, [category]: newItems };
    });
  };

  // Add a new item to a SWOT category
  const addItem = (category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats') => {
    setSwotData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  // Remove an item from a SWOT category
  const removeItem = (category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', index: number) => {
    setSwotData(prev => {
      const newItems = [...prev[category]];
      newItems.splice(index, 1);
      // Ensure we always have at least one field
      if (newItems.length === 0) {
        newItems.push('');
      }
      return { ...prev, [category]: newItems };
    });
  };

  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  // Save SWOT data to Supabase
  const saveSwot = async () => {
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
      const success = await saveSwotData(userId, swotData);
      return success;
    } catch (error) {
      console.error("Error saving SWOT data:", error);
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
    swotData,
    updateField,
    addItem,
    removeItem,
    showPreview,
    togglePreview,
    saveSwot,
    isLoading
  };
};
