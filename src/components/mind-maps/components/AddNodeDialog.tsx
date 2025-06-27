
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MindMapNode } from '@/types/mindMap';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (label: string, connectToNodeId?: string) => void;
  availableNodes: MindMapNode[];
  selectedParentId?: string | null;
}

const AddNodeDialog = ({ 
  isOpen, 
  onClose, 
  onAddNode, 
  availableNodes, 
  selectedParentId 
}: AddNodeDialogProps) => {
  const [label, setLabel] = useState('');
  const [selectedParentNodeId, setSelectedParentNodeId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setLabel('');
      setSelectedParentNodeId(selectedParentId || undefined);
    }
  }, [isOpen, selectedParentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim()) {
      console.log('Submetendo novo nó:', { label: label.trim(), selectedParentNodeId });
      onAddNode(label.trim(), selectedParentNodeId);
      onClose();
    }
  };

  const handleClose = () => {
    setLabel('');
    setSelectedParentNodeId(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Nó</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Texto do Nó</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Digite o texto do nó..."
              autoFocus
            />
          </div>
          
          {availableNodes.length > 0 && (
            <div>
              <Label htmlFor="parent">Conectar a (opcional)</Label>
              <div className="space-y-2">
                <Select value={selectedParentNodeId || "none"} onValueChange={(value) => setSelectedParentNodeId(value === "none" ? undefined : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um nó pai..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum (nó independente)</SelectItem>
                    {availableNodes.map(node => (
                      <SelectItem key={node.id} value={node.id}>
                        {node.data.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!label.trim()}>
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNodeDialog;
