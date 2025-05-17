
import { supabase } from '@/integrations/supabase/client';
import { getAuthErrorMessage } from './errorHandling';

/**
 * Service for handling authentication sessions
 */
export const sessionService = {
  /**
   * Get the current session
   */
  getSession: async () => {
    try {
      const response = await supabase.auth.getSession();
      
      if (response.error) {
        console.error('Auth service: Get session error:', response.error);
      }
      
      return response;
    } catch (error: any) {
      console.error('Auth service: Unexpected session error:', error);
      return { data: { session: null }, error };
    }
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange: (callback: any) => {
    try {
      return supabase.auth.onAuthStateChange(callback);
    } catch (error) {
      console.error('Auth service: Error setting up auth state change listener:', error);
      // Return a dummy subscription object to prevent errors
      return { 
        data: { 
          subscription: { 
            unsubscribe: () => console.log('Dummy unsubscribe called') 
          } 
        } 
      };
    }
  },
};
