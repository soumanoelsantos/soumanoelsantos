
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
      console.log('🟡 useDashboardConfig - No userId, using default config');
      setConfig(defaultConfig);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('🔵 useDashboardConfig - Loading config for user:', userId);
      const loadedConfig = await loadDashboardConfig(userId);
      
      if (loadedConfig) {
        console.log('🟢 useDashboardConfig - Config loaded successfully');
        setConfig(loadedConfig);
        setHasUnsavedChanges(false);
      } else {
        console.log('🟡 useDashboardConfig - No config found, using defaults');
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
      console.log('🔵 useDashboardConfig - Starting save process for user:', userId);
      console.log('🔵 useDashboardConfig - Config to save:', configToSave);
      
      await saveDashboardConfig(configToSave, userId);
      console.log('🟢 useDashboardConfig - Config saved successfully');
      
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
    console.log('🔵 useDashboardConfig - Config updated, scheduling auto-save');
    setConfig(newConfig);
    setHasUnsavedChanges(true);

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (save after 1 second of no changes)
    autoSaveTimeoutRef.current = setTimeout(() => {
      console.log('🔵 useDashboardConfig - Auto-save timeout triggered');
      saveConfigToDatabase(newConfig);
    }, 1000);
  };

  const saveConfig = async (configToSave: DashboardConfig) => {
    console.log('🔵 useDashboardConfig - Manual save triggered');
    console.log('🔵 useDashboardConfig - Config to save:', configToSave);
    
    // Clear auto-save timeout since we're saving manually
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    const success = await saveConfigToDatabase(configToSave);
    console.log('🔵 useDashboardConfig - Save result:', success);
    
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
    console.log('🔵 useDashboardConfig - useEffect triggered, userId:', userId);
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
