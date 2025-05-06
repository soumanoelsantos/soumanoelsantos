
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const useAdminUsers = (isAuthenticated: boolean) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        console.log("Iniciando busca de perfis de usuários");
        
        // Buscar perfis diretamente da auth.users para evitar problemas de RLS recursivo
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

        if (authError) {
          console.error("Erro ao buscar usuários:", authError);
          throw authError;
        }

        if (!authUsers || authUsers.users.length === 0) {
          console.log("Nenhum usuário encontrado");
          setUsers([]);
          setIsLoading(false);
          return;
        }

        console.log("Usuários encontrados:", authUsers.users.length);

        // Buscar módulos de usuário
        const { data: userModules, error: modulesError } = await supabase
          .from('user_modules')
          .select('*');

        if (modulesError) {
          console.error("Erro ao buscar módulos de usuário:", modulesError);
          throw modulesError;
        }

        console.log("Módulos de usuário encontrados:", userModules?.length || 0);

        // Processar os dados para o formato esperado
        const formattedUsers = authUsers.users.map((user: any) => {
          const userModuleIds = userModules
            ? userModules
                .filter((module: any) => module.user_id === user.id)
                .map((module: any) => module.module_id)
            : [];

          return {
            id: user.id,
            email: user.email,
            isNewUser: user.user_metadata?.is_new_user || false,
            isAdmin: user.user_metadata?.is_admin || false,
            unlockedModules: userModuleIds
          };
        });

        console.log("Usuários formatados:", formattedUsers.length);
        setUsers(formattedUsers);
      } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar usuários",
          description: "Não foi possível buscar a lista de usuários."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, navigate, toast]);

  return {
    users,
    setUsers,
    isLoading
  };
};
