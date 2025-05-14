
import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Save, X, GripVertical } from 'lucide-react';
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
  const [editValue, setEditValue] = useState(column.name);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleEditClick = () => {
    setEditValue(column.name);
    setIsEditing(true);
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditValue(column.name);
  };
  
  const handleSaveClick = async () => {
    if (editValue.trim() === '') return;
    
    setIsProcessing(true);
    const success = await onEdit(column.id, editValue.trim());
    setIsProcessing(false);
    
    if (success) {
      setIsEditing(false);
    }
  };
  
  const handleDeleteClick = async () => {
    if (confirm('Tem certeza que deseja excluir esta coluna?')) {
      setIsProcessing(true);
      await onDelete(column.id);
      setIsProcessing(false);
    }
  };
  
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <TableRow 
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${snapshot.isDragging ? 'bg-blue-100' : ''} transition-all duration-200`}
        >
          <TableCell>
            <div {...provided.dragHandleProps} className="cursor-grab">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          </TableCell>
          <TableCell>
            {isEditing ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full"
                placeholder="Nome da coluna"
                autoFocus
              />
            ) : (
              <span className="font-medium">{column.name}</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            {isEditing ? (
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelClick}
                  disabled={isProcessing || isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveClick}
                  disabled={!editValue.trim() || isProcessing || isSubmitting}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEditClick}
                  disabled={isProcessing || isSubmitting}
                  className="h-8 w-8"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteClick}
                  disabled={isProcessing || isSubmitting}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
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
