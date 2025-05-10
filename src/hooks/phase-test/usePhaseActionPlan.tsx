
import { useState, useEffect } from "react";
import { PhaseTestResult } from "@/types/phaseTest";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateEnhancedActionPlan } from "@/utils/deepseekApi";

export const usePhaseActionPlan = (userId: string | undefined, result: PhaseTestResult | null) => {
  const { toast } = useToast();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [showEnhancedPlan, setShowEnhancedPlan] = useState(false);
  
  // Verificar se já existe um plano de ação aprimorado ao carregar o componente
  useEffect(() => {
    if (result && result.enhanced_action_plan && result.enhanced_action_plan.length > 0) {
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
      // Buscar dados de outros diagnósticos e ferramentas se disponíveis
      const { data: diagnosticData } = await supabase
        .from('diagnostic_results')
        .select('results, answers_data')
        .eq('user_id', userId)
        .maybeSingle();
      
      // Buscar dados da SWOT se disponíveis
      const { data: swotData } = await supabase
        .from('user_tools_data')
        .select('swot_data')
        .eq('user_id', userId)
        .maybeSingle();
      
      // Preparar dados combinados para entrada da IA
      const inputData = {
        phaseResult: result,
        diagnosticData: diagnosticData || null,
        swotData: swotData?.swot_data || null
      };
      
      console.log("Enviando dados para IA para geração do plano:", inputData);
      
      // Gerar plano de ação aprimorado usando IA
      const generatedPlan = await generateEnhancedActionPlan(inputData);
      console.log("Plano gerado recebido:", generatedPlan);
      
      if (generatedPlan) {
        // Formatar o plano como uma lista de itens de ação
        const actionItems = Array.isArray(generatedPlan) 
          ? generatedPlan 
          : Object.values(generatedPlan).flat();
        
        console.log("Itens de ação formatados:", actionItems);
        
        // Salvar o plano de ação aprimorado no banco de dados
        if (userId) {
          console.log("Salvando plano no banco de dados para o usuário:", userId);
          // Verificar se já existe um resultado para este usuário
          const { data: existingResult } = await supabase
            .from('fase_results')
            .select('id')
            .eq('user_id', userId)
            .maybeSingle();

          if (existingResult) {
            // Atualizar o resultado existente
            const { error } = await supabase
              .from('fase_results')
              .update({
                enhanced_action_plan: actionItems
              })
              .eq('user_id', userId);
            
            if (error) {
              console.error("Erro ao salvar no banco de dados:", error);
              throw error;
            }
          } else {
            // Inserir novo resultado
            const { error } = await supabase
              .from('fase_results')
              .insert([{
                user_id: userId,
                phase_name: result?.phaseName || '',
                score: result?.score || 0,
                description: result?.description || '',
                recommendations: result?.recommendations ? result.recommendations.join('|') : '',
                answers: result?.answers ? JSON.stringify(result.answers) : null,
                enhanced_action_plan: actionItems
              }]);
            
            if (error) {
              console.error("Erro ao inserir no banco de dados:", error);
              throw error;
            }
          }
        }
        
        // Atualizar estado local com o novo plano
        if (result) {
          result.enhanced_action_plan = actionItems;
        }
        
        setShowEnhancedPlan(true);
        
        toast({
          title: "Plano de ação gerado",
          description: "Criamos um plano personalizado com base nos seus resultados."
        });
      } else {
        throw new Error("Não foi possível gerar o plano de ação");
      }
    } catch (error) {
      console.error("Erro ao gerar plano de ação aprimorado:", error);
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
