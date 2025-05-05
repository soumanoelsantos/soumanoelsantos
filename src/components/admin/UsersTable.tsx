
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserIcon, Edit, Trash2, X, Check, LogIn } from "lucide-react";
import { AdminUser } from "@/types/adminTypes";
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

interface UsersTableProps {
  filteredUsers: AdminUser[];
  modules: Module[];
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
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");

  const handleEditClick = (userId: string, email: string) => {
    setEditingUser(userId);
    setNewEmail(email);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewEmail("");
  };

  const handleSaveEdit = (userId: string) => {
    if (newEmail && newEmail !== userId) {
      editUserEmail(userId, newEmail);
    }
    setEditingUser(null);
  };

  if (!filteredUsers || filteredUsers.length === 0) {
    return (
      <div className="rounded-md border border-gray-200 p-8 text-center text-gray-500">
        Nenhum usuário encontrado com este termo de pesquisa
      </div>
    );
  }

  // Helper function to check if a module is unlocked for a user
  const hasModule = (user: AdminUser, moduleId: number) => {
    return user.modules.some(m => m.id === moduleId);
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 border-gray-200">
              <TableCell className="font-medium text-gray-700">
                {editingUser === user.id ? (
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
                    checked={user.is_new_user}
                    onCheckedChange={() => toggleNewUserStatus(user.id)}
                  />
                  <span className="text-gray-700">
                    {user.is_new_user ? "Sim" : "Não"}
                  </span>
                </div>
              </TableCell>
              {modules.map(module => (
                <TableCell key={module.id} className="text-center">
                  <Switch
                    checked={hasModule(user, module.id)}
                    onCheckedChange={() => toggleModuleAccess(user.id, module.id)}
                  />
                </TableCell>
              ))}
              <TableCell className="flex justify-end gap-2">
                {editingUser === user.id ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSaveEdit(user.id)}
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
                      onClick={() => viewAsUser(user.id)}
                      className="h-8 px-2 border-green-200 hover:bg-green-50"
                      title="Ver como usuário"
                    >
                      <LogIn className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditClick(user.id, user.email)}
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
                            onClick={() => deleteUser(user.id)}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
