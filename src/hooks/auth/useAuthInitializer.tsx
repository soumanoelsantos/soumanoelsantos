
import { useEffect } from 'react';
import { authService } from '@/services/auth';

export const useAuthInitializer = (
  setIsAuthenticated: (authenticated: boolean) => void,
  setUserEmail: (email: string | null) => void,
  setUserId: (id: string | null) => void,
  resetUserState: () => void,
  loadUserProfile: (userId: string) => Promise<void>,
  setLoginRedirectPath: (path: string | null) => void
) => {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Auth initializer: Starting initialization");
        
        // Get any stored redirect path from localStorage
        const storedRedirectPath = localStorage.getItem('loginRedirectPath');
        console.log("Auth initializer: Stored redirect path:", storedRedirectPath);
        
        if (storedRedirectPath) {
          setLoginRedirectPath(storedRedirectPath);
        }

        // Get current session
        const { data: { session } } = await authService.getSession();
        console.log("Auth initializer: Current session:", session?.user?.email || 'No session');

        if (session?.user) {
          console.log("Auth initializer: User found, setting authenticated state");
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
          setUserId(session.user.id);
          
          // Load user profile
          await loadUserProfile(session.user.id);
        } else {
          console.log("Auth initializer: No session found, resetting state");
          resetUserState();
        }
      } catch (error) {
        console.error('Auth initializer: Error during initialization:', error);
        resetUserState();
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session?.user?.email || 'No session');
        
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
          setUserId(session.user.id);
          
          // Load user profile for new sessions
          if (event === 'SIGNED_IN') {
            await loadUserProfile(session.user.id);
          }
        } else {
          console.log("Auth state change: Signing out, resetting state");
          resetUserState();
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [setIsAuthenticated, setUserEmail, setUserId, resetUserState, loadUserProfile, setLoginRedirectPath]);
};
