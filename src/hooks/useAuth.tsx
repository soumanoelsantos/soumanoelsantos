
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isNewUser: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  isNewUser: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedIsNewUser = localStorage.getItem('isNewUser') !== 'false';
    
    setIsAuthenticated(storedIsAuthenticated);
    setUserEmail(storedUserEmail);
    setIsNewUser(storedIsNewUser);
  }, []);

  const login = (email: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isNewUser', 'true');
    
    setIsAuthenticated(true);
    setUserEmail(email);
    setIsNewUser(true);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isNewUser');
    
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsNewUser(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, isNewUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
