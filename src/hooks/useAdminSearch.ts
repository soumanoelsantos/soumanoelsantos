
import { useState } from "react";
import { User } from "@/types/admin";

export const useAdminSearch = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers
  };
};
