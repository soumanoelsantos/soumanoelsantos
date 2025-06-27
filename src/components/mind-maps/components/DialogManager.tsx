
import React from 'react';
import AddNodeDialog from './AddNodeDialog';
import EditNodeDialog from './EditNodeDialog';
import ChangeNodeTypeDialog from './ChangeNodeTypeDialog';
import NodeNotesDialog from './NodeNotesDialog';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

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
  onUpdateNodeColor?: (nodeId: string, color: string) => void;
  onUpdateNodeNotes: (nodeId: string, notes: string) => void;
  getAvailableParents: (nodeId: string) => MindMapNode[];
  onChangeToMain: (nodeId: string) => void;
  onChangeToChild: (nodeId: string, parentId: string) => void;
  onChangeToGrandchild: (nodeId: string, grandparentId: string) => void;
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
  onUpdateNodeColor,
  onUpdateNodeNotes,
  getAvailableParents,
  onChangeToMain,
  onChangeToChild,
  onChangeToGrandchild,
  selectedParentForNewNode
}: DialogManagerProps) => {
  return (
    <>
      <AddNodeDialog
        isOpen={isAddingNode}
        onClose={() => setIsAddingNode(false)}
        onAddNode={onAddNode}
        availableNodes={visibleNodes}
        selectedParentId={selectedParentForNewNode}
      />

      <EditNodeDialog
        isOpen={!!editingNode}
        onClose={() => setEditingNode(null)}
        nodeId={editingNode}
        nodes={nodes}
        onUpdateLabel={onUpdateNodeLabel}
        onUpdateColor={onUpdateNodeColor}
      />

      <ChangeNodeTypeDialog
        isOpen={!!changingNodeType}
        onClose={() => setChangingNodeType(null)}
        nodeId={changingNodeType}
        nodes={nodes}
        edges={edges}
        getAvailableParents={getAvailableParents}
        onChangeToMain={onChangeToMain}
        onChangeToChild={onChangeToChild}
        onChangeToGrandchild={onChangeToGrandchild}
      />

      <NodeNotesDialog
        isOpen={!!editingNotes}
        onClose={() => setEditingNotes(null)}
        nodeId={editingNotes}
        nodes={nodes}
        onUpdateNotes={onUpdateNodeNotes}
      />
    </>
  );
};

export default DialogManager;
