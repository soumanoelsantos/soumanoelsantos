
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

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

export default UserRowEditActions;
