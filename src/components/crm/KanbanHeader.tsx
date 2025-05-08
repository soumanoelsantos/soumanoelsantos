
import React from "react";
import { Button } from "@/components/ui/button";
import { Columns, Plus } from "lucide-react";

interface KanbanHeaderProps {
  onAddNew: () => void;
  onManageColumns: () => void;
}

const KanbanHeader = ({ onAddNew, onManageColumns }: KanbanHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">CRM</h1>
        <p className="text-gray-600">Gerencie seus leads e oportunidades</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onManageColumns}>
          <Columns className="mr-2 h-4 w-4" />
          Gerenciar Colunas
        </Button>
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>
    </div>
  );
};

export default KanbanHeader;
