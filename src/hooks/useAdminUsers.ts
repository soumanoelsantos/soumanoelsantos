
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
        
        // Buscar perfis de usuários
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (profilesError) {
          console.error("Erro ao buscar perfis:", profilesError);
          throw profilesError;
        }

        console.log("Perfis encontrados:", profiles?.length || 0);
        
        if (!profiles || profiles.length === 0) {
          setUsers([]);
          setIsLoading(false);
          return;
        }

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
        const formattedUsers = profiles.map((profile: any) => {
          const userModuleIds = userModules
            .filter((module: any) => module.user_id === profile.id)
            .map((module: any) => module.module_id);

          return {
            id: profile.id,
            email: profile.email,
            isNewUser: profile.is_new_user,
            isAdmin: profile.is_admin,
            unlockedModules: userModuleIds
          };
        });

        console.log("Usuários formatados:", formattedUsers.length);
        setUsers(formattedUsers);
      } catch (error) {
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
