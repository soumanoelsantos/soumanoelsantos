
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';

// Specific functions for Business Map tool
export const saveBusinessMapData = async (userId: string, businessMapData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'business_map_data', businessMapData);
};

export const loadBusinessMapData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'business_map_data');
};
