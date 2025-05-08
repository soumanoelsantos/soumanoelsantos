
import React from "react";
import KanbanBoard from "@/components/crm/KanbanBoard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const CrmPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/crm" } });
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, navigate, toast]);

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
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="flex-grow overflow-hidden">
        <div className="container mx-auto px-4 py-4 h-full flex flex-col">
          <div className="mb-4">
            <BackToMemberAreaButton />
          </div>
          
          <div className="flex-grow overflow-hidden">
            <KanbanBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmPage;
