
import { supabase } from '@/integrations/supabase/client';
import { loadMapaEquipeData } from './mapaEquipeUtils';

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
export const checkToolCompletionBasic = async (
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
