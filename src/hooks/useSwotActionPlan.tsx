
import { useState, useEffect } from 'react';
import { SwotData } from "@/types/swot";
import { generateEnhancedSwotPlan, generateBasicActionPlan } from '@/utils/swot/actionPlanGenerator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { saveDataToSupabase, loadDataFromSupabase } from '@/utils/storage';

export interface CompanyInfoData {
  industry: string;
  mainProducts: string;
  targetAudience: string;
  mainChallenges: string;
  competitors: string;
  goals: string;
}

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
        const savedPlan = await loadDataFromSupabase(userId, 'swot_action_plan');
        if (savedPlan && Object.keys(savedPlan).length > 0) {
          setActionPlan(savedPlan);
          setSavedActionPlan(true);
          console.log("Loaded saved action plan:", savedPlan);
        } else {
          setSavedActionPlan(false);
        }
        
        // Load company info if available
        const savedCompanyInfo = await loadDataFromSupabase(userId, 'swot_company_info');
        if (savedCompanyInfo) {
          setCompanyInfo(savedCompanyInfo);
          console.log("Loaded saved company info:", savedCompanyInfo);
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

  // Generate action plan based on SWOT analysis and company info
  const generateActionPlan = async (data: SwotData, companyInfoData?: CompanyInfoData | null) => {
    setGenerating(true);
    
    try {
      // Try to generate an enhanced plan with DeepSeek AI
      if (!isUsingAI) {
        const enhancedPlan = await generateEnhancedSwotPlan(data, companyInfoData);
        
        if (enhancedPlan) {
          setActionPlan(enhancedPlan);
          setIsUsingAI(true);
          setGenerating(false);
          
          // Save company info if we have it
          if (companyInfoData && userId) {
            await saveDataToSupabase(userId, 'swot_company_info', companyInfoData);
          }
          
          return enhancedPlan;
        }
      }
      
      // Fallback to basic plan generation
      const basicPlan = generateBasicActionPlan(data, companyInfoData);
      setActionPlan(basicPlan);
      
      // Save company info if we have it
      if (companyInfoData && userId) {
        await saveDataToSupabase(userId, 'swot_company_info', companyInfoData);
      }
      
      return basicPlan;
    } catch (error) {
      console.error("Error generating action plan:", error);
      // Fallback to basic plan if AI fails
      const basicPlan = generateBasicActionPlan(data, companyInfoData);
      setActionPlan(basicPlan);
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
      const newPlan = await generateActionPlan(swotData, companyInfo);
      
      // Save the action plan
      const success = await saveDataToSupabase(userId, 'swot_action_plan', newPlan);
      
      if (success) {
        setSavedActionPlan(true);
        toast({
          title: "Plano de ação salvo",
          description: "Seu plano de ação personalizado foi gerado e salvo com sucesso",
        });
      } else {
        throw new Error("Failed to save action plan");
      }
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
      const newPlan = await generateActionPlan(swotData, data);
      
      // If user is logged in, save the plan
      if (userId) {
        const success = await saveDataToSupabase(userId, 'swot_action_plan', newPlan);
        
        if (success) {
          setSavedActionPlan(true);
          toast({
            title: "Plano de ação personalizado",
            description: "Seu plano de ação foi gerado com base nas informações da sua empresa",
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
      const newPlan = await generateActionPlan(swotData, companyInfo);
      
      // If user is logged in, save the regenerated plan
      if (userId) {
        const success = await saveDataToSupabase(userId, 'swot_action_plan', newPlan);
        
        if (success) {
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
