
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
        console.log("Loading diagnostic data for user:", userId);
        const loadedData = await loadDiagnosticDataFromSupabase(userId);
        
        if (loadedData.results) {
          console.log("Loaded diagnostic results:", loadedData.results);
          setResults(loadedData.results);
        }
        
        if (loadedData.answersData) {
          console.log("Loaded diagnostic answers data");
          setAnswersData(loadedData.answersData);
        }
        
        if (loadedData.diagnosticId) {
          console.log("Loaded diagnostic ID:", loadedData.diagnosticId);
          setDiagnosticId(loadedData.diagnosticId);
        }
        
        if (loadedData.results && loadedData.answersData) {
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
