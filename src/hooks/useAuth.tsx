
import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthContext from '@/contexts/AuthContext';
import { fetchUserProfile } from '@/utils/authUtils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loginRedirectPath, setLoginRedirectPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Inicialização
  useEffect(() => {
    console.log("Auth Provider initializing...");
    // Recuperar path de redirecionamento do localStorage (se existir)
    const storedRedirectPath = localStorage.getItem('loginRedirectPath');
    if (storedRedirectPath) {
      setLoginRedirectPath(storedRedirectPath);
    }

    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (session?.user) {
          setUserEmail(session.user.email);
          setUserId(session.user.id);
          
          // Usar setTimeout para evitar problemas de recursão
          setTimeout(() => {
            loadUserProfile(session.user.id);
          }, 100);
        } else {
          resetUserState();
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
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

  // Load user profile with better error handling
  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Loading user profile for:", userId);
      
      // Direct database query to check admin status
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin, is_new_user')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("Error fetching profile directly:", profileError);
        setIsAdmin(false);
        return;
      }
      
      if (profileData) {
        console.log("Profile loaded directly:", profileData);
        setIsNewUser(profileData.is_new_user);
        setIsAdmin(profileData.is_admin);
      } else {
        console.log("No profile found for user:", userId);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
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

  // Login function
  const login = async (email: string, password: string, redirectPath: string | null): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

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
    }
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

  const setUserAsAdmin = async (value: boolean) => {
    if (!userId) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: value })
        .eq('id', userId);

      if (error) throw error;

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

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
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

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      isNewUser, 
      isAdmin: isAdmin === true, // Ensure isAdmin is always a boolean
      login, 
      logout, 
      setUserAsAdmin,
      loginRedirectPath,
      userId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
