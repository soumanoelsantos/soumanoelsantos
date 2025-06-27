
import React, { useRef } from 'react';
import {
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  NodeTypes,
  BackgroundVariant,
  Panel,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { MindMapCanvasProps, MindMapNodeData } from '../types/canvasTypes';
import { useAutoSave } from '../hooks/useAutoSave';
import { usePanAndZoom } from '../hooks/usePanAndZoom';
import { useCanvasState } from '../hooks/useCanvasState';
import { useCanvasAlignment } from '../hooks/useCanvasAlignment';

import MindMapNode from './MindMapNode';
import MindMapToolbar from './MindMapToolbar';
import DialogManager from './DialogManager';
import AlignmentToolbar from './AlignmentToolbar';
import ZoomControls from './ZoomControls';

const nodeTypes: NodeTypes = {
  default: MindMapNode,
};

const MindMapCanvasMain = ({ 
  initialContent, 
  onSave, 
  isSaving = false,
  mindMapId
}: MindMapCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // Enhanced nodes with callback handlers
  const enhancedNodes: Node<MindMapNodeData>[] = initialContent.nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      mindMapId
    }
  }));

  const {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    reactFlowInstance,
    dialogState,
    setNodes,
    setReactFlowInstance,
    setDialogState,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    handleAddNode
  } = useCanvasState({
    initialNodes: enhancedNodes,
    initialEdges: initialContent.edges,
    mindMapId
  });

  const {
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid
  } = useCanvasAlignment({
    nodes,
    selectedNode,
    setNodes
  });

  // Auto-save functionality
  useAutoSave({
    content: { nodes, edges },
    onSave,
    delay: 2000
  });

  // Pan and zoom functionality
  const panAndZoom = usePanAndZoom();

  // Filter visible nodes and edges
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));
  const visibleEdges = edges.filter(edge => 
    !hiddenNodes.has(edge.source) && !hiddenNodes.has(edge.target)
  );

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
            onAddNode={() => setDialogState(prev => ({ ...prev, isAddingNode: true }))}
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
              onClose={() => {}}
            />
          </Panel>
        )}
      </ReactFlow>

      {/* Dialogs */}
      <DialogManager
        isAddingNode={dialogState.isAddingNode}
        setIsAddingNode={(value) => setDialogState(prev => ({ ...prev, isAddingNode: value }))}
        editingNode={dialogState.editingNode}
        setEditingNode={(value) => setDialogState(prev => ({ ...prev, editingNode: value }))}
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
          setDialogState(prev => ({ ...prev, editingNode: null }));
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

export default MindMapCanvasMain;
