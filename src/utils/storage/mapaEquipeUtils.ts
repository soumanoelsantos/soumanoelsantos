
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';

// Specific functions for Mapa Equipe tool
export const saveMapaEquipeData = async (userId: string, mapaEquipeData: any): Promise<{ success: boolean, id?: string }> => {
  try {
    const saved = await saveDataToSupabase(userId, 'mapa_equipe', mapaEquipeData);
    return { success: saved };
  } catch (error) {
    console.error('Error saving mapa equipe data:', error);
    return { success: false };
  }
};

export const loadMapaEquipeData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'mapa_equipe');
};

export const deleteMapaEquipeData = async (userId: string): Promise<boolean> => {
  try {
    // Salvar um objeto vazio funciona como "deletar" para nosso caso
    const saved = await saveDataToSupabase(userId, 'mapa_equipe', null);
    return saved;
  } catch (error) {
    console.error('Error deleting mapa equipe data:', error);
    return false;
  }
};
