
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KanbanHeaderProps {
  onAddNew: () => void;
}

const KanbanHeader: React.FC<KanbanHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">CRM - Gestão de Leads</h1>
      
      <Button 
        onClick={onAddNew}
        className="bg-dark-primary hover:bg-dark-primary/90 text-black"
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Lead
      </Button>
    </div>
  );
};

export default KanbanHeader;
