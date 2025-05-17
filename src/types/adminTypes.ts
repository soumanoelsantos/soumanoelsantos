
import { AdminModule } from "@/types/admin";

export interface AdminUser {
  id: string;
  email: string;
  is_new_user: boolean;
  is_admin?: boolean;
  unlockedModules?: number[];
  modules?: AdminModule[];
  name?: string;
  phone?: string;
}

export interface AdminState {
  users: AdminUser[];
  modules: AdminModule[];
  searchTerm: string;
  isLoading: boolean;
}
