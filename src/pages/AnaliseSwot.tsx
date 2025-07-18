
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import SwotCategory from "@/components/swot/SwotCategory";
import SwotInfo from "@/components/swot/SwotInfo";
import SwotActions from "@/components/swot/SwotActions";
import SwotActionPlan from "@/components/swot/SwotActionPlan";
import { useSwotAnalysis } from "@/hooks/useSwotAnalysis";

const AnaliseSwot: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const { toast } = useToast();
  
  const {
    swotData,
    isLoading,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSaveAnalysis,
    handleResetAnalysis
  } = useSwotAnalysis();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login", { state: { from: "/analise-swot" } });
      return;
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
        title: "Erro ao fazer logout",
        description: "Tente novamente",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
          <p className="text-gray-600">Você será redirecionado para a página de login.</p>
        </div>
      </div>
    );
  }

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
          swotData={swotData}
        />

        {/* Action Plan Component */}
        <SwotActionPlan swotData={swotData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AnaliseSwot;
