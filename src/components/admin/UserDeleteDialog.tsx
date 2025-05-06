
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

interface UserDeleteDialogProps {
  userId: string;
  userEmail: string;
  onDelete: (userId: string) => void;
}

export const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ userId, userEmail, onDelete }) => {
  return (
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
            Tem certeza que deseja excluir o usuário {userEmail}? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-100">Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onDelete(userId)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
