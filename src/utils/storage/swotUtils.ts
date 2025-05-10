
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';

// Specific functions for SWOT tool
export const saveSwotData = async (userId: string, swotData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'swot_data', swotData);
};

export const loadSwotData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'swot_data');
};
