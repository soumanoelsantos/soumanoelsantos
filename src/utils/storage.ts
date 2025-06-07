
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

export const loadChecklistData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('checklist_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao carregar dados checklist:', error);
      return null;
    }

    return data?.checklist_data;
  } catch (error) {
    console.error('Erro ao carregar dados checklist:', error);
    return null;
  }
};

export const loadMapaEquipeData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('mapa_equipe')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Erro ao carregar dados mapa equipe:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao carregar dados mapa equipe:', error);
    return null;
  }
};

export const saveMapaEquipeData = async (userId: string, data: any) => {
  try {
    const { data: result, error } = await supabase
      .from('mapa_equipe')
      .upsert({
        user_id: userId,
        empresa_nome: data.empresaNome,
        colaboradores: data.colaboradores,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar mapa equipe:', error);
      return { success: false, error };
    }

    return { success: true, id: result?.id };
  } catch (error) {
    console.error('Erro ao salvar mapa equipe:', error);
    return { success: false, error };
  }
};

export const deleteMapaEquipeData = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('mapa_equipe')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao deletar mapa equipe:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar mapa equipe:', error);
    return false;
  }
};

export const loadDiagnosticDataFromSupabase = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Erro ao carregar diagnóstico:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao carregar diagnóstico:', error);
    return null;
  }
};
