
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminUser } from "@/types/adminTypes";
import { AdminModule } from "@/types/admin";
import UserRow from "./UserRow";
import EmptyUsersList from "./EmptyUsersList";

interface UsersTableProps {
  filteredUsers: AdminUser[];
  modules: AdminModule[];
  toggleNewUserStatus: (userId: string) => void;
  toggleModuleAccess: (userId: string, moduleId: number) => void;
  deleteUser: (userId: string) => void;
  editUserEmail: (userId: string, newEmail: string) => void;
  viewAsUser: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  filteredUsers, 
  modules, 
  toggleNewUserStatus, 
  toggleModuleAccess,
  deleteUser,
  editUserEmail,
  viewAsUser
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
            {modules.map(module => (
              <TableHead key={module.id} className="text-gray-700 text-center">
                {module.title.length > 15
                  ? module.title.substring(0, 15) + "..."
                  : module.title}
              </TableHead>
            ))}
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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
