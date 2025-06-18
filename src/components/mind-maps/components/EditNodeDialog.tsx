
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditNodeDialogProps {
  isOpen: boolean;
  currentLabel: string;
  onClose: () => void;
  onSave: (label: string) => void;
}

const EditNodeDialog = ({ isOpen, currentLabel, onClose, onSave }: EditNodeDialogProps) => {
  const [editLabel, setEditLabel] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditLabel(currentLabel);
    }
  }, [isOpen, currentLabel]);

  const handleSave = () => {
    if (editLabel.trim()) {
      onSave(editLabel);
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
