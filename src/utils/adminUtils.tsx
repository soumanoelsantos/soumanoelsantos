
import { AdminUser } from "@/types/adminTypes";

export const filterAdminUsers = (users: AdminUser[], searchTerm: string): AdminUser[] => {
  if (!searchTerm.trim()) return users;
  
  return users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_new_user ? "novo" : "ativo").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_admin ? "admin" : "").toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getDefaultModules = (): any[] => [
  { id: 0, title: "Ferramentas", description: "Ferramentas e utilitários" },
  { id: 1, title: "Módulo 1 - Diagnóstico e Estratégia", description: "Diagnóstico e Estratégia" },
  { id: 2, title: "Módulo 2 - Sistema de Vendas", description: "Sistema de Vendas" },
  { id: 3, title: "Módulo 3 - Marketing Digital", description: "Marketing Digital" },
  { id: 4, title: "Módulo 4 - Gestão e Escalabilidade", description: "Gestão e Escalabilidade" }
];

export const formatUsersData = (profiles: any[], userModules: any[]): any[] => {
  return profiles.map((profile: any) => {
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
};

export const filterUsers = (users: any[], searchTerm: string): any[] => {
  return users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
