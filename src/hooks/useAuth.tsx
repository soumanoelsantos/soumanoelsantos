
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isNewUser: boolean;
  isAdmin: boolean;
  login: (email: string, redirectPath: string | null) => void;
  logout: () => void;
  setUserAsAdmin: (value: boolean) => void;
  loginRedirectPath: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  isNewUser: true,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  setUserAsAdmin: () => {},
  loginRedirectPath: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loginRedirectPath, setLoginRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedIsNewUser = localStorage.getItem('isNewUser') !== 'false';
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedRedirectPath = localStorage.getItem('loginRedirectPath');
    
    setIsAuthenticated(storedIsAuthenticated);
    setUserEmail(storedUserEmail);
    setIsNewUser(storedIsNewUser);
    setIsAdmin(storedIsAdmin);
    
    // Only set the redirect path if we're authenticated
    if (storedIsAuthenticated && storedRedirectPath) {
      setLoginRedirectPath(storedRedirectPath);
    }
  }, []);

  const login = (email: string, redirectPath: string | null) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isNewUser', 'true');
    
    // Store redirect path if provided
    if (redirectPath) {
      localStorage.setItem('loginRedirectPath', redirectPath);
      setLoginRedirectPath(redirectPath);
    } else {
      localStorage.removeItem('loginRedirectPath');
      setLoginRedirectPath(null);
    }
    
    // Check if this is an admin email
    const isAdminUser = email === 'admin@example.com';
    localStorage.setItem('isAdmin', isAdminUser ? 'true' : 'false');
    
    setIsAuthenticated(true);
    setUserEmail(email);
    setIsNewUser(true);
    setIsAdmin(isAdminUser);
  };

  const setUserAsAdmin = (value: boolean) => {
    localStorage.setItem('isAdmin', value ? 'true' : 'false');
    setIsAdmin(value);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isNewUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loginRedirectPath');
    
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsNewUser(true);
    setIsAdmin(false);
    setLoginRedirectPath(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      isNewUser, 
      isAdmin, 
      login, 
      logout, 
      setUserAsAdmin,
      loginRedirectPath 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
