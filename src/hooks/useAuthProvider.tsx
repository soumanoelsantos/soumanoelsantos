
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';

export const useAuthProvider = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loginRedirectPath, setLoginRedirectPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user profile with better error handling
  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Loading user profile for:", userId);
      
      if (!userId) {
        console.error("Cannot load profile: User ID is missing");
        return;
      }
      
      const profileData = await authService.fetchUserProfile(userId);
      
      if (profileData) {
        console.log("Profile loaded:", profileData);
        setIsNewUser(profileData.is_new_user);
        setIsAdmin(profileData.is_admin);
      } else {
        console.log("No profile found for user:", userId);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar seu perfil de usuário",
      });
      setIsAdmin(false);
    }
  };

  // Reset user state
  const resetUserState = () => {
    setUserEmail(null);
    setUserId(null);
    setIsNewUser(true);
    setIsAdmin(false);
  };

  const handleRedirectPath = (redirectPath: string | null) => {
    if (redirectPath) {
      localStorage.setItem('loginRedirectPath', redirectPath);
      setLoginRedirectPath(redirectPath);
    } else {
      localStorage.removeItem('loginRedirectPath');
      setLoginRedirectPath(null);
    }
  };

  // Initialize authentication
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

  // Login function with improved error handling
  const login = async (email: string, password: string, redirectPath: string | null): Promise<void> => {
    setIsLoading(true);
    try {
      if (!email || !email.trim()) {
        throw new Error("O email é obrigatório");
      }
      
      if (!password) {
        throw new Error("A senha é obrigatória");
      }
      
      const response = await authService.signInWithPassword(email, password);
      
      if (response.error) {
        // Use the friendly error message if available
        throw new Error(response.friendlyError || response.error.message);
      }

      // Store redirect path in localStorage
      handleRedirectPath(redirectPath);

      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta!",
      });
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message || "Falha na autenticação",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Set user as admin with improved error handling
  const setUserAsAdmin = async (value: boolean) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro de operação",
        description: "Você precisa estar logado para realizar esta ação",
      });
      return;
    }
    
    try {
      const response = await authService.updateUserAdminStatus(userId, value);

      if (response.error) {
        throw new Error(response.friendlyError || response.error.message);
      }

      setIsAdmin(value);
      
      toast({
        title: value ? "Privilégios de admin ativados" : "Privilégios de admin desativados",
        description: value ? "Você agora tem acesso às funcionalidades de administrador" : "Suas permissões de administrador foram removidas",
      });
    } catch (error: any) {
      console.error('Erro ao atualizar status de admin:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar permissões",
        description: error.message || "Não foi possível atualizar as permissões de administrador",
      });
    }
  };

  // Logout function with improved error handling
  const logout = async () => {
    try {
      const response = await authService.signOut();
      
      if (response.error) {
        throw new Error(response.friendlyError || response.error.message);
      }
      
      // Clear localStorage data
      localStorage.removeItem('loginRedirectPath');
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta com sucesso",
      });
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast({
        variant: "destructive",
        title: "Erro no logout",
        description: error.message || "Não foi possível sair da conta",
      });
      throw error;
    }
  };

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
