
import { useCallback } from 'react';
import { MindMapNode, MindMapAttachment } from '@/types/mindMap';

interface UseNodeOperationsProps {
  nodes: MindMapNode[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useNodeOperations = ({ nodes, setNodes, setSelectedNode }: UseNodeOperationsProps) => {
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
    return newNodeId;
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    setSelectedNode(null);
  }, [setNodes, setSelectedNode]);

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

  const getAvailableParents = useCallback((nodeId: string) => {
    return nodes.filter(node => node.id !== nodeId);
  }, [nodes]);

  return {
    addNode,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
    moveNodeInList,
    getAvailableParents
  };
};
