
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isNewUser: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, redirectPath: string | null) => Promise<void>;
  logout: () => Promise<void>;
  setUserAsAdmin: (value: boolean) => Promise<void>;
  loginRedirectPath: string | null;
  userId: string | null;
}

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
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loginRedirectPath, setLoginRedirectPath] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os detalhes do perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setIsNewUser(data.is_new_user);
        setIsAdmin(data.is_admin);
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  };

  // Inicialização
  useEffect(() => {
    // Recuperar path de redirecionamento do localStorage (se existir)
    const storedRedirectPath = localStorage.getItem('loginRedirectPath');
    if (storedRedirectPath) {
      setLoginRedirectPath(storedRedirectPath);
    }

    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        const isAuth = !!currentSession;
        setIsAuthenticated(isAuth);
        setSession(currentSession);
        
        if (currentSession?.user) {
          setUserEmail(currentSession.user.email);
          setUserId(currentSession.user.id);
          
          // Usar setTimeout para evitar problemas de recursão
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setUserEmail(null);
          setUserId(null);
          setIsNewUser(true);
          setIsAdmin(false);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Current session:", currentSession?.user?.email);
      const isAuth = !!currentSession;
      setIsAuthenticated(isAuth);
      setSession(currentSession);
      
      if (currentSession?.user) {
        setUserEmail(currentSession.user.email);
        setUserId(currentSession.user.id);
        fetchUserProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, redirectPath: string | null): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Armazenar caminho de redirecionamento no localStorage
      if (redirectPath) {
        localStorage.setItem('loginRedirectPath', redirectPath);
        setLoginRedirectPath(redirectPath);
      } else {
        localStorage.removeItem('loginRedirectPath');
        setLoginRedirectPath(null);
      }

      // Os estados serão atualizados pelo listener onAuthStateChange
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
      
      // Limpar dados do localStorage
      localStorage.removeItem('loginRedirectPath');
      
      // Os estados serão atualizados pelo listener onAuthStateChange
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
    }
  };

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      isNewUser, 
      isAdmin, 
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
