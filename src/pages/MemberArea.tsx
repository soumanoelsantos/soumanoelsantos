
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import MemberAreaContent from "@/components/member/MemberAreaContent";
import { useAuth } from "@/hooks/useAuth";
import { useCompletionPercentage } from "@/hooks/useCompletionPercentage";

const MemberArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, userId, logout } = useAuth();
  const { completionPercent, isLoading } = useCompletionPercentage(userId);

  // Check authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/membros" } });
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
      <MemberAreaContent completionPercent={completionPercent} />
    </div>
  );
};

export default MemberArea;
