
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DiagnosticResults as DiagnosticResultsType, AnswersDataType } from "@/types/diagnostic";
import { generateActionPlan } from "@/utils/generateActionPlan";

export const useDiagnostic = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, userEmail } = useAuth();
  
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
    if (userEmail) {
      const savedResultsKey = `diagnostic_results_${userEmail}`;
      const savedAnswersKey = `diagnostic_answers_${userEmail}`;
      const savedActionPlanKey = `action_plan_${userEmail}`;
      
      const savedResults = localStorage.getItem(savedResultsKey);
      const savedAnswers = localStorage.getItem(savedAnswersKey);
      const savedActionPlan = localStorage.getItem(savedActionPlanKey);
      
      if (savedResults) {
        setResults(JSON.parse(savedResults));
        setShowResults(true);
      }
      
      if (savedAnswers) {
        setAnswersData(JSON.parse(savedAnswers));
      }
      
      if (savedActionPlan) {
        setActionPlan(JSON.parse(savedActionPlan));
      }
    }

    setIsLoading(false);
  }, [isAuthenticated, navigate, toast, userEmail]);
  
  // Generate action plan only when explicitly requested
  useEffect(() => {
    const generatePlan = async () => {
      if (shouldGeneratePlan && showResults && Object.values(results).some(area => area.score > 0)) {
        setIsGeneratingPlan(true);
        try {
          const plan = await generateActionPlan(results, answersData);
          setActionPlan(plan);
          
          // Save the action plan to localStorage
          if (userEmail) {
            localStorage.setItem(`action_plan_${userEmail}`, JSON.stringify(plan));
          }
          
          // Reset the flag after plan generation
          setShouldGeneratePlan(false);
        } catch (error) {
          console.error("Error generating action plan:", error);
          toast({
            variant: "destructive",
            title: "Erro ao gerar plano de ação",
            description: "Ocorreu um erro ao gerar o plano de ação detalhado.",
          });
        } finally {
          setIsGeneratingPlan(false);
        }
      }
    };
    
    generatePlan();
  }, [shouldGeneratePlan, showResults, results, answersData, userEmail, toast]);

  // Save diagnostic results and trigger plan generation
  const handleSubmit = () => {
    if (userEmail) {
      const resultsKey = `diagnostic_results_${userEmail}`;
      const answersKey = `diagnostic_answers_${userEmail}`;
      
      localStorage.setItem(resultsKey, JSON.stringify(results));
      localStorage.setItem(answersKey, JSON.stringify(answersData));
      
      setShowResults(true);
      // Set the flag to trigger plan generation
      setShouldGeneratePlan(true);
      
      toast({
        title: "Diagnóstico salvo!",
        description: "Os resultados foram salvos e estão disponíveis na sua conta.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar seu diagnóstico.",
      });
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
    handleSubmit
  };
};
