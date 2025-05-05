import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapaNegocioForm from "@/components/mapa-negocio/MapaNegocioForm";
import MapaNegocioPreview from "@/components/mapa-negocio/MapaNegocioPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessMapData } from "@/types/businessMap";
import { useAuth } from "@/hooks/useAuth";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import { saveBusinessMapData, loadBusinessMapData } from "@/utils/savingUtils";

const MapaNegocio = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { userEmail, userId, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("form");
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [businessData, setBusinessData] = useState<BusinessMapData>({
    empresa: "",
    missao: "",
    visao: "",
    valores: "",
    parceirosChave: "",
    atividadesChaves: "",
    recursosChave: "",
    valuePropositions: "",
    relacaoConsumidor: "",
    canaisDistribuicao: "",
    segmentoConsumidores: "",
    estruturaCustos: "",
    fontesReceita: "",
    vantagemCompetitiva: "",
    competenciasEssenciais: "",
    posicionamentoMercado: ""
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
        const savedData = await loadBusinessMapData(userId);
        
        if (savedData) {
          setBusinessData(savedData);
          console.log("Loaded business map data from Supabase:", savedData);
        } else {
          console.log("No saved business map data found in Supabase");
          
          // Load from localStorage as fallback (for transition period)
          const localData = localStorage.getItem("businessMapData");
          if (localData) {
            try {
              const parsedData = JSON.parse(localData);
              setBusinessData(parsedData);
              
              // Automatically save to Supabase
              await saveBusinessMapData(userId, parsedData);
              console.log("Migrated local business map data to Supabase");
            } catch (error) {
              console.error("Error parsing saved local data:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error loading business map data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedData();
  }, [isAuthenticated, userId, navigate, toast]);

  const handleDataChange = async (data: BusinessMapData) => {
    setBusinessData(data);
    
    // Save to localStorage for backward compatibility
    localStorage.setItem("businessMapData", JSON.stringify(data));
    
    // Save to Supabase
    if (userId) {
      try {
        await saveBusinessMapData(userId, data);
        console.log("Business map data saved to Supabase");
      } catch (error) {
        console.error("Error saving business map data to Supabase:", error);
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
          Mapa do Negócio
        </h1>
        
        <Card className="bg-white border-gray-200 shadow-lg mb-6">
          <CardHeader className="bg-[#1d365c] text-white">
            <CardTitle className="text-xl text-center">
              Business Model Canvas com Cultura e Clareza
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              O Mapa do Negócio é uma ferramenta visual que permite que você estruture seu modelo de negócio de forma clara, 
              identificando os principais elementos e como eles se relacionam.
            </p>
            <p className="text-gray-700">
              Preencha os campos abaixo com as informações da sua empresa. Depois, você poderá visualizar e baixar o mapa completo.
            </p>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form">Preencher Dados</TabsTrigger>
            <TabsTrigger value="preview">Visualizar Mapa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-4">
            <MapaNegocioForm data={businessData} onDataChange={handleDataChange} onPreviewClick={() => setActiveTab("preview")} />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <MapaNegocioPreview data={businessData} previewRef={previewRef} onEditClick={() => setActiveTab("form")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MapaNegocio;
