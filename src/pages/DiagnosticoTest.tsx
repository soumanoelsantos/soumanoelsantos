
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import DiagnosticTestContent from "@/components/diagnostic/DiagnosticTestContent";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { diagnosticSectionsData } from "@/data/diagnosticSections";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import CTASection from "@/components/CTASection";

const DiagnosticoTest = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { 
    results, 
    setResults, 
    showResults, 
    setShowResults,
    isLoading, 
    isGeneratingPlan,
    answersData, 
    setAnswersData, 
    handleSubmit,
    resetDiagnostic
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="mt-6 mb-6">
          <BackToMemberAreaButton />
        </div>
        
        <DiagnosticTestContent 
          sections={diagnosticSectionsData}
          results={results}
          setResults={setResults}
          showResults={showResults}
          setShowResults={setShowResults}
          answersData={answersData}
          setAnswersData={setAnswersData}
          handleSubmit={handleSubmit}
          resetDiagnostic={resetDiagnostic}
          isGeneratingPlan={isGeneratingPlan}
        />
        
        {!showResults && !isGeneratingPlan && (
          <div className="mt-12">
            <CTASection source="diagnostico_test" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticoTest;
