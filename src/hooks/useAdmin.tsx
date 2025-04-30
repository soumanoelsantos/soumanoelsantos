
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  is_new_user: boolean;
  is_admin: boolean;
  modules: Array<{ id: number; title: string; description?: string; }>;
}

interface Module {
  id: number;
  title: string;
  description?: string;
}

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const { isAdmin, userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filtragem de usuários baseada no termo de busca
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_new_user ? "novo" : "ativo").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_admin ? "admin" : "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadUsers = useCallback(async () => {
    if (!isAuthenticated || !isAdmin) {
      return;
    }

    try {
      // Buscar todos os perfis
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Buscar todos os módulos
      const { data: allModules, error: modulesError } = await supabase
        .from('modules')
        .select('*');

      if (modulesError) throw modulesError;
      
      setModules(allModules || []);

      // Buscar todas as atribuições de módulos
      const { data: userModules, error: userModulesError } = await supabase
        .from('user_modules')
        .select('user_id, module_id');

      if (userModulesError) throw userModulesError;

      // Criar um mapa de usuário para módulos
      const userModulesMap = new Map<string, number[]>();
      userModules?.forEach((um) => {
        if (!userModulesMap.has(um.user_id)) {
          userModulesMap.set(um.user_id, []);
        }
        userModulesMap.get(um.user_id)?.push(um.module_id);
      });

      // Construir o array de usuários com seus módulos
      const usersWithModules = profiles?.map((profile) => ({
        id: profile.id,
        email: profile.email,
        is_new_user: profile.is_new_user,
        is_admin: profile.is_admin,
        modules: (userModulesMap.get(profile.id) || [])
          .map(moduleId => allModules?.find(m => m.id === moduleId))
          .filter(m => m !== undefined) as Module[]
      })) || [];

      setUsers(usersWithModules);
    } catch (error) {
      console.error("Erro ao carregar dados de administração:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de usuários e módulos.",
      });
    } finally {
      setIsLoading(false);
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
      // Verificar se o usuário já tem acesso a este módulo
      const { data: existingAccess, error: checkError } = await supabase
        .from('user_modules')
        .select('id')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingAccess) {
        // Remover acesso
        const { error: deleteError } = await supabase
          .from('user_modules')
          .delete()
          .eq('id', existingAccess.id);

        if (deleteError) throw deleteError;
      } else {
        // Adicionar acesso
        const { error: insertError } = await supabase
          .from('user_modules')
          .insert({ user_id: userId, module_id: moduleId });

        if (insertError) throw insertError;
      }

      // Recarregar dados
      loadUsers();
      toast({
        title: "Acesso atualizado",
        description: "O acesso ao módulo foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao alterar acesso ao módulo:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o acesso ao módulo.",
      });
    }
  };

  const toggleNewUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_new_user: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      // Recarregar dados
      loadUsers();
      toast({
        title: "Status atualizado",
        description: "O status do usuário foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao alterar status do usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status do usuário.",
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Chamar a edge function para deletar o usuário
      const response = await supabase.functions.invoke("delete-user", {
        body: { userId }
      });

      if (!response.data || response.error) {
        throw new Error(response.error?.message || 'Falha ao excluir usuário');
      }

      // Recarregar dados
      loadUsers();
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o usuário.",
      });
    }
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    // Para atualizar o email, precisaria usar a API de autenticação do Supabase
    // Isso requer privilégios elevados e provavelmente seria feito via uma edge function
    toast({
      variant: "destructive",
      title: "Funcionalidade não implementada",
      description: "A edição de email não está disponível no momento.",
    });
  };

  const viewAsUser = async (userId: string) => {
    // Implementação para simular a visualização como o usuário selecionado
    toast({
      variant: "destructive",
      title: "Funcionalidade não implementada",
      description: "A visualização como usuário não está disponível no momento.",
    });
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
