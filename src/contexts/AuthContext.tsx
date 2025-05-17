
import React, { createContext } from 'react';
import { AuthContextType } from '@/types/auth';

// Create authentication context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  isNewUser: true,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  setUserAsAdmin: async () => {},
  loginRedirectPath: null,
  userId: null,
  isLoading: false,
});

export default AuthContext;
