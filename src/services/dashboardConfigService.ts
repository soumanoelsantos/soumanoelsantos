
import { supabase } from '@/integrations/supabase/client';
import { DashboardConfig } from '@/types/dashboardConfig';
import { mapDatabaseToConfig, mapConfigToDatabase } from '@/utils/dashboardConfigMapper';

export const loadDashboardConfig = async (userId: string): Promise<DashboardConfig | null> => {
  console.log('Loading config for user:', userId);
  
  const { data, error } = await supabase
    .from('dashboard_configs')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error loading config:', error);
    throw error;
  }

  if (data) {
    console.log('Config loaded:', data);
    return mapDatabaseToConfig(data);
  }

  console.log('No config found, using defaults');
  return null;
};

export const saveDashboardConfig = async (config: DashboardConfig, userId: string): Promise<void> => {
  console.log('Saving config for user:', userId, config);
  
  const configData = mapConfigToDatabase(config, userId);
  console.log('Config data to save:', configData);

  // Check if config already exists
  const { data: existingConfig } = await supabase
    .from('dashboard_configs')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  let result;
  if (existingConfig) {
    // Update existing config
    result = await supabase
      .from('dashboard_configs')
      .update(configData)
      .eq('user_id', userId);
  } else {
    // Insert new config
    result = await supabase
      .from('dashboard_configs')
      .insert(configData);
  }

  console.log('Save result:', result);

  if (result.error) {
    console.error('Save error:', result.error);
    throw result.error;
  }
};
