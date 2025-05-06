
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { 
  useToggleModuleAccess, 
  useToggleUserStatus,
  useDeleteUser,
  useEditUserEmail,
  useViewAsUser
} from "@/hooks/admin";

export const useAdminActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  modules: AdminModule[],
  currentUserEmail?: string | null
) => {
  const { toast } = useToast();
  const { toggleModuleAccess: handleToggleModule } = useToggleModuleAccess();
  const { toggleNewUserStatus: handleToggleStatus } = useToggleUserStatus();
  const { deleteUser: handleDeleteUser } = useDeleteUser();
  const { editUserEmail: handleEditEmail } = useEditUserEmail();
  const { viewAsUser: handleViewAsUser } = useViewAsUser();

  const toggleModuleAccess = async (userId: string, moduleId: number) => {
    const result = await handleToggleModule(userId, moduleId, users);
    
    if (result.success) {
      // Update local state
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            const updatedModules = result.hasModule
              ? user.unlockedModules.filter(id => id !== moduleId)
              : [...user.unlockedModules, moduleId];
              
            toast({
              title: `Module ${result.hasModule ? "blocked" : "unblocked"}`,
              description: `${modules.find(m => m.id === moduleId)?.title} ${result.hasModule ? "blocked" : "unblocked"} for ${user.email}`,
            });
            
            return { ...user, unlockedModules: updatedModules };
          }
          return user;
        });
      });
      
      return true;
    }
    
    return false;
  };

  const toggleNewUserStatus = async (userId: string) => {
    const result = await handleToggleStatus(userId, users);
    
    if (result.success) {
      // Update local state
      setUsers(prevUsers => {
        return prevUsers.map(u => {
          if (u.id === userId) {
            return { ...u, isNewUser: result.updatedStatus };
          }
          return u;
        });
      });
      
      return true;
    }
    
    return false;
  };

  const deleteUser = async (userId: string) => {
    const result = await handleDeleteUser(userId, users);
    
    if (result.success) {
      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      return true;
    }
    
    return false;
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    const result = await handleEditEmail(userId, newEmail, users);
    
    if (result.success) {
      // Update local state
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

  const viewAsUser = async (userId: string) => {
    return await handleViewAsUser(userId, users, currentUserEmail);
  };

  return {
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
