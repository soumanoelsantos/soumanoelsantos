
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhaseTestResult } from "../../types/phaseTest";
import { useAuth } from "@/hooks/useAuth";
import PhaseInfo from "./PhaseInfo";
import PhaseRecommendations from "./PhaseRecommendations";
import EnhancedActionPlan from "./EnhancedActionPlan";
import NavigationButtons from "./NavigationButtons";
import { usePhaseActionPlan } from "@/hooks/phase-test/usePhaseActionPlan";
import QuestionsAnswersList from "./QuestionsAnswersList";

interface PhaseResultProps {
  result: PhaseTestResult | null;
  onResetTest: () => void;
}

const PhaseResult = ({ result, onResetTest }: PhaseResultProps) => {
  const { userId } = useAuth();
  
  const {
    isGeneratingPlan,
    showEnhancedPlan,
    handleRegenerateActionPlan
  } = usePhaseActionPlan(userId, result);
  
  if (!result) return null;

  return (
    <Card className="shadow-lg bg-white">
      <CardHeader>
        <CardTitle>Resultado</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PhaseInfo 
            phaseName={result.phaseName} 
            score={result.score} 
            description={result.description} 
          />
          
          <QuestionsAnswersList answers={result.answers || []} />
          
          {showEnhancedPlan ? (
            <EnhancedActionPlan 
              actionPlan={result.enhanced_action_plan || []} 
              onRegeneratePlan={handleRegenerateActionPlan}
              isGenerating={isGeneratingPlan}
            />
          ) : (
            <PhaseRecommendations recommendations={result.recommendations} />
          )}
          
          <NavigationButtons onResetTest={onResetTest} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseResult;
