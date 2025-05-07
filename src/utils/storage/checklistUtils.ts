
import { saveDataToSupabase, loadDataFromSupabase } from './baseUtils';

// Specific functions for Checklist tool
export const saveChecklistData = async (userId: string, checklistData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'checklist_data', checklistData);
};

export const loadChecklistData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'checklist_data');
};
