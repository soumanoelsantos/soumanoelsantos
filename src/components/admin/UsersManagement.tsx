
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UserSearchBox from "./UserSearchBox";
import UsersTable from "./UsersTable";
import { Module } from "@/hooks/useAdminData";

interface User {
  email: string;
  isNewUser: boolean;
  unlockedModules: number[];
}

interface UsersManagementProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  totalUsers: number;
  modules: Module[];
  toggleNewUserStatus: (email: string) => void;
  toggleModuleAccess: (email: string, moduleId: number) => void;
}

const UsersManagement: React.FC<UsersManagementProps> = ({
  searchTerm,
  setSearchTerm,
  filteredUsers,
  totalUsers,
  modules,
  toggleNewUserStatus,
  toggleModuleAccess
}) => {
  return (
    <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-xl text-dark-text">Gerencie o acesso dos usuários</CardTitle>
        <CardDescription className="text-dark-text/80">
          Controle quais módulos cada usuário tem acesso, e ajuste outras configurações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserSearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UsersTable 
          filteredUsers={filteredUsers}
          modules={modules}
          toggleNewUserStatus={toggleNewUserStatus}
          toggleModuleAccess={toggleModuleAccess}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-dark-text/70">
          Exibindo {filteredUsers.length} de {totalUsers} usuários
        </p>
      </CardFooter>
    </Card>
  );
};

export default UsersManagement;
