
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
    // Load mock users data
    // In a real app, this would come from an API or database
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
      setIsLoading(false);
    }, 500);
  }, [userEmail]);

  const toggleModuleAccess = (userEmail: string, moduleId: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
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
      })
    );
  };

  const toggleNewUserStatus = (userEmail: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.email === userEmail) {
          const updatedStatus = !user.isNewUser;
          
          toast({
            title: "Status atualizado",
            description: `${user.email} agora ${updatedStatus ? "é" : "não é mais"} um novo usuário`,
          });
          
          return { ...user, isNewUser: updatedStatus };
        }
        return user;
      })
    );
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
    toggleNewUserStatus
  };
}
