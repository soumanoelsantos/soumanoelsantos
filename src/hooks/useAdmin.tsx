
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminSearch } from "@/hooks/useAdminSearch";
import { useAdminModules } from "@/hooks/useAdminModules";
import { User, AdminModule } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfiles, fetchModules } from "@/services/adminService";

export interface AdminState {
  users: User[];
  modules: AdminModule[];
  searchTerm: string;
  isLoading: boolean;
  errors: string[];
}

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const { isAuthenticated, userEmail } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { searchTerm, setSearchTerm, filteredUsers } = useAdminSearch(users);
  const defaultModules = useAdminModules().modules;

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Tenta buscar dados de várias maneiras, com fallbacks
        try {
          // Tenta buscar perfis usando novo método
          const profilesData = await fetchProfiles();
          setUsers(profilesData);
          console.log("Perfis carregados com sucesso:", profilesData.length);
        } catch (profileError) {
          console.error("Erro ao buscar perfis:", profileError);
          
          // Se falhar, usar módulos padrão como fallback
          setUsers([]);
          toast({
            variant: "destructive",
            title: "Erro ao carregar usuários",
            description: "Usando dados de backup. Tente novamente mais tarde."
          });
        }
        
        try {
          // Tenta buscar módulos do banco de dados
          const modulesData = await fetchModules();
          setModules(modulesData);
          console.log("Módulos carregados com sucesso:", modulesData.length);
        } catch (modulesError) {
          console.error("Erro ao buscar módulos:", modulesError);
          
          // Se falhar, usar módulos padrão como fallback
          setModules(defaultModules);
        }
      } catch (error: any) {
        console.error("Erro ao carregar dados administrativos:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível buscar os dados de usuários e módulos."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate, toast, defaultModules]);

  // Actions for user management
  const toggleModuleAccess = async (userId: string, moduleId: number) => {
    try {
      const hasModule = users.find(u => u.id === userId)?.unlockedModules.includes(moduleId);
      
      if (hasModule) {
        // Remover acesso ao módulo
        const { error } = await supabase
          .from('user_modules')
          .delete()
          .eq('user_id', userId)
          .eq('module_id', moduleId);
          
        if (error) throw error;
      } else {
        // Adicionar acesso ao módulo
        const { error } = await supabase
          .from('user_modules')
          .insert([{ user_id: userId, module_id: moduleId }]);
          
        if (error) throw error;
      }
      
      // Atualizar o estado local
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            const updatedModules = hasModule
              ? user.unlockedModules.filter(id => id !== moduleId)
              : [...user.unlockedModules, moduleId];
              
            toast({
              title: `Módulo ${hasModule ? "bloqueado" : "desbloqueado"}`,
              description: `${modules.find(m => m.id === moduleId)?.title} ${hasModule ? "bloqueado" : "desbloqueado"} para ${user.email}`,
            });
            
            return { ...user, unlockedModules: updatedModules };
          }
          return user;
        });
      });
      
      return true;
    } catch (error: any) {
      console.error("Erro ao alternar acesso ao módulo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao modificar acesso",
        description: error.message || "Não foi possível modificar o acesso ao módulo."
      });
      return false;
    }
  };

  const toggleNewUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return false;
      
      const updatedStatus = !user.isNewUser;
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_new_user: updatedStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Atualizar o estado local
      setUsers(prevUsers => {
        return prevUsers.map(u => {
          if (u.id === userId) {
            toast({
              title: "Status atualizado",
              description: `${u.email} agora ${updatedStatus ? "é" : "não é mais"} um novo usuário`,
            });
            
            return { ...u, isNewUser: updatedStatus };
          }
          return u;
        });
      });
      
      return true;
    } catch (error: any) {
      console.error("Erro ao alternar status de novo usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do usuário."
      });
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Buscar e-mail do usuário antes de excluí-lo
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return false;
      
      // Chamar a edge function para excluir o usuário
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      // Atualizar o estado local
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(user => user.id !== userId);
        
        toast({
          title: "Usuário excluído",
          description: `${userToDelete.email} foi removido com sucesso`,
        });
        
        return updatedUsers;
      });
      
      return true;
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário."
      });
      return false;
    }
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    try {
      const userToEdit = users.find(u => u.id === userId);
      if (!userToEdit) return false;
      
      const { error } = await supabase
        .from('profiles')
        .update({ email: newEmail })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Atualizar o estado local
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
          if (user.id === userId) {
            toast({
              title: "Email atualizado",
              description: `${user.email} foi alterado para ${newEmail}`,
            });
            
            return { ...user, email: newEmail };
          }
          return user;
        });
        
        return updatedUsers;
      });
      
      return true;
    } catch (error: any) {
      console.error("Erro ao editar e-mail do usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar e-mail",
        description: error.message || "Não foi possível atualizar o e-mail do usuário."
      });
      return false;
    }
  };

  const viewAsUser = async (userId: string) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return false;
      
      // Armazenar o ID do administrador para restaurá-lo mais tarde
      localStorage.setItem('adminViewingAsUser', 'true');
      localStorage.setItem('adminOriginalEmail', currentUserEmail || '');
      
      // Configurar a sessão para visualizar como o usuário selecionado
      const { data, error } = await supabase.auth.setSession({
        access_token: '', // Token vazio para forçar login como outro usuário
        refresh_token: ''
      });
      
      if (error) throw error;
      
      toast({
        title: "Visualizando como usuário",
        description: `Agora você está visualizando como ${userToView.email}`,
      });
      
      // Navegar para área de membros
      navigate('/membros');
      return true;
    } catch (error: any) {
      console.error("Erro ao visualizar como usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao trocar de usuário",
        description: error.message || "Não foi possível visualizar como o usuário selecionado."
      });
      return false;
    }
  };

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
