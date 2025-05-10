
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveDataToSupabase, loadDataFromSupabase } from '@/utils/storage';

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
        const savedPlan = await loadDataFromSupabase(userId, 'swot_action_plan');
        if (savedPlan && Object.keys(savedPlan).length > 0) {
          setActionPlan(savedPlan);
          setSavedActionPlan(true);
          console.log("Loaded saved action plan:", savedPlan);
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
      const success = await saveDataToSupabase(userId, 'swot_action_plan', plan);
      
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
