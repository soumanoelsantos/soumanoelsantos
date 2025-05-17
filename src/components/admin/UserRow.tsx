
import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { AdminUser } from "@/types/adminTypes";
import { AdminModule } from "@/types/admin";
import UserEmail from "./UserEmail";
import UserRowActions from "./UserRowActions";
import UserRowEditActions from "./UserRowEditActions";
import UserModuleAccess from "./UserModuleAccess";

interface UserRowProps {
  user: AdminUser;
  modules: AdminModule[];
  toggleNewUserStatus: (userId: string) => Promise<boolean>;
  toggleModuleAccess: (userId: string, moduleId: number) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  editUserEmail: (userId: string, newEmail: string) => Promise<boolean>;
  viewAsUser: (userId: string) => Promise<boolean>;
  toggleAllModules: (userId: string, enableAll: boolean) => Promise<boolean>;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  modules,
  toggleNewUserStatus,
  toggleModuleAccess,
  deleteUser,
  editUserEmail,
  viewAsUser,
  toggleAllModules
}) => {
  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState(user.email);

  // Helper function to check if all modules are unlocked
  const allModulesUnlocked = () => {
    if (!modules.length) return false;
    return modules.every(module => hasModule(user, module.id));
  };

  const handleSelectAllModules = async (checked: boolean) => {
    await toggleAllModules(user.id, checked);
  };

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
    if (user.modules) {
      return user.modules.some(m => m.id === moduleId);
    } else if (user.unlockedModules) {
      return user.unlockedModules.includes(moduleId);
    }
    return false;
  };

  return (
    <TableRow key={user.id} className="hover:bg-gray-50 border-gray-200">
      <TableCell className="font-medium text-gray-700">
        <UserEmail 
          email={user.email} 
          isEditing={editingUser}
          newEmail={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-gray-700">
        {user.name || "---"}
      </TableCell>
      <TableCell className="text-gray-700">
        {user.phone || "---"}
      </TableCell>
      <TableCell className="text-center">
        <UserModuleAccess
          userId={user.id}
          allModulesUnlocked={allModulesUnlocked()}
          onToggleAllModules={(checked) => handleSelectAllModules(checked)}
        />
      </TableCell>
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

export default UserRow;
