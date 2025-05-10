
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
  const { toggleModuleAccess: toggleModule, toggleAllModules: toggleAllModulesAccess } = useToggleModuleAccess();
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
    const result = await toggleAllModulesAccess(userId, enableAll, modules, users);
    if (result.success) {
      // Update local state
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            return { 
              ...user, 
              unlockedModules: enableAll ? modules.map(m => m.id) : []
            };
          }
          return user;
        });
      });
      
      toast({
        title: enableAll ? "Todos os módulos liberados" : "Acesso aos módulos removido",
        description: `${enableAll ? "Acesso completo concedido" : "Acesso removido"} com sucesso`,
        className: "bg-white border-gray-200"
      });
      
      return true;
    }
    return false;
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
