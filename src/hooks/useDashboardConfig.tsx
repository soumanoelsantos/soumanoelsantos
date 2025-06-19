
import { useState, useEffect } from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { mapDatabaseToConfig, mapConfigToDatabase } from '@/utils/dashboardConfigMapper';
import { useAuth } from '@/hooks/useAuth';

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
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
  // Novos gráficos de análise temporal
  showTemporalRevenueChart: true,
  showTemporalBillingChart: true,
};

export const useDashboardConfig = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (hasUnsavedChanges) {
      console.log('🔵 useDashboardConfig - Auto-save triggered, will save in 3 seconds');
      const timer = setTimeout(() => {
        console.log('🔵 useDashboardConfig - Executing auto-save');
        saveConfig(config);
        setHasUnsavedChanges(false);
      }, 3000);

      return () => {
        console.log('🔵 useDashboardConfig - Auto-save timer cleared');
        clearTimeout(timer);
      };
    }
  }, [config, hasUnsavedChanges]);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      console.log('🔵 useDashboardConfig - Loading configuration');
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .single();

      if (error) {
        console.error("🔴 useDashboardConfig - Erro ao carregar configuração:", error);
        throw error;
      }

      if (data) {
        console.log('🟢 useDashboardConfig - Configuration loaded from database');
        const mappedConfig = mapDatabaseToConfig(data);
        console.log('🔍 useDashboardConfig - Mapped config metricsOrder:', mappedConfig.metricsOrder);
        setConfig(mappedConfig);
      } else {
        console.log("🟡 useDashboardConfig - No configuration found, using default");
        setConfig(defaultConfig);
        await saveConfig(defaultConfig);
      }
    } catch (error) {
      console.error("🔴 useDashboardConfig - Failed to load configuration:", error);
      toast({
        title: "Erro",
        description: "Falha ao carregar a configuração do dashboard.",
        variant: "destructive",
      });
      setConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: DashboardConfig): Promise<boolean> => {
    if (!userId) {
      console.error("🔴 useDashboardConfig - User not found");
      return false;
    }

    console.log('🔵 useDashboardConfig - Starting save process');
    console.log('🔍 useDashboardConfig - Config to save metricsOrder:', newConfig.metricsOrder);
    
    setIsLoading(true);
    try {
      const databaseData = mapConfigToDatabase(newConfig, userId);
      console.log('🔍 useDashboardConfig - Database data metrics_order:', databaseData.metrics_order);
      
      const { error } = await supabase
        .from('dashboard_configs')
        .upsert(databaseData, { onConflict: 'user_id' });

      if (error) {
        console.error("🔴 useDashboardConfig - Save error:", error);
        throw error;
      }

      console.log('🟢 useDashboardConfig - Configuration saved successfully');
      toast({
        title: "Sucesso",
        description: "Configurações do dashboard salvas com sucesso.",
      });
      return true;
    } catch (error) {
      console.error("🔴 useDashboardConfig - Failed to save configuration:", error);
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
    console.log('🔵 useDashboardConfig - Config updated, setting auto-save flag');
    console.log('🔍 useDashboardConfig - New metricsOrder:', newConfig.metricsOrder);
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const forceSave = async (): Promise<boolean> => {
    console.log('🔵 useDashboardConfig - Force save requested');
    const success = await saveConfig(config);
    if (success) {
      setHasUnsavedChanges(false);
    }
    return success;
  };

  return {
    config,
    setConfig: setConfigWithAutoSave,
    saveConfig: forceSave,
    isLoading,
    hasUnsavedChanges
  };
};
