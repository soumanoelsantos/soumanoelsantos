
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePUV } from "@/hooks/usePUV";
import MemberHeader from "@/components/MemberHeader";
import PUVForm from "@/components/puv/PUVForm";
import PUVPreview from "@/components/puv/PUVPreview";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const PropostaUnicaValor = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const { 
    puvData, 
    handleDataChange, 
    showPreview, 
    togglePreview, 
    savePUV, 
    isLoading 
  } = usePUV();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePreviewClick = async () => {
    // Save data before showing preview
    const success = await savePUV();
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
        <div className="mb-6 mt-6">
          <BackToMemberAreaButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Proposta Única de Valor</h1>
          <p className="text-gray-600 text-center mt-2">
            Crie uma proposta única de valor (PUV) clara e impactante para seu negócio
          </p>
        </div>

        {showPreview ? (
          <PUVPreview 
            data={puvData} 
            previewRef={previewRef} 
            onEditClick={handleEditClick} 
          />
        ) : (
          <PUVForm
            data={puvData}
            onDataChange={handleDataChange}
            onPreviewClick={handlePreviewClick}
          />
        )}
      </div>
    </div>
  );
};

export default PropostaUnicaValor;
