
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useAdminSearch } from "@/hooks/useAdminSearch";
import { useAdminModules } from "@/hooks/useAdminModules";
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";

export interface AdminState {
  users: User[];
  modules: AdminModule[];
  searchTerm: string;
  isLoading: boolean;
  errors: string[];
}

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Usar o hook useAdminModules para obter a lista de módulos
  const { modules } = useAdminModules();
  
  // Estados iniciais
  const initialState: AdminState = {
    users: [],
    modules: modules,
    searchTerm: "",
    isLoading: true,
    errors: []
  };
  
  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        // Verificar se o usuário é admin
        if (!user?.isAdmin) {
          toast({
            variant: "destructive",
            title: "Acesso negado",
            description: "Apenas administradores podem acessar esta página."
          });
          navigate('/membros');
          return;
        }

        // Carregar dados de usuários e módulos
        await loadAdminData();
      } catch (error: any) {
        console.error("Erro ao carregar dados administrativos:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível buscar os dados de usuários e módulos."
        });
      }
    };

    loadData();
  }, [isAuthenticated, navigate, toast, user]);

  // Função para carregar dados administrativos
  const loadAdminData = async () => {
    // Implementação transferida para useAdminData.tsx
  };

  // Usar o hook completo
  return useAdminData(currentUserEmail);
};
