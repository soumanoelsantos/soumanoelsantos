
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import MemberAreaContent from "@/components/member/MemberAreaContent";
import { useAuth } from "@/hooks/useAuth";

const MemberArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userEmail, userId, logout } = useAuth();

  // Check authentication status but don't redirect if we're on the admin page
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/admin') {
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      <MemberAreaContent />
    </div>
  );
};

export default MemberArea;
