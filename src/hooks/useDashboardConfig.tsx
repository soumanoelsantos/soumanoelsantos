import { useState, useEffect } from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const defaultConfig: DashboardConfig = {
  showConversion: true,
  showRevenue: true,
  showTicketFaturamento: false,
  showTicketReceita: false,
  showFaltaFaturamento: false,
  showFaltaReceita: false,
  showDiariaReceita: false,
  showDiariaFaturamento: false,
  showSuperMetaFaturamento: false,
  showSuperMetaReceita: false,
  showHiperMetaFaturamento: false,
  showHiperMetaReceita: false,
  showFaltaReceitaSuper: false,
  showFaltaReceitaHiper: false,
  showFaltaFaturamentoSuper: false,
  showFaltaFaturamentoHiper: false,
  showMetaFaturamento: false,
  showMetaReceita: false,
  showFaturamento: false,
  showReceita: false,
  showQuantidadeVendas: false,
  showCashCollect: false,
  showCac: false,
  showProjecaoReceita: false,
  showProjecaoFaturamento: false,
  showNoShow: false,
  companyName: '',
  metricsOrder: [],
  showSpecificGoals: false,
  selectedGoalIds: [],
  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
  // Novos gráficos de performance dos vendedores
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
};

export const useDashboardConfig = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        saveConfig(config);
        setHasUnsavedChanges(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [config, hasUnsavedChanges]);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('dashboard_config')
        .select('*')
        .single();

      if (error) {
        console.error("Erro ao carregar configuração do dashboard:", error);
        throw error;
      }

      if (data) {
        setConfig(data as DashboardConfig);
      } else {
        console.log("Nenhuma configuração encontrada, usando a padrão.");
        setConfig(defaultConfig);
        await saveConfig(defaultConfig); // Salva a configuração padrão no banco
      }
    } catch (error) {
      console.error("Falha ao carregar a configuração:", error);
      toast({
        title: "Erro",
        description: "Falha ao carregar a configuração do dashboard.",
        variant: "destructive",
      });
      setConfig(defaultConfig); // Garante que o estado tenha um valor padrão
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: DashboardConfig): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('dashboard_config')
        .upsert(newConfig, { onConflict: ['id'] });

      if (error) {
        console.error("Erro ao salvar configuração do dashboard:", error);
        throw error;
      }

      toast({
        title: "Sucesso",
        description: "Configurações do dashboard salvas com sucesso.",
      });
      return true;
    } catch (error) {
      console.error("Falha ao salvar a configuração:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar as configurações do dashboard.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const setConfigWithAutoSave = (newConfig: DashboardConfig) => {
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  return {
    config,
    setConfig: setConfigWithAutoSave,
    saveConfig,
    isLoading,
    hasUnsavedChanges
  };
};
