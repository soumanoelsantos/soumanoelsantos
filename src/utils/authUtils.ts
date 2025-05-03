
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Fetches user profile data from Supabase
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log("Fetching user profile for:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      if (error.code === 'PGRST116') {
        console.log("No profile found for user:", userId);
        return null;
      }
      throw error;
    }
    
    console.log("Profile data:", data);
    return data as UserProfile;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return null;
  }
};
