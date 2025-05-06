
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchProfiles, fetchModules } from "@/services/adminService";

export const useAdminLoader = (
  setIsLoading: (isLoading: boolean) => void,
  setData: (data: any) => void
) => {
  const { toast } = useToast();

  const loadUsers = useCallback(async (isAuthenticated: boolean, isAdmin: boolean) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setIsLoading(true);
      const profiles = await fetchProfiles();
      const modules = await fetchModules();
      setData({ users: profiles, modules });
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de usuários e módulos.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setData, toast]);

  return { loadUsers };
};
