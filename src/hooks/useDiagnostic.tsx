
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
            
            // Check if the loaded result has all required properties
            if (
              loadedResults && 
              typeof loadedResults === 'object' && 
              'processos' in loadedResults && 
              'resultados' in loadedResults && 
              'sistemaGestao' in loadedResults && 
              'pessoas' in loadedResults
            ) {
              // Type assertion with validation
              const typedResults = loadedResults as unknown as DiagnosticResultsType;
              
              // Verify the structure is complete before setting
              if (
                typeof typedResults.processos === 'object' && 
                'score' in typedResults.processos &&
                'total' in typedResults.processos &&
                'percentage' in typedResults.processos &&
                typeof typedResults.resultados === 'object' && 
                'score' in typedResults.resultados &&
                'total' in typedResults.resultados &&
                'percentage' in typedResults.resultados &&
                typeof typedResults.sistemaGestao === 'object' && 
                'score' in typedResults.sistemaGestao &&
                'total' in typedResults.sistemaGestao &&
                'percentage' in typedResults.sistemaGestao &&
                typeof typedResults.pessoas === 'object' && 
                'score' in typedResults.pessoas &&
                'total' in typedResults.pessoas &&
                'percentage' in typedResults.pessoas
              ) {
                setResults(typedResults);
              }
            }
          }
          
          if (data.answers_data && typeof data.answers_data === 'object') {
            // Cast to the correct type with proper validation
            const loadedAnswersData = data.answers_data as Json;
            
            // Check if the loaded data has all required sections
            if (
              loadedAnswersData && 
              typeof loadedAnswersData === 'object' && 
              'processos' in loadedAnswersData && 
              'resultados' in loadedAnswersData && 
              'sistemaGestao' in loadedAnswersData && 
              'pessoas' in loadedAnswersData
            ) {
              // Type assertion with validation
              const typedAnswersData = loadedAnswersData as unknown as AnswersDataType;
              
              // Verify each section has the correct structure
              if (
                typeof typedAnswersData.processos === 'object' &&
                'title' in typedAnswersData.processos &&
                'answers' in typedAnswersData.processos &&
                Array.isArray(typedAnswersData.processos.answers) &&
                typeof typedAnswersData.resultados === 'object' &&
                'title' in typedAnswersData.resultados &&
                'answers' in typedAnswersData.resultados &&
                Array.isArray(typedAnswersData.resultados.answers) &&
                typeof typedAnswersData.sistemaGestao === 'object' &&
                'title' in typedAnswersData.sistemaGestao &&
                'answers' in typedAnswersData.sistemaGestao &&
                Array.isArray(typedAnswersData.sistemaGestao.answers) &&
                typeof typedAnswersData.pessoas === 'object' &&
                'title' in typedAnswersData.pessoas &&
                'answers' in typedAnswersData.pessoas &&
                Array.isArray(typedAnswersData.pessoas.answers)
              ) {
                setAnswersData(typedAnswersData);
              }
            }
          }
          
          if (data.action_plan && typeof data.action_plan === 'object') {
            // Cast to the correct type with proper validation
            const loadedActionPlan = data.action_plan as Json;
            
            if (loadedActionPlan && typeof loadedActionPlan === 'object') {
              // Type assertion with validation
              const typedActionPlan = loadedActionPlan as unknown as {[key: string]: string[]};
              
              // Check if it's a valid action plan structure
              let isValid = true;
              Object.entries(typedActionPlan).forEach(([key, value]) => {
                if (!Array.isArray(value)) {
                  isValid = false;
                }
              });
              
              if (isValid) {
                setActionPlan(typedActionPlan);
              }
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
                      action_plan: plan as unknown as Json
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
          .insert({
            user_id: userId,
            results: diagnosticData.results,
            answers_data: diagnosticData.answers_data,
            action_plan: diagnosticData.action_plan
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
