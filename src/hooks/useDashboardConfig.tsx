
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
    if (!userId) return;
    
    try {
      setIsLoading(true);
      console.log('Loading config for user:', userId);
      const loadedConfig = await loadDashboardConfig(userId);
      
      if (loadedConfig) {
        console.log('Config loaded successfully:', loadedConfig);
        setConfig(loadedConfig);
      } else {
        console.log('No config found, using defaults');
      }
    } catch (error) {
      console.error('Erro ao carregar configurações do dashboard:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar suas configurações salvas."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: DashboardConfig) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar as configurações."
      });
      return false;
    }

    try {
      setIsLoading(true);
      console.log('Saving config:', newConfig);
      await saveDashboardConfig(newConfig, userId);
      
      setConfig(newConfig);
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações do dashboard foram salvas com sucesso."
      });
      
      console.log('Configuration saved successfully');
      return true;
    } catch (error: any) {
      console.error('Erro ao salvar configurações do dashboard:', error);
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

  useEffect(() => {
    loadConfig();
  }, [userId]);

  return {
    config,
    setConfig,
    saveConfig,
    loadConfig,
    isLoading
  };
};

export type { DashboardConfig };
