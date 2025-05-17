
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface UserModuleAccessProps {
  userId: string;
  allModulesUnlocked: boolean;
  onToggleAllModules: (checked: boolean) => Promise<void>;
}

const UserModuleAccess: React.FC<UserModuleAccessProps> = ({ 
  userId, 
  allModulesUnlocked, 
  onToggleAllModules 
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Checkbox
        checked={allModulesUnlocked}
        onCheckedChange={onToggleAllModules}
        id={`toggle-all-modules-${userId}`}
      />
      <label 
        htmlFor={`toggle-all-modules-${userId}`}
        className="text-sm text-gray-700 cursor-pointer"
      >
        Liberar Todos os Módulos
      </label>
    </div>
  );
};

export default UserModuleAccess;
