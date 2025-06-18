
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MindMapNode } from '@/types/mindMap';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: string, connectToNodeId?: string) => void;
  nodes: MindMapNode[];
}

const AddNodeDialog = ({ isOpen, onClose, onAdd, nodes }: AddNodeDialogProps) => {
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [shouldConnect, setShouldConnect] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const handleAdd = () => {
    if (newNodeLabel.trim()) {
      const connectTo = shouldConnect ? selectedNodeId : undefined;
      onAdd(newNodeLabel, connectTo);
      setNewNodeLabel('');
      setShouldConnect(true);
      setSelectedNodeId('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  React.useEffect(() => {
    if (isOpen && nodes.length > 0) {
      // Auto-select the center node by default
      const centerNode = nodes.find(node => node.id === 'center');
      if (centerNode) {
        setSelectedNodeId(centerNode.id);
      } else {
        setSelectedNodeId(nodes[0]?.id || '');
      }
    }
  }, [isOpen, nodes]);

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
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="connect-node"
              checked={shouldConnect}
              onCheckedChange={(checked) => setShouldConnect(checked as boolean)}
            />
            <label htmlFor="connect-node" className="text-sm font-medium">
              Conectar a outro nó
            </label>
          </div>

          {shouldConnect && nodes.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Conectar ao nó:
              </label>
              <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um nó..." />
                </SelectTrigger>
                <SelectContent>
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
