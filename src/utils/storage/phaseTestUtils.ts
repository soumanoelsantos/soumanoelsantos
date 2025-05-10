
import { supabase } from "@/integrations/supabase/client";

export const loadPhaseTestCompletion = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    // Check if any phase_results exist for the user
    const { data, error } = await supabase
      .from('fase_results')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = "no rows found"
      console.error("Error checking phase test completion:", error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error("Error checking phase test completion:", error);
    return false;
  }
};

export const savePhaseTestResult = async (
  userId: string, 
  score: number, 
  phaseName: string,
  description?: string,
  recommendations?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('fase_results')
      .insert({
        user_id: userId,
        score: score,
        phase_name: phaseName,
        description: description || null,
        recommendations: recommendations || null
      });
    
    if (error) {
      console.error("Error saving phase test result:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving phase test result:", error);
    return false;
  }
};

export const getPhaseTestResult = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('fase_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "no rows found"
        return null;
      }
      console.error("Error getting phase test result:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting phase test result:", error);
    return null;
  }
};
