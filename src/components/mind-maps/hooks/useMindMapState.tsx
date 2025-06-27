import { useState, useCallback } from 'react';
import { MindMapNode, MindMapEdge, MindMapContent, MindMapAttachment } from '@/types/mindMap';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes || []);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges || []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

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

    if (connectToNodeId) {
      const newEdge: MindMapEdge = {
        id: `${connectToNodeId}-${newNodeId}`,
        source: connectToNodeId,
        target: newNodeId
      };
      setEdges(prevEdges => [...prevEdges, newEdge]);
    }
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  }, []);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, []);

  const updateNodePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prevNodes =>
      prevNodes.map(node => (node.id === id ? { ...node, position } : node))
    );
  }, []);

  const updateNodeNotes = useCallback((id: string, notes: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, notes } } : node
      )
    );
  }, []);

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

  const getAvailableParents = useCallback((nodeId: string) => {
    return nodes.filter(node => node.id !== nodeId);
  }, [nodes]);

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prevEdges => prevEdges.filter(edge => edge.target !== nodeId));
  }, []);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prevEdges => {
      // Remove existing edges where this node is a target
      const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
      
      // Add the new edge
      const newEdge: MindMapEdge = {
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId
      };
      
      return [...filteredEdges, newEdge];
    });
  }, []);

  const changeNodeToGrandchild = useCallback((nodeId: string, grandparentId: string) => {
    setEdges(prevEdges => {
      // Find the parent of the node
      const parentEdge = prevEdges.find(edge => edge.target === nodeId);
      
      if (parentEdge) {
        const parentId = parentEdge.source;
        
        // Remove existing edges where this node is a target
        const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
        
        // Remove the edge between the node and its original parent
        const filteredEdges2 = filteredEdges.filter(edge => edge.source !== parentId || edge.target !== nodeId);
        
        // Add the new edge between the grandparent and the original parent
        const newEdgeToParent: MindMapEdge = {
          id: `${grandparentId}-${parentId}`,
          source: grandparentId,
          target: parentId
        };
        
        // Add the new edge between the original parent and the node
        const newEdgeToNode: MindMapEdge = {
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId
        };
        
        return [...filteredEdges2, newEdgeToParent, newEdgeToNode];
      }
      
      return prevEdges;
    });
  }, []);

  // Simplified alignment functions that work with single selected node
  const alignNodesHorizontally = useCallback(() => {
    // This function would need selectedNodes from outside context
    // For now, keeping it simple - just return
    return;
  }, []);

  const alignNodesVertically = useCallback(() => {
    // This function would need selectedNodes from outside context
    // For now, keeping it simple - just return
    return;
  }, []);

  const distributeNodesHorizontally = useCallback(() => {
    // This function would need selectedNodes from outside context
    // For now, keeping it simple - just return
    return;
  }, []);

  const distributeNodesVertically = useCallback(() => {
    // This function would need selectedNodes from outside context
    // For now, keeping it simple - just return
    return;
  }, []);

  const arrangeInGrid = useCallback(() => {
    // This function would need selectedNodes from outside context
    // For now, keeping it simple - just return
    return;
  }, []);

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
  }, []);

  const updateNodeAttachments = useCallback((nodeId: string, attachments: MindMapAttachment[]) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, attachments } }
          : node
      )
    );
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
    toggleNodeVisibility,
    getAvailableParents,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid,
    moveNodeInList
  };
};
