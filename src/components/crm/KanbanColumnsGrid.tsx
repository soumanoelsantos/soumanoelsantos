
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StatusColumn from "./StatusColumn";
import { LeadData } from "@/types/crm";
import { CrmColumn } from "@/hooks/crm/useCrmColumns";

interface KanbanColumnsGridProps {
  columns: CrmColumn[];
  leads: LeadData[];
  onDragEnd: (result: any) => void;
  onEditLead: (lead: LeadData) => void;
  onDeleteLead: (id: string) => Promise<boolean>;
}

const KanbanColumnsGrid: React.FC<KanbanColumnsGridProps> = ({ 
  columns, 
  leads, 
  onDragEnd,
  onEditLead, 
  onDeleteLead 
}) => {
  // Enhanced drag end handler with additional logging and error handling
  const handleDragEnd = (result: any) => {
    console.log("Drag end event detected:", {
      draggableId: result.draggableId,
      source: result.source,
      destination: result.destination,
      type: result.type,
      timestamp: new Date().toISOString()
    });
    
    // Call the parent component's onDragEnd handler with proper error handling
    try {
      onDragEnd(result);
    } catch (error) {
      console.error("Error in KanbanColumnsGrid handleDragEnd:", error);
    }
  };
  
  // Sort columns by their order property
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-[calc(100vh-180px)] overflow-x-auto">
        <div className="h-full">
          <div className="flex space-x-4 pb-4 min-w-max">
            {sortedColumns.map(column => {
              // Get leads for this column
              const columnLeads = leads.filter(lead => lead.status === column.name);
              
              return (
                <div key={column.id} className="w-80 flex-shrink-0">
                  <StatusColumn
                    columnId={column.id}
                    columnName={column.name}
                    leads={columnLeads}
                    onEditLead={onEditLead}
                    onDeleteLead={onDeleteLead}
                  />
                </div>
              );
            })}
            {columns.length === 0 && (
              <div className="w-full flex items-center justify-center h-40 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Nenhuma coluna definida. Adicione colunas para começar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanColumnsGrid;
