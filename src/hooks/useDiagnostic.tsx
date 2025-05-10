
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useDiagnosticData } from "@/hooks/useDiagnosticData";
import { useActionPlanGeneration } from "@/hooks/useActionPlanGeneration";
import { saveDiagnosticToSupabase, deleteDiagnosticFromSupabase } from "@/utils/storage";
import { DiagnosticResults } from "@/types/diagnostic";

export const useDiagnostic = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  
  // Get diagnostic data from useDiagnosticData hook
  const {
    results,
    setResults,
    answersData,
    setAnswersData,
    showResults,
    setShowResults,
    isLoading,
    diagnosticId,
    setDiagnosticId
  } = useDiagnosticData();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldGeneratePlan, setShouldGeneratePlan] = useState(false);

  // Get action plan generation from useActionPlanGeneration hook
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

  const calculateResults = (sections: any, answers: any) => {
    const newResults: DiagnosticResults = {
      processos: { score: 0, total: 0, percentage: 0 },
      resultados: { score: 0, total: 0, percentage: 0 },
      sistemaGestao: { score: 0, total: 0, percentage: 0 },
      pessoas: { score: 0, total: 0, percentage: 0 }
    };

    // Process each section from the diagnostic test sections data
    Object.keys(sections).forEach(sectionKey => {
      const section = sections[sectionKey];
      let sectionScore = 0;
      
      // Calculate score based on answers in answersData
      if (answersData[sectionKey] && answersData[sectionKey].answers) {
        answersData[sectionKey].answers.forEach(answer => {
          if (answer.answer === 'satisfactory') {
            sectionScore += section.pointValue;
          } else if (answer.answer === 'unsatisfactory') {
            sectionScore += section.pointValue / 2;
          }
        });
      }
      
      const sectionTotal = section.questions.length * section.pointValue;
      const percentage = sectionTotal > 0 ? Math.round((sectionScore / sectionTotal) * 100) : 0;
      
      newResults[sectionKey] = {
        score: sectionScore,
        total: sectionTotal,
        percentage: percentage
      };
    });

    return newResults;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShouldGeneratePlan(true);

    try {
      // Import the diagnostic sections data dynamically to avoid circular dependencies
      const { diagnosticSectionsData } = await import('@/data/diagnosticSections');
      const calculatedResults = calculateResults(diagnosticSectionsData, answersData);
      setResults(calculatedResults);

      // Save to Supabase (without action plan, which will be generated later)
      if (userId) {
        const { result, diagnosticId: newDiagnosticId } = await saveDiagnosticToSupabase(
          userId, 
          diagnosticId, 
          calculatedResults, 
          answersData,
          {} // Empty action plan, will be updated after generation
        );

        if (result.error) {
          throw result.error;
        }

        setDiagnosticId(newDiagnosticId);
      }

      setShowResults(true);
      
    } catch (error) {
      console.error("Erro ao finalizar diagnóstico:", error);
      toast({
        variant: "destructive",
        title: "Erro ao finalizar diagnóstico",
        description: "Não foi possível salvar os resultados. Por favor, tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetDiagnostic = async () => {
    if (userId) {
      try {
        await deleteDiagnosticFromSupabase(userId);
        
        setResults({
          processos: { score: 0, total: 0, percentage: 0 },
          resultados: { score: 0, total: 0, percentage: 0 },
          sistemaGestao: { score: 0, total: 0, percentage: 0 },
          pessoas: { score: 0, total: 0, percentage: 0 }
        });
        
        setShowResults(false);
        setAnswersData({});
        setActionPlan({});
        setIsSubmitting(false);
        setShouldGeneratePlan(false);
        setDiagnosticId(null);
        
        toast({
          title: "Diagnóstico reiniciado",
          description: "Todos os dados foram apagados. Você pode realizar um novo diagnóstico."
        });
        
        // Force refresh the page
        window.location.reload();
        
        return true;
      } catch (error) {
        console.error("Erro ao resetar diagnóstico:", error);
        
        toast({
          variant: "destructive",
          title: "Erro ao resetar diagnóstico",
          description: "Não foi possível apagar os dados do diagnóstico."
        });
        
        return false;
      }
    }
    return false;
  };
  
  return {
    results,
    setResults,
    showResults,
    setShowResults,
    isLoading,
    isSubmitting,
    isGeneratingPlan,
    answersData,
    setAnswersData,
    actionPlan,
    setActionPlan,
    handleSubmit,
    resetDiagnostic,
    regenerateActionPlan,
  };
};
