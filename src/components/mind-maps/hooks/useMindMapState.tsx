import { useState, useEffect } from 'react';
import { MindMapContent, MindMapNode, MindMapEdge } from '@/types/mindMap';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  // Add central node if none exists
  useEffect(() => {
    if (nodes.length === 0) {
      const centerNode: MindMapNode = {
        id: 'center',
        type: 'default',
        position: { x: 400, y: 300 },
        data: { label: 'Ideia Central', color: '#3b82f6' }
      };
      setNodes([centerNode]);
    }
  }, []);

  const getConnectedNodes = (nodeId: string): string[] => {
    const connected: string[] = [];
    edges.forEach(edge => {
      if (edge.source === nodeId) {
        connected.push(edge.target);
      } else if (edge.target === nodeId) {
        connected.push(edge.source);
      }
    });
    return connected;
  };

  const getChildNodes = (nodeId: string): string[] => {
    const children: string[] = [];
    edges.forEach(edge => {
      if (edge.source === nodeId) {
        children.push(edge.target);
      }
    });
    return children;
  };

  const getParentNodes = (nodeId: string): string[] => {
    const parents: string[] = [];
    edges.forEach(edge => {
      if (edge.target === nodeId) {
        parents.push(edge.source);
      }
    });
    return parents;
  };

  const getDirectChildNodes = (nodeId: string): string[] => {
    return getChildNodes(nodeId);
  };

  const getAllChildNodesRecursive = (nodeId: string, visited = new Set<string>()): string[] => {
    if (visited.has(nodeId)) return [];
    
    visited.add(nodeId);
    const directChildren = getChildNodes(nodeId);
    let allChildren = [...directChildren];
    
    directChildren.forEach(childId => {
      if (!visited.has(childId)) {
        allChildren = [...allChildren, ...getAllChildNodesRecursive(childId, visited)];
      }
    });
    
    return [...new Set(allChildren)]; // Remove duplicates
  };

  const toggleNodeVisibility = (nodeId: string) => {
    const directChildren = getDirectChildNodes(nodeId);
    const allChildNodes = getAllChildNodesRecursive(nodeId);
    const newHiddenNodes = new Set(hiddenNodes);
    
    // Check if any direct children are currently hidden
    const hasHiddenDirectChildren = directChildren.some(id => hiddenNodes.has(id));
    
    if (hasHiddenDirectChildren) {
      // Show only direct children (step by step)
      directChildren.forEach(id => newHiddenNodes.delete(id));
    } else {
      // Hide all descendant nodes at once
      allChildNodes.forEach(id => newHiddenNodes.add(id));
    }
    
    setHiddenNodes(newHiddenNodes);
  };

  const addNode = (label: string, connectToNodeId?: string, x: number = Math.random() * 600 + 100, y: number = Math.random() * 400 + 100) => {
    if (!label.trim()) return;

    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      type: 'default',
      position: { x, y },
      data: { label: label.trim(), color: '#6b7280' }
    };

    setNodes(prev => [...prev, newNode]);

    // Connect to specified node if provided
    if (connectToNodeId) {
      const targetNode = nodes.find(node => node.id === connectToNodeId);
      if (targetNode) {
        const newEdge: MindMapEdge = {
          id: `edge-${Date.now()}`,
          source: connectToNodeId,
          target: newNode.id
        };
        setEdges(prev => [...prev, newEdge]);
      }
    }
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    // Remove from hidden nodes if it exists
    const newHiddenNodes = new Set(hiddenNodes);
    newHiddenNodes.delete(nodeId);
    setHiddenNodes(newHiddenNodes);
  };

  const updateNode = (nodeId: string, updates: Partial<MindMapNode>) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const updateNodeLabel = (nodeId: string, label: string) => {
    if (!label.trim()) return;
    
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, label: label.trim() } }
        : node
    ));
  };

  const updateNodePosition = (nodeId: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, position }
        : node
    ));
  };

  const updateNodeNotes = (nodeId: string, notes: string) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, notes } }
        : node
    ));
  };

  const addConnection = (sourceId: string, targetId: string) => {
    // Check if connection already exists
    const connectionExists = edges.some(edge => 
      (edge.source === sourceId && edge.target === targetId) ||
      (edge.source === targetId && edge.target === sourceId)
    );

    if (!connectionExists) {
      const newEdge: MindMapEdge = {
        id: `edge-${Date.now()}`,
        source: sourceId,
        target: targetId
      };
      setEdges(prev => [...prev, newEdge]);
    }
  };

  const removeConnection = (sourceId: string, targetId: string) => {
    setEdges(prev => prev.filter(edge => 
      !((edge.source === sourceId && edge.target === targetId) ||
        (edge.source === targetId && edge.target === sourceId))
    ));
  };

  // New node type changing functions
  const changeNodeToMain = (nodeId: string) => {
    // Remove all connections where this node is a target (remove parent connections)
    setEdges(prev => prev.filter(edge => edge.target !== nodeId));
    
    // Update node color to indicate it's a main node
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, color: '#3b82f6' } }
        : node
    ));
  };

  const changeNodeToChild = (nodeId: string, newParentId: string) => {
    // Remove existing parent connections
    setEdges(prev => prev.filter(edge => edge.target !== nodeId));
    
    // Add new connection to the specified parent
    const newEdge: MindMapEdge = {
      id: `edge-${Date.now()}`,
      source: newParentId,
      target: nodeId
    };
    setEdges(prev => [...prev, newEdge]);
    
    // Update node color
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, color: '#10b981' } }
        : node
    ));
  };

  const changeNodeToGrandchild = (nodeId: string, newParentId: string) => {
    // Same logic as child but with different color
    setEdges(prev => prev.filter(edge => edge.target !== nodeId));
    
    const newEdge: MindMapEdge = {
      id: `edge-${Date.now()}`,
      source: newParentId,
      target: nodeId
    };
    setEdges(prev => [...prev, newEdge]);
    
    // Update node color for grandchild
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, color: '#f59e0b' } }
        : node
    ));
  };

  const getAvailableParents = (nodeId: string) => {
    // Get all nodes except the current node and its descendants
    const descendants = getAllChildNodesRecursive(nodeId);
    return nodes.filter(node => 
      node.id !== nodeId && 
      !descendants.includes(node.id)
    );
  };

  // New alignment functions
  const alignNodesHorizontally = (nodeIds: string[]) => {
    if (nodeIds.length < 2) return;
    
    const nodesToAlign = nodes.filter(node => nodeIds.includes(node.id));
    const averageY = nodesToAlign.reduce((sum, node) => sum + node.position.y, 0) / nodesToAlign.length;
    
    setNodes(prev => prev.map(node => 
      nodeIds.includes(node.id) 
        ? { ...node, position: { ...node.position, y: averageY } }
        : node
    ));
  };

  const alignNodesVertically = (nodeIds: string[]) => {
    if (nodeIds.length < 2) return;
    
    const nodesToAlign = nodes.filter(node => nodeIds.includes(node.id));
    const averageX = nodesToAlign.reduce((sum, node) => sum + node.position.x, 0) / nodesToAlign.length;
    
    setNodes(prev => prev.map(node => 
      nodeIds.includes(node.id) 
        ? { ...node, position: { ...node.position, x: averageX } }
        : node
    ));
  };

  const distributeNodesHorizontally = (nodeIds: string[]) => {
    if (nodeIds.length < 3) return;
    
    const nodesToDistribute = nodes.filter(node => nodeIds.includes(node.id))
      .sort((a, b) => a.position.x - b.position.x);
    
    const leftmost = nodesToDistribute[0].position.x;
    const rightmost = nodesToDistribute[nodesToDistribute.length - 1].position.x;
    const spacing = (rightmost - leftmost) / (nodesToDistribute.length - 1);
    
    setNodes(prev => prev.map(node => {
      const index = nodesToDistribute.findIndex(n => n.id === node.id);
      if (index !== -1) {
        return { ...node, position: { ...node.position, x: leftmost + (index * spacing) } };
      }
      return node;
    }));
  };

  const distributeNodesVertically = (nodeIds: string[]) => {
    if (nodeIds.length < 3) return;
    
    const nodesToDistribute = nodes.filter(node => nodeIds.includes(node.id))
      .sort((a, b) => a.position.y - b.position.y);
    
    const topmost = nodesToDistribute[0].position.y;
    const bottommost = nodesToDistribute[nodesToDistribute.length - 1].position.y;
    const spacing = (bottommost - topmost) / (nodesToDistribute.length - 1);
    
    setNodes(prev => prev.map(node => {
      const index = nodesToDistribute.findIndex(n => n.id === node.id);
      if (index !== -1) {
        return { ...node, position: { ...node.position, y: topmost + (index * spacing) } };
      }
      return node;
    }));
  };

  const arrangeInGrid = (nodeIds: string[], columns: number = 3) => {
    if (nodeIds.length < 2) return;
    
    const nodesToArrange = nodes.filter(node => nodeIds.includes(node.id));
    const rows = Math.ceil(nodesToArrange.length / columns);
    const spacing = { x: 150, y: 100 };
    const startX = 200;
    const startY = 200;
    
    setNodes(prev => prev.map(node => {
      const index = nodesToArrange.findIndex(n => n.id === node.id);
      if (index !== -1) {
        const row = Math.floor(index / columns);
        const col = index % columns;
        return { 
          ...node, 
          position: { 
            x: startX + (col * spacing.x), 
            y: startY + (row * spacing.y) 
          } 
        };
      }
      return node;
    }));
  };

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    addConnection,
    removeConnection,
    toggleNodeVisibility,
    getConnectedNodes,
    getParentNodes,
    getAvailableParents,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid
  };
};
