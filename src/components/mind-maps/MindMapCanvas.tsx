
import React from 'react';
import { MindMapContent } from '@/types/mindMap';
import { MindMapNodeData } from './types/canvasTypes';
import MindMapCanvasMain from './components/MindMapCanvasMain';
import { Node } from '@xyflow/react';

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => void;
  isSaving?: boolean;
  mindMapId?: string;
}

const MindMapCanvas = ({ initialContent, onSave, isSaving, mindMapId }: MindMapCanvasProps) => {
  // Convert MindMapContent to our internal format
  const convertedContent = {
    nodes: initialContent.nodes.map(node => ({
      ...node,
      data: {
        label: node.data.label,
        color: node.data.color,
        notes: node.data.notes,
        attachments: node.data.attachments,
        // Add any required properties that might be missing
      } as MindMapNodeData
    })) as Node<MindMapNodeData>[],
    edges: initialContent.edges
  };

  const handleSave = (content: { nodes: Node<MindMapNodeData>[]; edges: any[] }) => {
    // Convert back to MindMapContent format
    const convertedBack: MindMapContent = {
      nodes: content.nodes.map(node => ({
        id: node.id,
        type: (node.type as 'default' | 'input' | 'output') || 'default',
        position: node.position,
        data: {
          label: node.data.label,
          color: node.data.color,
          notes: node.data.notes,
          attachments: node.data.attachments
        }
      })),
      edges: content.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    };
    
    onSave(convertedBack);
  };

  return (
    <MindMapCanvasMain
      initialContent={convertedContent}
      onSave={handleSave}
      isSaving={isSaving}
      mindMapId={mindMapId}
    />
  );
};

export default MindMapCanvas;
