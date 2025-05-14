
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CrmColumn } from '@/hooks/crm/useCrmColumns';
import ColumnItem from './ColumnItem';

interface ColumnsTableProps {
  columns: CrmColumn[];
  onEditColumn: (id: string, name: string) => Promise<boolean>;
  onDeleteColumn: (id: string) => Promise<boolean>;
  onReorderColumns: (columns: CrmColumn[]) => Promise<boolean>;
  isSubmitting: boolean;
}

const ColumnsTable: React.FC<ColumnsTableProps> = ({
  columns,
  onEditColumn,
  onDeleteColumn,
  onReorderColumns,
  isSubmitting
}) => {
  const handleDragEnd = async (result: any) => {
    // Dropped outside valid area
    if (!result.destination) {
      return;
    }
    
    // Create a new array of columns
    const reorderedColumns = Array.from(columns);
    
    // Remove the dragged item from the array
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    
    // Insert the item at the new position
    reorderedColumns.splice(result.destination.index, 0, movedColumn);
    
    // Save the changes with optimistic UI update
    await onReorderColumns(reorderedColumns);
  };

  return (
    <div>
      <h3 className="mb-2 font-medium">Colunas existentes</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns-list">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`rounded-md border ${snapshot.isDraggingOver ? 'bg-blue-50' : ''} transition-colors duration-200`}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-[150px] text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columns.map((column, index) => (
                    <ColumnItem 
                      key={column.id}
                      column={column} 
                      index={index}
                      onEdit={onEditColumn}
                      onDelete={onDeleteColumn}
                      isSubmitting={isSubmitting}
                    />
                  ))}
                  {columns.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                        Nenhuma coluna definida
                      </TableCell>
                    </TableRow>
                  )}
                  {provided.placeholder}
                </TableBody>
              </Table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ColumnsTable;
