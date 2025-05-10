import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  loadDiagnosticDataFromSupabase,
  saveDiagnosticToSupabase,
  deleteDiagnosticFromSupabase
} from "@/utils/storage";
import { DiagnosticSections as DiagnosticSectionsType, DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { generateActionPlan } from "@/utils/deepseekApi";

const initialResults = {
  processos: { score: 0, total: 0, percentage: 0 },
  resultados: { score: 0, total: 0, percentage: 0 },
  sistemaGestao: { score: 0, total: 0, percentage: 0 },
  pessoas: { score: 0, total: 0, percentage: 0 }
};

export const useDiagnostic = () => {
  const { userId, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [results, setResults] = useState<DiagnosticResults>(initialResults);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [answersData, setAnswersData] = useState<AnswersDataType>({});
  const [actionPlan, setActionPlan] = useState<{ [key: string]: string[] }>({});
  const [diagnosticId, setDiagnosticId] = useState<string | null>(null);

  useEffect(() => {
    const loadDiagnostic = async () => {
      if (!isAuthenticated || !userId) {
        setIsLoading(false);
        return;
      }

      try {
        const { results, answersData, actionPlan, diagnosticId } = await loadDiagnosticDataFromSupabase(userId);
        if (results) {
          setResults(results);
        }
        if (answersData) {
          setAnswersData(answersData);
        }
        if (actionPlan) {
          setActionPlan(actionPlan);
        }
        if (diagnosticId) {
          setDiagnosticId(diagnosticId);
        }
        setShowResults(!!(results && actionPlan));
      } catch (error) {
        console.error("Erro ao carregar diagnóstico:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar diagnóstico",
          description: "Não foi possível carregar os dados do diagnóstico."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagnostic();
  }, [userId, isAuthenticated, toast]);

  const calculateResults = (sections: DiagnosticSectionsType, answers: any) => {
    const newResults: DiagnosticResults = {
      processos: { score: 0, total: 0, percentage: 0 },
      resultados: { score: 0, total: 0, percentage: 0 },
      sistemaGestao: { score: 0, total: 0, percentage: 0 },
      pessoas: { score: 0, total: 0, percentage: 0 }
    };

    Object.keys(sections).forEach(sectionKey => {
      const section = sections[sectionKey];
      const answer = answers[sectionKey];

      if (answer === 'yes') {
        newResults[sectionKey].score += section.pointValue;
      }
      newResults[sectionKey].total += section.pointValue;
      newResults[sectionKey].percentage = (newResults[sectionKey].score / newResults[sectionKey].total) * 100;
    });

    return newResults;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsGeneratingPlan(true);

    try {
      const calculatedResults = calculateResults(diagnosticSectionsData, results);
      setResults(calculatedResults);

      // Generate action plan
      const generatedActionPlan = await generateActionPlan(answersData);
      setActionPlan(generatedActionPlan);

      // Save to Supabase
      if (isAuthenticated && userId) {
        const { result, diagnosticId: newDiagnosticId } = await saveDiagnosticToSupabase(userId, diagnosticId, calculatedResults, answersData, generatedActionPlan);

        if (result.error) {
          throw result.error;
        }

        setDiagnosticId(newDiagnosticId);
      }

      setShowResults(true);
      toast({
        title: "Diagnóstico concluído",
        description: "Seu plano de ação foi gerado com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao finalizar diagnóstico:", error);
      toast({
        variant: "destructive",
        title: "Erro ao finalizar diagnóstico",
        description: "Não foi possível gerar o plano de ação. Por favor, tente novamente."
      });
    } finally {
      setIsSubmitting(false);
      setIsGeneratingPlan(false);
    }
  };

  const resetDiagnostic = async () => {
    if (userId) {
      try {
        await deleteDiagnosticFromSupabase(userId);
        setResults(initialResults);
        setShowResults(false);
        setAnswersData({});
        setActionPlan({});
        setIsSubmitting(false);
        setIsGeneratingPlan(false);
        setDiagnosticId(null);
        
        toast({
          title: "Diagnóstico reiniciado",
          description: "Todos os dados foram apagados. Você pode realizar um novo diagnóstico."
        });
        
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
  };
};

