
import React from 'react';
import { MindMapNode } from '@/types/mindMap';
import AddNodeDialog from './AddNodeDialog';
import EditNodeDialog from './EditNodeDialog';
import ChangeNodeTypeDialog from './ChangeNodeTypeDialog';

interface DialogManagerProps {
  isAddingNode: boolean;
  setIsAddingNode: (value: boolean) => void;
  editingNode: string | null;
  setEditingNode: (value: string | null) => void;
  changingNodeType: string | null;
  setChangingNodeType: (value: string | null) => void;
  visibleNodes: MindMapNode[];
  nodes: MindMapNode[];
  onAddNode: (label: string, connectToNodeId?: string) => void;
  onUpdateNodeLabel: (nodeId: string, label: string) => void;
  getAvailableParents: (nodeId: string) => MindMapNode[];
  onChangeToMain: (nodeId: string) => void;
  onChangeToChild: (nodeId: string, parentId: string) => void;
  onChangeToGrandchild: (nodeId: string, parentId: string) => void;
}

const DialogManager = ({
  isAddingNode,
  setIsAddingNode,
  editingNode,
  setEditingNode,
  changingNodeType,
  setChangingNodeType,
  visibleNodes,
  nodes,
  onAddNode,
  onUpdateNodeLabel,
  getAvailableParents,
  onChangeToMain,
  onChangeToChild,
  onChangeToGrandchild
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

  const handleSaveEdit = (label: string) => {
    if (editingNode) {
      onUpdateNodeLabel(editingNode, label);
      setEditingNode(null);
    }
  };

  return (
    <>
      <AddNodeDialog
        isOpen={isAddingNode}
        onClose={() => setIsAddingNode(false)}
        onAdd={onAddNode}
        nodes={visibleNodes}
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
    </>
  );
};

export default DialogManager;
