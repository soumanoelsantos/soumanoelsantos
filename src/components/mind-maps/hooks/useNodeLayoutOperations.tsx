
import { useCallback } from 'react';
import { MindMapNode } from '@/types/mindMap';

interface UseNodeLayoutOperationsProps {
  nodes: MindMapNode[];
  selectedNode: string | null;
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
}

export const useNodeLayoutOperations = ({ 
  nodes, 
  selectedNode, 
  setNodes 
}: UseNodeLayoutOperationsProps) => {
  const alignNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        setNodes(prev => prev.map(node => ({
          ...node,
          position: {
            ...node.position,
            y: selected.position.y
          }
        })));
      }
    }
  }, [nodes, selectedNode, setNodes]);

  const alignNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        setNodes(prev => prev.map(node => ({
          ...node,
          position: {
            ...node.position,
            x: selected.position.x
          }
        })));
      }
    }
  }, [nodes, selectedNode, setNodes]);

  const distributeNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);
        const totalWidth = sortedNodes.reduce((acc, node) => acc + 100, 0);
        const startX = selected.position.x - totalWidth / 2;
        setNodes(prev => sortedNodes.map((node, index) => ({
          ...node,
          position: {
            ...node.position,
            x: startX + index * 100
          }
        })));
      }
    }
  }, [nodes, selectedNode, setNodes]);

  const distributeNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
        const totalHeight = sortedNodes.reduce((acc, node) => acc + 100, 0);
        const startY = selected.position.y - totalHeight / 2;
        setNodes(prev => sortedNodes.map((node, index) => ({
          ...node,
          position: {
            ...node.position,
            y: startY + index * 100
          }
        })));
      }
    }
  }, [nodes, selectedNode, setNodes]);

  const arrangeInGrid = useCallback(() => {
    const numNodes = nodes.length;
    const numCols = Math.ceil(Math.sqrt(numNodes));
    const numRows = Math.ceil(numNodes / numCols);

    setNodes(prev => prev.map((node, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      return {
        ...node,
        position: {
          x: 100 + col * 200,
          y: 100 + row * 200
        }
      };
    }));
  }, [nodes, setNodes]);

  return {
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid
  };
};
