
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface ReconnectNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  onReconnect: (nodeId: string, newParentId: string | null) => void;
}

const ReconnectNodeDialog = ({ 
  isOpen, 
  onClose, 
  nodeId, 
  nodes, 
  edges, 
  onReconnect 
}: ReconnectNodeDialogProps) => {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  if (!nodeId) return null;

  const currentNode = nodes.find(n => n.id === nodeId);
  if (!currentNode) return null;

  // Encontrar o pai atual
  const currentParentEdge = edges.find(edge => edge.target === nodeId);
  const currentParentId = currentParentEdge?.source || null;

  // Nós disponíveis para conexão (excluindo o próprio nó e seus descendentes)
  const getAvailableParents = () => {
    const descendants = new Set<string>();
    
    // Função recursiva para encontrar todos os descendentes
    const findDescendants = (id: string) => {
      const children = edges.filter(edge => edge.source === id);
      children.forEach(edge => {
        if (!descendants.has(edge.target)) {
          descendants.add(edge.target);
          findDescendants(edge.target);
        }
      });
    };
    
    findDescendants(nodeId);
    
    return nodes.filter(node => 
      node.id !== nodeId && 
      !descendants.has(node.id)
    );
  };

  const availableParents = getAvailableParents();

  const handleReconnect = () => {
    onReconnect(nodeId, selectedParentId);
    onClose();
    setSelectedParentId(null);
  };

  const handleClose = () => {
    onClose();
    setSelectedParentId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reconectar Nó</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Reconectando: <strong>{currentNode.data.label}</strong>
            </p>
            {currentParentId && (
              <p className="text-xs text-gray-500">
                Atualmente conectado a: {nodes.find(n => n.id === currentParentId)?.data.label}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Novo pai (deixe vazio para nó raiz):</label>
            <Select value={selectedParentId || ''} onValueChange={(value) => setSelectedParentId(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um nó pai ou deixe vazio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum (nó raiz)</SelectItem>
                {availableParents.map(node => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleReconnect}>
              Reconectar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReconnectNodeDialog;
