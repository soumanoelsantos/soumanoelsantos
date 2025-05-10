
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
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
              }
            }
            
            toast({
              title: "Plano de ação gerado!",
              description: "O plano personalizado detalhado foi gerado com base nas suas respostas.",
            });
          } else {
            throw new Error("Plano de ação vazio ou inválido");
          }
        } catch (error) {
          console.error("Error generating detailed action plan:", error);
          toast({
            variant: "destructive",
            title: "Erro ao gerar plano de ação",
            description: "Ocorreu um erro ao gerar o plano de ação detalhado. Tente novamente.",
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
  }, [shouldGeneratePlan, showResults, results, answersData, userId, toast, diagnosticId, setShouldGeneratePlan]);
  
  const regenerateActionPlan = () => {
    setShouldGeneratePlan(true);
    toast({
      title: "Gerando plano de ação",
      description: "Aguarde enquanto geramos um novo plano personalizado baseado nas suas respostas...",
    });
  };

  return {
    actionPlan,
    isGeneratingPlan,
    regenerateActionPlan,
    setActionPlan
  };
};
