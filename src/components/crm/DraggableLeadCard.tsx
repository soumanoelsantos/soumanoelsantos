
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
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 transition-all duration-200 ${
            snapshot.isDragging ? 'scale-105 rotate-1 z-10 shadow-lg opacity-90' : ''
          }`}
          data-lead-id={lead.id}
          data-lead-status={lead.status}
          style={{
            ...provided.draggableProps.style,
            // Add smooth transition for drag operations
            transition: snapshot.isDragging
              ? provided.draggableProps.style?.transition
              : 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <LeadCard lead={lead} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableLeadCard;
