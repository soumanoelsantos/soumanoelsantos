
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { saveSwotData, loadSwotData } from "@/utils/storage/swotUtils";
import { SwotData, SwotItem, defaultSwotData } from "@/types/swot";

export const useSwotAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);
  const [swotData, setSwotData] = useState<SwotData>(defaultSwotData);

  // Load saved results when component mounts
  useEffect(() => {
    const loadSavedData = async () => {
      if (!isAuthenticated || !userId) {
        console.log("User not authenticated, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const savedData = await loadSwotData(userId);
        
        if (savedData) {
          setSwotData(savedData);
          setHasSavedData(true);
          console.log("Loaded SWOT data from Supabase:", savedData);
        } else {
          console.log("No saved SWOT data found in Supabase");
        }
      } catch (error) {
        console.error("Error loading SWOT data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [userId, isAuthenticated, navigate]);

  const handleItemChange = (category: keyof SwotData, id: string, value: string) => {
    setSwotData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, text: value } : item
      )
    }));
  };

  const handleAddItem = (category: keyof SwotData) => {
    const newId = `${category.charAt(0)}${swotData[category].length + 1}`;
    setSwotData(prev => ({
      ...prev,
      [category]: [...prev[category], { id: newId, text: "" }]
    }));
  };

  const handleRemoveItem = (category: keyof SwotData, id: string) => {
    if (swotData[category].length <= 1) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa manter pelo menos um item nesta categoria",
      });
      return;
    }
    
    setSwotData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const handleSaveAnalysis = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar sua análise",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await saveSwotData(userId, swotData);
      
      if (success) {
        toast({
          title: "Análise SWOT salva",
          description: "Seus dados foram salvos com sucesso no banco de dados",
        });
        
        setHasSavedData(true);
      } else {
        throw new Error("Falha ao salvar dados");
      }
    } catch (error) {
      console.error("Error saving SWOT data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar sua análise. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAnalysis = async () => {
    setSwotData(defaultSwotData);
    
    if (userId && hasSavedData) {
      setIsLoading(true);
      
      try {
        // Save empty data to overwrite existing data
        const success = await saveSwotData(userId, defaultSwotData);
        
        if (success) {
          toast({
            title: "Análise SWOT reiniciada",
            description: "Sua análise foi apagada com sucesso",
          });
          
          setHasSavedData(false);
        } else {
          throw new Error("Falha ao resetar dados");
        }
      } catch (error) {
        console.error("Error resetting SWOT data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao resetar",
          description: "Não foi possível resetar sua análise. Tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    swotData,
    isLoading,
    hasSavedData,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSaveAnalysis,
    handleResetAnalysis,
  };
};
