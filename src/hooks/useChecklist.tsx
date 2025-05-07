
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ChecklistItem, defaultChecklistItems } from "@/types/checklist";
import { saveChecklistData, loadChecklistData } from "@/utils/savingUtils";

export const useChecklist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userEmail, userId, isAuthenticated } = useAuth();
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklistItems);

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
        const savedData = await loadChecklistData(userId);
        
        if (savedData) {
          setChecklistItems(savedData.checklistItems);
          setScore(savedData.score);
          setShowResults(true);
          console.log("Loaded checklist data from Supabase:", savedData);
        } else {
          console.log("No saved checklist data found in Supabase");
        }
      } catch (error) {
        console.error("Error loading checklist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [userId, isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
    navigate("/login");
  };
  
  const handleCheckChange = (id: number) => {
    setChecklistItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const calculateScore = async () => {
    const checkedCount = checklistItems.filter(item => item.checked).length;
    setScore(checkedCount);
    setShowResults(true);
    
    // Save results to Supabase
    if (userId) {
      setIsLoading(true);
      
      try {
        const dataToSave = {
          checklistItems,
          score: checkedCount
        };
        
        const success = await saveChecklistData(userId, dataToSave);
        
        if (success) {
          toast({
            title: "Pontuação calculada",
            description: `Você marcou ${checkedCount} de 10 itens. Resultado salvo com sucesso.`,
          });
        } else {
          throw new Error("Falha ao salvar dados");
        }
      } catch (error) {
        console.error("Error saving checklist data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: "Não foi possível salvar seus resultados. Tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const getResultMessage = () => {
    if (score >= 7) {
      return {
        title: "É HORA DE CONTRATAR",
        description: "Se você deu check em pelo menos sete perguntas, significa que sua empresa está mesmo na hora de contratar um novo funcionário.",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    } else if (score >= 4) {
      return {
        title: "TALVEZ AINDA DÊ PARA ESPERAR",
        description: "Há algumas evidências claras de que sua empresa precisa de um novo funcionário, mas talvez ainda não seja a hora de optar por esse caminho.",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    } else {
      return {
        title: "BUSQUE ALTERNATIVAS",
        description: "Não é necessário contratar alguém ainda. Sua empresa está em ascensão, mas ainda há alternativas melhores para suprir a demanda e é sempre bom poder contar com uma ajuda externa, não é mesmo?",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    }
  };
  
  const resetChecklist = async () => {
    const resetItems = checklistItems.map(item => ({ ...item, checked: false }));
    setChecklistItems(resetItems);
    setScore(0);
    setShowResults(false);
    
    // Remove saved results from Supabase
    if (userId) {
      setIsLoading(true);
      
      try {
        // Save reset data to overwrite existing data
        const dataToSave = {
          checklistItems: resetItems,
          score: 0
        };
        
        const success = await saveChecklistData(userId, dataToSave);
        
        if (success) {
          toast({
            title: "Checklist reiniciado",
            description: "Suas respostas foram apagadas com sucesso.",
          });
        } else {
          throw new Error("Falha ao resetar dados");
        }
      } catch (error) {
        console.error("Error resetting checklist data:", error);
        toast({
          variant: "destructive",
          title: "Erro ao resetar",
          description: "Não foi possível resetar seu checklist. Tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    checklistItems,
    score,
    showResults,
    isLoading,
    userEmail,
    handleLogout,
    handleCheckChange,
    calculateScore,
    getResultMessage,
    resetChecklist
  };
};
