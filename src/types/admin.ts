
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
  toggleModuleAccess: (userId: string, moduleId: number) => Promise<void>;
  toggleNewUserStatus: (userId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  editUserEmail: (userId: string, newEmail: string) => Promise<void>;
  viewAsUser: (userId: string) => Promise<void>;
}

export type Module = AdminModule;
