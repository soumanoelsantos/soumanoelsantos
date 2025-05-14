
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
          className={`transition-transform duration-200 ${snapshot.isDragging ? 'scale-105 rotate-1 z-10 shadow-lg' : ''}`}
          style={{
            ...provided.draggableProps.style,
            // Add transition for smooth return to position when dropped
            transition: snapshot.isDragging
              ? provided.draggableProps.style?.transition
              : 'all 0.3s ease'
          }}
        >
          <LeadCard lead={lead} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableLeadCard;
