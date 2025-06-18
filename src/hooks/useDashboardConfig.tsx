
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { DashboardConfig } from '@/types/dashboardConfig';
import { defaultConfig } from '@/config/dashboardDefaults';
import { loadDashboardConfig, saveDashboardConfig } from '@/services/dashboardConfigService';

export const useDashboardConfig = () => {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  const loadConfig = async () => {
    if (!userId) {
      setConfig(defaultConfig);
      return;
    }
    
    try {
      setIsLoading(true);
      const loadedConfig = await loadDashboardConfig(userId);
      
      if (loadedConfig) {
        setConfig(loadedConfig);
        setHasUnsavedChanges(false);
      } else {
        setConfig(defaultConfig);
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.error('🔴 useDashboardConfig - Erro ao carregar configurações do dashboard:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar suas configurações salvas."
      });
      setConfig(defaultConfig);
      setHasUnsavedChanges(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfigToDatabase = async (configToSave: DashboardConfig) => {
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
      
      await saveDashboardConfig(configToSave, userId);
      
      setHasUnsavedChanges(false);
      return true;
    } catch (error: any) {
      console.error('🔴 useDashboardConfig - Erro ao salvar configurações:', error);
      
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

  const updateConfig = (newConfig: DashboardConfig) => {
    setConfig(newConfig);
    setHasUnsavedChanges(true);

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (save after 1 second of no changes)
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveConfigToDatabase(newConfig);
    }, 1000);
  };

  const saveConfig = async (configToSave: DashboardConfig) => {
    // Clear auto-save timeout since we're saving manually
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    const success = await saveConfigToDatabase(configToSave);
    
    if (success) {
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações do dashboard foram salvas com sucesso."
      });
    }
    
    return success;
  };

  // Load config when userId changes
  useEffect(() => {
    loadConfig();
  }, [userId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  return {
    config,
    setConfig: updateConfig,
    saveConfig,
    loadConfig,
    isLoading,
    hasUnsavedChanges
  };
};

export type { DashboardConfig };
