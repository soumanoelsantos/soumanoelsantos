
import { useState } from 'react';
import { SwotData } from "@/types/swot";
import { useToast } from '@/hooks/use-toast';
import { useCompanyInfo } from './useCompanyInfo';
import { useActionPlanGeneration } from './useActionPlanGeneration';
import { useActionPlanStorage } from './useActionPlanStorage';

export const useSwotActionPlan = (swotData: SwotData, isLoading: boolean) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  
  const {
    companyInfo,
    companyInfoDialogOpen,
    setCompanyInfoDialogOpen,
    saveCompanyInfo
  } = useCompanyInfo();
  
  const {
    isUsingAI,
    hasContent,
    generateActionPlan
  } = useActionPlanGeneration();
  
  const {
    actionPlan,
    setActionPlan,
    savedActionPlan,
    saveActionPlan
  } = useActionPlanStorage(isLoading);

  // Generate and save the action plan with company info
  const handleGenerateAndSaveActionPlan = async () => {
    if (generating) return;
    
    // If we don't have company info yet, open the dialog to collect it
    if (!companyInfo) {
      setCompanyInfoDialogOpen(true);
      return;
    }
    
    setGenerating(true);
    
    try {
      // Generate the action plan with company info
      const newPlan = await generateActionPlan(swotData, companyInfo);
      setActionPlan(newPlan);
      
      // Save the action plan
      await saveActionPlan(newPlan);
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
    await saveCompanyInfo(data);
    
    // Now generate the action plan with the new company info
    try {
      setGenerating(true);
      const newPlan = await generateActionPlan(swotData, data);
      setActionPlan(newPlan);
      
      // Save the plan
      await saveActionPlan(newPlan);
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
    
    try {
      const newPlan = await generateActionPlan(swotData, companyInfo);
      setActionPlan(newPlan);
      
      // Save the regenerated plan
      await saveActionPlan(newPlan);
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

// Remove CompanyInfoData export as it's now in its own file
export type { };
