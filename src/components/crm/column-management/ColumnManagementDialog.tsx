
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CrmColumn } from '@/hooks/crm/useCrmColumns';
import AddColumnForm from './AddColumnForm';
import ColumnsTable from './ColumnsTable';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localColumns, setLocalColumns] = useState<CrmColumn[]>(columns);
  
  // Update local columns when props change
  useEffect(() => {
    setLocalColumns([...columns].sort((a, b) => a.order - b.order));
  }, [columns]);
  
  const handleAddColumn = async (name: string) => {
    setIsSubmitting(true);
    try {
      return await onAddColumn(name);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditColumn = async (id: string, name: string) => {
    setIsSubmitting(true);
    try {
      return await onEditColumn(id, name);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteColumn = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta coluna? Os leads nesta coluna serão perdidos.')) {
      return false;
    }
    
    setIsSubmitting(true);
    try {
      return await onDeleteColumn(id);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReorderColumns = async (newColumns: CrmColumn[]) => {
    if (!onReorderColumns) return false;
    
    setIsSubmitting(true);
    try {
      return await onReorderColumns(newColumns);
    } finally {
      setIsSubmitting(false);
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
          <AddColumnForm 
            onAddColumn={handleAddColumn} 
            isSubmitting={isSubmitting} 
          />
          
          <ColumnsTable 
            columns={localColumns}
            onEditColumn={handleEditColumn}
            onDeleteColumn={handleDeleteColumn}
            onReorderColumns={handleReorderColumns}
            isSubmitting={isSubmitting}
          />
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
