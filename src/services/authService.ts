
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';
import { AuthError } from '@supabase/supabase-js';

/**
 * Map generic error messages to more user-friendly messages
 */
export const getAuthErrorMessage = (error: AuthError | Error): string => {
  const errorMessage = error.message || 'An unknown error occurred';
  
  // Map Supabase auth error messages to more user-friendly messages
  switch (errorMessage) {
    case 'Invalid login credentials':
      return 'Email ou senha incorretos. Por favor, verifique suas credenciais.';
    case 'Email not confirmed':
      return 'Por favor, confirme seu email antes de fazer login.';
    case 'Password should be at least 6 characters':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'User already registered':
      return 'Este email já está registrado. Tente fazer login ou recuperar sua senha.';
    case 'Email rate limit exceeded':
      return 'Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.';
    default:
      return errorMessage;
  }
};

/**
 * Authentication service to handle all Supabase auth API calls
 */
export const authService = {
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
