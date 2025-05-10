
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MemberHeader from "@/components/MemberHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import SwotCategory from "@/components/swot/SwotCategory";
import SwotInfo from "@/components/swot/SwotInfo";
import SwotActions from "@/components/swot/SwotActions";
import SwotActionPlan from "@/components/swot/SwotActionPlan";
import { useSwotAnalysis } from "@/hooks/useSwotAnalysis";
import { SwotData } from "@/types/swot";
import CTASection from "@/components/CTASection";

const AnaliseSwot: React.FC = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const {
    swotData,
    isLoading,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSaveAnalysis,
    handleResetAnalysis
  } = useSwotAnalysis();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 mt-6">
          <BackToMemberAreaButton />
        </div>
        
        <SwotInfo />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <SwotCategory
            title="FORÇAS"
            description="O que temos de melhor na empresa"
            color="bg-yellow-50"
            headerColor="bg-yellow-100"
            items={swotData.strengths}
            category="ponto forte"
            onAddItem={() => handleAddItem('strengths')}
            onRemoveItem={(id) => handleRemoveItem('strengths', id)}
            onItemChange={(id, value) => handleItemChange('strengths', id, value)}
            placeholder="Digite um ponto forte do seu negócio..."
          />
          
          {/* Weaknesses */}
          <SwotCategory
            title="FRAQUEZAS"
            description="O que está ruim na empresa"
            color="bg-gray-50"
            headerColor="bg-gray-100"
            items={swotData.weaknesses}
            category="ponto fraco"
            onAddItem={() => handleAddItem('weaknesses')}
            onRemoveItem={(id) => handleRemoveItem('weaknesses', id)}
            onItemChange={(id, value) => handleItemChange('weaknesses', id, value)}
            placeholder="Digite um ponto fraco do seu negócio..."
          />
          
          {/* Opportunities */}
          <SwotCategory
            title="OPORTUNIDADES"
            description="O que acontece fora que posso aproveitar"
            color="bg-blue-50"
            headerColor="bg-blue-100"
            items={swotData.opportunities}
            category="oportunidade"
            onAddItem={() => handleAddItem('opportunities')}
            onRemoveItem={(id) => handleRemoveItem('opportunities', id)}
            onItemChange={(id, value) => handleItemChange('opportunities', id, value)}
            placeholder="Digite uma oportunidade para seu negócio..."
          />
          
          {/* Threats */}
          <SwotCategory
            title="AMEAÇAS"
            description="O que acontece fora e pode me prejudicar"
            color="bg-red-50"
            headerColor="bg-red-100"
            items={swotData.threats}
            category="ameaça"
            onAddItem={() => handleAddItem('threats')}
            onRemoveItem={(id) => handleRemoveItem('threats', id)}
            onItemChange={(id, value) => handleItemChange('threats', id, value)}
            placeholder="Digite uma ameaça ao seu negócio..."
          />
        </div>
        
        <SwotActions 
          onSave={handleSaveAnalysis}
          onReset={handleResetAnalysis}
        />

        {/* Action Plan Component */}
        <SwotActionPlan swotData={swotData} isLoading={isLoading} />
        
        <div className="mt-12">
          <CTASection source="analise_swot" />
        </div>
      </div>
    </div>
  );
};

export default AnaliseSwot;
