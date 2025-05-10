
import { useState, useEffect } from "react";
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
          console.log("Generating action plan with answersData:", answersData);
          
          const plan = await generateActionPlan(answersData);
          console.log("Generated action plan:", plan);
          
          if (plan && Object.keys(plan).length > 0) {
            setActionPlan(plan);
            
            // Save the action plan in Supabase
            if (userId) {
              try {
                await saveDiagnosticToSupabase(
                  userId,
                  diagnosticId,
                  results,
                  answersData,
                  plan
                );
              } catch (error) {
                console.error("Erro ao salvar plano de ação:", error);
              }
            }
            
            toast({
              title: "Plano de ação gerado!",
              description: "O plano personalizado foi gerado com base nas suas respostas.",
            });
          } else {
            throw new Error("Plano de ação vazio ou inválido");
          }
        } catch (error) {
          console.error("Error generating action plan:", error);
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
      title: "Regenerando plano de ação",
      description: "Aguarde enquanto geramos um novo plano personalizado...",
    });
  };

  return {
    actionPlan,
    isGeneratingPlan,
    regenerateActionPlan,
    setActionPlan
  };
};
