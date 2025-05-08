
import { saveDataToSupabase, loadDataFromSupabase } from './baseUtils';
import { supabase } from '@/integrations/supabase/client';

// Specific functions for Mapa de Equipe tool
export const saveMapaEquipeData = async (
  userId: string,
  data: any
): Promise<{ success: boolean; id: string | null }> => {
  try {
    // Check if an entry already exists for this user
    const { data: existingData, error: fetchError } = await supabase
      .from('mapa_equipe')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError) {
      console.error(`Error fetching existing mapa_equipe data:`, fetchError);
      return { success: false, id: null };
    }

    const { empresaNome, colaboradores } = data;
    
    let result;
    if (existingData) {
      // Update existing entry
      result = await supabase
        .from('mapa_equipe')
        .update({
          empresa_nome: empresaNome,
          colaboradores: colaboradores,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id);
      
      if (result.error) {
        throw result.error;
      }
      
      return { success: true, id: existingData.id };
    } else {
      // Insert new entry
      result = await supabase
        .from('mapa_equipe')
        .insert({
          user_id: userId,
          empresa_nome: empresaNome,
          colaboradores: colaboradores
        });
      
      if (result.error) {
        throw result.error;
      }
      
      // Get the ID of the newly inserted record
      const { data: newData } = await supabase
        .from('mapa_equipe')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      return { success: true, id: newData?.id || null };
    }
  } catch (error) {
    console.error(`Error saving mapa_equipe data:`, error);
    return { success: false, id: null };
  }
};

export const loadMapaEquipeData = async (userId: string): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('mapa_equipe')
      .select('empresa_nome, colaboradores')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error loading mapa_equipe data:`, error);
      return null;
    }
    
    if (!data) return null;
    
    return {
      empresaNome: data.empresa_nome,
      colaboradores: data.colaboradores
    };
  } catch (error) {
    console.error(`Error loading mapa_equipe data:`, error);
    return null;
  }
};

export const deleteMapaEquipeData = async (userId: string): Promise<boolean> => {
  try {
    // Find the record first
    const { data: existingData, error: fetchError } = await supabase
      .from('mapa_equipe')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError) {
      console.error(`Error fetching mapa_equipe data for deletion:`, fetchError);
      return false;
    }
    
    if (!existingData) {
      // No record found to delete
      return true;
    }
    
    // Delete the record
    const { error: deleteError } = await supabase
      .from('mapa_equipe')
      .delete()
      .eq('id', existingData.id);
    
    if (deleteError) {
      console.error(`Error deleting mapa_equipe data:`, deleteError);
      return false;
    }
    
    // Also remove from user_tools_data if it exists
    await saveDataToSupabase(userId, 'mapa_equipe', null);
    
    return true;
  } catch (error) {
    console.error(`Error deleting mapa_equipe data:`, error);
    return false;
  }
};
