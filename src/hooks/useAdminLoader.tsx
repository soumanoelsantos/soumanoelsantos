
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { fetchProfiles, fetchModules } from "@/services/adminService";

export const useAdminLoader = (isAuthenticated: boolean, defaultModules: AdminModule[]) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        
        // Tentar buscar usuários através da edge function
        try {
          const { data, error } = await fetchProfiles();
          
          if (error) throw error;
          
          setUsers(data || []);
          console.log("Perfis carregados com sucesso:", data?.length || 0);
        } catch (profileError) {
          console.error("Erro ao buscar perfis:", profileError);
          
          // Mostrar erro sem interromper o carregamento da página
          setUsers([]);
          toast({
            variant: "destructive",
            title: "Erro ao carregar usuários",
            description: "Não foi possível buscar a lista de usuários."
          });
        }
        
        // Buscar módulos
        try {
          const { data, error } = await fetchModules();
          
          if (error) throw error;
          
          setModules(data || defaultModules);
          console.log("Módulos carregados com sucesso:", data?.length || 0);
        } catch (modulesError) {
          console.error("Erro ao buscar módulos:", modulesError);
          
          // Usar módulos padrão como fallback
          setModules(defaultModules);
        }
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, toast, defaultModules]);

  return {
    users,
    setUsers,
    modules,
    isLoading
  };
};
