
import { supabase } from '@/integrations/supabase/client';
import { DashboardConfig } from '@/types/dashboardConfig';
import { mapDatabaseToConfig, mapConfigToDatabase } from '@/utils/dashboardConfigMapper';

export const loadDashboardConfig = async (userId: string): Promise<DashboardConfig | null> => {
  console.log('🔵 dashboardConfigService - Loading config for user:', userId);
  
  try {
    const { data, error } = await supabase
      .from('dashboard_configs')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('🔴 dashboardConfigService - Error loading config:', error);
      throw error;
    }

    if (data) {
      console.log('🟢 dashboardConfigService - Config loaded from database');
      const mappedConfig = mapDatabaseToConfig(data);
      return mappedConfig;
    }

    console.log('🟡 dashboardConfigService - No config found, returning null');
    return null;
  } catch (error) {
    console.error('🔴 dashboardConfigService - Unexpected error:', error);
    throw error;
  }
};

export const saveDashboardConfig = async (config: DashboardConfig, userId: string): Promise<void> => {
  console.log('🔵 dashboardConfigService - Starting save for user:', userId);
  console.log('🔵 dashboardConfigService - Config to save:', config);
  
  try {
    const configData = mapConfigToDatabase(config);
    console.log('🔵 dashboardConfigService - Mapped data for database:', configData);

    // Use upsert to insert or update in one operation
    const { data, error } = await supabase
      .from('dashboard_configs')
      .upsert({
        user_id: userId,
        ...configData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      console.error('🔴 dashboardConfigService - Upsert error:', error);
      throw error;
    }

    console.log('🟢 dashboardConfigService - Configuration saved successfully:', data);
    
    // Força uma atualização da página para garantir que os dados sejam recarregados
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.error('🔴 dashboardConfigService - Unexpected error during save:', error);
    throw error;
  }
};
