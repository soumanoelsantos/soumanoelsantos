
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PhaseTestResult } from '@/types/phaseTest';
import { supabase } from '@/integrations/supabase/client';
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';

export const usePhaseActionPlan = (userId: string | undefined, result: PhaseTestResult | null) => {
  const { toast } = useToast();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [showEnhancedPlan, setShowEnhancedPlan] = useState(false);
  const [enhancedActionPlan, setEnhancedActionPlan] = useState<string[]>([]);
  
  // Check if we already have a saved enhanced action plan
  useEffect(() => {
    if (result && result.enhanced_action_plan && result.enhanced_action_plan.length > 0) {
      setEnhancedActionPlan(result.enhanced_action_plan);
      setShowEnhancedPlan(true);
    }
  }, [result]);
  
  const handleGenerateActionPlan = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa estar logado para gerar um plano de ação personalizado."
      });
      return;
    }

    setIsGeneratingPlan(true);
    try {
      // Prepare data for the AI
      const inputData = {
        phaseResult: result,
        // Optional: Get other diagnostic data if available
        diagnosticData: null,
        swotData: null
      };
      
      // Generate plan using the same AI service used by SWOT
      const generatedPlan = await generateEnhancedActionPlan(inputData);
      
      if (generatedPlan && Array.isArray(generatedPlan) && generatedPlan.length > 0) {
        setEnhancedActionPlan(generatedPlan);
        setShowEnhancedPlan(true);
        
        // Save the plan to the database
        if (userId) {
          // Check if there's an existing result for this user
          const { data: existingResult } = await supabase
            .from('fase_results')
            .select('id')
            .eq('user_id', userId)
            .maybeSingle();
          
          if (existingResult) {
            // Update the existing result
            const { error } = await supabase
              .from('fase_results')
              .update({
                enhanced_action_plan: generatedPlan
              })
              .eq('user_id', userId);
            
            if (error) {
              console.error("Error saving action plan:", error);
              throw error;
            }
          }
        }
        
        toast({
          title: "Plano de ação gerado",
          description: "Criamos um plano personalizado com base nos seus resultados."
        });
      } else {
        throw new Error("Não foi possível gerar o plano de ação");
      }
    } catch (error) {
      console.error("Error generating action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Não foi possível gerar o plano de ação personalizado."
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };
  
  const handleRegenerateActionPlan = () => {
    // Simply reuse the generation function
    handleGenerateActionPlan();
  };

  return {
    isGeneratingPlan,
    showEnhancedPlan,
    setShowEnhancedPlan,
    enhancedActionPlan,
    handleGenerateActionPlan,
    handleRegenerateActionPlan
  };
};
