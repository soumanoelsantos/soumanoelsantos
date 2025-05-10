
import React from "react";
import ActionButton from "@/components/ui/action-button";
import { Eye } from "lucide-react";

interface FormActionsProps {
  onPreviewClick: () => void;
}

const FormActions = ({ onPreviewClick }: FormActionsProps) => {
  return (
    <div className="flex justify-center mt-6">
      <ActionButton 
        onClick={onPreviewClick}
        variant="secondary"
        icon={Eye}
      >
        Visualizar Mapa do Negócio
      </ActionButton>
    </div>
  );
};

export default FormActions;
