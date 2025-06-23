
import { supabase } from '@/integrations/supabase/client';

export class AuthService {
  /**
   * Sign in with email and password
   */
  async signInWithPassword(email: string, password: string) {
    console.log("AuthService: Attempting sign in with email:", email);
    
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("AuthService: Sign in response:", response.error ? 'Error' : 'Success');
      if (response.error) {
        console.error("AuthService: Sign in error:", response.error);
      }
      
      return response;
    } catch (error) {
      console.error("AuthService: Unexpected sign in error:", error);
      throw error;
    }
  }

  /**
   * Sign out current user
   */
  async signOut() {
    console.log("AuthService: Attempting sign out");
    
    try {
      const response = await supabase.auth.signOut();
      console.log("AuthService: Sign out response:", response.error ? 'Error' : 'Success');
      return response;
    } catch (error) {
      console.error("AuthService: Unexpected sign out error:", error);
      throw error;
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const response = await supabase.auth.getSession();
      console.log("AuthService: Get session response:", response.data.session ? 'Session found' : 'No session');
      return response;
    } catch (error) {
      console.error("AuthService: Error getting session:", error);
      throw error;
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (event: any, session: any) => void) {
    console.log("AuthService: Setting up auth state change listener");
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Fetch user profile with proper error handling
   */
  async fetchUserProfile(userId: string) {
    console.log("AuthService: Fetching user profile for:", userId);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log("AuthService: No profile found for user:", userId);
          return null;
        }
        console.error("AuthService: Error fetching profile:", error);
        throw error;
      }
      
      console.log("AuthService: Profile fetched successfully");
      return data;
    } catch (error) {
      console.error('AuthService: Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Update user admin status - only for current user's own profile
   */
  async updateUserAdminStatus(userId: string, isAdmin: boolean) {
    console.log("AuthService: Updating admin status for user:", userId, "to:", isAdmin);
    
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
        console.error("AuthService: Error updating admin status:", error);
        throw error;
      }

      console.log("AuthService: Admin status updated successfully");
      return { data, error: null };
    } catch (error) {
      console.error('AuthService: Error updating admin status:', error);
      return { data: null, error };
    }
  }

  /**
   * Check if current user is admin using secure function
   */
  async isCurrentUserAdmin() {
    console.log("AuthService: Checking if current user is admin");
    
    try {
      const { data, error } = await supabase.rpc('current_user_is_admin');
      
      if (error) {
        console.error('AuthService: Error checking admin status:', error);
        return false;
      }
      
      console.log("AuthService: Admin status check result:", data);
      return data === true;
    } catch (error) {
      console.error('AuthService: Error checking admin status:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
