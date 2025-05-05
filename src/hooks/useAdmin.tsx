
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AdminUser, AdminState } from "@/types/adminTypes";
import { Module } from "@/hooks/useAdminData";
import { 
  fetchAdminData,
  toggleUserModuleAccess,
  updateUserNewStatus,
  deleteUserById,
  updateUserEmail,
  impersonateUser
} from "@/services/adminService";
import { filterAdminUsers } from "@/utils/adminUtils";

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const { isAdmin, userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [state, setState] = useState<AdminState>({
    users: [],
    modules: [],
    searchTerm: "",
    isLoading: true
  });

  // Computed filtered users based on search term
  const filteredUsers = filterAdminUsers(state.users, state.searchTerm);

  const loadUsers = useCallback(async () => {
    if (!isAuthenticated || !isAdmin) {
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const data = await fetchAdminData();
      setState(prev => ({ 
        ...prev, 
        users: data.users,
        modules: data.modules,
        isLoading: false 
      }));
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de usuários e módulos.",
      });
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [isAuthenticated, isAdmin, toast]);

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

    loadUsers();
  }, [isAuthenticated, isAdmin, navigate, loadUsers, toast]);

  const toggleModuleAccess = async (userId: string, moduleId: number) => {
    try {
      const result = await toggleUserModuleAccess(userId, moduleId);
      
      // Update the local state
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => {
          if (user.id === userId) {
            const userModules = [...user.modules];
            
            if (result.added) {
              // Add the module if it was added
              const moduleToAdd = state.modules.find(m => m.id === moduleId);
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
        })
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

  const toggleNewUserStatus = async (userId: string) => {
    try {
      const user = state.users.find(u => u.id === userId);
      if (!user) return;
      
      const newStatus = !user.is_new_user;
      await updateUserNewStatus(userId, newStatus);
      
      // Update the local state
      setState(prev => ({
        ...prev,
        users: prev.users.map(u => 
          u.id === userId ? { ...u, is_new_user: newStatus } : u
        )
      }));
      
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

  const deleteUser = async (userId: string) => {
    try {
      await deleteUserById(userId);
      
      // Update the local state
      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== userId)
      }));
      
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

  const editUserEmail = async (userId: string, newEmail: string) => {
    try {
      await updateUserEmail(userId, newEmail);
      
      // Update the local state
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId ? { ...user, email: newEmail } : user
        )
      }));
      
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

  const viewAsUser = async (userId: string) => {
    try {
      const user = state.users.find(u => u.id === userId);
      if (!user) return;
      
      await impersonateUser(userId, currentUserEmail);
      
      toast({
        title: "Visualizando como usuário",
        description: `Agora você está visualizando como ${user.email}.`,
      });
      
      navigate('/membros');
    } catch (error) {
      console.error("Error viewing as user:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível visualizar como o usuário selecionado.",
      });
    }
  };

  const setSearchTerm = (term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  };

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
