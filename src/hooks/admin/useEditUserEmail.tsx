
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
        title: "Email updated",
        description: `${userToEdit.email} was changed to ${newEmail}`,
      });
      
      return { success: true, oldEmail: userToEdit.email };
    } catch (error: any) {
      console.error("Error editing user email:", error);
      toast({
        variant: "destructive",
        title: "Error updating email",
        description: error.message || "Could not update user email."
      });
      return { success: false };
    }
  };

  return { editUserEmail };
};
