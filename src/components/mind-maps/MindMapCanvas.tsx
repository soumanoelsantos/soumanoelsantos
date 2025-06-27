
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  NodeTypes,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { MindMapContent } from '@/types/mindMap';
import { useAutoSave } from './hooks/useAutoSave';
import { usePanAndZoom } from './hooks/usePanAndZoom';

import MindMapNode from './components/MindMapNode';
import MindMapToolbar from './components/MindMapToolbar';
import DialogManager from './components/DialogManager';
import AlignmentToolbar from './components/AlignmentToolbar';
import ZoomControls from './components/ZoomControls';

// Define custom node types for ReactFlow
const nodeTypes: NodeTypes = {
  default: MindMapNode,
};

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => void;
  isSaving?: boolean;
  mindMapId?: string;
}

const MindMapCanvas = ({ 
  initialContent, 
  onSave, 
  isSaving = false,
  mindMapId
}: MindMapCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Convert our mind map nodes to ReactFlow nodes with enhanced data
  const convertToReactFlowNodes = (mindMapNodes: any[]): Node[] => {
    return mindMapNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        mindMapId,
        onEdit: handleEditNode,
        onDelete: handleDeleteNode,
        onAddChild: handleAddChildNode,
        onToggleVisibility: handleToggleVisibility,
        onReconnect: handleReconnectNode,
        onChangeColor: handleChangeNodeColor,
        hasChildren: edges.some(edge => edge.source === node.id),
        childrenVisible: edges
          .filter(edge => edge.source === node.id)
          .map(edge => edge.target)
          .every(childId => !hiddenNodes.has(childId))
      }
    }));
  };

  // Use ReactFlow's native state management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  // Dialog states
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [showReconnectDialog, setShowReconnectDialog] = useState(false);
  const [reconnectingNode, setReconnectingNode] = useState<any>(null);
  const [availableParents, setAvailableParents] = useState<any[]>([]);

  // Initialize nodes with enhanced data
  useEffect(() => {
    setNodes(convertToReactFlowNodes(initialContent.nodes));
  }, [initialContent.nodes, mindMapId]);

  // Auto-save functionality
  useAutoSave({
    content: { nodes, edges },
    onSave,
    delay: 2000
  });

  // Pan and zoom functionality
  const panAndZoom = usePanAndZoom();

  // Node operation handlers
  const handleAddNode = useCallback((label: string) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label }
    };
    setNodes((prev) => [...prev, newNode]);
    setIsAddingNode(false);
  }, [setNodes]);

  const handleEditNode = useCallback((nodeId: string, label: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setEditingNode(nodeId);
    }
  }, [nodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter(n => n.id !== nodeId));
    setEdges((prev) => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
  }, [setNodes, setEdges]);

  const handleAddChildNode = useCallback((parentId: string) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'Novo nó filho' }
    };
    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, {
      id: `${parentId}-${newNode.id}`,
      source: parentId,
      target: newNode.id
    }]);
  }, [setNodes, setEdges]);

  const handleReconnectNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setReconnectingNode(node);
      setAvailableParents(nodes.filter(n => n.id !== nodeId));
      setShowReconnectDialog(true);
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
        // Show all children
        children.forEach(childId => newSet.delete(childId));
      } else {
        // Hide all children
        children.forEach(childId => newSet.add(childId));
      }
      return newSet;
    });
  }, [edges, hiddenNodes]);

  // Filter visible nodes and edges
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));
  const visibleEdges = edges.filter(edge => 
    !hiddenNodes.has(edge.source) && !hiddenNodes.has(edge.target)
  );

  // Update nodes with enhanced data when dependencies change
  useEffect(() => {
    setNodes((prev) => prev.map(node => ({
      ...node,
      data: {
        ...node.data,
        mindMapId,
        onEdit: handleEditNode,
        onDelete: handleDeleteNode,
        onAddChild: handleAddChildNode,
        onToggleVisibility: handleToggleVisibility,
        onReconnect: handleReconnectNode,
        onChangeColor: handleChangeNodeColor,
        hasChildren: edges.some(edge => edge.source === node.id),
        childrenVisible: edges
          .filter(edge => edge.source === node.id)
          .map(edge => edge.target)
          .every(childId => !hiddenNodes.has(childId))
      }
    })));
  }, [edges, hiddenNodes, mindMapId, handleEditNode, handleDeleteNode, handleAddChildNode, handleToggleVisibility, handleReconnectNode, handleChangeNodeColor]);

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

  // Alignment operations
  const alignNodesHorizontally = useCallback(() => {
    if (!selectedNode) return;
    const selectedNodeObj = nodes.find(n => n.id === selectedNode);
    if (!selectedNodeObj) return;
    
    setNodes((prev) => prev.map(node => 
      node.id === selectedNode ? node : { ...node, position: { ...node.position, y: selectedNodeObj.position.y } }
    ));
  }, [selectedNode, nodes, setNodes]);

  const alignNodesVertically = useCallback(() => {
    if (!selectedNode) return;
    const selectedNodeObj = nodes.find(n => n.id === selectedNode);
    if (!selectedNodeObj) return;
    
    setNodes((prev) => prev.map(node => 
      node.id === selectedNode ? node : { ...node, position: { ...node.position, x: selectedNodeObj.position.x } }
    ));
  }, [selectedNode, nodes, setNodes]);

  const distributeNodesHorizontally = useCallback(() => {
    const selectedNodes = nodes.filter(n => n.id === selectedNode);
    if (selectedNodes.length < 2) return;
    
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.x - b.position.x);
    const totalWidth = sortedNodes[sortedNodes.length - 1].position.x - sortedNodes[0].position.x;
    const spacing = totalWidth / (sortedNodes.length - 1);
    
    setNodes((prev) => prev.map(node => {
      const index = sortedNodes.findIndex(n => n.id === node.id);
      if (index === -1) return node;
      return { ...node, position: { ...node.position, x: sortedNodes[0].position.x + index * spacing } };
    }));
  }, [selectedNode, nodes, setNodes]);

  const distributeNodesVertically = useCallback(() => {
    const selectedNodes = nodes.filter(n => n.id === selectedNode);
    if (selectedNodes.length < 2) return;
    
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.y - b.position.y);
    const totalHeight = sortedNodes[sortedNodes.length - 1].position.y - sortedNodes[0].position.y;
    const spacing = totalHeight / (sortedNodes.length - 1);
    
    setNodes((prev) => prev.map(node => {
      const index = sortedNodes.findIndex(n => n.id === node.id);
      if (index === -1) return node;
      return { ...node, position: { ...node.position, y: sortedNodes[0].position.y + index * spacing } };
    }));
  }, [selectedNode, nodes, setNodes]);

  const arrangeInGrid = useCallback(() => {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const spacing = 200;
    
    setNodes((prev) => prev.map((node, index) => ({
      ...node,
      position: {
        x: (index % cols) * spacing,
        y: Math.floor(index / cols) * spacing
      }
    })));
  }, [nodes.length, setNodes]);

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        multiSelectionKeyCode="Shift"
        selectionKeyCode="Shift"
        deleteKeyCode="Delete"
        className="bg-gray-50"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#e5e7eb"
        />
        
        <Controls 
          position="bottom-right"
          showZoom={false}
          showFitView={false}
          showInteractive={false}
        />
        
        <MiniMap 
          position="bottom-left"
          nodeColor="#3b82f6"
          nodeStrokeWidth={2}
          zoomable
          pannable
        />

        {/* Toolbar principal */}
        <Panel position="top-left">
          <MindMapToolbar
            onAddNode={() => setIsAddingNode(true)}
            onSave={() => onSave({ nodes, edges })}
            isSaving={isSaving}
          />
        </Panel>

        {/* Controles de zoom */}
        <Panel position="top-right">
          <ZoomControls
            zoomLevel={panAndZoom.zoomLevel}
            onZoomIn={panAndZoom.zoomIn}
            onZoomOut={panAndZoom.zoomOut}
            onResetZoom={panAndZoom.resetZoom}
            onFitView={() => reactFlowInstance?.fitView()}
          />
        </Panel>

        {/* Toolbar de alinhamento */}
        {selectedNode && (
          <Panel position="bottom-center">
            <AlignmentToolbar
              selectedNodes={[selectedNode]}
              onAlignHorizontally={alignNodesHorizontally}
              onAlignVertically={alignNodesVertically}
              onDistributeHorizontally={distributeNodesHorizontally}
              onDistributeVertically={distributeNodesVertically}
              onArrangeInGrid={arrangeInGrid}
              onClose={() => setSelectedNode(null)}
            />
          </Panel>
        )}
      </ReactFlow>

      {/* Dialogs */}
      <DialogManager
        isAddingNode={isAddingNode}
        setIsAddingNode={setIsAddingNode}
        editingNode={editingNode}
        setEditingNode={setEditingNode}
        changingNodeType={null}
        setChangingNodeType={() => {}}
        editingNotes={null}
        setEditingNotes={() => {}}
        visibleNodes={visibleNodes}
        nodes={nodes}
        edges={edges}
        onAddNode={handleAddNode}
        onUpdateNodeLabel={(nodeId, label) => {
          setNodes((prev) => prev.map(node => 
            node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
          ));
          setEditingNode(null);
        }}
        onUpdateNodeNotes={() => {}}
        getAvailableParents={() => []}
        onChangeToMain={() => {}}
        onChangeToChild={() => {}}
        onChangeToGrandchild={() => {}}
      />
    </div>
  );
};

export default MindMapCanvas;
