
export interface User {
  id: string;
  email: string;
  isNewUser: boolean;
  unlockedModules: number[];
  isAdmin?: boolean;
}

export interface AdminModule {
  id: number;
  title: string;
  description?: string;
}

export interface UseAdminDataReturn {
  users: User[];
  modules: AdminModule[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  filteredUsers: User[];
  toggleModuleAccess: (userId: string, moduleId: number) => Promise<boolean>;
  toggleNewUserStatus: (userId: string) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  editUserEmail: (userId: string, newEmail: string) => Promise<boolean>;
  viewAsUser: (userId: string) => Promise<boolean>;
}

export type Module = AdminModule;
