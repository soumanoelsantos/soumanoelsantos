// Re-export all storage utilities from a single file for easier imports
export * from './storage/index';

import { supabase } from "@/integrations/supabase/client";

export const loadSwotData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('swot_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao carregar dados SWOT:', error);
      return null;
    }

    return data?.swot_data;
  } catch (error) {
    console.error('Erro ao carregar dados SWOT:', error);
    return null;
  }
};

export const loadBusinessMapData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('business_map_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao carregar dados do mapa de negócio:', error);
      return null;
    }

    return data?.business_map_data;
  } catch (error) {
    console.error('Erro ao carregar dados do mapa de negócio:', error);
    return null;
  }
};

export const loadPUVData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('puv_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao carregar dados PUV:', error);
      return null;
    }

    return data?.puv_data;
  } catch (error) {
    console.error('Erro ao carregar dados PUV:', error);
    return null;
  }
};

export const loadPhaseTestResults = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('fase_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Erro ao carregar resultados do teste de fase:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao carregar resultados do teste de fase:', error);
    return null;
  }
};
