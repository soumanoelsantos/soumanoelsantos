
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: string) => void;
}

const AddNodeDialog = ({ isOpen, onClose, onAdd }: AddNodeDialogProps) => {
  const [newNodeLabel, setNewNodeLabel] = useState('');

  const handleAdd = () => {
    if (newNodeLabel.trim()) {
      onAdd(newNodeLabel);
      setNewNodeLabel('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Nó</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={newNodeLabel}
            onChange={(e) => setNewNodeLabel(e.target.value)}
            placeholder="Digite o texto do nó..."
            onKeyPress={handleKeyPress}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleAdd} disabled={!newNodeLabel.trim()}>
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNodeDialog;
