
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";

export const useAdminData = (currentUserEmail?: string | null) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Módulos fixos para referência
  const modules: AdminModule[] = [
    { id: 0, title: "Ferramentas", description: "Ferramentas e utilitários" },
    { id: 1, title: "Módulo 1 - Diagnóstico e Estratégia", description: "Diagnóstico e Estratégia" },
    { id: 2, title: "Módulo 2 - Sistema de Vendas", description: "Sistema de Vendas" },
    { id: 3, title: "Módulo 3 - Marketing Digital", description: "Marketing Digital" },
    { id: 4, title: "Módulo 4 - Gestão e Escalabilidade", description: "Gestão e Escalabilidade" }
  ];

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        console.log("Iniciando busca de perfis de usuários");
        
        // Buscar perfis de usuários
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (profilesError) {
          console.error("Erro ao buscar perfis:", profilesError);
          throw profilesError;
        }

        console.log("Perfis encontrados:", profiles?.length || 0);
        
        if (!profiles || profiles.length === 0) {
          setUsers([]);
          setIsLoading(false);
          return;
        }

        // Buscar módulos de usuário
        const { data: userModules, error: modulesError } = await supabase
          .from('user_modules')
          .select('*');

        if (modulesError) {
          console.error("Erro ao buscar módulos de usuário:", modulesError);
          throw modulesError;
        }

        console.log("Módulos de usuário encontrados:", userModules?.length || 0);

        // Processar os dados para o formato esperado
        const formattedUsers = profiles.map((profile: any) => {
          const userModuleIds = userModules
            .filter((module: any) => module.user_id === profile.id)
            .map((module: any) => module.module_id);

          return {
            id: profile.id,
            email: profile.email,
            isNewUser: profile.is_new_user,
            isAdmin: profile.is_admin,
            unlockedModules: userModuleIds
          };
        });

        console.log("Usuários formatados:", formattedUsers.length);
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar usuários",
          description: "Não foi possível buscar a lista de usuários."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, navigate, toast]);

  // Actions
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
    } catch (error: any) {
      console.error("Erro ao alternar acesso ao módulo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao modificar acesso",
        description: error.message || "Não foi possível modificar o acesso ao módulo."
      });
    }
  };

  const toggleNewUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
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
    } catch (error: any) {
      console.error("Erro ao alternar status de novo usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do usuário."
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Buscar e-mail do usuário antes de excluí-lo
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return;
      
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
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário."
      });
    }
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    try {
      const userToEdit = users.find(u => u.id === userId);
      if (!userToEdit) return;
      
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
    } catch (error: any) {
      console.error("Erro ao editar e-mail do usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar e-mail",
        description: error.message || "Não foi possível atualizar o e-mail do usuário."
      });
    }
  };

  const viewAsUser = async (userId: string) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return;
      
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
    } catch (error: any) {
      console.error("Erro ao visualizar como usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao trocar de usuário",
        description: error.message || "Não foi possível visualizar como o usuário selecionado."
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
