
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminState } from "@/hooks/useAdminState";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useAdminLoader } from "@/hooks/useAdminLoader";

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { 
    state, 
    filteredUsers, 
    setSearchTerm, 
    setIsLoading, 
    setUsers, 
    setData 
  } = useAdminState();

  const { loadUsers } = useAdminLoader(setIsLoading, setData);

  const { 
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser: handleViewAsUser
  } = useAdminActions(state.users, setUsers);

  // Wrapper function to pass the current user email
  const viewAsUser = (userId: string) => {
    return handleViewAsUser(userId, currentUserEmail);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Somente administradores podem acessar esta página.",
      });
      navigate('/membros');
      return;
    }

    loadUsers(isAuthenticated, isAdmin);
  }, [isAuthenticated, isAdmin, navigate, loadUsers, toast]);

  return {
    users: state.users,
    modules: state.modules,
    searchTerm: state.searchTerm,
    setSearchTerm,
    isLoading: state.isLoading,
    filteredUsers,
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
