
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
        title: "Status updated",
        description: `${user.email} is now ${updatedStatus ? "" : "no longer "}a new user`,
      });
      
      return { success: true, updatedStatus };
    } catch (error: any) {
      console.error("Error toggling new user status:", error);
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message || "Could not update user status."
      });
      return { success: false };
    }
  };

  return { toggleNewUserStatus };
};
