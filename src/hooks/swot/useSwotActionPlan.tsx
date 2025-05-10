
import { useState, useEffect } from 'react';
import { SwotData } from "@/types/swot";
import { generateBasicActionPlan } from '@/utils/swot/actionPlanGenerator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveSwotData, loadSwotData } from '@/utils/storage/swotUtils';
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';
import { CompanyInfoData } from '@/types/companyInfo';

export const useSwotActionPlan = (swotData: SwotData, isLoading: boolean) => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [actionPlan, setActionPlan] = useState<Record<string, string[]>>({});
  const [generating, setGenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [savedActionPlan, setSavedActionPlan] = useState<boolean>(false);
  const [companyInfoDialogOpen, setCompanyInfoDialogOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoData | null>(null);

  // Load saved action plan and company info on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      if (!userId || isLoading) return;
      
      try {
        // Load all SWOT data
        const savedData = await loadSwotData(userId);
        if (savedData) {
          // Load company info
          if (savedData.companyInfo) {
            setCompanyInfo(savedData.companyInfo);
            console.log("Loaded saved company info:", savedData.companyInfo);
          }
          
          // Load action plan
          if (savedData.actionPlan && Object.keys(savedData.actionPlan).length > 0) {
            setActionPlan(savedData.actionPlan);
            setSavedActionPlan(true);
            console.log("Loaded saved action plan:", savedData.actionPlan);
          } else {
            setSavedActionPlan(false);
          }
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };

    loadSavedData();
  }, [userId, isLoading]);

  // Check if SWOT data has content
  const hasContent = (data: SwotData): boolean => {
    return Object.values(data).some(category => 
      category.some(item => item.text && item.text.trim() !== '')
    );
  };

  // Save data to Supabase
  const saveData = async (data: any, key: string) => {
    if (!userId) return false;
    
    try {
      // Get existing SWOT data
      const existingData = await loadSwotData(userId) || {};
      
      // Update the specific part of data
      const updatedData = {
        ...existingData,
        [key]: data
      };
      
      return await saveSwotData(userId, updatedData);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      return false;
    }
  };

  // Generate action plan based on SWOT analysis and company info
  const generateActionPlan = async (data: SwotData, companyInfoData?: CompanyInfoData | null) => {
    setGenerating(true);
    
    try {
      // Create a data object with both SWOT data and company info
      const enrichedData = {
        ...data,
        companyInfo: companyInfoData || null
      };

      // Try to use DeepSeek AI for enhanced plan
      let generatedPlan;
      if (!isUsingAI) {
        try {
          generatedPlan = await generateEnhancedActionPlan(enrichedData);
          if (generatedPlan) {
            setIsUsingAI(true);
          }
        } catch (aiError) {
          console.error("Error with AI generation:", aiError);
          // Will fallback to basic generation below
        }
      }

      // If no AI plan was generated, fallback to basic plan
      if (!generatedPlan) {
        generatedPlan = generateBasicActionPlan(data, companyInfoData);
      }
      
      setActionPlan(generatedPlan);
      
      // Save company info if we have it
      if (companyInfoData) {
        await saveData(companyInfoData, 'companyInfo');
      }
      
      // Save action plan
      await saveData(generatedPlan, 'actionPlan');
      setSavedActionPlan(true);
      
      return generatedPlan;
    } catch (error) {
      console.error("Error generating action plan:", error);
      // Fallback to basic plan if all else fails
      const basicPlan = generateBasicActionPlan(data, companyInfoData);
      setActionPlan(basicPlan);
      
      // Save basic plan
      await saveData(basicPlan, 'actionPlan');
      setSavedActionPlan(true);
      
      return basicPlan;
    } finally {
      setGenerating(false);
    }
  };

  // Generate and save the action plan with company info
  const handleGenerateAndSaveActionPlan = async () => {
    if (!userId || generating) return;
    
    // If we don't have company info yet, open the dialog to collect it
    if (!companyInfo) {
      setCompanyInfoDialogOpen(true);
      return;
    }
    
    setGenerating(true);
    
    try {
      // Generate the action plan with company info
      await generateActionPlan(swotData, companyInfo);
      
      toast({
        title: "Plano de ação salvo",
        description: "Seu plano de ação personalizado foi gerado e salvo com sucesso",
      });
    } catch (error) {
      console.error("Error generating and saving action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar plano",
        description: "Não foi possível gerar e salvar o plano de ação",
      });
    } finally {
      setGenerating(false);
    }
  };

  // Handle company info submission
  const handleCompanyInfoSubmit = async (data: CompanyInfoData) => {
    setCompanyInfo(data);
    
    // Now generate the action plan with the new company info
    try {
      setGenerating(true);
      await generateActionPlan(swotData, data);
      
      toast({
        title: "Plano de ação personalizado",
        description: "Seu plano de ação foi gerado e salvo com base nas informações da sua empresa",
      });
    } catch (error) {
      console.error("Error generating action plan with company info:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Não foi possível gerar o plano de ação personalizado",
      });
    } finally {
      setGenerating(false);
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
    
    setGenerating(true);
    setIsUsingAI(false);
    
    try {
      await generateActionPlan(swotData, companyInfo);
      
      toast({
        title: "Plano de ação atualizado",
        description: "Seu plano de ação foi regenerado e salvo com sucesso",
      });
    } catch (error) {
      console.error("Error regenerating action plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao regenerar plano",
        description: "Não foi possível regenerar o plano de ação",
      });
    } finally {
      setGenerating(false);
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
