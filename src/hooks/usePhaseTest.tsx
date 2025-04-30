
import { useState, useEffect } from "react";
import { phaseTestData } from "../data/phaseTestData";
import { useToast } from "@/hooks/use-toast";
import { PhaseTestResult } from "../types/phaseTest";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const usePhaseTest = () => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PhaseTestResult | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      if (!isAuthenticated || !userId) {
        // Inicializar respostas
        const initialAnswers: { [key: number]: number[] } = {};
        phaseTestData.forEach((phase, index) => {
          initialAnswers[index] = new Array(phase.questions.length).fill(0);
        });
        setAnswers(initialAnswers);
        setIsLoading(false);
        return;
      }

      try {
        // Buscar resultados do teste de fase do Supabase
        const { data, error } = await supabase
          .from('fase_results')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
          throw error;
        }

        if (data) {
          // Converta a string de recommendations para array se necessário
          let recommendations: string[] = [];
          if (data.recommendations) {
            if (typeof data.recommendations === 'string') {
              // Se for uma string, transforme em um array
              recommendations = [data.recommendations];
            } else if (Array.isArray(data.recommendations)) {
              // Se já for um array, use-o diretamente
              recommendations = data.recommendations;
            }
          }
          
          const resultData: PhaseTestResult = {
            phaseName: data.phase_name,
            score: data.score,
            description: data.description || "",
            recommendations: recommendations
          };
          
          setResult(resultData);
          setCompleted(true);
          setShowResult(true);
        }
      } catch (error) {
        console.error("Erro ao carregar resultados do teste:", error);
      } finally {
        // Inicializar respostas
        const initialAnswers: { [key: number]: number[] } = {};
        phaseTestData.forEach((phase, index) => {
          initialAnswers[index] = new Array(phase.questions.length).fill(0);
        });
        setAnswers(initialAnswers);
        setIsLoading(false);
      }
    };

    loadResults();
  }, [userId, isAuthenticated]);
  
  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      if (!newAnswers[currentPhaseIndex]) {
        newAnswers[currentPhaseIndex] = new Array(phaseTestData[currentPhaseIndex].questions.length).fill(0);
      }
      newAnswers[currentPhaseIndex][questionIndex] = value;
      return newAnswers;
    });
  };
  
  const handleNext = () => {
    if (currentPhaseIndex < phaseTestData.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };
  
  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(prev => prev - 1);
    }
  };
  
  const calculateResult = async () => {
    const phaseScores: number[] = [];
    
    // Calculate score for each phase
    phaseTestData.forEach((phase, phaseIndex) => {
      const phaseAnswers = answers[phaseIndex];
      const yesCount = phaseAnswers.filter(answer => answer === 1).length;
      const phaseScore = (yesCount / phaseAnswers.length) * 100;
      phaseScores.push(phaseScore);
    });
    
    // Find the phase with the highest score
    let highestScoreIndex = 0;
    let highestScore = phaseScores[0];
    
    for (let i = 1; i < phaseScores.length; i++) {
      if (phaseScores[i] > highestScore) {
        highestScore = phaseScores[i];
        highestScoreIndex = i;
      }
    }
    
    const resultData: PhaseTestResult = {
      phaseName: phaseTestData[highestScoreIndex].phase,
      score: highestScore,
      description: phaseTestData[highestScoreIndex].description,
      recommendations: phaseTestData[highestScoreIndex].recommendations
    };
    
    setResult(resultData);
    setCompleted(true);
    setShowResult(true);
    
    // Salvar resultado no Supabase se o usuário estiver autenticado
    if (isAuthenticated && userId) {
      try {
        // Verificar se já existe um resultado para este usuário
        const { data, error: selectError } = await supabase
          .from('fase_results')
          .select('id')
          .eq('user_id', userId);
        
        if (selectError) throw selectError;
        
        const resultToSave = {
          user_id: userId,
          phase_name: resultData.phaseName,
          score: resultData.score,
          description: resultData.description,
          recommendations: resultData.recommendations.join('|') // Converte array para string
        };
        
        if (data && data.length > 0) {
          // Atualizar resultado existente
          const { error: updateError } = await supabase
            .from('fase_results')
            .update(resultToSave)
            .eq('user_id', userId);
          
          if (updateError) throw updateError;
        } else {
          // Inserir novo resultado
          const { error: insertError } = await supabase
            .from('fase_results')
            .insert([resultToSave]);
          
          if (insertError) throw insertError;
        }
        
        toast({
          title: "Resultado salvo",
          description: "O resultado do teste foi salvo com sucesso."
        });
      } catch (error) {
        console.error("Erro ao salvar resultado:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar resultado",
          description: "Não foi possível salvar o resultado do teste."
        });
      }
    }
  };
  
  const resetTest = async () => {
    if (isAuthenticated && userId) {
      try {
        // Remover resultado do Supabase
        const { error } = await supabase
          .from('fase_results')
          .delete()
          .eq('user_id', userId);
        
        if (error) throw error;
      } catch (error) {
        console.error("Erro ao excluir resultado:", error);
      }
    }
    
    // Reset state
    const initialAnswers: { [key: number]: number[] } = {};
    phaseTestData.forEach((phase, index) => {
      initialAnswers[index] = new Array(phase.questions.length).fill(0);
    });
    
    setAnswers(initialAnswers);
    setCurrentPhaseIndex(0);
    setShowResult(false);
    setResult(null);
    setCompleted(false);
    
    toast({
      title: "Teste reiniciado",
      description: "Você pode fazer o teste novamente."
    });
  };

  return {
    currentPhaseIndex,
    currentPhase: phaseTestData[currentPhaseIndex],
    answers,
    showResult,
    result,
    completed,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest,
    phaseTestLength: phaseTestData.length,
    isLoading
  };
};
