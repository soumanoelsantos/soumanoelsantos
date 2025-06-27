
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MindMapNode } from '@/types/mindMap';

interface EditNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodes: MindMapNode[];
  onUpdateLabel: (nodeId: string, label: string) => void;
}

const EditNodeDialog = ({ isOpen, onClose, nodeId, nodes, onUpdateLabel }: EditNodeDialogProps) => {
  const [editLabel, setEditLabel] = useState('');

  const currentNode = nodeId ? nodes.find(node => node.id === nodeId) : null;

  useEffect(() => {
    if (isOpen && currentNode) {
      setEditLabel(currentNode.data.label);
    }
  }, [isOpen, currentNode]);

  const handleSave = () => {
    if (editLabel.trim() && nodeId) {
      onUpdateLabel(nodeId, editLabel);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Nó</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            placeholder="Digite o novo texto..."
            onKeyPress={handleKeyPress}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!editLabel.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditNodeDialog;
