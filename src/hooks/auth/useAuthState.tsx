
import { useState } from 'react';

/**
 * Hook for managing auth state
 */
export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loginRedirectPath, setLoginRedirectPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Reset all user state data
   */
  const resetUserState = () => {
    setUserEmail(null);
    setUserId(null);
    setIsNewUser(true);
    setIsAdmin(false);
  };

  /**
   * Handle redirect path storage and state
   */
  const handleRedirectPath = (redirectPath: string | null) => {
    if (redirectPath) {
      localStorage.setItem('loginRedirectPath', redirectPath);
      setLoginRedirectPath(redirectPath);
    } else {
      localStorage.removeItem('loginRedirectPath');
      setLoginRedirectPath(null);
    }
  };

  return {
    // State
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
    
    // Actions
    resetUserState,
    handleRedirectPath
  };
};
