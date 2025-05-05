
import { AdminUser } from "@/types/adminTypes";

export const filterAdminUsers = (users: AdminUser[], searchTerm: string): AdminUser[] => {
  if (!searchTerm.trim()) return users;
  
  return users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_new_user ? "novo" : "ativo").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.is_admin ? "admin" : "").toLowerCase().includes(searchTerm.toLowerCase())
  );
};
