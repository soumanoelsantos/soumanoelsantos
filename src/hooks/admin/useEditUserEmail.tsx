
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useEditUserEmail = () => {
  const { toast } = useToast();
  
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
        className: "bg-white"
      });
      
      return { success: true, oldEmail: userToEdit.email };
    } catch (error: any) {
      console.error("Erro ao editar e-mail do usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar e-mail",
        description: error.message || "Não foi possível atualizar o e-mail do usuário.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  return { editUserEmail };
};
