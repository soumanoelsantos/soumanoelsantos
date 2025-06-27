
import { Node, Edge } from '@xyflow/react';

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

export interface MindMapCanvasProps {
  initialContent: {
    nodes: Node<MindMapNodeData>[];
    edges: Edge[];
  };
  onSave: (content: { nodes: Node<MindMapNodeData>[]; edges: Edge[] }) => void;
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
