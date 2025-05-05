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
import { savePuvData, loadPuvData } from "@/utils/savingUtils";

const PropostaUnicaValor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail, userId, isAuthenticated } = useAuth();
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
    const loadSavedData = async () => {
      // Check authentication
      if (!isAuthenticated || !userId) {
        console.log("User not authenticated, redirecting to login");
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você precisa fazer login para acessar esta página",
        });
        navigate("/login");
        return;
      }
      
      try {
        setIsLoading(true);
        // Load saved data from Supabase
        const savedData = await loadPuvData(userId);
        
        if (savedData) {
          setPuvData(savedData);
          console.log("Loaded PUV data from Supabase:", savedData);
        } else {
          console.log("No saved PUV data found in Supabase");
          
          // Load from localStorage as fallback (for transition period)
          const localData = localStorage.getItem("puvData");
          if (localData) {
            try {
              const parsedData = JSON.parse(localData);
              setPuvData(parsedData);
              
              // Automatically save to Supabase
              await savePuvData(userId, parsedData);
              console.log("Migrated local PUV data to Supabase");
            } catch (error) {
              console.error("Error parsing saved local data:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error loading PUV data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedData();
  }, [isAuthenticated, userId, navigate, toast]);

  const handleDataChange = async (data: PUVFormData) => {
    setPuvData(data);
    
    // Save to localStorage for backward compatibility
    localStorage.setItem("puvData", JSON.stringify(data));
    
    // Save to Supabase
    if (userId) {
      try {
        await savePuvData(userId, data);
        console.log("PUV data saved to Supabase");
      } catch (error) {
        console.error("Error saving PUV data to Supabase:", error);
      }
    }
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
