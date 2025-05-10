
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MemberHeader from "@/components/MemberHeader";
import MapaEquipeForm from "@/components/mapa-equipe/MapaEquipeForm";
import { useToast } from "@/hooks/use-toast";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import { useMapaEquipe } from "@/hooks/useMapaEquipe";
import CTASection from "@/components/CTASection";

const MapaEquipe = () => {
  const navigate = useNavigate();
  const { userEmail, logout, isAuthenticated, userId } = useAuth();
  const { toast } = useToast();
  const { 
    showPreview, 
    handlePreview, 
    isLoading, 
    colaboradores, 
    empresaNome,
    saveData 
  } = useMapaEquipe();

  useEffect(() => {
    // When the component mounts, if data is loaded and not already showing preview
    // trigger the handlePreview to show the preview immediately
    if (!isLoading && !showPreview && 
        empresaNome && colaboradores && 
        colaboradores.length > 0 && 
        colaboradores[0].nome) {
      console.log("Auto-showing preview with existing data:", { empresaNome, colaboradores });
      handlePreview();
    }
  }, [isLoading, showPreview, handlePreview, colaboradores, empresaNome]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
    } else if (userId) {
      // Ensure data is loaded when user is authenticated
      console.log("User is authenticated, checking for existing data");
    }
  }, [isAuthenticated, navigate, toast, userId]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 mt-6">
          <BackToMemberAreaButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Mapa da Equipe</h1>
          <p className="text-gray-600 text-center mt-2">
            Organize e visualize sua equipe de colaboradores
          </p>
        </div>
        
        <MapaEquipeForm />
        
        <div className="mt-12">
          <CTASection source="mapa_equipe" />
        </div>
      </div>
    </div>
  );
};

export default MapaEquipe;
