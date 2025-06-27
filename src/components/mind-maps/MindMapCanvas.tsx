
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { 
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
} from 'reactflow';
import 'reactflow/dist/style.css';

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
  mindMapId?: string; // Novo prop para identificar o mapa mental
}

const MindMapCanvas = ({ 
  initialContent, 
  onSave, 
  isSaving = false,
  mindMapId
}: MindMapCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Estados do mapa mental
  const {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setNodes,
    setEdges,
    setSelectedNode,
    setHiddenNodes
  } = useMindMapState(initialContent);

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
    onSave,
    delay: 2000
  });

  // Pan e Zoom
  const {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleFitView
  } = usePanAndZoom(reactFlowInstance);

  // Seleção múltipla
  const {
    selectedNodes,
    setSelectedNodes,
    handleNodesChange,
    handleSelectionChange
  } = useMultipleSelection(setNodes);

  // Interações do canvas
  const {
    showAddDialog,
    showEditDialog,
    showReconnectDialog,
    editingNode,
    reconnectingNode,
    availableParents,
    setShowAddDialog,
    setShowEditDialog,
    setShowReconnectDialog,
    handleAddNode,
    handleEditNode,
    handleDeleteNode,
    handleAddChildNode,
    handleReconnectNode,
    handleChangeNodeColor
  } = useCanvasInteractions({
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNode,
    setSelectedNode,
    ...nodeOperations
  });

  // Filtrar nós visíveis
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  // Filtrar edges visíveis (apenas entre nós visíveis)
  const visibleEdges = edges.filter(edge => 
    !hiddenNodes.has(edge.source) && !hiddenNodes.has(edge.target)
  );

  // Converter para formato ReactFlow e adicionar mindMapId
  const reactFlowNodes: Node[] = visibleNodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      mindMapId, // Passar mindMapId para os nós
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
  }, [setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedNodes([]);
  }, [setSelectedNode, setSelectedNodes]);

  return (
    <div className="w-full h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={() => {}} // Gerenciado internamente
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onSelectionChange={handleSelectionChange}
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
              selectedNodes.forEach(node => handleDeleteNode(node.id));
            }}
            hasSelectedNodes={selectedNodes.length > 0}
          />
        </Panel>

        {/* Controles de zoom */}
        <Panel position="top-right">
          <ZoomControls
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
            onFitView={handleFitView}
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
          nodeOperations.updateNodeLabel(id, label);
          setShowEditDialog(false);
        }}
        onReconnectNode={(nodeId, newParentId) => {
          nodeOperations.reconnectNode(nodeId, newParentId);
          setShowReconnectDialog(false);
        }}
      />
    </div>
  );
};

export default MindMapCanvas;
