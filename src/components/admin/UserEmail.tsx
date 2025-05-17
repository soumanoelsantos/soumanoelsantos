
import React from "react";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";

interface UserEmailProps {
  email: string;
  isEditing: boolean;
  newEmail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserEmail: React.FC<UserEmailProps> = ({ email, isEditing, newEmail, onChange }) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <UserIcon className="h-4 w-4 text-dark-primary" />
        <Input 
          value={newEmail} 
          onChange={onChange}
          className="py-1 h-8" 
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <UserIcon className="h-4 w-4 text-dark-primary" />
      {email}
    </div>
  );
};

export default UserEmail;
