
import { useNavigate } from "react-router-dom";
import { User, AdminModule } from "@/types/admin";
import { useToggleModuleAccess } from "@/hooks/admin/useToggleModuleAccess";
import { useToggleUserStatus } from "@/hooks/admin/useToggleUserStatus";
import { useDeleteUser } from "@/hooks/admin/useDeleteUser";
import { useEditUserEmail } from "@/hooks/admin/useEditUserEmail";
import { useViewAsUser } from "@/hooks/admin/useViewAsUser";
import { useToast } from "@/hooks/use-toast";

export const useAdminActions = (
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>, 
  modules: AdminModule[],
  currentUserEmail: string | null | undefined
) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleModuleAccess: toggleModule } = useToggleModuleAccess();
  const { toggleNewUserStatus: toggleStatus } = useToggleUserStatus();
  const { deleteUser: removeUser } = useDeleteUser();
  const { editUserEmail: updateEmail } = useEditUserEmail();
  const { viewAsUser: viewAs } = useViewAsUser();

  // Wrap each action to update local state after the action is performed
  const toggleModuleAccess = async (userId: string, moduleId: number): Promise<boolean> => {
    const result = await toggleModule(userId, moduleId, users);
    if (result.success) {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            const userModules = [...user.unlockedModules];
            if (result.hasModule) {
              // Remove module
              const index = userModules.indexOf(moduleId);
              if (index > -1) {
                userModules.splice(index, 1);
              }
            } else {
              // Add module
              userModules.push(moduleId);
            }
            return { ...user, unlockedModules: userModules };
          }
          return user;
        });
      });
      return true;
    }
    return false;
  };

  const toggleAllModules = async (userId: string, enableAll: boolean): Promise<boolean> => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return false;
      
      let success = true;
      const updatedModuleIds: number[] = [...user.unlockedModules];
      
      // Process each module
      for (const module of modules) {
        const hasModule = user.unlockedModules.includes(module.id);
        
        if (enableAll && !hasModule) {
          // Add module access
          const result = await toggleModule(userId, module.id, users);
          if (result.success && !result.hasModule) {
            updatedModuleIds.push(module.id);
          } else {
            success = false;
          }
        } 
        else if (!enableAll && hasModule) {
          // Remove module access
          const result = await toggleModule(userId, module.id, users);
          if (result.success && result.hasModule) {
            const index = updatedModuleIds.indexOf(module.id);
            if (index > -1) {
              updatedModuleIds.splice(index, 1);
            }
          } else {
            success = false;
          }
        }
      }
      
      // Update local state if any changes were made
      if (success) {
        setUsers(prevUsers => {
          return prevUsers.map(u => {
            if (u.id === userId) {
              return { ...u, unlockedModules: updatedModuleIds };
            }
            return u;
          });
        });
        
        toast({
          title: enableAll ? "Todos os módulos liberados" : "Acesso aos módulos removido",
          description: `${enableAll ? "Acesso completo concedido" : "Acesso removido"} para ${user.email}`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Erro ao alternar acesso a todos os módulos:", error);
      toast({
        variant: "destructive",
        title: "Erro ao modificar acesso",
        description: "Não foi possível atualizar o acesso aos módulos."
      });
      return false;
    }
  };

  const toggleNewUserStatus = async (userId: string): Promise<boolean> => {
    const result = await toggleStatus(userId, users);
    if (result.success) {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            return { ...user, isNewUser: result.updatedStatus };
          }
          return user;
        });
      });
      return true;
    }
    return false;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    const result = await removeUser(userId, users);
    if (result.success) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      return true;
    }
    return false;
  };

  const editUserEmail = async (userId: string, newEmail: string): Promise<boolean> => {
    const result = await updateEmail(userId, newEmail, users);
    if (result.success) {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            return { ...user, email: newEmail };
          }
          return user;
        });
      });
      return true;
    }
    return false;
  };

  const viewAsUser = async (userId: string): Promise<boolean> => {
    const result = await viewAs(userId, users, currentUserEmail);
    if (result.success) {
      navigate('/membros');
      return true;
    }
    return false;
  };

  return {
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser,
    toggleAllModules
  };
};
