
import { useState, useEffect } from 'react';
import { SwotData } from "@/types/swot";
import { generateEnhancedSwotPlan, generateBasicActionPlan } from '@/utils/swot/actionPlanGenerator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveDataToSupabase, loadDataFromSupabase } from '@/utils/storage';

export const useSwotActionPlan = (swotData: SwotData, isLoading: boolean) => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({});
  const [generating, setGenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [savedActionPlan, setSavedActionPlan] = useState<boolean>(false);

  // Load saved action plan on component mount
  useEffect(() => {
    const loadSavedActionPlan = async () => {
      if (!userId || isLoading) return;
      
      try {
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

  // Check if SWOT data has content
  const hasContent = (data: SwotData): boolean => {
    return Object.values(data).some(category => 
      category.some(item => item.text && item.text.trim() !== '')
    );
  };

  // Generate action plan based on SWOT analysis
  const generateActionPlan = async (data: SwotData) => {
    setGenerating(true);
    
    try {
      // Try to generate an enhanced plan with DeepSeek AI
      if (!isUsingAI) {
        const enhancedPlan = await generateEnhancedSwotPlan(data);
        
        if (enhancedPlan) {
          setActionPlan(enhancedPlan);
          setIsUsingAI(true);
          setGenerating(false);
          return enhancedPlan;
        }
      }
      
      // Fallback to basic plan generation
      const basicPlan = generateBasicActionPlan(data);
      setActionPlan(basicPlan);
      return basicPlan;
    } catch (error) {
      console.error("Error generating action plan:", error);
      // Fallback to basic plan if AI fails
      const basicPlan = generateBasicActionPlan(data);
      setActionPlan(basicPlan);
      return basicPlan;
    } finally {
      setGenerating(false);
    }
  };

  // Generate and save the action plan
  const handleGenerateAndSaveActionPlan = async () => {
    if (!userId || generating) return;
    
    setGenerating(true);
    
    try {
      // Generate the action plan
      const newPlan = await generateActionPlan(swotData);
      
      // Save the action plan
      const success = await saveDataToSupabase(userId, 'swot_action_plan', newPlan);
      
      if (success) {
        setSavedActionPlan(true);
        toast({
          title: "Plano de ação salvo",
          description: "Seu plano de ação foi gerado e salvo com sucesso",
        });
      } else {
        throw new Error("Failed to save action plan");
      }
    } catch (error) {
      console.error("Error generating and saving action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar plano",
        description: "Não foi possível gerar e salvar o plano de ação",
      });
    } finally {
      setGenerating(false);
    }
  };

  // Regenerate the action plan with AI
  const handleRegenerateActionPlan = async () => {
    if (generating) return;
    
    setGenerating(true);
    setIsUsingAI(false);
    
    try {
      const newPlan = await generateActionPlan(swotData);
      
      // If user is logged in, save the regenerated plan
      if (userId) {
        const success = await saveDataToSupabase(userId, 'swot_action_plan', newPlan);
        
        if (success) {
          setSavedActionPlan(true);
          toast({
            title: "Plano de ação atualizado",
            description: "Seu plano de ação foi regenerado e salvo com sucesso",
          });
        }
      }
    } catch (error) {
      console.error("Error regenerating action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao regenerar plano",
        description: "Não foi possível regenerar o plano de ação",
      });
    } finally {
      setGenerating(false);
    }
  };

  return { 
    actionPlan,
    generating,
    isUsingAI,
    savedActionPlan,
    handleGenerateAndSaveActionPlan,
    handleRegenerateActionPlan,
    hasContent
  };
};
