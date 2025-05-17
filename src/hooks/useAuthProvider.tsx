
import { useAuthState, useAuthOperations, useUserProfile, useAuthInitializer } from '@/hooks/auth';

export const useAuthProvider = () => {
  // Manage auth state
  const {
    isAuthenticated,
    setIsAuthenticated,
    userEmail,
    setUserEmail,
    userId,
    setUserId,
    isNewUser,
    setIsNewUser,
    isAdmin, 
    setIsAdmin,
    loginRedirectPath,
    setLoginRedirectPath,
    isLoading,
    setIsLoading,
    resetUserState,
    handleRedirectPath
  } = useAuthState();

  // User profile management
  const { loadUserProfile } = useUserProfile(userId, setIsNewUser, setIsAdmin);
  
  // Auth operations
  const { login, logout, setUserAsAdmin } = useAuthOperations(
    userId, 
    setIsLoading, 
    resetUserState, 
    handleRedirectPath
  );

  // Initialize authentication
  useAuthInitializer(
    setIsAuthenticated,
    setUserEmail, 
    setUserId,
    resetUserState,
    loadUserProfile,
    setLoginRedirectPath
  );

  return { 
    isAuthenticated, 
    userEmail, 
    isNewUser, 
    isAdmin: isAdmin === true, // Ensure isAdmin is always a boolean
    userId,
    login, 
    logout,
    setUserAsAdmin,
    loginRedirectPath,
    isLoading,
  };
};
