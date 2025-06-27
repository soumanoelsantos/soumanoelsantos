
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { MindMapNode } from '@/types/mindMap';

interface NodeNotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodes: MindMapNode[];
  onUpdateNotes: (nodeId: string, notes: string) => void;
}

const NodeNotesDialog = ({
  isOpen,
  onClose,
  nodeId,
  nodes,
  onUpdateNotes
}: NodeNotesDialogProps) => {
  const [notes, setNotes] = useState('');

  const node = nodeId ? nodes.find(n => n.id === nodeId) : null;
  const currentNotes = node?.data.notes || '';
  const nodeLabel = node?.data.label || '';

  useEffect(() => {
    setNotes(currentNotes);
  }, [currentNotes]);

  const handleSave = () => {
    if (nodeId) {
      onUpdateNotes(nodeId, notes);
      onClose();
    }
  };

  const handleCancel = () => {
    setNotes(currentNotes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Notas - {nodeLabel}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Digite suas anotações sobre este nó..."
            className="min-h-[300px] resize-none"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Salvar Notas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeNotesDialog;
