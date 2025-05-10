
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';
import { MapaEquipeData } from '@/types/mapaEquipe';

// Specific functions for Mapa Equipe tool
export const saveMapaEquipeData = async (userId: string, mapaEquipeData: MapaEquipeData): Promise<{ success: boolean, id?: string }> => {
  try {
    console.log("Saving mapa equipe data:", mapaEquipeData);
    const saved = await saveDataToSupabase(userId, 'mapa_equipe', mapaEquipeData);
    console.log("Mapa equipe data saved:", saved);
    return { success: saved };
  } catch (error) {
    console.error('Error saving mapa equipe data:', error);
    return { success: false };
  }
};

export const loadMapaEquipeData = async (userId: string): Promise<MapaEquipeData | null> => {
  try {
    const data = await loadDataFromSupabase(userId, 'mapa_equipe');
    console.log("Loaded mapa equipe data:", data);
    return data;
  } catch (error) {
    console.error('Error loading mapa equipe data:', error);
    return null;
  }
};

export const deleteMapaEquipeData = async (userId: string): Promise<boolean> => {
  try {
    // Salvar um objeto vazio funciona como "deletar" para nosso caso
    console.log("Deleting mapa equipe data");
    const saved = await saveDataToSupabase(userId, 'mapa_equipe', null);
    console.log("Mapa equipe data deleted:", saved);
    return saved;
  } catch (error) {
    console.error('Error deleting mapa equipe data:', error);
    return false;
  }
};
