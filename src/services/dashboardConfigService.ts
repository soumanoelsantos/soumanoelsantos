
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
      console.log('🟢 dashboardConfigService - Raw data from database:', data);
      const mappedConfig = mapDatabaseToConfig(data);
      console.log('🟢 dashboardConfigService - Mapped config:', mappedConfig);
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
  console.log('🔍 dashboardConfigService - Super Meta Faturamento value:', config.showSuperMetaFaturamento);
  
  try {
    const configData = mapConfigToDatabase(config, userId);
    console.log('🔵 dashboardConfigService - Mapped data for database:', configData);
    console.log('🔍 dashboardConfigService - Super Meta Faturamento mapped:', configData.show_super_meta_faturamento);

    // Use upsert to insert or update in one operation
    const { data, error } = await supabase
      .from('dashboard_configs')
      .upsert(configData, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      console.error('🔴 dashboardConfigService - Upsert error:', error);
      console.error('🔴 dashboardConfigService - Error details:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('🟢 dashboardConfigService - Configuration saved successfully:', data);
    console.log('🔍 dashboardConfigService - Saved Super Meta Faturamento:', data?.show_super_meta_faturamento);
  } catch (error) {
    console.error('🔴 dashboardConfigService - Unexpected error during save:', error);
    throw error;
  }
};
