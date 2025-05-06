
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminModules } from "@/hooks/useAdminModules";
import { useAdminSearch } from "@/hooks/useAdminSearch";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAdminFunctions } from "@/hooks/useAdminFunctions";
import { User } from "@/types/admin";

export const useAdminData = (currentUserEmail?: string | null) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { modules } = useAdminModules();
  const { users, setUsers, isLoading } = useAdminUsers(isAuthenticated);
  const { searchTerm, setSearchTerm, filteredUsers } = useAdminSearch(users);
  const { 
    toggleModuleAccess: toggleModule,
    toggleNewUserStatus: toggleStatus,
    deleteUser: removeUser,
    editUserEmail: updateEmail,
    viewAsUser: viewAs
  } = useAdminFunctions(currentUserEmail);

  // Wrapper functions to update local state after successful operations
  const toggleModuleAccess = async (userId: string, moduleId: number) => {
    const result = await toggleModule(userId, moduleId, users);
    if (result.success) {
      // Update local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          const updatedModules = [...user.unlockedModules];
          if (result.hasModule) {
            // Remove module
            const index = updatedModules.indexOf(moduleId);
            if (index !== -1) {
              updatedModules.splice(index, 1);
            }
          } else {
            // Add module
            updatedModules.push(moduleId);
          }
          return { ...user, unlockedModules: updatedModules };
        }
        return user;
      }));
    }
    return result.success;
  };

  const toggleNewUserStatus = async (userId: string) => {
    const result = await toggleStatus(userId, users, setUsers);
    if (result.success) {
      // State is already updated in the function
    }
    return result.success;
  };

  const deleteUser = async (userId: string) => {
    const result = await removeUser(userId, users);
    if (result.success) {
      setUsers(users.filter(user => user.id !== userId));
    }
    return result.success;
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    const result = await updateEmail(userId, newEmail, users);
    if (result.success) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, email: newEmail } : user
      ));
    }
    return result.success;
  };

  const viewAsUser = async (userId: string) => {
    const result = await viewAs(userId, users, currentUserEmail);
    if (result.success) {
      // Redirect happens in the function
      navigate('/membros');
    }
    return result.success;
  };

  return {
    users,
    modules,
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredUsers,
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
