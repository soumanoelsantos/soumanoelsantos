
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useAdminFunctions = (userEmail: string | null) => {
  const { toast } = useToast();

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
      
      return { success: true, hasModule };
    } catch (error: any) {
      console.error("Erro ao alternar acesso ao módulo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao modificar acesso",
        description: error.message || "Não foi possível modificar o acesso ao módulo."
      });
      return { success: false };
    }
  };

  const toggleNewUserStatus = async (userId: string, users: User[], setUsers: (users: User[]) => void) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return { success: false };
      
      const updatedStatus = !user.isNewUser;
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_new_user: updatedStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Status atualizado",
        description: `${user.email} agora ${updatedStatus ? "é" : "não é mais"} um novo usuário`,
      });
      
      return { success: true, updatedStatus };
    } catch (error: any) {
      console.error("Erro ao alternar status de novo usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do usuário."
      });
      return { success: false };
    }
  };

  const deleteUser = async (userId: string, users: User[]) => {
    try {
      // Buscar e-mail do usuário antes de excluí-lo
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return { success: false };
      
      // Chamar a edge function para excluir o usuário
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      toast({
        title: "Usuário excluído",
        description: `${userToDelete.email} foi removido com sucesso`,
      });
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário."
      });
      return { success: false };
    }
  };

  const editUserEmail = async (userId: string, newEmail: string, users: User[]) => {
    try {
      const userToEdit = users.find(u => u.id === userId);
      if (!userToEdit) return { success: false };
      
      const { error } = await supabase
        .from('profiles')
        .update({ email: newEmail })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Email atualizado",
        description: `${userToEdit.email} foi alterado para ${newEmail}`,
      });
      
      return { success: true, oldEmail: userToEdit.email };
    } catch (error: any) {
      console.error("Erro ao editar e-mail do usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar e-mail",
        description: error.message || "Não foi possível atualizar o e-mail do usuário."
      });
      return { success: false };
    }
  };

  const viewAsUser = async (userId: string, users: User[], adminEmail: string | null) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return { success: false };
      
      // Armazenar o ID do administrador para restaurá-lo mais tarde
      localStorage.setItem('adminViewingAsUser', 'true');
      localStorage.setItem('adminOriginalEmail', adminEmail || '');
      
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
      
      return { success: true, userEmail: userToView.email };
    } catch (error: any) {
      console.error("Erro ao visualizar como usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao trocar de usuário",
        description: error.message || "Não foi possível visualizar como o usuário selecionado."
      });
      return { success: false };
    }
  };

  return {
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
