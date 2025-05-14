
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, MoveVertical } from 'lucide-react';
import { CrmColumn } from '@/hooks/crm/useCrmColumns';
import { Draggable } from 'react-beautiful-dnd';

interface ColumnItemProps {
  column: CrmColumn;
  index: number;
  onEdit: (id: string, name: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  isSubmitting: boolean;
}

const ColumnItem: React.FC<ColumnItemProps> = ({
  column,
  index,
  onEdit,
  onDelete,
  isSubmitting
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(column.name);
  
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditingName(column.name);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleSaveEdit = async () => {
    if (!editingName.trim()) return;
    
    const success = await onEdit(column.id, editingName.trim());
    if (success) {
      setIsEditing(false);
    }
  };
  
  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided) => (
        <TableRow 
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="cursor-move"
        >
          <TableCell className="w-[40px] p-2">
            <div {...provided.dragHandleProps} className="flex justify-center">
              <MoveVertical size={16} className="text-gray-400" />
            </div>
          </TableCell>
          <TableCell>
            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                autoFocus
              />
            ) : (
              column.name
            )}
          </TableCell>
          <TableCell className="text-right">
            {isEditing ? (
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isSubmitting || !editingName.trim()}
                >
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleStartEdit}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDelete(column.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  );
};

export default ColumnItem;
