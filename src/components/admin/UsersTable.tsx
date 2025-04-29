
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { UserIcon } from "lucide-react";
import { Module } from "@/hooks/useAdminData";

interface User {
  email: string;
  isNewUser: boolean;
  unlockedModules: number[];
}

interface UsersTableProps {
  filteredUsers: User[];
  modules: Module[];
  toggleNewUserStatus: (email: string) => void;
  toggleModuleAccess: (email: string, moduleId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  filteredUsers, 
  modules, 
  toggleNewUserStatus, 
  toggleModuleAccess 
}) => {
  return (
    <div className="rounded-md border border-dark-primary/20 overflow-hidden">
      <Table>
        <TableHeader className="bg-dark-background/70">
          <TableRow className="hover:bg-dark-background/60 border-dark-primary/20">
            <TableHead className="text-dark-text w-[250px]">Usuário</TableHead>
            <TableHead className="text-dark-text w-[150px]">Novo Usuário</TableHead>
            {modules.map(module => (
              <TableHead key={module.id} className="text-dark-text text-center">
                {module.title.length > 15
                  ? module.title.substring(0, 15) + "..."
                  : module.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.email} className="hover:bg-dark-background/60 border-dark-primary/20">
                <TableCell className="font-medium text-dark-text flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-dark-primary" />
                  {user.email}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.isNewUser}
                      onCheckedChange={() => toggleNewUserStatus(user.email)}
                    />
                    <span className="text-dark-text/80">
                      {user.isNewUser ? "Sim" : "Não"}
                    </span>
                  </div>
                </TableCell>
                {modules.map(module => (
                  <TableCell key={module.id} className="text-center">
                    <Switch
                      checked={user.unlockedModules.includes(module.id)}
                      onCheckedChange={() => toggleModuleAccess(user.email, module.id)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={modules.length + 2} className="text-center py-8 text-dark-text/70">
                Nenhum usuário encontrado com este termo de pesquisa
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
