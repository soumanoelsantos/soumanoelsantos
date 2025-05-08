
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { LeadData } from "@/types/crm";
import DraggableLeadCard from "./DraggableLeadCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatusColumnProps {
  columnId: string;
  columnName: string;
  leads: LeadData[];
  onEditLead: (lead: LeadData) => void;
  onDeleteLead: (id: string) => void;
}

const StatusColumn = ({ columnId, columnName, leads, onEditLead, onDeleteLead }: StatusColumnProps) => {
  // Add debug logging
  console.log(`StatusColumn "${columnName}" render:`, { leadsCount: leads.length });
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col h-full">
      <h2 className="font-semibold text-lg mb-3 text-gray-700 flex justify-between items-center">
        {columnName}
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
          {leads.length}
        </span>
      </h2>
      
      <Droppable droppableId={columnName}>
        {(provided) => (
          <ScrollArea className="flex-grow overflow-y-auto h-[calc(100vh-220px)]">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-h-[100px] pb-4"
              data-column-id={columnName} // Add data attribute for debugging
            >
              {leads.map((lead, index) => (
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
          </ScrollArea>
        )}
      </Droppable>
    </div>
  );
};

export default StatusColumn;
