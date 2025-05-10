
import { supabase } from '@/integrations/supabase/client';
import { MapaEquipeData } from '@/types/mapaEquipe';
import { Json } from '@/integrations/supabase/types';

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
            Object.values(businessMapData as Record<string, any>).some(value => 
              value && typeof value === 'string' && value.trim() !== ''
            );
        }
        // For swot data, check if at least one quadrant has items
        else if (toolKey === 'swot_data') {
          const swotData = data[toolKey];
          isCompleted = swotData && 
            Object.keys(swotData as Record<string, any>).some(quadrant => 
              Array.isArray((swotData as Record<string, any>)[quadrant]) && 
              (swotData as Record<string, any>)[quadrant].length > 0
            );
        }
        // For puv_data, check if at least one field has content
        else if (toolKey === 'puv_data') {
          const puvData = data[toolKey];
          isCompleted = puvData && 
            Object.values(puvData as Record<string, any>).some(value => 
              value && typeof value === 'string' && value.trim() !== ''
            );
        }
        // For mapa_equipe, check if there are any collaborators
        else if (toolKey === 'mapa_equipe') {
          const mapaEquipeData = data[toolKey];
          
          // First check if mapaEquipeData is an object
          if (mapaEquipeData && typeof mapaEquipeData === 'object' && !Array.isArray(mapaEquipeData)) {
            // Safely cast to MapaEquipeData or Record<string, any>
            const typedData = mapaEquipeData as Record<string, any>;
            
            // Check if collaborators exist and at least one has a name
            isCompleted = typedData.colaboradores && 
                          Array.isArray(typedData.colaboradores) && 
                          typedData.colaboradores.length > 0 &&
                          typedData.colaboradores.some((col: any) => col.nome && col.nome.trim() !== '');
          } else {
            isCompleted = false;
          }
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
