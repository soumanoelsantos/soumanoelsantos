
import { AdminModule } from "@/types/admin";

export interface AdminUser {
  id: string;
  email: string;
  is_new_user: boolean;
  is_admin: boolean;
  modules: AdminModule[];
}

export interface AdminState {
  users: AdminUser[];
  modules: AdminModule[];
  searchTerm: string;
  isLoading: boolean;
}
