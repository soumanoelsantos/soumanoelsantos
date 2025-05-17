
import { useEffect } from 'react';
import { authService } from '@/services/authService';

/**
 * Hook for initializing authentication
 */
export const useAuthInitializer = (
  setIsAuthenticated: (isAuth: boolean) => void,
  setUserEmail: (email: string | null) => void,
  setUserId: (id: string | null) => void,
  resetUserState: () => void,
  loadUserProfile: (userId: string) => void,
  setLoginRedirectPath: (path: string | null) => void
) => {
  useEffect(() => {
    console.log("Auth Provider initializing...");
    
    // Recover redirect path from localStorage (if exists)
    const storedRedirectPath = localStorage.getItem('loginRedirectPath');
    if (storedRedirectPath) {
      setLoginRedirectPath(storedRedirectPath);
    }

    // Set up listener for authentication changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (event: any, session: any) => {
        console.log("Auth state changed:", event, session?.user?.email);
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (session?.user) {
          setUserEmail(session.user.email);
          setUserId(session.user.id);
          
          // Use setTimeout to avoid recursion issues
          setTimeout(() => {
            loadUserProfile(session.user.id);
          }, 100);
        } else {
          resetUserState();
        }
      }
    );

    // Check existing session
    authService.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session?.user?.email);
      const isAuth = !!session;
      setIsAuthenticated(isAuth);
      
      if (session?.user) {
        setUserEmail(session.user.email);
        setUserId(session.user.id);
        loadUserProfile(session.user.id);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
