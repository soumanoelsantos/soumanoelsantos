
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
        title: "Erro ao modificar acesso",
        description: error.message || "Não foi possível modificar o acesso ao módulo.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  const toggleAllModules = async (userId: string, enableAll: boolean, modules: AdminModule[], users: User[]) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return { success: false };
      
      // Use an edge function to avoid recursion issues with RLS policies
      const { error, data } = await supabase.functions.invoke('toggle-user-modules', {
        body: { 
          userId, 
          enableAll, 
          moduleIds: modules.map(m => m.id)
        }
      });
      
      if (error) throw error;
      
      toast({
        title: enableAll ? "Todos os módulos liberados" : "Acesso aos módulos removido",
        description: `${enableAll ? "Acesso completo concedido" : "Acesso removido"} com sucesso`,
        className: "bg-white"
      });
      
      return { 
        success: true,
        updatedModules: enableAll ? modules.map(m => m.id) : []
      };
    } catch (error: any) {
      console.error("Error toggling all modules access:", error);
      toast({
        variant: "destructive",
        title: "Erro ao modificar acesso",
        description: error.message || "Não foi possível atualizar o acesso aos módulos.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  return { toggleModuleAccess, toggleAllModules };
};
