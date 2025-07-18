
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Define the type for user_tools_data table
interface UserToolsData {
  user_id: string;
  business_map_data?: Json;
  checklist_data?: Json;
  puv_data?: Json;
  swot_data?: Json;
  mapa_equipe?: Json;
  created_at?: string;
  updated_at?: string;
  id?: string;
  [key: string]: any; // Allow dynamic keys for specific data fields
}

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
    const updateObject: UserToolsData = {
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
      // Insert new entry - ensure user_id is present
      result = await supabase
        .from('user_tools_data')
        .insert(updateObject);
    }

    if (result.error) {
      throw result.error;
    }

    // Toasts removidos - nenhuma mensagem será exibida

    return true;
  } catch (error) {
    console.error(`Error saving user_tools_data:`, error);
    // Toast removido - nenhuma mensagem será exibida
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
      .select(`${dataKey}`)
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
