
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StatusColumn from "./StatusColumn";
import { LeadData } from "@/types/crm";

interface KanbanColumnsGridProps {
  statuses: string[];
  leads: LeadData[];
  onDragEnd: (result: any) => void;
  onEditLead: (lead: LeadData) => void;
  onDeleteLead: (id: string) => Promise<boolean>;
}

const KanbanColumnsGrid: React.FC<KanbanColumnsGridProps> = ({ 
  statuses, 
  leads, 
  onDragEnd,
  onEditLead, 
  onDeleteLead 
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-[calc(100vh-180px)]">
        {statuses.map(status => (
          <StatusColumn
            key={status}
            status={status}
            leads={leads}
            onEditLead={onEditLead}
            onDeleteLead={onDeleteLead}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanColumnsGrid;
