
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { generateActionPlan } from "@/utils/generateActionPlan";
import { saveDiagnosticToSupabase } from "@/utils/storage";
import { Json } from "@/integrations/supabase/types";

export const useActionPlanGeneration = (
  userId: string | undefined,
  diagnosticId: string | null,
  showResults: boolean,
  results: DiagnosticResults,
  answersData: AnswersDataType,
  shouldGeneratePlan: boolean,
  setShouldGeneratePlan: (value: boolean) => void
) => {
  const [actionPlan, setActionPlan] = useState<{[key: string]: string[]}>({});
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    const generatePlan = async () => {
      if (!shouldGeneratePlan) return;
      
      if (showResults && Object.values(results).some(area => area.score > 0)) {
        setIsGeneratingPlan(true);
        
        try {
          console.log("Generating detailed action plan with answersData:", answersData);
          
          // Generate the detailed action plan
          const plan = await generateActionPlan(answersData, true); // Added parameter to request detailed plan
          console.log("Generated detailed action plan:", plan);
          
          if (plan && Object.keys(plan).length > 0) {
            // Make sure we're setting an object with string arrays as values
            const formattedPlan: {[key: string]: string[]} = {};
            
            // If plan is an array, convert it to an object with a single key
            if (Array.isArray(plan)) {
              formattedPlan['actions'] = plan;
            } else {
              // It's already in the right format
              Object.assign(formattedPlan, plan);
            }
            
            setActionPlan(formattedPlan);
            
            // Save the action plan in Supabase
            if (userId) {
              try {
                await saveDiagnosticToSupabase(
                  userId,
                  diagnosticId,
                  results,
                  answersData,
                  formattedPlan
                );
                console.log("Detailed action plan saved to Supabase");
              } catch (error) {
                console.error("Erro ao salvar plano de ação:", error);
                throw new Error("Falha ao salvar o plano de ação no banco de dados");
              }
            }
            
            toast("Plano de ação gerado e salvo!", {
              description: "O plano personalizado detalhado foi gerado com base nas suas respostas e salvo com sucesso."
            });
          } else {
            throw new Error("Plano de ação vazio ou inválido");
          }
        } catch (error) {
          console.error("Error generating detailed action plan:", error);
          toast("Erro ao gerar plano de ação", {
            description: "Ocorreu um erro ao gerar o plano de ação detalhado. Tente novamente.",
            variant: "destructive"
          });
        } finally {
          setIsGeneratingPlan(false);
          setShouldGeneratePlan(false);
        }
      } else {
        setShouldGeneratePlan(false);
      }
    };
    
    generatePlan();
  }, [shouldGeneratePlan, showResults, results, answersData, userId, diagnosticId, setShouldGeneratePlan]);
  
  const regenerateActionPlan = () => {
    setShouldGeneratePlan(true);
  };

  return {
    actionPlan,
    isGeneratingPlan,
    regenerateActionPlan,
    setActionPlan
  };
};
