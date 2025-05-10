
import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import ActionButton from "@/components/ui/action-button";

interface PreviewActionsProps {
  onEditClick: () => void;
  onDownloadClick: () => void;
}

const PreviewActions = ({ onEditClick, onDownloadClick }: PreviewActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between mb-6">
      <ActionButton 
        onClick={onEditClick}
        variant="secondary"
        icon={ArrowLeft}
      >
        Editar Dados
      </ActionButton>
      
      <ActionButton 
        onClick={onDownloadClick}
        variant="primary"
        icon={Download}
      >
        Baixar Mapa em PDF
      </ActionButton>
    </div>
  );
};

export default PreviewActions;
