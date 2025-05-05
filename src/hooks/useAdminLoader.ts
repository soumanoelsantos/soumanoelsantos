
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchAdminData } from "@/services/adminService";

export const useAdminLoader = (
  setIsLoading: (isLoading: boolean) => void,
  setData: (data: any) => void
) => {
  const { toast } = useToast();

  const loadUsers = useCallback(async (isAuthenticated: boolean, isAdmin: boolean) => {
    if (!isAuthenticated || !isAdmin) {
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchAdminData();
      setData(data);
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de usuários e módulos.",
      });
      setIsLoading(false);
    }
  }, [setIsLoading, setData, toast]);

  return { loadUsers };
};
