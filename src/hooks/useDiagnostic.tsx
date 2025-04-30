
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { saveDiagnosticToSupabase } from "@/utils/diagnosticUtils";
import { useDiagnosticData } from "@/hooks/useDiagnosticData";
import { useActionPlanGeneration } from "@/hooks/useActionPlanGeneration";

export const useDiagnostic = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [shouldGeneratePlan, setShouldGeneratePlan] = useState(false);
  
  const {
    results,
    setResults,
    answersData,
    setAnswersData,
    showResults,
    setShowResults,
    isLoading,
    diagnosticId,
    setDiagnosticId,
  } = useDiagnosticData();
  
  const {
    actionPlan,
    isGeneratingPlan,
    regenerateActionPlan,
    setActionPlan
  } = useActionPlanGeneration(
    userId,
    diagnosticId,
    showResults,
    results,
    answersData,
    shouldGeneratePlan,
    setShouldGeneratePlan
  );

  // Save diagnostic results and trigger plan generation
  const handleSubmit = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar seu diagnóstico.",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const { result, diagnosticId: newDiagnosticId } = await saveDiagnosticToSupabase(
        userId,
        diagnosticId,
        results,
        answersData,
        actionPlan
      );
      
      if (result?.error) throw result.error;
      
      if (newDiagnosticId) {
        setDiagnosticId(newDiagnosticId);
      }
      
      setShowResults(true);
      // Set the flag to trigger plan generation
      setShouldGeneratePlan(true);
      
      toast({
        title: "Diagnóstico salvo!",
        description: "Gerando seu plano de ação personalizado...",
      });
    } catch (error: any) {
      console.error("Erro ao salvar diagnóstico:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao salvar o diagnóstico.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    setResults,
    showResults,
    setShowResults,
    isLoading,
    isGeneratingPlan,
    answersData,
    setAnswersData,
    actionPlan,
    handleSubmit,
    regenerateActionPlan
  };
};
