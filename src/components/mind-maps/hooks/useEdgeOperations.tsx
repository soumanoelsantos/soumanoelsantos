
import { useCallback } from 'react';
import { MindMapEdge } from '@/types/mindMap';

interface UseEdgeOperationsProps {
  edges: MindMapEdge[];
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
}

export const useEdgeOperations = ({ edges, setEdges }: UseEdgeOperationsProps) => {
  const addEdge = useCallback((sourceId: string, targetId: string) => {
    const newEdge: MindMapEdge = {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId
    };
    setEdges(prevEdges => [...prevEdges, newEdge]);
  }, [setEdges]);

  const removeEdgesForNode = useCallback((nodeId: string) => {
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setEdges]);

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prevEdges => prevEdges.filter(edge => edge.target !== nodeId));
  }, [setEdges]);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prevEdges => {
      const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
      const newEdge: MindMapEdge = {
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId
      };
      return [...filteredEdges, newEdge];
    });
  }, [setEdges]);

  const changeNodeToGrandchild = useCallback((nodeId: string, grandparentId: string) => {
    setEdges(prevEdges => {
      const parentEdge = prevEdges.find(edge => edge.target === nodeId);
      
      if (parentEdge) {
        const parentId = parentEdge.source;
        const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
        const filteredEdges2 = filteredEdges.filter(edge => edge.source !== parentId || edge.target !== nodeId);
        
        const newEdgeToParent: MindMapEdge = {
          id: `${grandparentId}-${parentId}`,
          source: grandparentId,
          target: parentId
        };
        
        const newEdgeToNode: MindMapEdge = {
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId
        };
        
        return [...filteredEdges2, newEdgeToParent, newEdgeToNode];
      }
      
      return prevEdges;
    });
  }, [setEdges]);

  return {
    addEdge,
    removeEdgesForNode,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild
  };
};
