
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, MoveVertical } from 'lucide-react';
import { CrmColumn } from '@/hooks/crm/useCrmColumns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ColumnManagementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columns: CrmColumn[];
  onAddColumn: (name: string) => Promise<boolean>;
  onEditColumn: (id: string, name: string) => Promise<boolean>;
  onDeleteColumn: (id: string) => Promise<boolean>;
  onReorderColumns?: (columns: CrmColumn[]) => Promise<boolean>;
}

const ColumnManagementDialog: React.FC<ColumnManagementDialogProps> = ({
  isOpen,
  onOpenChange,
  columns,
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
  onReorderColumns
}) => {
  const [newColumnName, setNewColumnName] = useState('');
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localColumns, setLocalColumns] = useState<CrmColumn[]>(columns);
  
  // Update local columns when props change
  React.useEffect(() => {
    setLocalColumns([...columns].sort((a, b) => a.order - b.order));
  }, [columns]);
  
  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAddColumn(newColumnName.trim());
      setNewColumnName('');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleStartEdit = (column: CrmColumn) => {
    setEditingColumn(column.id);
    setEditingName(column.name);
  };
  
  const handleCancelEdit = () => {
    setEditingColumn(null);
    setEditingName('');
  };
  
  const handleSaveEdit = async (id: string) => {
    if (!editingName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const success = await onEditColumn(id, editingName.trim());
      if (success) {
        setEditingColumn(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteColumn = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta coluna? Os leads nesta coluna serão perdidos.')) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onDeleteColumn(id);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDragEnd = async (result: any) => {
    // Dropped outside valid area
    if (!result.destination) {
      return;
    }
    
    // Create a new array of columns
    const reorderedColumns = Array.from(localColumns);
    
    // Remove the dragged item from the array
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    
    // Insert the item at the new position
    reorderedColumns.splice(result.destination.index, 0, movedColumn);
    
    // Update the local state
    setLocalColumns(reorderedColumns);
    
    // Save the changes if onReorderColumns is provided
    if (onReorderColumns) {
      setIsSubmitting(true);
      try {
        await onReorderColumns(reorderedColumns);
      } catch (error) {
        console.error('Error reordering columns:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gerenciar Colunas</DialogTitle>
          <DialogDescription>
            Adicione, edite ou remova colunas do seu quadro Kanban. Arraste para reorganizar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <form onSubmit={handleAddColumn} className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="new-column">Nova Coluna</Label>
              <Input
                id="new-column"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Nome da coluna"
              />
            </div>
            <Button type="submit" disabled={isSubmitting || !newColumnName.trim()}>
              Adicionar
            </Button>
          </form>
          
          <div>
            <h3 className="mb-2 font-medium">Colunas existentes</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="columns-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-md border"
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
                        {localColumns.map((column, index) => (
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
                                  {editingColumn === column.id ? (
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
                                  {editingColumn === column.id ? (
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleSaveEdit(column.id)}
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
                                        onClick={() => handleStartEdit(column)}
                                      >
                                        <Edit size={16} />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDeleteColumn(column.id)}
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                        {localColumns.length === 0 && (
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
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnManagementDialog;
