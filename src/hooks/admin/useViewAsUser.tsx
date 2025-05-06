
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useViewAsUser = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const viewAsUser = async (userId: string, users: User[], adminEmail: string | null | undefined) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return { success: false };
      
      // Store admin info for later restoration
      localStorage.setItem('adminViewingAsUser', 'true');
      localStorage.setItem('adminOriginalEmail', adminEmail || '');
      
      // Clear current session to force login as selected user
      const { error } = await supabase.auth.setSession({
        access_token: '', // Empty token to force login as another user
        refresh_token: ''
      });
      
      if (error) throw error;
      
      toast({
        title: "Viewing as user",
        description: `Now viewing as ${userToView.email}`,
      });
      
      // Redirecting happens in the calling component
      return { success: true, userEmail: userToView.email };
    } catch (error: any) {
      console.error("Error viewing as user:", error);
      toast({
        variant: "destructive",
        title: "Error switching user",
        description: error.message || "Could not view as selected user."
      });
      return { success: false };
    }
  };

  return { viewAsUser };
};
