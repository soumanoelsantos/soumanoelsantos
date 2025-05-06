
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useDeleteUser = () => {
  const { toast } = useToast();
  
  const deleteUser = async (userId: string, users: User[]) => {
    try {
      // Get user email before deleting
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return { success: false };
      
      // Call edge function to delete user
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      toast({
        title: "User deleted",
        description: `${userToDelete.email} was successfully removed`,
      });
      
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Error deleting user",
        description: error.message || "Could not delete user."
      });
      return { success: false };
    }
  };

  return { deleteUser };
};
