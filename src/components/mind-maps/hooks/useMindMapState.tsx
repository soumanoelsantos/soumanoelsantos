
import { useState, useEffect } from 'react';
import { MindMapContent, MindMapNode, MindMapEdge } from '@/types/mindMap';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

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

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNode,
    updateNodeLabel,
    updateNodePosition,
    addConnection,
    removeConnection
  };
};
