
import { supabase } from '@/integrations/supabase/client';
import { DashboardConfig } from '@/types/dashboardConfig';
import { mapDatabaseToConfig, mapConfigToDatabase } from '@/utils/dashboardConfigMapper';

export const loadDashboardConfig = async (userId: string): Promise<DashboardConfig | null> => {
  console.log('dashboardConfigService - Loading config for user:', userId);
  
  const { data, error } = await supabase
    .from('dashboard_configs')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('dashboardConfigService - Error loading config:', error);
    throw error;
  }

  if (data) {
    console.log('dashboardConfigService - Raw data from database:', data);
    const mappedConfig = mapDatabaseToConfig(data);
    console.log('dashboardConfigService - Mapped config:', mappedConfig);
    return mappedConfig;
  }

  console.log('dashboardConfigService - No config found, returning null');
  return null;
};

export const saveDashboardConfig = async (config: DashboardConfig, userId: string): Promise<void> => {
  console.log('dashboardConfigService - Saving config for user:', userId);
  console.log('dashboardConfigService - Config to save:', config);
  
  const configData = mapConfigToDatabase(config, userId);
  console.log('dashboardConfigService - Config data to save:', configData);

  // Check if config already exists
  const { data: existingConfig, error: fetchError } = await supabase
    .from('dashboard_configs')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (fetchError) {
    console.error('dashboardConfigService - Error checking existing config:', fetchError);
    throw fetchError;
  }

  let result;
  if (existingConfig) {
    // Update existing config
    console.log('dashboardConfigService - Updating existing config for user:', userId);
    result = await supabase
      .from('dashboard_configs')
      .update(configData)
      .eq('user_id', userId);
  } else {
    // Insert new config
    console.log('dashboardConfigService - Creating new config for user:', userId);
    result = await supabase
      .from('dashboard_configs')
      .insert(configData);
  }

  console.log('dashboardConfigService - Save result:', result);

  if (result.error) {
    console.error('dashboardConfigService - Save error:', result.error);
    throw result.error;
  }

  console.log('dashboardConfigService - Configuration saved successfully');
};
