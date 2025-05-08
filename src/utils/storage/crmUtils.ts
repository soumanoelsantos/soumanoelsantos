
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Type definitions
interface ColumnData {
  id: string;
  name: string;
  order: number;
}

// Function to save custom columns for a user
export const saveCrmColumns = async (
  userId: string,
  columns: ColumnData[]
): Promise<{ success: boolean }> => {
  try {
    // Check if an entry already exists
    const { data: existingData, error: fetchError } = await supabase
      .from('user_tools_data')
      .select('id, crm_data')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError) {
      console.error(`Error fetching existing CRM data:`, fetchError);
      return { success: false };
    }
    
    // Prepare the data - explicitly cast to Json type
    const crmData = { columns } as unknown as Json;
    
    let result;
    if (existingData) {
      // Update existing entry
      result = await supabase
        .from('user_tools_data')
        .update({
          crm_data: crmData,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData.id);
    } else {
      // Create new entry
      result = await supabase
        .from('user_tools_data')
        .insert({
          user_id: userId,
          crm_data: crmData
        });
    }
    
    if (result.error) {
      console.error(`Error saving CRM data:`, result.error);
      return { success: false };
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error in saveCrmColumns:`, error);
    return { success: false };
  }
};

// Function to load custom columns for a user
export const loadCrmColumns = async (userId: string): Promise<ColumnData[] | null> => {
  try {
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('crm_data')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error loading CRM data:`, error);
      return null;
    }
    
    if (!data || !data.crm_data) {
      return null;
    }
    
    // Safe type checking and casting
    const crmData = data.crm_data as { columns?: ColumnData[] };
    if (!crmData || !Array.isArray(crmData.columns)) {
      return null;
    }
    
    return crmData.columns;
  } catch (error) {
    console.error(`Error in loadCrmColumns:`, error);
    return null;
  }
};
