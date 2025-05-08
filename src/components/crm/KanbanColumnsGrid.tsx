
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
  // Debugging to check props
  console.log("KanbanColumnsGrid render:", { columnsCount: columns.length, leadsCount: leads.length });
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-[calc(100vh-180px)]">
        {columns.sort((a, b) => a.order - b.order).map(column => (
          <StatusColumn
            key={column.id}
            columnId={column.id}
            columnName={column.name}
            leads={leads.filter(lead => lead.status === column.name)}
            onEditLead={onEditLead}
            onDeleteLead={onDeleteLead}
          />
        ))}
        {columns.length === 0 && (
          <div className="col-span-full flex items-center justify-center h-40 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">Nenhuma coluna definida. Adicione colunas para começar.</p>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default KanbanColumnsGrid;
