
import { supabase } from '@/integrations/supabase/client';

// Load diagnostic completion status
export const loadDiagnosticCompletion = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "No rows found"
        return false;
      }
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error checking diagnostic completion:`, error);
    return false;
  }
};

// Load phase test completion status
export const loadPhaseTestCompletion = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    const { data, error } = await supabase
      .from('fase_results')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "No rows found"
        return false;
      }
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error checking phase test completion:`, error);
    return false;
  }
};
