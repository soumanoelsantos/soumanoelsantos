
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

import { MindMapContent, MindMapNode as MindMapNodeType, MindMapEdge } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useNodeOperations } from './hooks/useNodeOperations';
import { useAutoSave } from './hooks/useAutoSave';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useMultipleSelection } from './hooks/useMultipleSelection';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';

import MindMapNode from './components/MindMapNode';
import MindMapToolbar from './components/MindMapToolbar';
import DialogManager from './components/DialogManager';
import AlignmentToolbar from './components/AlignmentToolbar';
import ZoomControls from './components/ZoomControls';

// Definir tipos de nós customizados
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
  
  // Estados do mapa mental usando hooks nativos do ReactFlow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialContent.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  // Operações com nós
  const nodeOperations = useNodeOperations({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNode,
    hiddenNodes,
    setHiddenNodes
  });

  // Auto-save
  useAutoSave({
    nodes,
    edges,
    onSave: async (content) => {
      onSave(content);
    },
    delay: 2000
  });

  // Pan e Zoom
  const panAndZoom = usePanAndZoom(reactFlowInstance);

  // Seleção múltipla
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  
  // Estados para diálogos
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReconnectDialog, setShowReconnectDialog] = useState(false);
  const [editingNode, setEditingNode] = useState<MindMapNodeType | null>(null);
  const [reconnectingNode, setReconnectingNode] = useState<MindMapNodeType | null>(null);
  const [availableParents, setAvailableParents] = useState<MindMapNodeType[]>([]);

  // Handlers para diálogos
  const handleAddNode = useCallback((label: string) => {
    const newNode: MindMapNodeType = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label }
    };
    setNodes(prev => [...prev, newNode]);
    setShowAddDialog(false);
  }, [setNodes]);

  const handleEditNode = useCallback((nodeId: string, label: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setEditingNode(node);
      setShowEditDialog(true);
    }
  }, [nodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
  }, [setNodes, setEdges]);

  const handleAddChildNode = useCallback((parentId: string) => {
    const newNode: MindMapNodeType = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'Novo nó filho' }
    };
    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, {
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
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, color } }
        : node
    ));
  }, [setNodes]);

  // Filtrar nós visíveis
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  // Filtrar edges visíveis
  const visibleEdges = edges.filter(edge => 
    !hiddenNodes.has(edge.source) && !hiddenNodes.has(edge.target)
  );

  // Converter para formato ReactFlow
  const reactFlowNodes: Node[] = visibleNodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      mindMapId,
      onEdit: handleEditNode,
      onDelete: handleDeleteNode,
      onAddChild: handleAddChildNode,
      onToggleVisibility: nodeOperations.toggleNodeVisibility,
      onReconnect: handleReconnectNode,
      onChangeColor: handleChangeNodeColor,
      hasChildren: nodeOperations.getDirectChildren(node.id).length > 0,
      childrenVisible: nodeOperations.getDirectChildren(node.id).every(childId => !hiddenNodes.has(childId))
    }
  }));

  const reactFlowEdges: Edge[] = visibleEdges;

  // Handlers para ReactFlow
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
    setSelectedNodes([]);
  }, []);

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
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
            onAddNode={() => setShowAddDialog(true)}
            onSave={() => onSave({ nodes, edges })}
            isSaving={isSaving}
            selectedNodes={selectedNodes}
            onDeleteSelected={() => {
              selectedNodes.forEach(nodeId => handleDeleteNode(nodeId));
            }}
            hasSelectedNodes={selectedNodes.length > 0}
          />
        </Panel>

        {/* Controles de zoom */}
        <Panel position="top-right">
          <ZoomControls
            zoomLevel={panAndZoom.zoomLevel}
            onZoomIn={panAndZoom.zoomIn}
            onZoomOut={panAndZoom.zoomOut}
            onZoomReset={panAndZoom.resetZoom}
            onFitView={() => reactFlowInstance?.fitView()}
          />
        </Panel>

        {/* Toolbar de alinhamento */}
        {selectedNode && (
          <Panel position="bottom-center">
            <AlignmentToolbar
              onAlignHorizontally={nodeOperations.alignNodesHorizontally}
              onAlignVertically={nodeOperations.alignNodesVertically}
              onDistributeHorizontally={nodeOperations.distributeNodesHorizontally}
              onDistributeVertically={nodeOperations.distributeNodesVertically}
              onArrangeGrid={nodeOperations.arrangeInGrid}
            />
          </Panel>
        )}
      </ReactFlow>

      {/* Dialogs */}
      <DialogManager
        showAddDialog={showAddDialog}
        showEditDialog={showEditDialog}
        showReconnectDialog={showReconnectDialog}
        editingNode={editingNode}
        reconnectingNode={reconnectingNode}
        availableParents={availableParents}
        onCloseAddDialog={() => setShowAddDialog(false)}
        onCloseEditDialog={() => setShowEditDialog(false)}
        onCloseReconnectDialog={() => setShowReconnectDialog(false)}
        onAddNode={handleAddNode}
        onEditNode={(id, label) => {
          setNodes(prev => prev.map(node => 
            node.id === id ? { ...node, data: { ...node.data, label } } : node
          ));
          setShowEditDialog(false);
        }}
        onReconnectNode={(nodeId, newParentId) => {
          // Remover conexões antigas
          setEdges(prev => prev.filter(e => e.target !== nodeId));
          // Adicionar nova conexão
          setEdges(prev => [...prev, {
            id: `${newParentId}-${nodeId}`,
            source: newParentId,
            target: nodeId
          }]);
          setShowReconnectDialog(false);
        }}
      />
    </div>
  );
};

export default MindMapCanvas;
