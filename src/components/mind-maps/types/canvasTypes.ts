
import { Node, Edge } from '@xyflow/react';

export interface MindMapCanvasProps {
  initialContent: {
    nodes: Node[];
    edges: Edge[];
  };
  onSave: (content: { nodes: Node[]; edges: Edge[] }) => void;
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
