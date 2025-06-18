
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { DashboardConfig } from '@/types/dashboardConfig';
import { defaultConfig } from '@/config/dashboardDefaults';
import { loadDashboardConfig, saveDashboardConfig } from '@/services/dashboardConfigService';

export const useDashboardConfig = () => {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const loadConfig = async () => {
    if (!userId) {
      console.log('🟡 useDashboardConfig - No userId, using default config');
      setConfig(defaultConfig);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('🔵 useDashboardConfig - Loading config for user:', userId);
      const loadedConfig = await loadDashboardConfig(userId);
      
      if (loadedConfig) {
        console.log('🟢 useDashboardConfig - Config loaded successfully:', loadedConfig);
        console.log('🔍 useDashboardConfig - Loaded Super Meta Faturamento:', loadedConfig.showSuperMetaFaturamento);
        setConfig(loadedConfig);
      } else {
        console.log('🟡 useDashboardConfig - No config found, using defaults');
        setConfig(defaultConfig);
      }
    } catch (error) {
      console.error('🔴 useDashboardConfig - Erro ao carregar configurações do dashboard:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar suas configurações salvas."
      });
      setConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: DashboardConfig) => {
    console.log('🔵 useDashboardConfig - SAVE CONFIG CALLED');
    console.log('🔵 useDashboardConfig - Config being saved:', newConfig);
    console.log('🔍 useDashboardConfig - Super Meta Faturamento being saved:', newConfig.showSuperMetaFaturamento);
    
    if (!userId) {
      console.log('🔴 useDashboardConfig - No userId, cannot save');
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar as configurações."
      });
      return false;
    }

    try {
      setIsLoading(true);
      console.log('🔵 useDashboardConfig - Calling saveDashboardConfig service...');
      
      // Save to database FIRST
      await saveDashboardConfig(newConfig, userId);
      console.log('🟢 useDashboardConfig - Database save completed successfully');
      
      // Only update local state after successful save
      setConfig(newConfig);
      console.log('🟢 useDashboardConfig - Local state updated after successful save');
      console.log('🔍 useDashboardConfig - Local state Super Meta Faturamento:', newConfig.showSuperMetaFaturamento);
      
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações do dashboard foram salvas com sucesso."
      });
      
      console.log('🟢 useDashboardConfig - Configuration saved successfully');
      return true;
    } catch (error: any) {
      console.error('🔴 useDashboardConfig - Erro ao salvar configurações do dashboard:', error);
      
      // Don't change local state if save fails, just show error
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: `Não foi possível salvar suas configurações: ${error.message || 'Tente novamente.'}`
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load config when userId changes
  useEffect(() => {
    console.log('🔵 useDashboardConfig - useEffect triggered, userId:', userId);
    loadConfig();
  }, [userId]);

  // Debug config changes
  useEffect(() => {
    console.log('🔵 useDashboardConfig - Config state changed:', config);
    console.log('🔍 useDashboardConfig - Current Super Meta Faturamento:', config.showSuperMetaFaturamento);
  }, [config]);

  return {
    config,
    setConfig,
    saveConfig,
    loadConfig,
    isLoading
  };
};

export type { DashboardConfig };
