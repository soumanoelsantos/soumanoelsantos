
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { CompanyInfoData } from '@/types/companyInfo';
import { saveSwotData, loadSwotData } from '@/utils/storage/swotUtils';

export const useCompanyInfoManagement = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoData | null>(null);
  const [companyInfoDialogOpen, setCompanyInfoDialogOpen] = useState(false);

  // Load saved company info on component mount
  useEffect(() => {
    const loadSavedCompanyInfo = async () => {
      if (!userId) return;
      
      try {
        const savedData = await loadSwotData(userId);
        if (savedData && savedData.companyInfo) {
          setCompanyInfo(savedData.companyInfo);
          console.log("Loaded saved company info:", savedData.companyInfo);
        }
      } catch (error) {
        console.error("Error loading company info:", error);
      }
    };

    loadSavedCompanyInfo();
  }, [userId]);

  // Save company info
  const saveCompanyInfo = async (data: CompanyInfoData) => {
    setCompanyInfo(data);
    
    if (!userId) return data;
    
    try {
      const existingData = await loadSwotData(userId) || {};
      
      const updatedData = {
        ...existingData,
        companyInfo: data
      };
      
      await saveSwotData(userId, updatedData);
      
      toast({
        title: "Informações salvas",
        description: "Dados da empresa salvos com sucesso",
      });
    } catch (error) {
      console.error("Error saving company info:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar as informações da empresa",
      });
    }
    
    return data;
  };

  return {
    companyInfo,
    companyInfoDialogOpen,
    setCompanyInfoDialogOpen,
    saveCompanyInfo
  };
};
