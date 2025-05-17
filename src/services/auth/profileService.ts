
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Service for handling user profiles
 */
export const profileService = {
  /**
   * Fetch user profile from the database
   */
  fetchUserProfile: async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("Auth service: Fetching user profile for:", userId);
      
      if (!userId) {
        console.error("Auth service: Invalid user ID provided");
        return null;
      }
      
      // Use edge function to bypass RLS policy recursion issue
      const { data, error } = await supabase.functions.invoke('get-user-profile', {
        body: { userId }
      });
      
      if (error) {
        console.error("Auth service: Error fetching profile via edge function:", error);
        
        // Fallback to direct query with limited fields as a backup strategy
        // This should avoid the recursion issue by not triggering complex RLS checks
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error("Auth service: Fallback profile query failed:", profileError);
          return { id: userId, is_admin: false, is_new_user: true } as UserProfile;
        }
        
        return {
          id: userId,
          is_admin: profileData?.is_admin || false,
          is_new_user: true // Default to true if we're only getting partial data
        } as UserProfile;
      }
      
      if (!data) {
        console.warn("Auth service: No profile found for user:", userId);
        return null;
      }
      
      console.log("Auth service: Profile loaded:", data);
      return data as UserProfile;
    } catch (error) {
      console.error('Auth service: Error in fetchUserProfile:', error);
      // Return default profile with admin set to false to prevent access issues
      return { id: userId, is_admin: false, is_new_user: true } as UserProfile;
    }
  },

  /**
   * Update user admin status
   */
  updateUserAdminStatus: async (userId: string, isAdmin: boolean) => {
    try {
      if (!userId) {
        console.error("Auth service: Invalid user ID provided");
        return { error: { message: "ID de usuário inválido" } };
      }
      
      const response = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);
      
      if (response.error) {
        console.error("Auth service: Error updating admin status:", response.error);
        response.error.message = "Falha ao atualizar status de administrador";
      }
      
      return response;
    } catch (error: any) {
      console.error('Auth service: Unexpected error updating admin status:', error);
      return { 
        error: { message: "Erro inesperado ao atualizar status de administrador" }
      };
    }
  }
};
