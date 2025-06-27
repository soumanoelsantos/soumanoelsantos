
import { useState, useCallback } from 'react';
import { MindMapEdge } from '@/types/mindMap';

interface UseNodeVisibilityProps {
  edges: MindMapEdge[];
}

export const useNodeVisibility = ({ edges }: UseNodeVisibilityProps) => {
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  const toggleNodeVisibility = useCallback((nodeId: string) => {
    setHiddenNodes(prevHiddenNodes => {
      const newHiddenNodes = new Set(prevHiddenNodes);
      if (newHiddenNodes.has(nodeId)) {
        newHiddenNodes.delete(nodeId);
        // Make children visible
        edges.forEach(edge => {
          if (edge.source === nodeId) {
            newHiddenNodes.delete(edge.target);
          }
        });
      } else {
        newHiddenNodes.add(nodeId);
        // Hide children
        edges.forEach(edge => {
          if (edge.source === nodeId) {
            newHiddenNodes.add(edge.target);
          }
        });
      }
      return newHiddenNodes;
    });
  }, [edges]);

  return {
    hiddenNodes,
    toggleNodeVisibility
  };
};
