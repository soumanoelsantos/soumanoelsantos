
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  isNewUser: boolean;
  unlockedModules: number[];
}

export interface Module {
  id: number;
  title: string;
}

export function useAdminData(userEmail: string | null) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock modules for reference
  const modules: Module[] = [
    { id: 0, title: "Ferramentas" },
    { id: 1, title: "Módulo 1 - Diagnóstico e Estratégia" },
    { id: 2, title: "Módulo 2 - Sistema de Vendas" },
    { id: 3, title: "Módulo 3 - Marketing Digital" },
    { id: 4, title: "Módulo 4 - Gestão e Escalabilidade" }
  ];

  useEffect(() => {
    // Try to load users from localStorage first
    const savedUsers = localStorage.getItem('adminUsers');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      setIsLoading(false);
    } else {
      // Load mock users data if nothing in localStorage
      const mockUsers = [
        {
          email: "usuario1@example.com",
          isNewUser: true,
          unlockedModules: [0]
        },
        {
          email: "usuario2@example.com",
          isNewUser: false,
          unlockedModules: [0, 1, 2]
        },
        {
          email: userEmail || "admin@example.com",
          isNewUser: false,
          unlockedModules: [0, 1, 2, 3, 4]
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setUsers(mockUsers);
        // Save to localStorage
        localStorage.setItem('adminUsers', JSON.stringify(mockUsers));
        setIsLoading(false);
      }, 500);
    }
  }, [userEmail]);

  // Helper function to save users to localStorage
  const saveUsersToStorage = (updatedUsers: User[]) => {
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  const toggleModuleAccess = (userEmail: string, moduleId: number) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.email === userEmail) {
          const hasModule = user.unlockedModules.includes(moduleId);
          
          // If module exists, remove it, otherwise add it
          const updatedModules = hasModule
            ? user.unlockedModules.filter(id => id !== moduleId)
            : [...user.unlockedModules, moduleId];
          
          // Toast notification
          toast({
            title: `Módulo ${hasModule ? "bloqueado" : "desbloqueado"}`,
            description: `${modules.find(m => m.id === moduleId)?.title} ${hasModule ? "bloqueado" : "desbloqueado"} para ${user.email}`,
          });
          
          return { ...user, unlockedModules: updatedModules };
        }
        return user;
      });
      
      // Save to localStorage
      saveUsersToStorage(updatedUsers);
      return updatedUsers;
    });
  };

  const toggleNewUserStatus = (userEmail: string) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.email === userEmail) {
          const updatedStatus = !user.isNewUser;
          
          toast({
            title: "Status atualizado",
            description: `${user.email} agora ${updatedStatus ? "é" : "não é mais"} um novo usuário`,
          });
          
          return { ...user, isNewUser: updatedStatus };
        }
        return user;
      });
      
      // Save to localStorage
      saveUsersToStorage(updatedUsers);
      return updatedUsers;
    });
  };

  const deleteUser = (email: string) => {
    setUsers(prevUsers => {
      // Filter out the deleted user
      const updatedUsers = prevUsers.filter(user => user.email !== email);
      
      // Save to localStorage
      saveUsersToStorage(updatedUsers);
      
      toast({
        title: "Usuário excluído",
        description: `${email} foi removido com sucesso`,
      });
      
      return updatedUsers;
    });
  };

  const editUserEmail = (oldEmail: string, newEmail: string) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.email === oldEmail) {
          toast({
            title: "Email atualizado",
            description: `${oldEmail} foi alterado para ${newEmail}`,
          });
          
          return { ...user, email: newEmail };
        }
        return user;
      });
      
      // Save to localStorage
      saveUsersToStorage(updatedUsers);
      return updatedUsers;
    });
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    editUserEmail
  };
}

