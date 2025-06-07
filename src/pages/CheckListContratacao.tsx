
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import MemberHeader from "@/components/MemberHeader";
import { useChecklist } from "@/hooks/useChecklist";
import ChecklistForm from "@/components/checklist/ChecklistForm";
import ChecklistResults from "@/components/checklist/ChecklistResults";
import ChecklistInfo from "@/components/checklist/ChecklistInfo";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const CheckListContratacao = () => {
  const {
    checklistItems,
    score,
    showResults,
    isLoading,
    userEmail,
    handleLogout,
    handleCheckChange,
    calculateScore,
    getResultMessage,
    resetChecklist
  } = useChecklist();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 mt-6">
          <BackToMemberAreaButton />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-dark-primary/20 mb-8">
            <ChecklistInfo />
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">
                Responda às perguntas abaixo para descobrir se sua empresa realmente precisa contratar um novo funcionário.
              </p>
              
              {!showResults ? (
                <ChecklistForm 
                  checklistItems={checklistItems}
                  onCheckChange={handleCheckChange}
                  onCalculate={calculateScore}
                />
              ) : (
                <ChecklistResults
                  score={score}
                  resultMessage={getResultMessage()}
                  onReset={resetChecklist}
                />
              )}
            </CardContent>
          </Card>
          
          {!showResults && (
            <div className="text-center text-sm text-gray-500 mt-8">
              Este check list é inspirado em metodologias modernas de recrutamento e gestão de pessoas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListContratacao;
