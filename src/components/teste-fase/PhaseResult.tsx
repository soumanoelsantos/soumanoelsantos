
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PhaseTestResult } from "../../types/phaseTest";
import ActionButton from "../ui/action-button";
import { ArrowLeft, RefreshCw, FileEdit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { generateEnhancedActionPlan } from "@/utils/deepseekApi";

interface PhaseResultProps {
  result: PhaseTestResult | null;
  onResetTest: () => void;
}

const PhaseResult = ({ result, onResetTest }: PhaseResultProps) => {
  const navigate = useNavigate();
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
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Sua empresa está na: {result.phaseName}
            </h2>
            <p className="text-gray-700 mb-2">
              Compatibilidade com esta fase: {Math.round(result.score)}%
            </p>
            <p className="text-gray-600">{result.description}</p>
          </div>
          
          {!showEnhancedPlan ? (
            <>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendações para esta fase:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h3 className="font-medium text-amber-800 flex items-center gap-2 mb-2">
                  <FileEdit size={18} />
                  Plano de Ação Personalizado
                </h3>
                <p className="text-amber-700 mb-3">
                  Gere um plano de ação detalhado e personalizado com base nos seus resultados e seguindo a metodologia SMART.
                </p>
                <ActionButton 
                  onClick={handleGenerateActionPlan}
                  disabled={isGeneratingPlan}
                  variant="primary"
                >
                  {isGeneratingPlan ? "Gerando..." : "Criar Plano de Ação Personalizado"}
                </ActionButton>
              </div>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Seu Plano de Ação Personalizado (SMART):</h3>
              <ul className="list-decimal pl-5 space-y-3">
                {result.enhanced_action_plan && result.enhanced_action_plan.map((action, index) => (
                  <li key={index} className="text-gray-700">{action}</li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-green-200">
                <ActionButton
                  onClick={handleGenerateActionPlan}
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  disabled={isGeneratingPlan}
                >
                  {isGeneratingPlan ? "Gerando..." : "Regenerar Plano"}
                </ActionButton>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200 flex gap-4 flex-wrap">
            <ActionButton 
              onClick={onResetTest} 
              variant="outline"
              icon={RefreshCw}
            >
              Reiniciar Teste
            </ActionButton>
            <ActionButton 
              onClick={() => navigate("/membros")}
              variant="secondary"
              icon={ArrowLeft}
            >
              Voltar para Área de Membros
            </ActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseResult;
