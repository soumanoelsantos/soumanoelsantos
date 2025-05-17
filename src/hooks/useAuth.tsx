
import React, { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useAuthProvider } from '@/hooks/useAuthProvider';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: auth.isAuthenticated, 
      userEmail: auth.userEmail, 
      isNewUser: auth.isNewUser, 
      isAdmin: auth.isAdmin, 
      login: auth.login, 
      logout: auth.logout, 
      setUserAsAdmin: auth.setUserAsAdmin,
      loginRedirectPath: auth.loginRedirectPath,
      userId: auth.userId,
      isLoading: auth.isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Override the useAuth hook to always allow admin access
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  
  // Always allow access to admin page
  if (window.location.pathname === '/admin') {
    return {
      ...authContext,
      isAuthenticated: true,
      isAdmin: true
    };
  }
  
  return authContext;
};
