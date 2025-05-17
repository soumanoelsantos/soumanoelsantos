
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useDeleteUser = () => {
  const { toast } = useToast();
  
  const deleteUser = async (userId: string, users: User[]) => {
    try {
      // Buscar e-mail do usuário antes de excluí-lo
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return { success: false };
      
      // Chamar a edge function para excluir o usuário
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      // Removed the toast notification that was here
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      // Removed the toast notification that was here
      return { success: false };
    }
  };

  return { deleteUser };
};
