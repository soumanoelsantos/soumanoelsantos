
import { useState, useEffect } from 'react';
import { authService } from '@/services/auth/authService';
import { useToast } from '@/hooks/use-toast';

export const useSecureAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email);
          setUserId(session.user.id);
          
          // Check admin status securely
          const adminStatus = await authService.isCurrentUserAdmin();
          setIsAdmin(adminStatus);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setUserEmail(null);
          setUserId(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email);
          setUserId(session.user.id);
          
          // Check admin status securely on auth change
          const adminStatus = await authService.isCurrentUserAdmin();
          setIsAdmin(adminStatus);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setUserEmail(null);
          setUserId(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const secureLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.signInWithPassword(email, password);
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message || "Falha na autenticação",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const secureLogout = async () => {
    try {
      await authService.signOut();
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta com sucesso",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no logout",
        description: error.message || "Não foi possível sair da conta",
      });
    }
  };

  return {
    isAuthenticated,
    isAdmin,
    isLoading,
    userEmail,
    userId,
    login: secureLogin,
    logout: secureLogout
  };
};
