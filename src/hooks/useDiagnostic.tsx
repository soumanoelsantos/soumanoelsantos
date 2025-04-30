
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticResults as DiagnosticResultsType, AnswersDataType } from "@/types/diagnostic";
import { generateActionPlan } from "@/utils/generateActionPlan";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export const useDiagnostic = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  
  const [results, setResults] = useState<DiagnosticResultsType>({
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  });
  
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actionPlan, setActionPlan] = useState<{[key: string]: string[]}>({});
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [answersData, setAnswersData] = useState<AnswersDataType>({
    processos: { title: "", answers: [] },
    resultados: { title: "", answers: [] },
    sistemaGestao: { title: "", answers: [] },
    pessoas: { title: "", answers: [] }
  });
  const [shouldGeneratePlan, setShouldGeneratePlan] = useState(false);
  const [diagnosticId, setDiagnosticId] = useState<string | null>(null);

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
        const { data, error } = await supabase
          .from('diagnostic_results')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
          throw error;
        }

        if (data) {
          if (data.results && typeof data.results === 'object') {
            // Cast to the correct type with proper validation
            const loadedResults = data.results as Json;
            if (
              loadedResults && 
              typeof loadedResults === 'object' && 
              'processos' in loadedResults && 
              'resultados' in loadedResults && 
              'sistemaGestao' in loadedResults && 
              'pessoas' in loadedResults
            ) {
              setResults(loadedResults as DiagnosticResultsType);
            }
          }
          
          if (data.answers_data && typeof data.answers_data === 'object') {
            // Cast to the correct type with proper validation
            const loadedAnswersData = data.answers_data as Json;
            if (
              loadedAnswersData && 
              typeof loadedAnswersData === 'object' && 
              'processos' in loadedAnswersData && 
              'resultados' in loadedAnswersData && 
              'sistemaGestao' in loadedAnswersData && 
              'pessoas' in loadedAnswersData
            ) {
              setAnswersData(loadedAnswersData as AnswersDataType);
            }
          }
          
          if (data.action_plan && typeof data.action_plan === 'object') {
            // Cast to the correct type with proper validation
            const loadedActionPlan = data.action_plan as Json;
            if (loadedActionPlan && typeof loadedActionPlan === 'object') {
              setActionPlan(loadedActionPlan as {[key: string]: string[]});
            }
          }
          
          setShowResults(true);
          setDiagnosticId(data.id);
        }
      } catch (error) {
        console.error("Erro ao carregar diagnóstico:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDiagnosticData();
  }, [isAuthenticated, navigate, toast, userId]);
  
  // Generate action plan only when explicitly requested
  useEffect(() => {
    const generatePlan = async () => {
      if (!shouldGeneratePlan) return;
      
      if (showResults && Object.values(results).some(area => area.score > 0)) {
        setIsGeneratingPlan(true);
        
        try {
          console.log("Generating action plan with results:", results);
          console.log("And answers data:", answersData);
          
          const plan = await generateActionPlan(results, answersData);
          console.log("Generated action plan:", plan);
          
          if (plan && Object.keys(plan).length > 0) {
            setActionPlan(plan);
            
            // Salvar o plano de ação no Supabase
            if (userId) {
              try {
                let result;
                
                if (diagnosticId) {
                  // Atualizar diagnóstico existente
                  result = await supabase
                    .from('diagnostic_results')
                    .update({
                      action_plan: plan as Json
                    })
                    .eq('id', diagnosticId);
                } else {
                  // Inserir novo diagnóstico
                  result = await supabase
                    .from('diagnostic_results')
                    .insert({
                      user_id: userId,
                      results: results as unknown as Json,
                      answers_data: answersData as unknown as Json,
                      action_plan: plan as unknown as Json
                    });
                    
                  const { data, error } = await supabase
                    .from('diagnostic_results')
                    .select('id')
                    .eq('user_id', userId)
                    .single();
                    
                  if (!error && data) {
                    setDiagnosticId(data.id);
                  }
                }
                
                if (result?.error) throw result.error;
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
  }, [shouldGeneratePlan, showResults, results, answersData, userId, toast, diagnosticId]);

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
      
      const diagnosticData = {
        user_id: userId,
        results: results as unknown as Json,
        answers_data: answersData as unknown as Json,
        action_plan: actionPlan as unknown as Json
      };
      
      let result;
      
      if (diagnosticId) {
        // Atualizar diagnóstico existente
        result = await supabase
          .from('diagnostic_results')
          .update({
            results: diagnosticData.results,
            answers_data: diagnosticData.answers_data,
            action_plan: diagnosticData.action_plan
          })
          .eq('id', diagnosticId);
      } else {
        // Inserir novo diagnóstico
        result = await supabase
          .from('diagnostic_results')
          .insert([{
            user_id: userId,
            results: diagnosticData.results,
            answers_data: diagnosticData.answers_data,
            action_plan: diagnosticData.action_plan
          }]);
          
        const { data, error } = await supabase
          .from('diagnostic_results')
          .select('id')
          .eq('user_id', userId)
          .single();
          
        if (!error && data) {
          setDiagnosticId(data.id);
        }
      }
      
      if (result?.error) throw result.error;
      
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

  const regenerateActionPlan = () => {
    setShouldGeneratePlan(true);
    toast({
      title: "Regenerando plano de ação",
      description: "Aguarde enquanto geramos um novo plano personalizado...",
    });
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
