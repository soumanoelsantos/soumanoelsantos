
import React from "react";
import KanbanBoard from "@/components/crm/KanbanBoard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import CTASection from "@/components/CTASection";

const CrmPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/crm" } });
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
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
      
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <BackToMemberAreaButton />
          </div>
          
          <div className="mb-8">
            <KanbanBoard />
          </div>
          
          <CTASection source="crm_page" />
        </div>
      </div>
    </div>
  );
};

export default CrmPage;
