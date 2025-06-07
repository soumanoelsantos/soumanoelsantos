
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loadDiagnosticDataFromSupabase } from "@/utils/storage";
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { initialDiagnosticState } from "@/types/diagnosticState";

export const useDiagnosticData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  
  const [results, setResults] = useState<DiagnosticResults>(initialDiagnosticState.results);
  const [answersData, setAnswersData] = useState<AnswersDataType>(initialDiagnosticState.answersData);
  const [showResults, setShowResults] = useState(initialDiagnosticState.showResults);
  const [isLoading, setIsLoading] = useState(initialDiagnosticState.isLoading);
  const [diagnosticId, setDiagnosticId] = useState<string | null>(initialDiagnosticState.diagnosticId);

  // Check authentication and load saved data
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
      return;
    }

    // Load saved diagnostic results when authenticated
    const loadDiagnosticData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const loadedData = await loadDiagnosticDataFromSupabase(userId);
        
        if (loadedData?.results) {
          setResults(loadedData.results as unknown as DiagnosticResults);
        }
        
        if (loadedData?.answers_data) {
          setAnswersData(loadedData.answers_data as unknown as AnswersDataType);
        }
        
        if (loadedData?.id) {
          setDiagnosticId(loadedData.id);
        }
        
        if (loadedData?.results && loadedData?.answers_data) {
          setShowResults(true);
        }
      } catch (error) {
        console.error("Erro ao carregar diagnóstico:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagnosticData();
  }, [isAuthenticated, navigate, toast, userId]);

  return {
    results,
    setResults,
    answersData,
    setAnswersData,
    showResults,
    setShowResults,
    isLoading,
    setIsLoading,
    diagnosticId,
    setDiagnosticId,
  };
};
