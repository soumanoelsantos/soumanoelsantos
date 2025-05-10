
import { saveDataToSupabase, loadDataFromSupabase } from './dataAccess';

// Specific functions for SWOT tool
export const saveSwotData = async (userId: string, swotData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'swot_data', swotData);
};

export const loadSwotData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'swot_data');
};

// Specific function for SWOT action plan
export const saveSwotActionPlan = async (userId: string, plan: Record<string, string[]>): Promise<boolean> => {
  // First get existing SWOT data
  const existingData = await loadSwotData(userId) || {};
  
  // Update with new action plan
  const updatedData = {
    ...existingData,
    actionPlan: plan
  };
  
  return saveSwotData(userId, updatedData);
};

export const loadSwotActionPlan = async (userId: string): Promise<Record<string, string[]> | null> => {
  const data = await loadSwotData(userId);
  return data && data.actionPlan ? data.actionPlan : null;
};
