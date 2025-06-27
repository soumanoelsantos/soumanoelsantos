import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea"
import {
  MindMapNode,
  MindMapEdge
} from '@/types/mindMap';
import NodeColorPicker from './NodeColorPicker';
import ReconnectNodeDialog from './ReconnectNodeDialog';

interface DialogManagerProps {
  isAddingNode: boolean;
  setIsAddingNode: (open: boolean) => void;
  editingNode: string | null;
  setEditingNode: (nodeId: string | null) => void;
  changingNodeType: string | null;
  setChangingNodeType: (nodeId: string | null) => void;
  editingNotes: string | null;
  setEditingNotes: (nodeId: string | null) => void;
  visibleNodes: MindMapNode[];
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  onAddNode: (label: string, connectToNodeId?: string) => void;
  onUpdateNodeLabel: (nodeId: string, label: string) => void;
  onUpdateNodeNotes: (nodeId: string, notes: string) => void;
  getAvailableParents: (nodeId: string) => MindMapNode[];
  onChangeToMain: (nodeId: string) => void;
  onChangeToChild: (nodeId: string, parentId: string) => void;
  onChangeToGrandchild: (nodeId: string, grandparentId: string) => void;
  selectedParentForNewNode: string | null;
}

const DialogManager: React.FC<DialogManagerProps> = ({
  isAddingNode,
  setIsAddingNode,
  editingNode,
  setEditingNode,
  changingNodeType,
  setChangingNodeType,
  editingNotes,
  setEditingNotes,
  visibleNodes,
  nodes,
  edges,
  onAddNode,
  onUpdateNodeLabel,
  onUpdateNodeNotes,
  getAvailableParents,
  onChangeToMain,
  onChangeToChild,
  onChangeToGrandchild,
  selectedParentForNewNode
}) => {
  const [nodeLabel, setNodeLabel] = React.useState('');
  const [nodeNotes, setNodeNotes] = React.useState('');
  const [selectedParent, setSelectedParent] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>('#ffffff');

  React.useEffect(() => {
    if (editingNode) {
      const node = nodes.find(n => n.id === editingNode);
      setNodeLabel(node?.data.label || '');
      setSelectedColor(node?.data.color || '#ffffff');
    } else {
      setNodeLabel('');
      setSelectedColor('#ffffff');
    }
  }, [editingNode, nodes]);

  React.useEffect(() => {
    if (editingNotes) {
      const node = nodes.find(n => n.id === editingNotes);
      setNodeNotes(node?.data.notes || '');
    } else {
      setNodeNotes('');
    }
  }, [editingNotes, nodes]);

  const handleAddNode = () => {
    if (nodeLabel.trim() !== '') {
      onAddNode(nodeLabel, selectedParentForNewNode);
      setIsAddingNode(false);
      setNodeLabel('');
    }
  };

  const handleUpdateNodeLabel = () => {
    if (editingNode && nodeLabel.trim() !== '') {
      onUpdateNodeLabel(editingNode, nodeLabel);
      setEditingNode(null);
      setNodeLabel('');
    }
  };

  const handleUpdateNodeNotes = () => {
    if (editingNotes !== null) {
      onUpdateNodeNotes(editingNotes, nodeNotes);
      setEditingNotes(null);
      setNodeNotes('');
    }
  };

  const handleChangeToMain = () => {
    if (changingNodeType) {
      onChangeToMain(changingNodeType);
      setChangingNodeType(null);
    }
  };

  const handleChangeToChild = (parentId: string) => {
    if (changingNodeType) {
      onChangeToChild(changingNodeType, parentId);
      setChangingNodeType(null);
    }
  };

  const handleChangeToGrandchild = (grandparentId: string) => {
    if (changingNodeType) {
      onChangeToGrandchild(changingNodeType, grandparentId);
      setChangingNodeType(null);
    }
  };

  return (
    <>
      {/* Add Node Dialog */}
      <Dialog open={isAddingNode} onOpenChange={setIsAddingNode}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nó</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Conectar a
              </Label>
              <Select onValueChange={setSelectedParent} defaultValue={selectedParentForNewNode || ''} >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {visibleNodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>{node.data.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setIsAddingNode(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddNode}>Adicionar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Node Dialog */}
      <Dialog open={!!editingNode} onOpenChange={() => setEditingNode(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Nó</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" value={nodeLabel} onChange={(e) => setNodeLabel(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Cor
              </Label>
              <NodeColorPicker color={selectedColor} onChange={setSelectedColor} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setEditingNode(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateNodeLabel}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Node Type Dialog */}
      <Dialog open={!!changingNodeType} onOpenChange={() => setChangingNodeType(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Tipo de Nó</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Selecione o novo tipo de nó:</p>
            <Button onClick={handleChangeToMain}>Tornar Nó Principal</Button>
            <Select onValueChange={(parentId) => handleChangeToChild(parentId)} >
              <SelectTrigger>
                <SelectValue placeholder="Tornar Filho de..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableParents(changingNodeType || '').map((node) => (
                  <SelectItem key={node.id} value={node.id}>{node.data.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(grandparentId) => handleChangeToGrandchild(grandparentId)} >
              <SelectTrigger>
                <SelectValue placeholder="Tornar Neto de..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableParents(changingNodeType || '').map((node) => (
                  <SelectItem key={node.id} value={node.id}>{node.data.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setChangingNodeType(null)}>
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Notes Dialog */}
      <Dialog open={!!editingNotes} onOpenChange={() => setEditingNotes(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Notas</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Textarea id="notes" value={nodeNotes} onChange={(e) => setNodeNotes(e.target.value)} className="col-span-4" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setEditingNotes(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateNodeNotes}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogManager;
