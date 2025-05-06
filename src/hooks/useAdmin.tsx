
import { useAuth } from "@/hooks/useAuth";
import { useAdminSearch } from "@/hooks/useAdminSearch";
import { useAdminModules } from "@/hooks/useAdminModules";
import { useAdminLoader } from "@/hooks/useAdminLoader";
import { useAdminActions } from "@/hooks/useAdminActions";

export const useAdminData = (currentUserEmail?: string | null) => {
  const { isAuthenticated } = useAuth();
  const { modules: defaultModules } = useAdminModules();
  
  // Load admin data
  const { users, setUsers, modules, isLoading } = useAdminLoader(isAuthenticated, defaultModules);
  
  // Search functionality
  const { searchTerm, setSearchTerm, filteredUsers } = useAdminSearch(users);
  
  // User actions
  const { 
    toggleModuleAccess, 
    toggleNewUserStatus, 
    deleteUser, 
    editUserEmail, 
    viewAsUser 
  } = useAdminActions(users, setUsers, modules, currentUserEmail);

  return {
    users,
    modules,
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredUsers,
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
