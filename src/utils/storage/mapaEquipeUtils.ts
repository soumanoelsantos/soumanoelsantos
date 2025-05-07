
import { supabase } from '@/integrations/supabase/client';
import { MapaEquipeData, Colaborador } from '@/types/mapaEquipe';
import { Json } from '@/integrations/supabase/types';

// Load user's mapa equipe data
export const loadMapaEquipeData = async (userId: string): Promise<MapaEquipeData | null> => {
  try {
    const { data, error } = await supabase
      .from('mapa_equipe')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // "No rows found"
        console.error('Error loading mapa equipe data:', error);
      }
      return null;
    }

    if (!data) return null;

    return {
      empresaNome: data.empresa_nome,
      colaboradores: data.colaboradores as Colaborador[]
    };
  } catch (error) {
    console.error('Error loading mapa equipe data:', error);
    return null;
  }
};

// Save user's mapa equipe data
export const saveMapaEquipeData = async (
  userId: string,
  mapaId: string | null,
  empresaNome: string,
  colaboradores: any[]
): Promise<{ success: boolean, id: string | null }> => {
  try {
    if (mapaId) {
      // Update existing mapa
      const { error } = await supabase
        .from('mapa_equipe')
        .update({
          empresa_nome: empresaNome,
          colaboradores: colaboradores as unknown as Json,
          updated_at: new Date().toISOString()
        })
        .eq('id', mapaId);
        
      if (error) throw error;
      return { success: true, id: mapaId };
    } else {
      // Insert new mapa
      const { error } = await supabase
        .from('mapa_equipe')
        .insert([{
          user_id: userId,
          empresa_nome: empresaNome,
          colaboradores: colaboradores as unknown as Json
        }]);
        
      if (error) throw error;
      
      // Get the new mapa ID
      const { data: newData, error: fetchError } = await supabase
        .from('mapa_equipe')
        .select('id')
        .eq('user_id', userId)
        .single();
        
      if (fetchError) throw fetchError;
      
      return { success: true, id: newData?.id || null };
    }
  } catch (error) {
    console.error('Error saving mapa equipe data:', error);
    return { success: false, id: null };
  }
};

// Delete user's mapa equipe data
export const deleteMapaEquipeData = async (mapaId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('mapa_equipe')
      .delete()
      .eq('id', mapaId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting mapa equipe data:', error);
    return false;
  }
};
