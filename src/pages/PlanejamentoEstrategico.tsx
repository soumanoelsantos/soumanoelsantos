
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import PlanejamentoEstrategico from "@/components/planejamento/PlanejamentoEstrategico";

const PlanejamentoEstrategicoPage = () => {
  const { isAuthenticated, userEmail, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <PlanejamentoEstrategico />
      </main>
    </div>
  );
};

export default PlanejamentoEstrategicoPage;
