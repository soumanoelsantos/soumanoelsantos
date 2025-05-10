
import { useState } from "react";
import { PhaseTestResult } from "@/types/phaseTest";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateEnhancedActionPlan } from "@/utils/deepseekApi";

export const usePhaseActionPlan = (userId: string | undefined, result: PhaseTestResult | null) => {
  const { toast } = useToast();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [showEnhancedPlan, setShowEnhancedPlan] = useState(false);
  
  // Check if there's already an enhanced action plan
  useState(() => {
    if (result && result.enhanced_action_plan && result.enhanced_action_plan.length > 0) {
      setShowEnhancedPlan(true);
    }
  });
  
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
      // Get data from other tools and diagnostics if available
      const { data: diagnosticData } = await supabase
        .from('diagnostic_results')
        .select('results, answers_data')
        .eq('user_id', userId)
        .maybeSingle();
      
      // Get data from SWOT if available
      const { data: swotData } = await supabase
        .from('user_tools_data')
        .select('swot_data')
        .eq('user_id', userId)
        .maybeSingle();
      
      // Prepare combined data for AI input
      const inputData = {
        phaseResult: result,
        diagnosticData: diagnosticData || null,
        swotData: swotData?.swot_data || null
      };
      
      console.log("Sending data to AI for plan generation:", inputData);
      
      // Generate enhanced action plan using AI
      const generatedPlan = await generateEnhancedActionPlan(inputData);
      console.log("Received generated plan:", generatedPlan);
      
      if (generatedPlan) {
        // Format the plan as a list of action items
        const actionItems = Array.isArray(generatedPlan) 
          ? generatedPlan 
          : Object.values(generatedPlan).flat();
        
        console.log("Formatted action items:", actionItems);
        
        // Save the enhanced action plan to the database
        if (userId) {
          console.log("Saving plan to database for user:", userId);
          // Save enhanced plan to fase_results
          const { error } = await supabase
            .from('fase_results')
            .update({
              enhanced_action_plan: actionItems
            })
            .eq('user_id', userId);
          
          if (error) {
            console.error("Error saving to database:", error);
            throw error;
          }
        }
        
        // Update local state with the new plan
        if (result) {
          result.enhanced_action_plan = actionItems;
        }
        
        setShowEnhancedPlan(true);
        
        toast({
          title: "Plano de ação gerado",
          description: "Criamos um plano personalizado com base nos seus resultados."
        });
      }
    } catch (error) {
      console.error("Error generating enhanced action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Não foi possível gerar o plano de ação personalizado."
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return {
    isGeneratingPlan,
    showEnhancedPlan,
    setShowEnhancedPlan,
    handleGenerateActionPlan
  };
};
