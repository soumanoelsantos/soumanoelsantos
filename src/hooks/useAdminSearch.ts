
import { useState, useEffect } from "react";
import { User } from "@/types/admin";

export const useAdminSearch = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers
  };
};
