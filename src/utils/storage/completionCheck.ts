
import { supabase } from '@/integrations/supabase/client';

// Check if specific tools have been completed by a user
export const checkUserToolCompletion = async (userId: string, toolKeys: string[]): Promise<Record<string, boolean>> => {
  try {
    const result: Record<string, boolean> = {};

    if (!userId) {
      return toolKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
    }

    // Get the user's tools data
    const { data, error } = await supabase
      .from('user_tools_data')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking tool completion:', error);
      return toolKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
    }

    if (!data) {
      return toolKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
    }

    // Check each requested tool
    for (const toolKey of toolKeys) {
      let isCompleted = false;
      
      if (data[toolKey]) {
        // For business map data, check if at least one field has content
        if (toolKey === 'business_map_data') {
          const businessMapData = data[toolKey];
          isCompleted = businessMapData && 
            Object.values(businessMapData).some(value => 
              value && typeof value === 'string' && value.trim() !== ''
            );
        }
        // For swot data, check if at least one quadrant has items
        else if (toolKey === 'swot_data') {
          const swotData = data[toolKey];
          isCompleted = swotData && 
            Object.keys(swotData).some(quadrant => 
              Array.isArray(swotData[quadrant]) && swotData[quadrant].length > 0
            );
        }
        // For mapa_equipe, check if there are any collaborators
        else if (toolKey === 'mapa_equipe') {
          const mapaEquipeData = data[toolKey];
          isCompleted = mapaEquipeData && 
                       mapaEquipeData.colaboradores && 
                       Array.isArray(mapaEquipeData.colaboradores) && 
                       mapaEquipeData.colaboradores.length > 0 &&
                       mapaEquipeData.colaboradores.some(col => col.nome && col.nome.trim() !== '');
        }
        // For checklist and other tools, just check if data exists
        else {
          isCompleted = true;
        }
      }
      
      result[toolKey] = isCompleted;
    }
    
    return result;
  } catch (error) {
    console.error('Error checking tool completion:', error);
    return toolKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
  }
};
