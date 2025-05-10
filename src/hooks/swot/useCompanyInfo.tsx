
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { loadDataFromSupabase, saveDataToSupabase } from '@/utils/storage';
import { CompanyInfoData } from '@/types/companyInfo';

export const useCompanyInfo = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoData | null>(null);
  const [companyInfoDialogOpen, setCompanyInfoDialogOpen] = useState(false);

  // Load saved company info on component mount
  useEffect(() => {
    const loadSavedCompanyInfo = async () => {
      if (!userId) return;
      
      try {
        const savedCompanyInfo = await loadDataFromSupabase(userId, 'swot_company_info');
        if (savedCompanyInfo) {
          setCompanyInfo(savedCompanyInfo);
          console.log("Loaded saved company info:", savedCompanyInfo);
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
    
    if (userId) {
      try {
        await saveDataToSupabase(userId, 'swot_company_info', data);
      } catch (error) {
        console.error("Error saving company info:", error);
        toast({
          variant: "destructive",
          title: "Erro ao salvar",
          description: "Não foi possível salvar as informações da empresa",
        });
      }
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
