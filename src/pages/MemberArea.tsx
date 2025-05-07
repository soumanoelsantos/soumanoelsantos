
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import MemberContentList from "@/components/MemberContentList";
import { useAuth } from "@/hooks/useAuth";
import { checkUserToolCompletion, loadDiagnosticCompletion, loadPhaseTestCompletion } from "@/utils/storage";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const MemberArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, userId, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [completionPercent, setCompletionPercent] = useState(0);

  // Check authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/membros" } });
      return;
    }
    
    // Calculate completion percentage
    const calculateCompletionPercentage = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Check regular tools saved in user_tools_data
        const toolsData = await checkUserToolCompletion(userId, [
          'swot_data',
          'checklist_data',
          'business_map_data',
          'puv_data',
          'mapa_equipe'
        ]);
        
        // Check diagnostic completion (separate table)
        const diagnosticCompleted = await loadDiagnosticCompletion(userId);
        
        // Check phase test completion (separate table)
        const phaseTestCompleted = await loadPhaseTestCompletion(userId);
        
        const completed = [
          diagnosticCompleted,
          !!toolsData.swot_data,
          !!toolsData.checklist_data,
          phaseTestCompleted,
          !!toolsData.business_map_data,
          !!toolsData.puv_data,
          !!toolsData.mapa_equipe
        ].filter(Boolean).length;
        
        // 7 tools total
        const percent = Math.floor((completed / 7) * 100);
        setCompletionPercent(percent);
      } catch (error) {
        console.error("Error calculating completion percentage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateCompletionPercentage();
  }, [isAuthenticated, navigate, toast, userId]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        variant: "destructive",
        title: "Erro no logout",
        description: "Não foi possível sair da sua conta",
      });
    }
  };

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
      
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Área de Membros</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Progress Card */}
          <Card className="bg-white border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Seu progresso</CardTitle>
              <CardDescription className="text-gray-600">
                Acompanhe seu avanço nas ferramentas disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Ferramentas completadas</span>
                  <span className="font-medium">{completionPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-dark-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${completionPercent}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <MemberContentList />
          
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Mentoria individual</CardTitle>
              <CardDescription className="text-gray-600">
                Agende sua próxima mentoria com o Manoel Santos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                As mentorias individuais são realizadas semanalmente e são fundamentais para o seu sucesso no programa.
              </p>
            </CardContent>
            <CardFooter>
              <LeadCaptureForm 
                source="member_area"
                buttonClassName="w-full bg-dark-primary hover:bg-dark-primary/90 text-black font-medium"
                buttonText="Agendar mentoria"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberArea;
