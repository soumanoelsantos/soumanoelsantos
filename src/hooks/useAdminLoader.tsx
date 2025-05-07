
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { fetchProfiles, fetchModules } from "@/services/adminService";

export const useAdminLoader = (isAuthenticated: boolean, defaultModules: AdminModule[]) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<AdminModule[]>(defaultModules);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempted, setLoadAttempted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        
        try {
          const profilesResult = await fetchProfiles();
          
          if (profilesResult.error) {
            throw profilesResult.error;
          }
          
          setUsers(profilesResult.data || []);
          console.log("Users loaded successfully:", profilesResult.data?.length || 0);
        } catch (profileError) {
          console.error("Error loading users:", profileError);
          setUsers([]);
          toast({
            variant: "destructive",
            title: "Error loading users",
            description: "Could not load user data. Please try again."
          });
        }
        
        try {
          const modulesResult = await fetchModules();
          
          if (modulesResult.error) {
            throw modulesResult.error;
          }
          
          setModules(modulesResult.data || defaultModules);
          console.log("Modules loaded successfully:", modulesResult.data?.length || 0);
        } catch (modulesError) {
          console.error("Error loading modules:", modulesError);
          // Mantenha os módulos padrão em caso de erro
        }
      } catch (error: any) {
        console.error("Error loading admin data:", error);
      } finally {
        setIsLoading(false);
        setLoadAttempted(true);
      }
    };

    if (!loadAttempted) {
      loadData();
    }
  }, [isAuthenticated, navigate, toast, defaultModules, loadAttempted]);

  return {
    users,
    setUsers,
    modules,
    isLoading: isLoading && !loadAttempted // Considere não estar carregando após a primeira tentativa
  };
};
