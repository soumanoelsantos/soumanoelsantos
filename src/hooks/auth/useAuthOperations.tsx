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
        // Use the error message from the response
        const errorMessage = response.error.message || "Falha na autenticação";
        throw new Error(errorMessage);
      }

      // Store redirect path in localStorage - default to /membros if none specified
      const finalRedirectPath = redirectPath || '/membros';
      handleRedirectPath(finalRedirectPath);

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

  /**
   * Set user as admin with improved error handling
   */
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
        const errorMessage = response.error.message || "Não foi possível atualizar as permissões de administrador";
        throw new Error(errorMessage);
      }
      
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

  /**
   * Logout function with improved error handling
   */
  const logout = async () => {
    try {
      const response = await authService.signOut();
      
      if (response.error) {
        const errorMessage = response.error.message || "Não foi possível sair da conta";
        throw new Error(errorMessage);
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
    login,
    logout,
    setUserAsAdmin
  };
};
