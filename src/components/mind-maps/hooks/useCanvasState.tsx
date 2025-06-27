
import { useState, useCallback } from 'react';
import { Node, Edge, useNodesState, useEdgesState, addEdge, Connection } from '@xyflow/react';
import { MindMapDialogState } from '../types/canvasTypes';

interface UseCanvasStateProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  mindMapId?: string;
}

export const useCanvasState = ({ initialNodes, initialEdges, mindMapId }: UseCanvasStateProps) => {
  // ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // UI state
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Dialog states
  const [dialogState, setDialogState] = useState<MindMapDialogState>({
    isAddingNode: false,
    editingNode: null,
    showReconnectDialog: false,
    reconnectingNode: null,
    availableParents: []
  });

  // Node operations
  const handleAddNode = useCallback((label: string) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label,
        mindMapId,
        onEdit: (nodeId: string) => setDialogState(prev => ({ ...prev, editingNode: nodeId })),
        onDelete: handleDeleteNode,
        onAddChild: handleAddChildNode,
        onToggleVisibility: handleToggleVisibility,
        onReconnect: handleReconnectNode,
        onChangeColor: handleChangeNodeColor
      }
    };
    setNodes((prev) => [...prev, newNode]);
    setDialogState(prev => ({ ...prev, isAddingNode: false }));
  }, [mindMapId]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter(n => n.id !== nodeId));
    setEdges((prev) => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
  }, [setNodes, setEdges]);

  const handleAddChildNode = useCallback((parentId: string) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: 'Novo nó filho',
        mindMapId,
        onEdit: (nodeId: string) => setDialogState(prev => ({ ...prev, editingNode: nodeId })),
        onDelete: handleDeleteNode,
        onAddChild: handleAddChildNode,
        onToggleVisibility: handleToggleVisibility,
        onReconnect: handleReconnectNode,
        onChangeColor: handleChangeNodeColor
      }
    };
    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, {
      id: `${parentId}-${newNode.id}`,
      source: parentId,
      target: newNode.id
    }]);
  }, [mindMapId, setNodes, setEdges]);

  const handleReconnectNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDialogState(prev => ({
        ...prev,
        reconnectingNode: node,
        availableParents: nodes.filter(n => n.id !== nodeId),
        showReconnectDialog: true
      }));
    }
  }, [nodes]);

  const handleChangeNodeColor = useCallback((nodeId: string, color: string) => {
    setNodes((prev) => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, color } }
        : node
    ));
  }, [setNodes]);

  const handleToggleVisibility = useCallback((nodeId: string) => {
    const getDirectChildren = (parentId: string): string[] => {
      return edges.filter(edge => edge.source === parentId).map(edge => edge.target);
    };

    const children = getDirectChildren(nodeId);
    const allHidden = children.every(childId => hiddenNodes.has(childId));
    
    setHiddenNodes(prev => {
      const newSet = new Set(prev);
      if (allHidden) {
        children.forEach(childId => newSet.delete(childId));
      } else {
        children.forEach(childId => newSet.add(childId));
      }
      return newSet;
    });
  }, [edges, hiddenNodes]);

  // ReactFlow event handlers
  const onConnect = useCallback((params: Connection) => {
    if (params.source && params.target) {
      setEdges((eds) => addEdge(params, eds));
    }
  }, [setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return {
    // State
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    reactFlowInstance,
    dialogState,
    
    // State setters
    setNodes,
    setEdges,
    setSelectedNode,
    setReactFlowInstance,
    setDialogState,
    
    // ReactFlow handlers
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    
    // Node operations
    handleAddNode,
    handleDeleteNode,
    handleAddChildNode,
    handleReconnectNode,
    handleChangeNodeColor,
    handleToggleVisibility
  };
};
