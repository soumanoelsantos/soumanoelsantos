
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth';

/**
 * Hook for authentication operations (login, logout, etc.)
 */
export const useAuthOperations = (
  userId: string | null,
  setIsLoading: (loading: boolean) => void,
  resetUserState: () => void,
  handleRedirectPath: (path: string | null) => void
) => {
  const { toast } = useToast();

  /**
   * Login function with improved error handling
   */
  const login = async (email: string, password: string, redirectPath: string | null): Promise<void> => {
    console.log("Auth operations: Starting login for:", email);
    setIsLoading(true);
    
    try {
      if (!email || !email.trim()) {
        throw new Error("O email é obrigatório");
      }
      
      if (!password) {
        throw new Error("A senha é obrigatória");
      }
      
      console.log("Auth operations: Calling auth service login...");
      const response = await authService.signInWithPassword(email, password);
      
      if (response.error) {
        console.error("Auth operations: Login error from service:", response.error);
        const errorMessage = response.error.message || "Falha na autenticação";
        throw new Error(errorMessage);
      }

      console.log("Auth operations: Login successful, handling redirect...");
      // Store redirect path in localStorage - default to /membros if none specified
      const finalRedirectPath = redirectPath || '/membros';
      handleRedirectPath(finalRedirectPath);

      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta!",
      });

      console.log("Auth operations: Login completed successfully");
    } catch (error: any) {
      console.error('Auth operations: Login error:', error);
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

  /**
   * Set user as admin with improved error handling
   */
  const setUserAsAdmin = async (value: boolean) => {
    console.log("Auth operations: Setting admin status to:", value);
    
    if (!userId) {
      console.error("Auth operations: No user ID available for admin update");
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
        const errorMessage = response.error.message || "Não foi possível atualizar as permissões de administrador";
        throw new Error(errorMessage);
      }
      
      toast({
        title: value ? "Privilégios de admin ativados" : "Privilégios de admin desativados",
        description: value ? "Você agora tem acesso às funcionalidades de administrador" : "Suas permissões de administrador foram removidas",
      });
    } catch (error: any) {
      console.error('Auth operations: Error updating admin status:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar permissões",
        description: error.message || "Não foi possível atualizar as permissões de administrador",
      });
    }
  };

  /**
   * Logout function with improved error handling
   */
  const logout = async () => {
    console.log("Auth operations: Starting logout...");
    
    try {
      const response = await authService.signOut();
      
      if (response.error) {
        const errorMessage = response.error.message || "Não foi possível sair da conta";
        throw new Error(errorMessage);
      }
      
      // Clear localStorage data
      localStorage.removeItem('loginRedirectPath');
      
      console.log("Auth operations: Logout successful");
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta com sucesso",
      });
    } catch (error: any) {
      console.error('Auth operations: Logout error:', error);
      toast({
        variant: "destructive",
        title: "Erro no logout",
        description: error.message || "Não foi possível sair da conta",
      });
      throw error;
    }
  };

  return {
    login,
    logout,
    setUserAsAdmin
  };
};
