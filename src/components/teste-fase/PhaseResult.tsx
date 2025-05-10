
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhaseTestResult } from "../../types/phaseTest";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { generateEnhancedActionPlan } from "@/utils/deepseekApi";
import PhaseInfo from "./PhaseInfo";
import PhaseRecommendations from "./PhaseRecommendations";
import ActionPlanGenerator from "./ActionPlanGenerator";
import EnhancedActionPlan from "./EnhancedActionPlan";
import NavigationButtons from "./NavigationButtons";

interface PhaseResultProps {
  result: PhaseTestResult | null;
  onResetTest: () => void;
}

const PhaseResult = ({ result, onResetTest }: PhaseResultProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [showEnhancedPlan, setShowEnhancedPlan] = useState(false);
  
  useEffect(() => {
    // Check if there's an enhanced action plan already and show it by default
    if (result && result.enhanced_action_plan && result.enhanced_action_plan.length > 0) {
      setShowEnhancedPlan(true);
    }
  }, [result]);
  
  if (!result) return null;

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
        
        // Create a new result object to avoid mutating the original
        const updatedResult = {
          ...result,
          enhanced_action_plan: actionItems
        };
        
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

  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PhaseInfo 
            phaseName={result.phaseName} 
            score={result.score} 
            description={result.description} 
          />
          
          {!showEnhancedPlan ? (
            <>
              <PhaseRecommendations recommendations={result.recommendations} />
              <ActionPlanGenerator 
                onGeneratePlan={handleGenerateActionPlan} 
                isGenerating={isGeneratingPlan} 
              />
            </>
          ) : (
            <EnhancedActionPlan 
              actionPlan={result.enhanced_action_plan || []} 
              onRegeneratePlan={handleGenerateActionPlan}
              isGenerating={isGeneratingPlan}
            />
          )}
          
          <NavigationButtons onResetTest={onResetTest} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseResult;
