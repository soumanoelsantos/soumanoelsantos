
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import MemberAreaContent from "@/components/member/MemberAreaContent";
import { useAuth } from "@/hooks/useAuth";

const MemberArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userEmail, userId, logout } = useAuth();

  // Check authentication status
  useEffect(() => {
    console.log("MemberArea: Current path:", location.pathname);
    console.log("MemberArea: isAuthenticated:", isAuthenticated);
    
    if (!isAuthenticated) {
      console.log("MemberArea: User not authenticated, redirecting to login");
      navigate("/login", { state: { from: "/membros" } });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      <MemberAreaContent />
    </div>
  );
};

export default MemberArea;
