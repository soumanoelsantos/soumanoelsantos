
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import DiagnosticTestContent from "@/components/diagnostic/DiagnosticTestContent";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { diagnosticSectionsData } from "@/data/diagnosticSections";

const DiagnosticoTest = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { 
    results, 
    setResults, 
    showResults, 
    isLoading, 
    isGeneratingPlan,
    answersData, 
    setAnswersData, 
    actionPlan, 
    handleSubmit 
  } = useDiagnostic();

  // Handle logout from this page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <DiagnosticTestContent 
        sections={diagnosticSectionsData}
        results={results}
        setResults={setResults}
        showResults={showResults}
        answersData={answersData}
        setAnswersData={setAnswersData}
        actionPlan={actionPlan}
        handleSubmit={handleSubmit}
        isGeneratingPlan={isGeneratingPlan}
      />
    </div>
  );
};

export default DiagnosticoTest;
