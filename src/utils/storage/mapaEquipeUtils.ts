
import { saveDataToSupabase, loadDataFromSupabase } from './baseUtils';

// Specific functions for Mapa de Equipe tool
export const saveMapaEquipeData = async (userId: string, mapaEquipeData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'mapa_equipe', mapaEquipeData);
};

export const loadMapaEquipeData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'mapa_equipe');
};
