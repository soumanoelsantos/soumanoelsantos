
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

// General function to save data to a specified table
export const saveDataToSupabase = async (
  tableName: string,
  userId: string,
  dataKey: string,
  data: any
): Promise<boolean> => {
  try {
    // First check if an entry already exists for this user
    const { data: existingData, error: fetchError } = await supabase
      .from(tableName)
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
      console.error(`Error fetching existing ${tableName} data:`, fetchError);
      throw fetchError;
    }

    // Prepare data object
    const dataObject = {
      user_id: userId,
      [dataKey]: data as Json,
      updated_at: new Date().toISOString()
    };

    let result;
    
    if (existingData) {
      // Update existing entry
      result = await supabase
        .from(tableName)
        .update(dataObject)
        .eq('id', existingData.id);
    } else {
      // Insert new entry
      result = await supabase
        .from(tableName)
        .insert({
          ...dataObject,
          created_at: new Date().toISOString()
        });
    }

    if (result.error) {
      throw result.error;
    }

    return true;
  } catch (error) {
    console.error(`Error saving ${tableName} data:`, error);
    return false;
  }
};

// General function to load data from a specified table
export const loadDataFromSupabase = async (
  tableName: string,
  userId: string,
  dataKey: string
): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
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
    console.error(`Error loading ${tableName} data:`, error);
    return null;
  }
};

// Specific functions for each tool
export const saveSwotData = async (userId: string, swotData: any): Promise<boolean> => {
  return saveDataToSupabase('user_tools_data', userId, 'swot_data', swotData);
};

export const loadSwotData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase('user_tools_data', userId, 'swot_data');
};

export const saveChecklistData = async (userId: string, checklistData: any): Promise<boolean> => {
  return saveDataToSupabase('user_tools_data', userId, 'checklist_data', checklistData);
};

export const loadChecklistData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase('user_tools_data', userId, 'checklist_data');
};

export const saveBusinessMapData = async (userId: string, businessMapData: any): Promise<boolean> => {
  return saveDataToSupabase('user_tools_data', userId, 'business_map_data', businessMapData);
};

export const loadBusinessMapData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase('user_tools_data', userId, 'business_map_data');
};

export const savePuvData = async (userId: string, puvData: any): Promise<boolean> => {
  return saveDataToSupabase('user_tools_data', userId, 'puv_data', puvData);
};

export const loadPuvData = async (userId: string): Promise<any | null> => {
  return loadDataFromSupabase('user_tools_data', userId, 'puv_data');
};
