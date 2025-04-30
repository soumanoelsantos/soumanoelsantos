
import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import ActionButton from "../ui/action-button";

interface PUVActionsProps {
  onEditClick: () => void;
  onDownloadClick: () => void;
}

const PUVActions = ({ onEditClick, onDownloadClick }: PUVActionsProps) => {
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
        Baixar PUV em PDF
      </ActionButton>
    </div>
  );
};

export default PUVActions;
