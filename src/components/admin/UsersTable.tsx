
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserIcon, Edit, Trash2, X, Check } from "lucide-react";
import { Module } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

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
  deleteUser: (email: string) => void;
  editUserEmail: (oldEmail: string, newEmail: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  filteredUsers, 
  modules, 
  toggleNewUserStatus, 
  toggleModuleAccess,
  deleteUser,
  editUserEmail
}) => {
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");

  const handleEditClick = (email: string) => {
    setEditingUser(email);
    setNewEmail(email);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewEmail("");
  };

  const handleSaveEdit = (oldEmail: string) => {
    if (newEmail && newEmail !== oldEmail) {
      editUserEmail(oldEmail, newEmail);
    }
    setEditingUser(null);
  };

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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.email} className="hover:bg-gray-50 border-gray-200">
                <TableCell className="font-medium text-gray-700">
                  {editingUser === user.email ? (
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-dark-primary" />
                      <Input 
                        value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="py-1 h-8" 
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-dark-primary" />
                      {user.email}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.isNewUser}
                      onCheckedChange={() => toggleNewUserStatus(user.email)}
                    />
                    <span className="text-gray-700">
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
                <TableCell className="flex justify-end gap-2">
                  {editingUser === user.email ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSaveEdit(user.email)}
                        className="h-8 px-2"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleCancelEdit}
                        className="h-8 px-2"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(user.email)}
                        className="h-8 px-2"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 px-2 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white border-gray-200">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-900">Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-700">
                              Tem certeza que deseja excluir o usuário {user.email}? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-100">Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteUser(user.email)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={modules.length + 3} className="text-center py-8 text-gray-500">
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
