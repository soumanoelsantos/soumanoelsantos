
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import AddNodeDialog from './AddNodeDialog';
import EditNodeDialog from './EditNodeDialog';
import ChangeNodeTypeDialog from './ChangeNodeTypeDialog';
import NodeNotesDialog from './NodeNotesDialog';

interface DialogManagerProps {
  isAddingNode: boolean;
  setIsAddingNode: (value: boolean) => void;
  editingNode: string | null;
  setEditingNode: (value: string | null) => void;
  changingNodeType: string | null;
  setChangingNodeType: (value: string | null) => void;
  editingNotes: string | null;
  setEditingNotes: (value: string | null) => void;
  visibleNodes: MindMapNode[];
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  onAddNode: (label: string, connectToNodeId?: string) => void;
  onUpdateNodeLabel: (nodeId: string, label: string) => void;
  onUpdateNodeNotes: (nodeId: string, notes: string) => void;
  getAvailableParents: (nodeId: string) => MindMapNode[];
  onChangeToMain: (nodeId: string) => void;
  onChangeToChild: (nodeId: string, parentId: string) => void;
  onChangeToGrandchild: (nodeId: string, parentId: string) => void;
  selectedParentForNewNode?: string | null;
}

const DialogManager = ({
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
}: DialogManagerProps) => {
  const getEditingNodeLabel = () => {
    if (!editingNode) return '';
    const node = nodes.find(n => n.id === editingNode);
    return node?.data.label || '';
  };

  const getChangingNode = () => {
    if (!changingNodeType) return null;
    return nodes.find(n => n.id === changingNodeType) || null;
  };

  const getNotesNode = () => {
    if (!editingNotes) return null;
    return nodes.find(n => n.id === editingNotes) || null;
  };

  const handleSaveEdit = (label: string) => {
    if (editingNode) {
      onUpdateNodeLabel(editingNode, label);
      setEditingNode(null);
    }
  };

  const handleSaveNotes = (notes: string) => {
    if (editingNotes) {
      onUpdateNodeNotes(editingNotes, notes);
      setEditingNotes(null);
    }
  };

  const notesNode = getNotesNode();

  return (
    <>
      <AddNodeDialog
        isOpen={isAddingNode}
        onClose={() => setIsAddingNode(false)}
        onAdd={onAddNode}
        nodes={visibleNodes}
        edges={edges}
        preSelectedParent={selectedParentForNewNode}
      />

      <EditNodeDialog
        isOpen={!!editingNode}
        currentLabel={getEditingNodeLabel()}
        onClose={() => setEditingNode(null)}
        onSave={handleSaveEdit}
      />

      <ChangeNodeTypeDialog 
        isOpen={!!changingNodeType}
        node={getChangingNode()}
        availableParents={changingNodeType ? getAvailableParents(changingNodeType) : []}
        onClose={() => setChangingNodeType(null)}
        onChangeToMain={onChangeToMain}
        onChangeToChild={onChangeToChild}
        onChangeToGrandchild={onChangeToGrandchild}
      />

      <NodeNotesDialog
        isOpen={!!editingNotes}
        nodeLabel={notesNode?.data.label || ''}
        currentNotes={notesNode?.data.notes || ''}
        onClose={() => setEditingNotes(null)}
        onSave={handleSaveNotes}
      />
    </>
  );
};

export default DialogManager;
