
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import MemberAreaContent from "@/components/member/MemberAreaContent";
import { useAuth } from "@/hooks/useAuth";

const MemberArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, userId, logout } = useAuth();

  // Check authentication status but don't redirect if we're on the admin page
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/admin') {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/membros" } });
    }
  }, [isAuthenticated, navigate, toast, location.pathname]);

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      <MemberAreaContent />
    </div>
  );
};

export default MemberArea;
