
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface ChangeNodeTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  getAvailableParents: (nodeId: string) => MindMapNode[];
  onChangeToMain: (nodeId: string) => void;
  onChangeToChild: (nodeId: string, parentId: string) => void;
  onChangeToGrandchild: (nodeId: string, grandparentId: string) => void;
}

const ChangeNodeTypeDialog = ({
  isOpen,
  onClose,
  nodeId,
  nodes,
  edges,
  getAvailableParents,
  onChangeToMain,
  onChangeToChild,
  onChangeToGrandchild
}: ChangeNodeTypeDialogProps) => {
  const [selectedType, setSelectedType] = useState<'main' | 'child' | 'grandchild'>('main');
  const [selectedParent, setSelectedParent] = useState<string>('');

  const node = nodeId ? nodes.find(n => n.id === nodeId) : null;
  const availableParents = nodeId ? getAvailableParents(nodeId) : [];

  const handleSave = () => {
    if (!nodeId) return;

    switch (selectedType) {
      case 'main':
        onChangeToMain(nodeId);
        break;
      case 'child':
        if (selectedParent) {
          onChangeToChild(nodeId, selectedParent);
        }
        break;
      case 'grandchild':
        if (selectedParent) {
          onChangeToGrandchild(nodeId, selectedParent);
        }
        break;
    }
    
    onClose();
    setSelectedParent('');
  };

  const needsParent = selectedType === 'child' || selectedType === 'grandchild';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Tipo do Nó</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Nó: {node?.data.label}
            </label>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Novo Tipo
            </label>
            <Select value={selectedType} onValueChange={(value: 'main' | 'child' | 'grandchild') => setSelectedType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Nó Principal</SelectItem>
                <SelectItem value="child">Nó Filho</SelectItem>
                <SelectItem value="grandchild">Nó Neto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {needsParent && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Conectar ao Nó
              </label>
              <Select value={selectedParent} onValueChange={setSelectedParent}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nó pai" />
                </SelectTrigger>
                <SelectContent>
                  {availableParents.map(parent => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.data.label}
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
            <Button 
              onClick={handleSave} 
              disabled={needsParent && !selectedParent}
            >
              Alterar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeNodeTypeDialog;
