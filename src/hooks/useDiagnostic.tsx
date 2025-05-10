
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { deleteDiagnosticFromSupabase } from "@/utils/storage/diagnosticUtils";

export const useDiagnostic = () => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const [results, setResults] = useState(null);
  const [answersData, setAnswersData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved diagnostic results when component mounts
    const loadSavedResults = async () => {
      if (!userId || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Attempting to load diagnostic results for user:", userId);
        setIsLoading(true);
        
        // Use array notation with .eq instead of .single()
        const { data, error } = await supabase
          .from("diagnostic_results")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching diagnostic results:", error);
          setLoadError(error);
          throw error;
        }

        // Check if we got results back (as an array)
        if (data && data.length > 0) {
          console.log("Diagnostic results loaded successfully:", data[0]);
          setResults(data[0].results);
          setAnswersData(data[0].answers_data || {});
          setShowResults(true);
          setLoadError(null);
        } else {
          console.log("No diagnostic results found for user");
          setResults(null);
          setAnswersData({});
          setShowResults(false);
        }
      } catch (error) {
        console.error("Error loading diagnostic results:", error);
        setLoadError(error as Error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar resultados",
          description: "Não foi possível carregar os resultados do diagnóstico. Tente novamente."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedResults();
  }, [userId, isAuthenticated, toast]);

  const handleSubmit = async (newResults, newAnswersData) => {
    // Prevent multiple submissions
    if (isSaving) return;
    
    // Set saving state to true at the start
    setIsSaving(true);
    
    // Update local state with the results and answers
    setResults(newResults);
    setAnswersData(newAnswersData);
    
    if (userId) {
      try {
        console.log("Saving diagnostic results for user:", userId);
        
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
          const { error: updateError } = await supabase
            .from("diagnostic_results")
            .update(diagnosticData)
            .eq("user_id", userId);
            
          if (updateError) throw updateError;
          console.log("Updated existing diagnostic results");
        } else {
          // Create new diagnostic
          const { error: insertError } = await supabase
            .from("diagnostic_results")
            .insert([diagnosticData]);
            
          if (insertError) throw insertError;
          console.log("Created new diagnostic results");
        }

        toast({
          title: "Diagnóstico salvo",
          description: "Seus resultados foram salvos com sucesso."
        });
      } catch (error) {
        console.error("Error saving diagnostic results:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar resultados",
          description: "Os resultados foram calculados mas não puderam ser salvos."
        });
      }
    }
    
    // Set showResults to true only after all operations complete
    setShowResults(true);
    setIsSaving(false);
  };
  
  const resetDiagnostic = async () => {
    console.log("Resetting diagnostic");
    
    // Reset state first to ensure immediate UI feedback
    setResults(null);
    setAnswersData({});
    setShowResults(false);
    
    // Delete from database if user is logged in
    if (userId && isAuthenticated) {
      try {
        setIsLoading(true);
        console.log("Attempting to delete diagnostic results for user:", userId);
        
        try {
          // Try to delete using our utility function
          await deleteDiagnosticFromSupabase(userId);
          console.log("Diagnostic deletion via utility function successful");
        } catch (utilError) {
          console.error("Deletion via utility function failed, trying direct deletion:", utilError);
          
          // Fallback: direct deletion
          const { error } = await supabase
            .from("diagnostic_results")
            .delete()
            .eq("user_id", userId);
            
          if (error) {
            throw error;
          } else {
            console.log("Direct diagnostic deletion successful");
          }
        }
        
        toast({
          title: "Diagnóstico reiniciado",
          description: "Você pode realizar um novo diagnóstico agora."
        });
      } catch (error) {
        console.error("Error deleting diagnostic results:", error);
        
        // Even if database deletion failed, we've already reset the local state
        // So inform the user they can still proceed but with a warning
        toast({
          variant: "destructive",
          title: "Erro ao excluir resultados anteriores",
          description: "O diagnóstico foi reiniciado localmente, mas houve um erro ao excluir os resultados anteriores do banco de dados."
        });
      } finally {
        setIsLoading(false);
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
    handleSubmit,
    resetDiagnostic,
    loadError
  };
};

export default useDiagnostic;
