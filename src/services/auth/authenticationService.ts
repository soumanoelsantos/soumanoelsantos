
import { supabase } from '@/integrations/supabase/client';
import { getAuthErrorMessage } from './errorHandling';
import { AuthError } from '@supabase/supabase-js';

/**
 * Service for handling user authentication
 */
export const authenticationService = {
  /**
   * Sign in with email and password
   */
  signInWithPassword: async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (response.error) {
        console.error('Auth service: Login error:', response.error);
        // Enhance the response with a better error message
        response.error.message = getAuthErrorMessage(response.error);
      }
      
      return response;
    } catch (error: any) {
      console.error('Auth service: Unexpected login error:', error);
      const errorMessage = getAuthErrorMessage(error);
      
      // Return an object that matches the structure that's expected
      return { 
        data: { session: null, user: null }, 
        error: { message: errorMessage } as AuthError
      };
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    try {
      const response = await supabase.auth.signOut();
      
      if (response.error) {
        console.error('Auth service: Logout error:', response.error);
        // Enhance the response with a better error message
        response.error.message = getAuthErrorMessage(response.error);
      }
      
      return response;
    } catch (error: any) {
      console.error('Auth service: Unexpected logout error:', error);
      const errorMessage = getAuthErrorMessage(error);
      
      // Return an object that matches the structure that's expected
      return { 
        error: { message: errorMessage } as AuthError
      };
    }
  },
};
