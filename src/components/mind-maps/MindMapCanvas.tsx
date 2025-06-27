
import React from 'react';
import { MindMapContent } from '@/types/mindMap';
import MindMapCanvasMain from './components/MindMapCanvasMain';

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => void;
  isSaving?: boolean;
  mindMapId?: string;
}

const MindMapCanvas = (props: MindMapCanvasProps) => {
  return <MindMapCanvasMain {...props} />;
};

export default MindMapCanvas;
