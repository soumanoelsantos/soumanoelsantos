
import { User, AdminModule } from "@/types/admin";

export const getDefaultModules = (): AdminModule[] => [
  { id: 0, title: "Ferramentas", description: "Ferramentas e utilitários" }
];

export const formatUsersData = (profiles: any[], userModules: any[]): User[] => {
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

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  return users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
