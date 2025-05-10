
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

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

    toast({
      title: "Dados salvos!",
      description: "Seus dados foram salvos com sucesso.",
    });

    return true;
  } catch (error) {
    console.error(`Error saving user_tools_data:`, error);
    toast({
      variant: "destructive",
      title: "Erro ao salvar",
      description: "Não foi possível salvar os dados. Tente novamente.",
    });
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

// Check if user has data for specific tool
export const checkUserToolCompletion = async (
  userId: string,
  dataKeys: string[]
): Promise<Record<string, boolean>> => {
  try {
    if (!userId) {
      return {};
    }

    // Log the request for debugging
    console.log(`Checking tool completion for user ${userId}, keys:`, dataKeys);

    // First try to get column information
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_columns', { table_name: 'user_tools_data' });
    
    if (tableError) {
      console.error("Error getting table columns:", tableError);
      // If we can't get column info, let's try the query anyway
      // This fixes the TS2345 error since we're not using the result directly
    }
    
    // Get existing columns if available
    let existingColumns: string[] = [];
    if (tableInfo && Array.isArray(tableInfo)) {
      existingColumns = tableInfo.map((col: any) => col.column_name);
      console.log("Existing columns:", existingColumns);
    }

    // Filter dataKeys to only include existing columns
    const validDataKeys = dataKeys.filter(key => 
      !tableInfo || existingColumns.includes(key) || key === 'id' || key === 'user_id'
    );
    
    if (validDataKeys.length === 0) {
      console.log("No valid columns to query");
      return dataKeys.reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);
    }

    // Safely construct the query with only valid columns
    const selectColumns = validDataKeys.join(',');
    
    // Execute the query to get tool completion status
    const { data, error } = await supabase
      .from('user_tools_data')
      .select(selectColumns)
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "No rows found"
        console.log("No tool data found for user");
        return dataKeys.reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {} as Record<string, boolean>);
      }
      
      // If there's a column error, try a more basic approach
      if (error.code === '42703') { // Column not found
        console.log("Column error detected, using basic query approach");
        return await checkToolCompletionBasic(userId, dataKeys);
      }
      
      throw error;
    }
    
    // Check which tools have data and log the results
    const completionStatus = dataKeys.reduce((acc, key) => {
      // For columns that weren't actually queried, default to false
      if (validDataKeys.includes(key)) {
        acc[key] = data[key] !== null && data[key] !== undefined;
      } else {
        acc[key] = false;
      }
      return acc;
    }, {} as Record<string, boolean>);
    
    console.log("Tool completion check results:", completionStatus);
    
    return completionStatus;
    
  } catch (error) {
    console.error(`Error checking tool completion:`, error);
    // Fall back to basic approach if there's an error
    return await checkToolCompletionBasic(userId, dataKeys);
  }
};

// A more basic approach that checks one column at a time
const checkToolCompletionBasic = async (
  userId: string, 
  dataKeys: string[]
): Promise<Record<string, boolean>> => {
  console.log("Using basic tool completion check");
  
  const result: Record<string, boolean> = {};
  
  for (const key of dataKeys) {
    try {
      // Check one column at a time
      const { data, error } = await supabase
        .from('user_tools_data')
        .select(`${key}`)
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        if (error.code === 'PGRST116') { // "No rows found"
          result[key] = false;
        } else if (error.code === '42703') { // Column not found
          result[key] = false;
          console.log(`Column ${key} does not exist in the table`);
        } else {
          console.error(`Error checking completion for ${key}:`, error);
          result[key] = false;
        }
      } else {
        result[key] = data && data[key] !== null && data[key] !== undefined;
      }
    } catch (e) {
      console.error(`Exception checking completion for ${key}:`, e);
      result[key] = false;
    }
  }
  
  console.log("Basic tool completion results:", result);
  return result;
};
