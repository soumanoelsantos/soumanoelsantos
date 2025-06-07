
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import MemberHeader from "@/components/MemberHeader";
import { useAuth } from "@/hooks/useAuth";
import PhaseQuestionList from "@/components/teste-fase/PhaseQuestionList";
import PhaseResult from "@/components/teste-fase/PhaseResult";
import { usePhaseTest } from "@/hooks/phase-test/usePhaseTest";
import { useToast } from "@/hooks/use-toast";

const TesteFase = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const { toast } = useToast();
  
  const {
    currentPhaseIndex,
    currentPhase,
    answers,
    showResult,
    result,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest,
    phaseTestLength
  } = usePhaseTest();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/teste-fase" } });
      return;
    }
  }, [isAuthenticated, navigate, toast]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: "Tente novamente",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
          <p className="text-gray-600">Você será redirecionado para a página de login.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <BackToMemberAreaButton />
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-4">
          Teste: Em qual fase está sua empresa?
        </h1>
        
        {!showResult ? (
          <PhaseQuestionList
            currentPhase={currentPhase}
            currentPhaseIndex={currentPhaseIndex}
            phaseTestLength={phaseTestLength}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        ) : (
          <PhaseResult 
            result={result}
            onResetTest={resetTest}
          />
        )}
      </div>
    </div>
  );
};

export default TesteFase;
