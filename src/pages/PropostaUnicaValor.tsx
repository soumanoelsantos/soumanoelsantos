
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PUVForm from "@/components/puv/PUVForm";
import PUVPreview from "@/components/puv/PUVPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PUVFormData } from "@/types/puv";
import { useAuth } from "@/hooks/useAuth";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const PropostaUnicaValor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("form");
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [puvData, setPuvData] = useState<PUVFormData>({
    colaborador: "",
    gestor: "",
    meus: "",
    ajudam: "",
    queDesejam: "",
    para: "",
    dor: "",
    e: "",
    ganho: ""
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
      return;
    }
    
    // Load saved data if available
    const savedData = localStorage.getItem("puvData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setPuvData(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
    
    setIsLoading(false);
  }, [isAuthenticated, navigate, toast]);

  const handleDataChange = (data: PUVFormData) => {
    setPuvData(data);
    // Save to localStorage
    localStorage.setItem("puvData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
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
      
      <div className="container mx-auto px-4 py-6 bg-white">
        <div className="mb-6">
          <BackToMemberAreaButton />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Proposta Única de Valor (PUV)
        </h1>
        
        <Card className="bg-white border-gray-200 shadow-lg mb-6">
          <CardHeader className="bg-[#1d365c] text-white">
            <CardTitle className="text-xl text-center">
              Estrutura para elaboração da Proposta Única de Valor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              A Proposta Única de Valor (PUV) é uma declaração clara que explica como seu produto ou serviço resolve os problemas do cliente, entrega benefícios específicos e informa por que você é melhor do que a concorrência.
            </p>
            <p className="text-gray-700">
              Preencha os campos abaixo para estruturar sua PUV. Esta ferramenta irá ajudá-lo a criar uma mensagem clara e impactante para comunicar o valor único que você oferece.
            </p>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form">Preencher Dados</TabsTrigger>
            <TabsTrigger value="preview">Visualizar PUV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-4">
            <PUVForm data={puvData} onDataChange={handleDataChange} onPreviewClick={() => setActiveTab("preview")} />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <PUVPreview data={puvData} previewRef={previewRef} onEditClick={() => setActiveTab("form")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropostaUnicaValor;
