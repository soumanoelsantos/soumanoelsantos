
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
    
    // Instead of trying to fetch table column information (which was causing the error),
    // we'll use a safer approach by directly querying each tool
    
    // First, try a direct query for all data
    try {
      const { data, error } = await supabase
        .from('user_tools_data')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') {
        console.error("Error in direct query:", error);
        // Continue to fallback approach if this fails
      }
      
      if (data) {
        // Check which tools have data
        const completionStatus = dataKeys.reduce((acc, key) => {
          acc[key] = data[key] !== null && data[key] !== undefined;
          return acc;
        }, {} as Record<string, boolean>);
        
        console.log("Tool completion check results:", completionStatus);
        
        // Double check mapa_equipe data
        if (dataKeys.includes('mapa_equipe') && !completionStatus.mapa_equipe) {
          const mapaEquipeData = await loadMapaEquipeData(userId);
          completionStatus.mapa_equipe = !!mapaEquipeData && 
            !!mapaEquipeData.colaboradores && 
            mapaEquipeData.colaboradores.length > 0 &&
            !!mapaEquipeData.colaboradores[0].nome;
          console.log("Updated mapa_equipe status:", completionStatus.mapa_equipe);
        }
        
        return completionStatus;
      }
    } catch (e) {
      console.error("Error checking all tools at once:", e);
      // Fall through to the basic approach
    }
    
    // Fallback to basic approach if the direct query fails
    return await checkToolCompletionBasic(userId, dataKeys);
    
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
  
  // Double check mapa_equipe data
  if (dataKeys.includes('mapa_equipe') && !result.mapa_equipe) {
    try {
      const mapaEquipeData = await loadMapaEquipeData(userId);
      result.mapa_equipe = !!mapaEquipeData && 
        !!mapaEquipeData.colaboradores && 
        mapaEquipeData.colaboradores.length > 0 &&
        !!mapaEquipeData.colaboradores[0].nome;
      console.log("Basic check updated mapa_equipe status:", result.mapa_equipe);
    } catch (e) {
      console.error("Error checking mapa_equipe data:", e);
    }
  }
  
  console.log("Basic tool completion results:", result);
  return result;
};

// This function is added to be used in the above code
// Directly importing from mapaEquipeUtils would create a circular dependency
const loadMapaEquipeData = async (userId: string): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('mapa_equipe')
      .select('empresa_nome, colaboradores')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error(`Error loading mapa_equipe data:`, error);
      return null;
    }
    
    if (!data) return null;
    
    return {
      empresaNome: data.empresa_nome,
      colaboradores: data.colaboradores
    };
  } catch (error) {
    console.error(`Error loading mapa_equipe data:`, error);
    return null;
  }
};
