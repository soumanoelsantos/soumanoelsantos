import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UserSearchBox from "./UserSearchBox";
import UsersTable from "./UsersTable";
import { User } from "@/types/admin";
import { Module } from "@/hooks/useAdminData";

interface UsersManagementProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  totalUsers: number;
  modules: Module[];
  toggleNewUserStatus: (userId: string) => void;
  toggleModuleAccess: (userId: string, moduleId: number) => void;
  deleteUser: (userId: string) => void;
  editUserEmail: (userId: string, newEmail: string) => void;
  viewAsUser: (userId: string) => void;
}

const UsersManagement: React.FC<UsersManagementProps> = ({
  searchTerm,
  setSearchTerm,
  filteredUsers,
  totalUsers,
  modules,
  toggleNewUserStatus,
  toggleModuleAccess,
  deleteUser,
  editUserEmail,
  viewAsUser
}) => {
  return (
    <Card className="bg-white border-dark-primary/20 shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Gerencie o acesso dos usuários</CardTitle>
        <CardDescription className="text-gray-600">
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
          deleteUser={deleteUser}
          editUserEmail={editUserEmail}
          viewAsUser={viewAsUser}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-600">
          Exibindo {filteredUsers?.length || 0} de {totalUsers || 0} usuários
        </p>
      </CardFooter>
    </Card>
  );
};

export default UsersManagement;
