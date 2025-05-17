
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminUser } from "@/types/adminTypes";
import { AdminModule } from "@/types/admin";
import UserRow from "./UserRow";
import EmptyUsersList from "./EmptyUsersList";

interface UsersTableProps {
  filteredUsers: AdminUser[];
  modules: AdminModule[];
  toggleNewUserStatus: (userId: string) => Promise<boolean>;
  toggleModuleAccess: (userId: string, moduleId: number) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  editUserEmail: (userId: string, newEmail: string) => Promise<boolean>;
  viewAsUser: (userId: string) => Promise<boolean>;
  toggleAllModules: (userId: string, enableAll: boolean) => Promise<boolean>;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  filteredUsers, 
  modules, 
  toggleNewUserStatus, 
  toggleModuleAccess,
  deleteUser,
  editUserEmail,
  viewAsUser,
  toggleAllModules
}) => {
  if (!filteredUsers || filteredUsers.length === 0) {
    return <EmptyUsersList />;
  }

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-100 border-gray-200">
            <TableHead className="text-gray-700 w-[250px]">Usuário</TableHead>
            <TableHead className="text-gray-700 w-[150px]">Novo Usuário</TableHead>
            <TableHead className="text-gray-700 text-center">Acesso aos Módulos</TableHead>
            <TableHead className="text-gray-700 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              modules={modules}
              toggleNewUserStatus={toggleNewUserStatus}
              toggleModuleAccess={toggleModuleAccess}
              deleteUser={deleteUser}
              editUserEmail={editUserEmail}
              viewAsUser={viewAsUser}
              toggleAllModules={toggleAllModules}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
