
import { useEffect, useRef } from 'react';
import { MindMapNode, MindMapEdge } from '../types/canvasTypes';

export interface UseAutoSaveProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  onSave: (content: { nodes: MindMapNode[]; edges: MindMapEdge[] }) => void;
  delay?: number;
}

export const useAutoSave = ({ nodes, edges, onSave, delay = 2000 }: UseAutoSaveProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    const currentState = JSON.stringify({ nodes, edges });
    
    if (currentState !== lastSavedRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onSave({ nodes, edges });
        lastSavedRef.current = currentState;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [nodes, edges, onSave, delay]);
};
