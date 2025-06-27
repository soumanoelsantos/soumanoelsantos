
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardConfig } from '@/types/dashboardConfig';
import { loadDashboardConfig } from '@/services/dashboardConfigService';
import { defaultConfig } from '@/config/dashboardDefaults';

export const useDashboardConfig = (sharedUserId?: string) => {
  const { userId: authUserId } = useAuth();
  const userId = sharedUserId || authUserId;
  
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = async () => {
    if (!userId) {
      console.log('⚠️ [DEBUG] No userId provided, using default config');
      setConfig(defaultConfig);
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 [DEBUG] Loading dashboard config for userId:', userId);
      
      const loadedConfig = await loadDashboardConfig(userId);

      if (loadedConfig) {
        console.log('✅ [DEBUG] Dashboard config loaded successfully:', loadedConfig);
        setConfig(loadedConfig);
      } else {
        console.log('⚠️ [DEBUG] No configuration found, using defaults');
        setConfig(defaultConfig);
      }
    } catch (error) {
      console.error('❌ [DEBUG] Error loading config:', error);
      setConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (updates: Partial<DashboardConfig>) => {
    console.log('🔄 [DEBUG] Updating local configuration:', updates);
    
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      console.log('🔄 [DEBUG] New configuration state:', newConfig);
      return newConfig;
    });
  };

  useEffect(() => {
    loadConfig();
  }, [userId]);

  return {
    config,
    updateConfig,
    isLoading,
    refetch: loadConfig
  };
};
