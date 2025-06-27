
export interface MindMapAttachment {
  id: string;
  type: 'pdf' | 'image' | 'video';
  name: string;
  url: string;
  size?: number;
}

export interface MindMapNode {
  id: string;
  type: 'default' | 'input' | 'output';
  position: { x: number; y: number };
  data: { 
    label: string; 
    color?: string;
    notes?: string;
    attachments?: MindMapAttachment[]; // Nova propriedade para anexos
  };
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface MindMapContent {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

export interface MindMap {
  id: string;
  user_id: string;
  title: string;
  content: MindMapContent;
  share_token: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateMindMapData {
  title: string;
  content?: MindMapContent;
}

export interface UpdateMindMapData {
  title?: string;
  content?: MindMapContent;
  is_public?: boolean;
}
