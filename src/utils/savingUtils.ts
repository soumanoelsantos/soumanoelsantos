
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

// General function to save data to the user_tools_data table
export const saveDataToSupabase = async (
  userId: string,
  dataKey: string,
  data: any
): Promise<boolean> => {
  try {
    // First check if an entry already exists for this user
    const { data: existingData, error: fetchError } = await supabase
      .from('user_tools_data')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
      console.error(`Error fetching existing user_tools_data:`, fetchError);
      throw fetchError;
    }

    // Prepare data object with the correct format
    const updateObject: Record<string, any> = {
      user_id: userId,
      updated_at: new Date().toISOString()
    };
    
    // Add the specific data field dynamically
    updateObject[dataKey] = data as Json;

    let result;
    
    if (existingData) {
      // Update existing entry
      result = await supabase
        .from('user_tools_data')
        .update(updateObject)
        .eq('id', existingData.id);
    } else {
      // Insert new entry
      result = await supabase
        .from('user_tools_data')
        .insert({
          ...updateObject,
          created_at: new Date().toISOString()
        });
    }

    if (result.error) {
      throw result.error;
    }

    return true;
  } catch (error) {
    console.error(`Error saving user_tools_data:`, error);
    return false;
  }
};

// General function to load data from the user_tools_data table
export const loadDataFromSupabase = async (
  userId: string,
  dataKey: string
): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "No rows found"
        return null;
      }
      throw error;
    }
    
    return data[dataKey];
  } catch (error) {
    console.error(`Error loading ${dataKey} data:`, error);
    return null;
  }
};

// Specific functions for each tool
export const saveSwotData = async (userId: string, swotData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'swot_data', swotData);
};

export const loadSwotData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'swot_data');
};

export const saveChecklistData = async (userId: string, checklistData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'checklist_data', checklistData);
};

export const loadChecklistData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'checklist_data');
};

export const saveBusinessMapData = async (userId: string, businessMapData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'business_map_data', businessMapData);
};

export const loadBusinessMapData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'business_map_data');
};

export const savePuvData = async (userId: string, puvData: any): Promise<boolean> => {
  return saveDataToSupabase(userId, 'puv_data', puvData);
};

export const loadPuvData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase(userId, 'puv_data');
};
