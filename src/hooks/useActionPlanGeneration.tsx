
import { useState, useEffect } from 'react';
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { generateActionPlan } from "@/utils/generateActionPlan";
import { saveDiagnosticToSupabase } from "@/utils/storage";
import { Json } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

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
  const [planGenerationAttempted, setPlanGenerationAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const generatePlan = async () => {
      if (!shouldGeneratePlan) return;
      
      if (showResults && Object.values(results).some(area => area.score > 0)) {
        setIsGeneratingPlan(true);
        setErrorMessage(null);
        
        try {
          console.log("Generating detailed action plan with answersData:", answersData);
          
          // Generate the detailed action plan
          const plan = await generateActionPlan(answersData, true);
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
            setPlanGenerationAttempted(true);
            
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
                setErrorMessage("Não foi possível salvar o plano de ação no banco de dados.");
              }
            }
          } else {
            throw new Error("Plano de ação vazio ou inválido");
          }
        } catch (error) {
          console.error("Error generating detailed action plan:", error);
          // Specific error messages based on the type of error
          if (error instanceof TypeError) {
            setErrorMessage("Erro de formato nos dados. Verifique se todas as respostas foram preenchidas corretamente.");
          } else if (error.message.includes("Network") || error.message.includes("fetch") || error.message.includes("timeout")) {
            setErrorMessage("Falha de conexão com o serviço de IA. Verifique sua conexão com a internet e tente novamente.");
          } else if (error.message.includes("vazio") || error.message.includes("inválido")) {
            setErrorMessage("O sistema não conseguiu gerar um plano de ação válido com base nas respostas fornecidas.");
          } else {
            setErrorMessage("Ocorreu um erro ao gerar o plano de ação. Por favor, tente novamente mais tarde.");
          }
          // Mark as attempted even if there was an error
          setPlanGenerationAttempted(true);
        } finally {
          setIsGeneratingPlan(false);
          setShouldGeneratePlan(false);
        }
      } else {
        setShouldGeneratePlan(false);
      }
    };
    
    generatePlan();
  }, [shouldGeneratePlan, showResults, results, answersData, userId, diagnosticId, setShouldGeneratePlan, toast]);
  
  const regenerateActionPlan = () => {
    setPlanGenerationAttempted(true); // Ensure we know an attempt has been made
    setErrorMessage(null);
    setShouldGeneratePlan(true);
  };

  return {
    actionPlan,
    isGeneratingPlan,
    regenerateActionPlan,
    setActionPlan,
    planGenerationAttempted,
    errorMessage
  };
};
