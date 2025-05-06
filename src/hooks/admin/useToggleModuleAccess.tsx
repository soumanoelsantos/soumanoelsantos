
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";

export const useToggleModuleAccess = () => {
  const { toast } = useToast();
  
  const toggleModuleAccess = async (userId: string, moduleId: number, users: User[]) => {
    try {
      const hasModule = users.find(u => u.id === userId)?.unlockedModules.includes(moduleId);
      
      if (hasModule) {
        // Remove module access
        const { error } = await supabase
          .from('user_modules')
          .delete()
          .eq('user_id', userId)
          .eq('module_id', moduleId);
          
        if (error) throw error;
      } else {
        // Add module access
        const { error } = await supabase
          .from('user_modules')
          .insert([{ user_id: userId, module_id: moduleId }]);
          
        if (error) throw error;
      }
      
      // Return success with module status
      return { success: true, hasModule };
    } catch (error: any) {
      console.error("Error toggling module access:", error);
      toast({
        variant: "destructive",
        title: "Error modifying access",
        description: error.message || "Could not modify module access."
      });
      return { success: false };
    }
  };

  return { toggleModuleAccess };
};
