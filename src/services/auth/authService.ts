
import { supabase } from '@/integrations/supabase/client';

export class AuthService {
  /**
   * Sign in with email and password
   */
  async signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  /**
   * Sign out current user
   */
  async signOut() {
    return await supabase.auth.signOut();
  }

  /**
   * Get current session
   */
  async getSession() {
    return await supabase.auth.getSession();
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (event: any, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Fetch user profile with proper error handling
   */
  async fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log("No profile found for user:", userId);
          return null;
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Update user admin status - only for current user's own profile
   */
  async updateUserAdminStatus(userId: string, isAdmin: boolean) {
    try {
      // Verify current user is the same as the user being updated
      const { data: { session } } = await this.getSession();
      
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
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating admin status:', error);
      return { data: null, error };
    }
  }

  /**
   * Check if current user is admin using secure function
   */
  async isCurrentUserAdmin() {
    try {
      const { data, error } = await supabase.rpc('current_user_is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
