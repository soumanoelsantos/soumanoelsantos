
import { saveDataToSupabase, loadDataFromSupabase } from './baseUtils';

// Specific functions for Checklist tool
export const saveChecklistData = async (userId: string, checklistData: any): Promise<boolean> => {
  console.log("Saving checklist data for user:", userId);
  const result = await saveDataToSupabase(userId, 'checklist_data', checklistData);
  console.log("Checklist data saved result:", result);
  return result;
};

export const loadChecklistData = async (userId: string): Promise<any | null> => {
  console.log("Loading checklist data for user:", userId);
  const data = await loadDataFromSupabase(userId, 'checklist_data');
  console.log("Loaded checklist data:", data ? "Data found" : "No data found");
  return data;
};
