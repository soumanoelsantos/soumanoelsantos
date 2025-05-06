
import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserIcon, Edit, Trash2, X, Check, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminUser } from "@/types/adminTypes";
import { AdminModule } from "@/types/admin";
import { UserDeleteDialog } from "./UserDeleteDialog";

interface UserRowProps {
  user: AdminUser;
  modules: AdminModule[];
  toggleNewUserStatus: (userId: string) => void;
  toggleModuleAccess: (userId: string, moduleId: number) => void;
  deleteUser: (userId: string) => void;
  editUserEmail: (userId: string, newEmail: string) => void;
  viewAsUser: (userId: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  modules,
  toggleNewUserStatus,
  toggleModuleAccess,
  deleteUser,
  editUserEmail,
  viewAsUser
}) => {
  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState(user.email);

  const handleEditClick = () => {
    setEditingUser(true);
    setNewEmail(user.email);
  };

  const handleCancelEdit = () => {
    setEditingUser(false);
    setNewEmail(user.email);
  };

  const handleSaveEdit = () => {
    if (newEmail && newEmail !== user.email) {
      editUserEmail(user.id, newEmail);
    }
    setEditingUser(false);
  };

  // Helper function to check if a module is unlocked for a user
  const hasModule = (user: AdminUser, moduleId: number) => {
    return user.modules.some(m => m.id === moduleId);
  };

  return (
    <TableRow key={user.id} className="hover:bg-gray-50 border-gray-200">
      <TableCell className="font-medium text-gray-700">
        {editingUser ? (
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
        {editingUser ? (
          <UserRowEditActions 
            onSave={handleSaveEdit} 
            onCancel={handleCancelEdit} 
          />
        ) : (
          <UserRowActions 
            userId={user.id}
            userEmail={user.email}
            onEdit={handleEditClick}
            onDelete={deleteUser}
            onView={viewAsUser}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

interface UserRowEditActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

const UserRowEditActions: React.FC<UserRowEditActionsProps> = ({ onSave, onCancel }) => (
  <>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onSave}
      className="h-8 px-2"
    >
      <Check className="h-4 w-4 text-green-600" />
    </Button>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onCancel}
      className="h-8 px-2"
    >
      <X className="h-4 w-4 text-red-600" />
    </Button>
  </>
);

interface UserRowActionsProps {
  userId: string;
  userEmail: string;
  onEdit: () => void;
  onDelete: (userId: string) => void;
  onView: (userId: string) => void;
}

const UserRowActions: React.FC<UserRowActionsProps> = ({ 
  userId, 
  userEmail, 
  onEdit, 
  onDelete, 
  onView 
}) => (
  <>
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => onView(userId)}
      className="h-8 px-2 border-green-200 hover:bg-green-50"
      title="Ver como usuário"
    >
      <LogIn className="h-4 w-4 text-green-600" />
    </Button>
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onEdit}
      className="h-8 px-2"
    >
      <Edit className="h-4 w-4 text-blue-600" />
    </Button>
    <UserDeleteDialog userId={userId} userEmail={userEmail} onDelete={onDelete} />
  </>
);

export default UserRow;
