
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Authentication service to handle all Supabase auth API calls
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  signInWithPassword: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange: (callback: any) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Fetch user profile from the database
   */
  fetchUserProfile: async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("Auth service: Fetching user profile for:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, is_new_user')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Auth service: Error fetching profile:", error);
        return null;
      }
      
      console.log("Auth service: Profile loaded:", data);
      return data as UserProfile;
    } catch (error) {
      console.error('Auth service: Error in fetchUserProfile:', error);
      return null;
    }
  },

  /**
   * Update user admin status
   */
  updateUserAdminStatus: async (userId: string, isAdmin: boolean) => {
    return await supabase
      .from('profiles')
      .update({ is_admin: isAdmin })
      .eq('id', userId);
  }
};
