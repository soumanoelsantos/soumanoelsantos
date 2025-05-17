
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, LogIn, Trash2 } from "lucide-react";
import { UserDeleteDialog } from "./UserDeleteDialog";

interface UserRowActionsProps {
  userId: string;
  userEmail: string;
  onEdit: () => void;
  onDelete: (userId: string) => Promise<boolean>;
  onView: (userId: string) => Promise<boolean>;
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

export default UserRowActions;
