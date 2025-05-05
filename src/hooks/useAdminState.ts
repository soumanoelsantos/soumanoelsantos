
import { useState } from "react";
import { AdminState, AdminUser } from "@/types/adminTypes";
import { filterAdminUsers } from "@/utils/adminUtils.tsx";

export const useAdminState = () => {
  const [state, setState] = useState<AdminState>({
    users: [],
    modules: [],
    searchTerm: "",
    isLoading: true
  });

  // Computed filtered users based on search term
  const filteredUsers = filterAdminUsers(state.users, state.searchTerm);

  const setSearchTerm = (term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setUsers = (users: AdminUser[]) => {
    setState(prev => ({ ...prev, users }));
  };

  const setModules = (modules: any[]) => {
    setState(prev => ({ ...prev, modules }));
  };

  const setData = (data: { users: AdminUser[], modules: any[] }) => {
    setState(prev => ({ 
      ...prev, 
      users: data.users,
      modules: data.modules,
      isLoading: false 
    }));
  };

  return {
    state,
    filteredUsers,
    setSearchTerm,
    setIsLoading,
    setUsers,
    setModules,
    setData
  };
};
