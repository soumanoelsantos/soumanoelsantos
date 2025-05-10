
import { useState, useEffect } from 'react';
import { SwotData } from "@/types/swot";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveSwotData, loadSwotData, saveSwotActionPlan, loadSwotActionPlan } from '@/utils/storage/swotUtils';
import { useActionPlanGeneration } from './useActionPlanGeneration';
import { useCompanyInfoManagement } from './useCompanyInfoManagement';
import { CompanyInfoData } from '@/types/companyInfo';

export const useSwotActionPlan = (swotData: SwotData, isLoading: boolean) => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({});
  const [savedActionPlan, setSavedActionPlan] = useState<boolean>(false);
  
  // Use composable hooks
  const { 
    generating, 
    isUsingAI, 
    hasContent,
    generateActionPlan,
    resetAIUsage
  } = useActionPlanGeneration();
  
  const {
    companyInfo,
    companyInfoDialogOpen,
    setCompanyInfoDialogOpen,
    saveCompanyInfo
  } = useCompanyInfoManagement();

  // Load saved action plan on component mount
  useEffect(() => {
    const loadSavedPlan = async () => {
      if (!userId || isLoading) return;
      
      try {
        // Load action plan
        const savedPlan = await loadSwotActionPlan(userId);
        
        if (savedPlan && Object.keys(savedPlan).length > 0) {
          setActionPlan(savedPlan);
          setSavedActionPlan(true);
          console.log("Loaded saved action plan:", savedPlan);
        } else {
          setSavedActionPlan(false);
        }
      } catch (error) {
        console.error("Error loading saved action plan:", error);
      }
    };

    loadSavedPlan();
  }, [userId, isLoading]);

  // Generate and save the action plan with company info
  const handleGenerateAndSaveActionPlan = async () => {
    if (!userId || generating) return;
    
    // If we don't have company info yet, open the dialog to collect it
    if (!companyInfo) {
      setCompanyInfoDialogOpen(true);
      return;
    }
    
    try {
      // Generate the action plan with company info
      const generatedPlan = await generateActionPlan(swotData, companyInfo);
      
      if (generatedPlan) {
        setActionPlan(generatedPlan);
        
        // Save the action plan
        await saveSwotActionPlan(userId, generatedPlan);
        setSavedActionPlan(true);
        
        toast({
          title: "Plano de ação salvo",
          description: "Seu plano de ação personalizado foi gerado e salvo com sucesso",
        });
      }
    } catch (error) {
      console.error("Error generating and saving action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar plano",
        description: "Não foi possível gerar e salvar o plano de ação",
      });
    }
  };

  // Handle company info submission
  const handleCompanyInfoSubmit = async (data: CompanyInfoData) => {
    // Save company info first
    const savedCompanyInfo = await saveCompanyInfo(data);
    
    // Now generate the action plan with the new company info
    try {
      const generatedPlan = await generateActionPlan(swotData, savedCompanyInfo);
      
      if (generatedPlan) {
        setActionPlan(generatedPlan);
        
        // Save the action plan
        if (userId) {
          await saveSwotActionPlan(userId, generatedPlan);
          setSavedActionPlan(true);
          
          toast({
            title: "Plano de ação personalizado",
            description: "Seu plano de ação foi gerado e salvo com base nas informações da sua empresa",
          });
        }
      }
    } catch (error) {
      console.error("Error generating action plan with company info:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Não foi possível gerar o plano de ação personalizado",
      });
    }
  };

  // Regenerate the action plan with AI
  const handleRegenerateActionPlan = async () => {
    if (generating) return;
    
    // If we don't have company info yet, open the dialog to collect it
    if (!companyInfo) {
      setCompanyInfoDialogOpen(true);
      return;
    }
    
    // Reset AI usage to try with AI again
    resetAIUsage();
    
    try {
      const generatedPlan = await generateActionPlan(swotData, companyInfo);
      
      if (generatedPlan) {
        setActionPlan(generatedPlan);
        
        // Save regenerated plan
        if (userId) {
          await saveSwotActionPlan(userId, generatedPlan);
          setSavedActionPlan(true);
          
          toast({
            title: "Plano de ação atualizado",
            description: "Seu plano de ação foi regenerado e salvo com sucesso",
          });
        }
      }
    } catch (error) {
      console.error("Error regenerating action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao regenerar plano",
        description: "Não foi possível regenerar o plano de ação",
      });
    }
  };

  return { 
    actionPlan,
    generating,
    isUsingAI,
    savedActionPlan,
    companyInfo,
    companyInfoDialogOpen,
    setCompanyInfoDialogOpen,
    handleCompanyInfoSubmit,
    handleGenerateAndSaveActionPlan,
    handleRegenerateActionPlan,
    hasContent
  };
};
