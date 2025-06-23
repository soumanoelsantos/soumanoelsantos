
import { useEffect } from 'react';
import { authService } from '@/services/auth';

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
    console.log("Auth initializer: Starting auth initialization...");
    
    // Recover redirect path from localStorage (if exists)
    const storedRedirectPath = localStorage.getItem('loginRedirectPath');
    if (storedRedirectPath) {
      console.log("Auth initializer: Found stored redirect path:", storedRedirectPath);
      setLoginRedirectPath(storedRedirectPath);
    }

    // Set up listener for authentication changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (event: any, session: any) => {
        console.log("Auth initializer: Auth state changed:", event, session?.user?.email);
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (session?.user) {
          console.log("Auth initializer: User session found, setting user data");
          setUserEmail(session.user.email);
          setUserId(session.user.id);
          
          // Load user profile after a short delay to avoid recursion
          setTimeout(() => {
            console.log("Auth initializer: Loading user profile...");
            loadUserProfile(session.user.id);
          }, 100);
        } else {
          console.log("Auth initializer: No user session, resetting state");
          resetUserState();
        }
      }
    );

    // Check existing session
    authService.getSession().then(({ data: { session } }) => {
      console.log("Auth initializer: Initial session check:", session?.user?.email);
      const isAuth = !!session;
      setIsAuthenticated(isAuth);
      
      if (session?.user) {
        console.log("Auth initializer: Initial session found, setting user data");
        setUserEmail(session.user.email);
        setUserId(session.user.id);
        loadUserProfile(session.user.id);
      } else {
        console.log("Auth initializer: No initial session found");
      }
    }).catch(error => {
      console.error("Auth initializer: Error checking initial session:", error);
    });

    return () => {
      console.log("Auth initializer: Cleaning up auth subscription");
      subscription?.unsubscribe();
    };
  }, [setIsAuthenticated, setUserEmail, setUserId, resetUserState, loadUserProfile, setLoginRedirectPath]);
};
