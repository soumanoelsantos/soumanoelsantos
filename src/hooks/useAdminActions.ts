
import { useToast } from "@/hooks/use-toast";
import { 
  toggleUserModuleAccess,
  updateUserNewStatus,
  deleteUserById,
  updateUserEmail,
  impersonateUser
} from "@/services/adminService.tsx";
import { AdminUser } from "@/types/adminTypes";

export const useAdminActions = (users: AdminUser[], setUsers: (users: AdminUser[]) => void) => {
  const { toast } = useToast();

  const handleToggleModuleAccess = async (userId: string, moduleId: number) => {
    try {
      const result = await toggleUserModuleAccess(userId, moduleId);
      
      // Update the local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          const userModules = [...user.modules];
          
          if (result.added) {
            // Add the module if it was added
            const moduleToAdd = users[0].modules.find(m => m.id === moduleId);
            if (moduleToAdd && !userModules.some(m => m.id === moduleId)) {
              userModules.push(moduleToAdd);
            }
          } else {
            // Remove the module if it was removed
            const moduleIndex = userModules.findIndex(m => m.id === moduleId);
            if (moduleIndex !== -1) {
              userModules.splice(moduleIndex, 1);
            }
          }
          
          return { ...user, modules: userModules };
        }
        return user;
      }));
      
      toast({
        title: result.added ? "Módulo adicionado" : "Módulo removido",
        description: `Acesso ao módulo ${moduleId} foi ${result.added ? "concedido" : "revogado"} com sucesso.`,
      });
    } catch (error) {
      console.error("Error toggling module access:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o acesso ao módulo.",
      });
    }
  };

  const handleToggleNewUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
      const newStatus = !user.is_new_user;
      await updateUserNewStatus(userId, newStatus);
      
      // Update the local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, is_new_user: newStatus } : u
      ));
      
      toast({
        title: "Status atualizado",
        description: `O status do usuário foi alterado para ${newStatus ? "novo" : "ativo"}.`,
      });
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status do usuário.",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserById(userId);
      
      // Update the local state
      setUsers(users.filter(user => user.id !== userId));
      
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o usuário.",
      });
    }
  };

  const handleEditUserEmail = async (userId: string, newEmail: string) => {
    try {
      await updateUserEmail(userId, newEmail);
      
      // Update the local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, email: newEmail } : user
      ));
      
      toast({
        title: "Email atualizado",
        description: `O email do usuário foi atualizado para ${newEmail}.`,
      });
    } catch (error) {
      console.error("Error updating user email:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o email do usuário.",
      });
    }
  };

  const handleViewAsUser = async (userId: string, currentUserEmail: string | null | undefined) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return false;
      
      await impersonateUser(userId, currentUserEmail);
      
      toast({
        title: "Visualizando como usuário",
        description: `Agora você está visualizando como ${user.email}.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error viewing as user:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível visualizar como o usuário selecionado.",
      });
      return false;
    }
  };

  return {
    toggleModuleAccess: handleToggleModuleAccess,
    toggleNewUserStatus: handleToggleNewUserStatus,
    deleteUser: handleDeleteUser,
    editUserEmail: handleEditUserEmail,
    viewAsUser: handleViewAsUser
  };
};
