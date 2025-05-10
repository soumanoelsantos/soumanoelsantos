
import { useState, useEffect } from "react";
import { phaseTestData } from "../../data/phaseTestData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PhaseTestResult } from "@/types/phaseTest";

export const usePhaseTestState = () => {
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
        // Initialize answers
        const initialAnswers: { [key: number]: number[] } = {};
        phaseTestData.forEach((phase, index) => {
          initialAnswers[index] = new Array(phase.questions.length).fill(0);
        });
        setAnswers(initialAnswers);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch phase test results from Supabase
        const { data, error } = await supabase
          .from('fase_results')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is the code for "no rows found"
          throw error;
        }

        if (data) {
          // Convert recommendations string to array if necessary
          let recommendations: string[] = [];
          if (data.recommendations) {
            if (typeof data.recommendations === 'string') {
              // If it's a string, transform it into an array
              recommendations = [data.recommendations];
            } else if (Array.isArray(data.recommendations)) {
              // If it's already an array, use it directly
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
        console.error("Error loading test results:", error);
      } finally {
        // Initialize answers
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

  return {
    currentPhaseIndex,
    setCurrentPhaseIndex,
    answers,
    setAnswers,
    showResult,
    setShowResult,
    result,
    setResult,
    completed,
    setCompleted,
    isLoading,
    currentPhase: phaseTestData[currentPhaseIndex],
    phaseTestLength: phaseTestData.length
  };
};
