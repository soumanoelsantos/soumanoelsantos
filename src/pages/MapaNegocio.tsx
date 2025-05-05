
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMapaNegocio } from "@/hooks/useMapaNegocio";
import MemberHeader from "@/components/MemberHeader";
import MapaNegocioForm from "@/components/mapa-negocio/MapaNegocioForm";
import MapaNegocioPreview from "@/components/mapa-negocio/MapaNegocioPreview";

const MapaNegocio = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const { 
    businessMap, 
    handleBusinessMapChange, 
    showPreview, 
    togglePreview, 
    saveBusinessMap, 
    isLoading 
  } = useMapaNegocio();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShowPreview = async () => {
    // Save data before showing preview
    const success = await saveBusinessMap();
    if (success) {
      togglePreview();
    }
  };

  const handleEditClick = () => {
    togglePreview();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Mapa de Negócio</h1>
          <p className="text-gray-600 text-center mt-2">
            Visualize seu modelo de negócio de forma estruturada
          </p>
        </div>

        {showPreview ? (
          <MapaNegocioPreview 
            businessMap={businessMap} 
            previewRef={previewRef} 
            onEditClick={handleEditClick} 
          />
        ) : (
          <MapaNegocioForm
            businessMap={businessMap}
            onChange={handleBusinessMapChange}
            onPreview={handleShowPreview}
          />
        )}
      </div>
    </div>
  );
};

export default MapaNegocio;
