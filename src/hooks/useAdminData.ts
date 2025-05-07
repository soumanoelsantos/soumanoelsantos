
import { useAuth } from "@/hooks/useAuth";
import { useAdminSearch } from "@/hooks/useAdminSearch";
import { useAdminModules } from "@/hooks/useAdminModules";
import { useAdminLoader } from "@/hooks/useAdminLoader";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useMemo } from "react";

export const useAdminData = (currentUserEmail?: string | null) => {
  const { isAuthenticated } = useAuth();
  const { modules: defaultModules } = useAdminModules();
  
  // Load admin data with caching
  const { users, setUsers, modules, isLoading, refreshData } = useAdminLoader(isAuthenticated, defaultModules);
  
  // Search functionality - memoized to avoid unnecessary recalculations
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
    viewAsUser,
    refreshData
  };
};
