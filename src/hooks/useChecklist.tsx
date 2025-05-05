
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { saveChecklistData, loadChecklistData } from '@/utils/savingUtils';

// Default empty state for checklist
const defaultChecklistData = {
  items: [
    { text: '', completed: false }
  ]
};

export const useChecklist = () => {
  const [checklistData, setChecklistData] = useState(defaultChecklistData);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  const { toast } = useToast();

  // Load saved checklist data when component mounts
  useEffect(() => {
    const loadSavedChecklistData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const savedData = await loadChecklistData(userId);
        
        if (savedData) {
          console.log("Loaded checklist data:", savedData);
          setChecklistData(savedData);
        }
      } catch (error) {
        console.error("Error loading checklist data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados salvos anteriormente."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedChecklistData();
  }, [userId, toast]);

  // Update an item's text
  const updateItemText = (index: number, text: string) => {
    setChecklistData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], text };
      return { ...prev, items: newItems };
    });
  };

  // Toggle an item's completed status
  const toggleItemCompleted = (index: number) => {
    setChecklistData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], completed: !newItems[index].completed };
      return { ...prev, items: newItems };
    });
  };

  // Add a new checklist item
  const addItem = () => {
    setChecklistData(prev => ({
      ...prev,
      items: [...prev.items, { text: '', completed: false }]
    }));
  };

  // Remove a checklist item
  const removeItem = (index: number) => {
    setChecklistData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      // Ensure we always have at least one field
      if (newItems.length === 0) {
        newItems.push({ text: '', completed: false });
      }
      return { ...prev, items: newItems };
    });
  };

  // Save checklist data to Supabase
  const saveChecklist = async () => {
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
      const success = await saveChecklistData(userId, checklistData);
      return success;
    } catch (error) {
      console.error("Error saving checklist data:", error);
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
    checklistData,
    updateItemText,
    toggleItemCompleted,
    addItem,
    removeItem,
    saveChecklist,
    isLoading
  };
};
