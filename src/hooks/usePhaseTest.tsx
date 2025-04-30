
import { useState, useEffect } from "react";
import { phaseTestData } from "../data/phaseTestData";
import { useToast } from "@/hooks/use-toast";
import { PhaseTestResult } from "../types/phaseTest";

export const usePhaseTest = () => {
  const { toast } = useToast();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PhaseTestResult | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Check if there are saved results in localStorage
    const savedResult = localStorage.getItem("testeFaseResult");
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      setResult(parsedResult);
      setCompleted(true);
      setShowResult(true);
    }
    
    // Initialize answers
    const initialAnswers: { [key: number]: number[] } = {};
    phaseTestData.forEach((phase, index) => {
      initialAnswers[index] = new Array(phase.questions.length).fill(0);
    });
    setAnswers(initialAnswers);
  }, []);
  
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
  
  const calculateResult = () => {
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
    
    const resultData = {
      phaseName: phaseTestData[highestScoreIndex].phase,
      score: highestScore,
      description: phaseTestData[highestScoreIndex].description,
      recommendations: phaseTestData[highestScoreIndex].recommendations
    };
    
    // Save to localStorage
    localStorage.setItem("testeFaseResult", JSON.stringify(resultData));
    
    setResult(resultData);
    setCompleted(true);
    setShowResult(true);
  };
  
  const resetTest = () => {
    // Clear localStorage
    localStorage.removeItem("testeFaseResult");
    
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
    phaseTestLength: phaseTestData.length
  };
};
