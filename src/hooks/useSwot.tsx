
import { useState, useEffect } from 'react';
import { useStorage } from '@/hooks/useStorage';

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
  
  // Use our storage hook
  const storage = useStorage({
    dataKey: 'swot_data',
    successMessage: "Análise SWOT salva com sucesso!",
    errorMessage: "Não foi possível salvar sua Análise SWOT."
  });

  // Load saved SWOT data when component mounts
  useEffect(() => {
    const loadSavedSwotData = async () => {
      const savedData = await storage.loadData();
      if (savedData) {
        console.log("Loaded SWOT data:", savedData);
        setSwotData(savedData as typeof defaultSwotData);
      }
    };

    loadSavedSwotData();
  }, [storage]);

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
    return await storage.saveData(swotData);
  };

  return {
    swotData,
    updateField,
    addItem,
    removeItem,
    showPreview,
    togglePreview,
    saveSwot,
    isLoading: storage.isLoading
  };
};
