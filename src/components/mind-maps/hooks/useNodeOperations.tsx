
import { useCallback } from 'react';
import { MindMapNode, MindMapEdge, MindMapAttachment } from '@/types/mindMap';

interface UseNodeOperationsProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
  selectedNode: string | null;
  hiddenNodes: Set<string>;
  setHiddenNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const useNodeOperations = ({ 
  nodes, 
  edges, 
  setNodes, 
  setEdges, 
  selectedNode, 
  hiddenNodes, 
  setHiddenNodes 
}: UseNodeOperationsProps) => {
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

  // Função recursiva para encontrar todos os descendentes de um nó
  const getAllDescendants = useCallback((nodeId: string): string[] => {
    const descendants: string[] = [];
    const directChildren = edges.filter(edge => edge.source === nodeId).map(edge => edge.target);
    
    for (const childId of directChildren) {
      descendants.push(childId);
      descendants.push(...getAllDescendants(childId));
    }
    
    return descendants;
  }, [edges]);

  const toggleNodeVisibility = useCallback((nodeId: string) => {
    console.log('Toggling visibility for node:', nodeId);
    
    setHiddenNodes(prev => {
      const newHiddenNodes = new Set(prev);
      
      if (newHiddenNodes.has(nodeId)) {
        // Se o nó está oculto, torná-lo visível
        console.log('Showing node:', nodeId);
        newHiddenNodes.delete(nodeId);
        
        // Também mostrar todos os seus descendentes
        const descendants = getAllDescendants(nodeId);
        descendants.forEach(descendantId => {
          console.log('Showing descendant:', descendantId);
          newHiddenNodes.delete(descendantId);
        });
      } else {
        // Se o nó está visível, ocultá-lo
        console.log('Hiding node:', nodeId);
        newHiddenNodes.add(nodeId);
        
        // Também ocultar todos os seus descendentes
        const descendants = getAllDescendants(nodeId);
        descendants.forEach(descendantId => {
          console.log('Hiding descendant:', descendantId);
          newHiddenNodes.add(descendantId);
        });
      }
      
      console.log('New hidden nodes:', Array.from(newHiddenNodes));
      return newHiddenNodes;
    });
  }, [setHiddenNodes, getAllDescendants]);

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

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setEdges]);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prev => [...prev, { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId }]);
  }, [setEdges]);

  const changeNodeToGrandchild = useCallback((nodeId: string, grandparentId: string) => {
    const availableParents = getAvailableParents(nodeId);
    if (availableParents.length > 0) {
      const parentId = availableParents[0].id;
      setEdges(prev => [
        ...prev,
        { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId },
        { id: `${grandparentId}-${parentId}`, source: grandparentId, target: parentId }
      ]);
    }
  }, [getAvailableParents, setEdges]);

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

  const reconnectNode = useCallback((nodeId: string, newParentId: string | null) => {
    setEdges(prev => {
      const updatedEdges = prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
  
      if (newParentId) {
        updatedEdges.push({ id: `${newParentId}-${nodeId}`, source: newParentId, target: nodeId });
      }
  
      return updatedEdges;
    });
  }, [setEdges]);

  return {
    addNode,
    addNodeAtPosition,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
    moveNodeInList,
    getAvailableParents,
    toggleNodeVisibility,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid,
    reconnectNode
  };
};
