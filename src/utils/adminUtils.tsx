
import { AdminUser } from "@/types/adminTypes";

// Filter admin users based on search term
export const filterAdminUsers = (users: AdminUser[], searchTerm: string): AdminUser[] => {
  if (!searchTerm || searchTerm.trim() === '') {
    return users;
  }
  
  return users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
