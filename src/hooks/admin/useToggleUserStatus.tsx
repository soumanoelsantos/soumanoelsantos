
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useToggleUserStatus = () => {
  const { toast } = useToast();
  
  const toggleNewUserStatus = async (userId: string, users: User[]) => {
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
        className: "bg-white"
      });
      
      return { success: true, updatedStatus };
    } catch (error: any) {
      console.error("Erro ao alternar status de novo usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do usuário.",
        className: "bg-white border-red-200" 
      });
      return { success: false };
    }
  };

  return { toggleNewUserStatus };
};
