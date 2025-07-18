
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UserSearchBox from "./UserSearchBox";
import UsersTable from "./UsersTable";
import { AdminUser } from "@/types/adminTypes";
import { AdminModule } from "@/types/admin";

interface UsersManagementProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: AdminUser[];
  totalUsers: number;
  modules: AdminModule[];
  toggleNewUserStatus: (userId: string) => Promise<boolean>;
  toggleModuleAccess: (userId: string, moduleId: number) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  editUserEmail: (userId: string, newEmail: string) => Promise<boolean>;
  viewAsUser: (userId: string) => Promise<boolean>;
  toggleAllModules: (userId: string, enableAll: boolean) => Promise<boolean>;
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
  viewAsUser,
  toggleAllModules
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
          toggleAllModules={toggleAllModules}
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
