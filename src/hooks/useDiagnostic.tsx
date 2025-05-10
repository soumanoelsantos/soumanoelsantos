
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const useDiagnostic = () => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const [results, setResults] = useState(null);
  const [answersData, setAnswersData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    // Load saved diagnostic results when component mounts
    const loadSavedResults = async () => {
      if (!userId || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("diagnostic_results")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setResults(data.results);
          setAnswersData(data.answers_data || {});
          setShowResults(true);
        }
      } catch (error) {
        console.error("Error loading diagnostic results:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar resultados",
          description: "Não foi possível carregar os resultados do diagnóstico."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedResults();
  }, [userId, isAuthenticated, toast]);

  const handleSubmit = async (newResults, newAnswersData) => {
    setResults(newResults);
    setAnswersData(newAnswersData);
    setShowResults(true);

    if (userId) {
      try {
        // Check if a diagnostic exists for this user
        const { data, error } = await supabase
          .from("diagnostic_results")
          .select("id")
          .eq("user_id", userId);

        if (error) throw error;

        const diagnosticData = {
          user_id: userId,
          results: newResults,
          answers_data: newAnswersData
        };

        if (data && data.length > 0) {
          // Update existing diagnostic
          await supabase
            .from("diagnostic_results")
            .update(diagnosticData)
            .eq("user_id", userId);
        } else {
          // Create new diagnostic
          await supabase.from("diagnostic_results").insert([diagnosticData]);
        }
      } catch (error) {
        console.error("Error saving diagnostic results:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar resultados",
          description: "Os resultados foram calculados mas não puderam ser salvos."
        });
      }
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
    handleSubmit
  };
};

export default useDiagnostic;
