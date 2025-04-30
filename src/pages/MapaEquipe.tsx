
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MemberHeader from "@/components/MemberHeader";
import MapaEquipeForm from "@/components/mapa-equipe/MapaEquipeForm";
import { useToast } from "@/hooks/use-toast";

const MapaEquipe = () => {
  const navigate = useNavigate();
  const { userEmail, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mapa da Equipe</h1>
          <button 
            onClick={() => navigate("/membros")}
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            &larr; Voltar para Área de Membros
          </button>
        </div>
        
        <MapaEquipeForm />
      </div>
    </div>
  );
};

export default MapaEquipe;
