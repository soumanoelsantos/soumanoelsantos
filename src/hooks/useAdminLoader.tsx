
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { fetchProfiles, fetchModules } from "@/services/adminService";

// Cache para os resultados das consultas
const dataCache = {
  users: null as User[] | null,
  modules: null as AdminModule[] | null,
  lastFetchTime: 0,
  cacheTTL: 60000 // 1 minuto de TTL para o cache
};

export const useAdminLoader = (isAuthenticated: boolean, defaultModules: AdminModule[]) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<AdminModule[]>(defaultModules);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      setIsLoading(true);

      // Verificar se o cache é válido
      const now = Date.now();
      const cacheIsValid = dataCache.lastFetchTime > 0 && 
                         (now - dataCache.lastFetchTime) < dataCache.cacheTTL &&
                         dataCache.users !== null &&
                         dataCache.modules !== null;
      
      if (cacheIsValid) {
        console.log("Usando dados em cache para administração");
        setUsers(dataCache.users || []);
        setModules(dataCache.modules || defaultModules);
        setIsLoading(false);
        return;
      }
      
      try {
        // Carregar usuários
        try {
          const profilesResult = await fetchProfiles();
          
          if (profilesResult.error) {
            throw profilesResult.error;
          }
          
          const loadedUsers = profilesResult.data || [];
          setUsers(loadedUsers);
          dataCache.users = loadedUsers;
          console.log("Users loaded successfully:", loadedUsers.length);
        } catch (profileError) {
          console.error("Error loading users:", profileError);
          setUsers([]);
          toast({
            variant: "destructive",
            title: "Erro ao carregar usuários",
            description: "Não foi possível carregar os dados dos usuários. Tente novamente."
          });
        }
        
        // Carregar módulos
        try {
          const modulesResult = await fetchModules();
          
          if (modulesResult.error) {
            throw modulesResult.error;
          }
          
          const loadedModules = modulesResult.data || defaultModules;
          setModules(loadedModules);
          dataCache.modules = loadedModules;
          console.log("Modules loaded successfully:", loadedModules.length);
        } catch (modulesError) {
          console.error("Error loading modules:", modulesError);
          // Manter os módulos padrão em caso de erro
        }
        
        // Atualizar timestamp do cache
        dataCache.lastFetchTime = now;
      } catch (error: any) {
        console.error("Error loading admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, toast, defaultModules]);

  // Função para forçar a recarga de dados
  const refreshData = async () => {
    // Invalidar cache
    dataCache.lastFetchTime = 0;
    setIsLoading(true);
    
    try {
      const profilesResult = await fetchProfiles();
      if (!profilesResult.error) {
        setUsers(profilesResult.data || []);
        dataCache.users = profilesResult.data || [];
      }
      
      const modulesResult = await fetchModules();
      if (!modulesResult.error) {
        setModules(modulesResult.data || defaultModules);
        dataCache.modules = modulesResult.data || defaultModules;
      }
      
      dataCache.lastFetchTime = Date.now();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    setUsers,
    modules,
    isLoading,
    refreshData
  };
};
