
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { LeadData } from "@/types/crm";
import DraggableLeadCard from "./DraggableLeadCard";

interface StatusColumnProps {
  status: string;
  leads: LeadData[];
  onEditLead: (lead: LeadData) => void;
  onDeleteLead: (id: string) => void;
}

const StatusColumn = ({ status, leads, onEditLead, onDeleteLead }: StatusColumnProps) => {
  const filteredLeads = leads.filter(lead => lead.status === status);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="font-semibold text-lg mb-3 text-gray-700 flex justify-between items-center">
        {status}
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
          {filteredLeads.length}
        </span>
      </h2>
      
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[calc(100vh-260px)]"
          >
            {filteredLeads.map((lead, index) => (
              <DraggableLeadCard 
                key={lead.id} 
                lead={lead} 
                index={index}
                onEdit={onEditLead} 
                onDelete={onDeleteLead} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StatusColumn;
