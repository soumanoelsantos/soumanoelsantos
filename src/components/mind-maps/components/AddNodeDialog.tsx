import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: string, connectToNodeId?: string) => void;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  preSelectedParent?: string | null;
}

const AddNodeDialog = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  nodes, 
  edges, 
  preSelectedParent 
}: AddNodeDialogProps) => {
  const [label, setLabel] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setLabel('');
      setSelectedParentId(preSelectedParent || '');
    }
  }, [isOpen, preSelectedParent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim()) {
      onAdd(label.trim(), selectedParentId || undefined);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          
          {nodes.length > 0 && (
            <div>
              <Label htmlFor="parent">Conectar a (opcional)</Label>
              <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um nó pai..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum (nó independente)</SelectItem>
                  {nodes.map(node => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.data.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
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
