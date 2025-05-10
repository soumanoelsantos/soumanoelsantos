
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveSwotData, loadSwotData } from '@/utils/storage/swotUtils';

export const useActionPlanStorage = (isLoading: boolean) => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({});
  const [savedActionPlan, setSavedActionPlan] = useState<boolean>(false);

  // Load saved action plan on component mount
  useEffect(() => {
    const loadSavedActionPlan = async () => {
      if (!userId || isLoading) return;
      
      try {
        // Load action plan
        const savedData = await loadSwotData(userId);
        
        if (savedData && savedData.actionPlan && Object.keys(savedData.actionPlan).length > 0) {
          setActionPlan(savedData.actionPlan);
          setSavedActionPlan(true);
          console.log("Loaded saved action plan:", savedData.actionPlan);
        } else {
          setSavedActionPlan(false);
        }
      } catch (error) {
        console.error("Error loading saved action plan:", error);
      }
    };

    loadSavedActionPlan();
  }, [userId, isLoading]);

  // Save action plan
  const saveActionPlan = async (plan: Record<string, string[]>) => {
    if (!userId) return false;
    
    try {
      // Get existing SWOT data
      const existingData = await loadSwotData(userId) || {};
      
      // Update the action plan in the existing data
      const updatedData = {
        ...existingData,
        actionPlan: plan
      };
      
      const success = await saveSwotData(userId, updatedData);
      
      if (success) {
        setActionPlan(plan);
        setSavedActionPlan(true);
        toast({
          title: "Plano de ação salvo",
          description: "Seu plano de ação personalizado foi salvo com sucesso",
        });
        return true;
      }
      
      throw new Error("Failed to save action plan");
    } catch (error) {
      console.error("Error saving action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar plano",
        description: "Não foi possível salvar o plano de ação",
      });
      return false;
    }
  };

  return {
    actionPlan,
    setActionPlan,
    savedActionPlan,
    saveActionPlan
  };
};
