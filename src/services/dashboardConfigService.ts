
import { supabase } from '@/integrations/supabase/client';
import { DashboardConfig } from '@/types/dashboardConfig';
import { mapConfigToDatabase, mapDatabaseToConfig } from '@/utils/dashboardConfigMapper';

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
      console.log('🟢 dashboardConfigService - Config loaded from database:', data);
      return mapDatabaseToConfig(data);
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
    // Mapear configuração para formato do banco
    const configData = mapConfigToDatabase(config);
    
    // Adicionar user_id e timestamp
    const finalData = {
      ...configData,
      user_id: userId,
      updated_at: new Date().toISOString()
    };

    console.log('🔵 dashboardConfigService - Final data for database:', finalData);

    // Usar upsert para inserir ou atualizar
    const { data, error } = await supabase
      .from('dashboard_configs')
      .upsert(finalData, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (error) {
      console.error('🔴 dashboardConfigService - Upsert error:', error);
      throw error;
    }

    console.log('🟢 dashboardConfigService - Configuration saved successfully:', data);
    
  } catch (error) {
    console.error('🔴 dashboardConfigService - Unexpected error during save:', error);
    throw error;
  }
};
