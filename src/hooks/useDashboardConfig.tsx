
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
  showClosersPerformanceTable: true,
  
  // Configurações de pré-vendas com valores padrão
  showPreSalesCalls: true,
  showPreSalesSchedulings: true,
  showPreSalesNoShow: true,
  showPreSalesSDRTable: true,
  showPreSalesCallsChart: true,
  showPreSalesSchedulingChart: true,
  showPreSalesNoShowChart: true,
  showPreSalesSDRComparisonChart: true,
  
  companyName: '',
  metricsOrder: [],
  showSpecificGoals: false,
  selectedGoalIds: [],
  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
  showTemporalRevenueChart: true,
  showTemporalBillingChart: true,
};

export const useDashboardConfig = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadConfig();
  }, [userId]);

  // Auto-save com debounce melhorado
  useEffect(() => {
    if (hasUnsavedChanges && userId) {
      console.log('🔵 useDashboardConfig - Setting up auto-save timer');
      
      // Limpar timer anterior se existir
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }

      // Configurar novo timer
      const timer = setTimeout(async () => {
        console.log('🔵 useDashboardConfig - Executing auto-save');
        const success = await performSave(config);
        if (success) {
          setHasUnsavedChanges(false);
        }
      }, 2000); // Reduzido para 2 segundos

      setAutoSaveTimer(timer);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [config, hasUnsavedChanges, userId]);

  const loadConfig = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔵 useDashboardConfig - Loading configuration for user:', userId);
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error("🔴 useDashboardConfig - Erro ao carregar configuração:", error);
        throw error;
      }

      if (data) {
        console.log('🟢 useDashboardConfig - Configuration loaded from database');
        const mappedConfig = mapDatabaseToConfig(data);
        console.log('🔍 useDashboardConfig - Mapped config:', mappedConfig);
        setConfig(mappedConfig);
      } else {
        console.log("🟡 useDashboardConfig - No configuration found, using default");
        setConfig(defaultConfig);
        // Salvar configuração padrão
        await performSave(defaultConfig);
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

  const performSave = async (configToSave: DashboardConfig): Promise<boolean> => {
    if (!userId) {
      console.error("🔴 useDashboardConfig - User not found");
      return false;
    }

    console.log('🔵 useDashboardConfig - Starting save process');
    console.log('🔍 useDashboardConfig - Config to save:', configToSave);
    
    try {
      const databaseData = mapConfigToDatabase(configToSave, userId);
      console.log('🔍 useDashboardConfig - Database data:', databaseData);
      
      const { error } = await supabase
        .from('dashboard_configs')
        .upsert(databaseData, { onConflict: 'user_id' });

      if (error) {
        console.error("🔴 useDashboardConfig - Save error:", error);
        throw error;
      }

      console.log('🟢 useDashboardConfig - Configuration saved successfully');
      return true;
    } catch (error) {
      console.error("🔴 useDashboardConfig - Failed to save configuration:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar as configurações do dashboard.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateConfig = (newConfig: DashboardConfig) => {
    console.log('🔵 useDashboardConfig - Config updated');
    console.log('🔍 useDashboardConfig - New config:', newConfig);
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const forceSave = async (): Promise<boolean> => {
    console.log('🔵 useDashboardConfig - Force save requested');
    setIsLoading(true);
    
    // Limpar timer de auto-save se existir
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
      setAutoSaveTimer(null);
    }
    
    try {
      const success = await performSave(config);
      if (success) {
        setHasUnsavedChanges(false);
        toast({
          title: "Sucesso",
          description: "Configurações salvas com sucesso.",
        });
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    config,
    setConfig: updateConfig,
    saveConfig: forceSave,
    isLoading,
    hasUnsavedChanges
  };
};
