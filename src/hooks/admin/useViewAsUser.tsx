
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/admin";
import { useSecureSession } from "@/hooks/security/useSecureSession";
import { useAuditLogger } from "@/hooks/security/useAuditLogger";

export const useViewAsUser = () => {
  const { toast } = useToast();
  const { startAdminSession } = useSecureSession();
  const { logAdminAction } = useAuditLogger();

  const viewAsUser = async (userId: string, users: User[], adminEmail: string | null) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Usuário não encontrado.",
          className: "bg-white border-red-200"
        });
        return { success: false };
      }
      
      // Log the admin action
      await logAdminAction('VIEW_AS_USER', `Viewing as user: ${userToView.email}`);
      
      // Start secure admin session
      startAdminSession(adminEmail || '');
      
      toast({
        title: "Visualizando como usuário",
        description: `Agora você está visualizando como ${userToView.email}`,
        className: "bg-white"
      });
      
      return { success: true, userEmail: userToView.email };
    } catch (error: any) {
      console.error("Erro ao visualizar como usuário:", error);
      
      await logAdminAction('VIEW_AS_USER_ERROR', `Failed to view as user: ${error.message}`);
      
      toast({
        variant: "destructive",
        title: "Erro ao trocar de usuário",
        description: error.message || "Não foi possível visualizar como o usuário selecionado.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  return { viewAsUser };
};
