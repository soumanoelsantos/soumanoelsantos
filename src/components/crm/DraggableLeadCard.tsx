
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import LeadCard from "./LeadCard";
import { LeadData } from "@/types/crm";

interface DraggableLeadCardProps {
  lead: LeadData;
  index: number;
  onEdit: (lead: LeadData) => void;
  onDelete: (id: string) => void;
}

const DraggableLeadCard = ({ lead, index, onEdit, onDelete }: DraggableLeadCardProps) => {
  return (
    <Draggable key={lead.id} draggableId={lead.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <LeadCard lead={lead} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableLeadCard;
