
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useViewAsUser = () => {
  const { toast } = useToast();
  
  const viewAsUser = async (userId: string, users: User[], adminEmail: string | null | undefined) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return { success: false };
      
      // Armazenar o ID do administrador para restaurá-lo mais tarde
      localStorage.setItem('adminViewingAsUser', 'true');
      localStorage.setItem('adminOriginalEmail', adminEmail || '');
      
      // Configurar a sessão para visualizar como o usuário selecionado
      const { data, error } = await supabase.auth.setSession({
        access_token: '', // Token vazio para forçar login como outro usuário
        refresh_token: ''
      });
      
      if (error) throw error;
      
      toast({
        title: "Visualizando como usuário",
        description: `Agora você está visualizando como ${userToView.email}`,
        className: "bg-white"
      });
      
      return { success: true, userEmail: userToView.email };
    } catch (error: any) {
      console.error("Erro ao visualizar como usuário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao trocar de usuário",
        description: error.message || "Não foi possível visualizar como o usuário selecionado.",
        className: "bg-white border-red-200"
      });
      return { success: false };
    }
  };

  return { viewAsUser };
};
