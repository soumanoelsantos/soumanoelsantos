
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
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      toast({
        title: "Usuário excluído",
        description: `${userToDelete.email} foi removido com sucesso`,
        className: "bg-white"
      });
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  return { deleteUser };
};
