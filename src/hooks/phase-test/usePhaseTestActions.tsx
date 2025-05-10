
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PhaseTestResult, PhaseAnswer } from "@/types/phaseTest";
import { phaseTestData } from "../../data/phaseTestData";

interface PhaseTestState {
  currentPhaseIndex: number;
  setCurrentPhaseIndex: (index: number) => void;
  answers: { [key: number]: number[] };
  setAnswers: (answers: { [key: number]: number[] } | ((prev: { [key: number]: number[] }) => { [key: number]: number[] })) => void;
  setShowResult: (show: boolean) => void;
  setResult: (result: PhaseTestResult | null) => void;
  setCompleted: (completed: boolean) => void;
}

export const usePhaseTestActions = (state: PhaseTestState) => {
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  
  const {
    currentPhaseIndex,
    setCurrentPhaseIndex,
    answers,
    setAnswers,
    setShowResult,
    setResult,
    setCompleted
  } = state;

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers((prev) => {
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
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    } else {
      calculateResult();
    }
  };
  
  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
    }
  };
  
  const calculateResult = async () => {
    const phaseScores: number[] = [];
    const allAnswers: PhaseAnswer[] = [];
    
    // Calculate score for each phase and collect all answers
    phaseTestData.forEach((phase, phaseIndex) => {
      const phaseAnswers = answers[phaseIndex];
      const yesCount = phaseAnswers.filter(answer => answer === 1).length;
      const phaseScore = (yesCount / phaseAnswers.length) * 100;
      phaseScores.push(phaseScore);
      
      // Collect answers for this phase
      phase.questions.forEach((question, questionIndex) => {
        allAnswers.push({
          question,
          value: phaseAnswers[questionIndex]
        });
      });
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
      recommendations: phaseTestData[highestScoreIndex].recommendations,
      answers: allAnswers
    };
    
    setResult(resultData);
    setCompleted(true);
    setShowResult(true);
    
    // Save result in Supabase if user is authenticated
    if (isAuthenticated && userId) {
      try {
        // Check if a result already exists for this user
        const { data, error: selectError } = await supabase
          .from('fase_results')
          .select('id')
          .eq('user_id', userId);
        
        if (selectError) throw selectError;
        
        // We need to join the recommendations array into a string for storage
        const recommendationsString = resultData.recommendations.join('|');
        
        // Save answers as JSON
        const resultToSave = {
          user_id: userId,
          phase_name: resultData.phaseName,
          score: resultData.score,
          description: resultData.description,
          recommendations: recommendationsString,
          answers: JSON.stringify(allAnswers)
        };
        
        if (data && data.length > 0) {
          // Update existing result
          const { error: updateError } = await supabase
            .from('fase_results')
            .update(resultToSave)
            .eq('user_id', userId);
          
          if (updateError) throw updateError;
        } else {
          // Insert new result
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
        console.error("Error saving result:", error);
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
        // Remove result from Supabase
        const { error } = await supabase
          .from('fase_results')
          .delete()
          .eq('user_id', userId);
        
        if (error) throw error;
      } catch (error) {
        console.error("Error deleting result:", error);
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
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest
  };
};
