
import { useCallback } from 'react';
import { MindMapNode, MindMapEdge, MindMapAttachment } from '@/types/mindMap';

interface UseBasicNodeOperationsProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
}

export const useBasicNodeOperations = ({ 
  nodes, 
  edges, 
  setNodes, 
  setEdges 
}: UseBasicNodeOperationsProps) => {
  const addNode = useCallback((label: string, connectToNodeId?: string) => {
    const newNodeId = Date.now().toString();
    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position: {
        x: 200 + Math.random() * 200,
        y: 200 + Math.random() * 200
      },
      data: {
        label: label
      }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);

    // If connectToNodeId is provided, create an edge
    if (connectToNodeId) {
      setEdges(prevEdges => [...prevEdges, {
        id: `${connectToNodeId}-${newNodeId}`,
        source: connectToNodeId,
        target: newNodeId
      }]);
    }

    return newNodeId;
  }, [setNodes, setEdges]);

  const addNodeAtPosition = useCallback((label: string, position: { x: number; y: number }) => {
    const newNodeId = Date.now().toString();
    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position,
      data: {
        label: label
      }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    return newNodeId;
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, [setNodes]);

  const updateNodePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prevNodes =>
      prevNodes.map(node => (node.id === id ? { ...node, position } : node))
    );
  }, [setNodes]);

  const updateNodeNotes = useCallback((id: string, notes: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, notes } } : node
      )
    );
  }, [setNodes]);

  const updateNodeAttachments = useCallback((nodeId: string, attachments: MindMapAttachment[]) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, attachments } }
          : node
      )
    );
  }, [setNodes]);

  const moveNodeInList = useCallback((nodeId: string, direction: 'up' | 'down') => {
    setNodes(prevNodes => {
      const nodeIndex = prevNodes.findIndex(node => node.id === nodeId);
      if (nodeIndex === -1) return prevNodes;

      const newNodes = [...prevNodes];
      const temp = newNodes[nodeIndex];

      if (direction === 'up' && nodeIndex > 0) {
        newNodes[nodeIndex] = newNodes[nodeIndex - 1];
        newNodes[nodeIndex - 1] = temp;
      } else if (direction === 'down' && nodeIndex < newNodes.length - 1) {
        newNodes[nodeIndex] = newNodes[nodeIndex + 1];
        newNodes[nodeIndex + 1] = temp;
      }

      return newNodes;
    });
  }, [setNodes]);

  return {
    addNode,
    addNodeAtPosition,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
    moveNodeInList
  };
};
