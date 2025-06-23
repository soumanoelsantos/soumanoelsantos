
import { supabase } from '@/integrations/supabase/client';
import { getAuthErrorMessage } from './errorHandling';

/**
 * Service for handling user profiles
 */
export const profileService = {
  /**
   * Fetch user profile
   */
  fetchUserProfile: async (userId: string) => {
    try {
      console.log("Profile service: Fetching profile for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Profile service: Error fetching profile:", error);
        if (error.code === 'PGRST116') {
          console.log("Profile service: No profile found for user:", userId);
          return null;
        }
        throw error;
      }
      
      console.log("Profile service: Profile data:", data);
      return data;
    } catch (error) {
      console.error('Profile service: Erro ao buscar perfil do usuário:', error);
      return null;
    }
  },

  /**
   * Update user admin status
   */
  updateUserAdminStatus: async (userId: string, isAdmin: boolean) => {
    try {
      console.log("Profile service: Updating admin status for user:", userId, "to:", isAdmin);
      
      // Verify current user is the same as the user being updated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || session.user.id !== userId) {
        throw new Error('Unauthorized: Can only update own profile');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("Profile service: Error updating admin status:", error);
        throw error;
      }

      console.log("Profile service: Admin status updated successfully:", data);
      return { data, error: null };
    } catch (error) {
      console.error('Profile service: Error updating admin status:', error);
      return { data: null, error };
    }
  }
};
