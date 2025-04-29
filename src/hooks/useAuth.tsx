
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isNewUser: boolean;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
  setUserAsAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  isNewUser: true,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  setUserAsAdmin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedIsNewUser = localStorage.getItem('isNewUser') !== 'false';
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    
    setIsAuthenticated(storedIsAuthenticated);
    setUserEmail(storedUserEmail);
    setIsNewUser(storedIsNewUser);
    setIsAdmin(storedIsAdmin);
  }, []);

  const login = (email: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isNewUser', 'true');
    
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
    
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsNewUser(true);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      isNewUser, 
      isAdmin, 
      login, 
      logout, 
      setUserAsAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
