
import { Node, Edge, NodeProps } from '@xyflow/react';

export interface MindMapNodeData extends Record<string, unknown> {
  label: string;
  color?: string;
  notes?: string;
  attachments?: any[];
  mindMapId?: string;
  onEdit?: (nodeId: string) => void;
  onDelete?: (nodeId: string) => void;
  onAddChild?: (nodeId: string) => void;
  onToggleVisibility?: (nodeId: string) => void;
  onReconnect?: (nodeId: string) => void;
  onChangeColor?: (nodeId: string, color: string) => void;
  hasChildren?: boolean;
  childrenVisible?: boolean;
}

// Use ReactFlow's Node type with our custom data
export type MindMapNode = Node<MindMapNodeData>;
export type MindMapEdge = Edge;

export interface MindMapCanvasProps {
  initialContent: {
    nodes: MindMapNode[];
    edges: MindMapEdge[];
  };
  onSave: (content: { nodes: MindMapNode[]; edges: MindMapEdge[] }) => void;
  isSaving?: boolean;
  mindMapId?: string;
}

export interface MindMapDialogState {
  isAddingNode: boolean;
  editingNode: string | null;
  showReconnectDialog: boolean;
  reconnectingNode: any;
  availableParents: any[];
}
