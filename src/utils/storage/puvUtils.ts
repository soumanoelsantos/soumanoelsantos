
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';

// Specific functions for PUV (Proposta Única de Valor) tool
export const savePuvData = async (userId: string, puvData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'puv_data', puvData);
};

export const loadPuvData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'puv_data');
};
