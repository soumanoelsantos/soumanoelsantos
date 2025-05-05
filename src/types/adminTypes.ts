
import { Module } from "@/hooks/useAdminData";

export interface AdminUser {
  id: string;
  email: string;
  is_new_user: boolean;
  is_admin: boolean;
  modules: Module[];
}

export interface AdminState {
  users: AdminUser[];
  modules: Module[];
  searchTerm: string;
  isLoading: boolean;
}
