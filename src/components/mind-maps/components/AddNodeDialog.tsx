
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: string, connectToNodeId?: string) => void;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

const AddNodeDialog = ({ isOpen, onClose, onAdd, nodes, edges }: AddNodeDialogProps) => {
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

  // Função para obter o nome do nó pai
  const getParentNodeName = (nodeId: string) => {
    const parentEdge = edges.find(edge => edge.target === nodeId);
    if (parentEdge) {
      const parentNode = nodes.find(node => node.id === parentEdge.source);
      return parentNode?.data.label || null;
    }
    return null;
  };

  // Função para contar quantos filhos um nó tem
  const getChildrenCount = (nodeId: string) => {
    return edges.filter(edge => edge.source === nodeId).length;
  };

  // Função para formatar o nome do nó com informação hierárquica
  const getNodeDisplayName = (node: MindMapNode) => {
    const parentName = getParentNodeName(node.id);
    const childrenCount = getChildrenCount(node.id);
    
    let displayName = node.data.label;
    
    if (parentName) {
      displayName = `${node.data.label} (filho de: ${parentName})`;
    }
    
    if (childrenCount > 0) {
      displayName += ` [${childrenCount} ${childrenCount === 1 ? 'filho' : 'filhos'}]`;
    }
    
    return displayName;
  };

  // Obter o nó selecionado para mostrar informações
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Nó</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Nome do novo nó:
            </label>
            <Input
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              placeholder="Digite o texto do nó..."
              onKeyPress={handleKeyPress}
            />
          </div>
          
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
                Selecione o nó pai:
              </label>
              <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um nó..." />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map(node => (
                    <SelectItem key={node.id} value={node.id}>
                      {getNodeDisplayName(node)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedNode && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800">
                      <strong>Nó pai selecionado:</strong> {selectedNode.data.label}
                    </p>
                    {getParentNodeName(selectedNode.id) && (
                      <p className="text-xs text-blue-600">
                        <strong>Avô:</strong> {getParentNodeName(selectedNode.id)}
                      </p>
                    )}
                    <div className="border-t border-blue-200 pt-2">
                      <p className="text-xs text-blue-700">
                        <strong>Novo nó:</strong> "{newNodeLabel || '[digite o nome]'}" será filho de "{selectedNode.data.label}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
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
