import React, { useState, useEffect } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';
import { useAutoSave } from './hooks/useAutoSave';
import MindMapToolbar from './components/MindMapToolbar';
import CanvasContent from './components/CanvasContent';
import MindMapListView from './components/MindMapListView';
import DialogManager from './components/DialogManager';
import ZoomControls from './components/ZoomControls';
import ReconnectNodeDialog from './components/ReconnectNodeDialog';

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => Promise<void>;
  isSaving?: boolean;
}

const MindMapCanvas = ({ initialContent, onSave, isSaving = false }: MindMapCanvasProps) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');
  
  console.log('MindMapCanvas renderizando com viewMode:', viewMode);
  
  const {
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
    moveNodeInList,
    insertNodeInEdge,
    reconnectNode
  } = useMindMapState(initialContent);

  const { draggedNode, canvasRef, handleMouseDown: dragMouseDown, handleTouchStart: dragTouchStart, isDragging } = useDragAndDrop({
    updateNodePosition,
    setSelectedNode
  });

  const { 
    panOffset, 
    isPanning, 
    zoomLevel, 
    handleCanvasMouseDown: panMouseDown,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom
  } = usePanAndZoom();

  const {
    selectedNodes,
    setSelectedNodes,
    showAlignmentToolbar,
    setShowAlignmentToolbar,
    handleNodeClick: canvasNodeClick,
    handleCanvasClick,
    clearSelection
  } = useCanvasInteractions({
    setSelectedNode,
    isPanning,
    isDragging
  });

  useAutoSave({
    content: { nodes, edges },
    onSave,
    delay: 2000,
    enabled: true
  });

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [changingNodeType, setChangingNodeType] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [selectedParentForNewNode, setSelectedParentForNewNode] = useState<string | null>(null);
  const [reconnectingNode, setReconnectingNode] = useState<string | null>(null);

  // Corrigir o event listener para wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const wheelHandler = (e: WheelEvent) => {
      // Apenas prevenir o comportamento padrão se Ctrl estiver pressionado
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        handleWheel(e);
      }
    };

    canvas.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      canvas.removeEventListener('wheel', wheelHandler);
    };
  }, [handleWheel]);

  const handleSave = async () => {
    try {
      await onSave({ nodes, edges });
    } catch (error) {
      console.error('Erro ao salvar mapa mental:', error);
    }
  };

  const handleAddNode = (label: string, connectToNodeId?: string) => {
    console.log('handleAddNode chamado com:', { label, connectToNodeId });
    try {
      addNode(label, connectToNodeId);
      console.log('Nó adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar nó:', error);
    }
  };

  const handleAddChildNode = (parentNodeId: string) => {
    console.log('handleAddChildNode chamado com parentNodeId:', parentNodeId);
    setSelectedParentForNewNode(parentNodeId);
    setIsAddingNode(true);
  };

  const handleEditNode = (nodeId: string) => {
    setEditingNode(nodeId);
  };

  const handleChangeNodeType = (nodeId: string) => {
    setChangingNodeType(nodeId);
  };

  const handleOpenNodeNotes = (nodeId: string) => {
    setEditingNotes(nodeId);
  };

  const handleNodeClick = (nodeId: string, e?: React.MouseEvent) => {
    if (e) {
      canvasNodeClick(e, nodeId);
    } else {
      setSelectedNode(nodeId);
    }
  };

  const handleViewModeChange = (mode: 'canvas' | 'list') => {
    console.log('Mudando viewMode para:', mode);
    setViewMode(mode);
  };

  const handleMoveNode = (nodeId: string, direction: 'up' | 'down') => {
    moveNodeInList(nodeId, direction);
  };

  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      dragMouseDown(e, nodeId, node.position);
    }
  };

  const handleNodeTouchStart = (nodeId: string, e: React.TouchEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      dragTouchStart(e, nodeId, node.position);
    }
  };

  const handleUpdateNodeAttachments = (nodeId: string, attachments: any[]) => {
    updateNodeAttachments(nodeId, attachments);
  };

  const handleInsertNodeInEdge = (sourceId: string, targetId: string) => {
    console.log('Inserindo nó entre:', sourceId, 'e', targetId);
    insertNodeInEdge(sourceId, targetId);
  };

  const handleReconnectNode = (nodeId: string) => {
    console.log('Reconectando nó:', nodeId);
    setReconnectingNode(nodeId);
  };

  const handleConfirmReconnect = (nodeId: string, newParentId: string | null) => {
    console.log('Confirmando reconexão:', nodeId, 'para', newParentId);
    reconnectNode(nodeId, newParentId);
    setReconnectingNode(null);
  };

  const handleReconnectNodeDialogClose = () => {
    setReconnectingNode(null);
  };

  const handleReconnectNodeDialogOpen = (nodeId: string) => {
    setReconnectingNode(nodeId);
  };

  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  console.log('Nodes disponíveis:', nodes.length);
  console.log('Nodes visíveis:', visibleNodes.length);
  console.log('Estado isAddingNode:', isAddingNode);

  const handleAddNodeClick = () => {
    console.log('Botão + clicado, abrindo dialog para adicionar nó');
    setSelectedParentForNewNode(null);
    setIsAddingNode(true);
  };

  const handleCloseAddDialog = () => {
    console.log('Fechando dialog de adicionar nó');
    setIsAddingNode(false);
    setSelectedParentForNewNode(null);
  };

  return (
    <div className="relative w-full h-full bg-white">
      <MindMapToolbar
        onAddNode={handleAddNodeClick}
        onSave={handleSave}
        isSaving={isSaving}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="h-[calc(100%-73px)]">
        {viewMode === 'list' ? (
          <div className="w-full h-full overflow-auto bg-gray-50">
            <MindMapListView
              nodes={nodes}
              edges={edges}
              selectedNode={selectedNode}
              hiddenNodes={hiddenNodes}
              onNodeClick={(nodeId) => handleNodeClick(nodeId)}
              onEditNode={setEditingNode}
              onDeleteNode={deleteNode}
              onOpenNodeNotes={setEditingNotes}
              onAddChildNode={handleAddChildNode}
              onToggleNodeVisibility={toggleNodeVisibility}
              onMoveNode={moveNodeInList}
            />
          </div>
        ) : (
          <div 
            ref={canvasRef}
            className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            style={{ minHeight: '600px', minWidth: '100%' }}
            onMouseDown={panMouseDown}
            onClick={handleCanvasClick}
          >
            <div 
              className="relative origin-center"
              style={{ 
                minWidth: '200vw', 
                minHeight: '200vh',
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transition: isPanning ? 'none' : 'transform 0.1s ease-out'
              }}
            >
              <CanvasContent
                nodes={nodes}
                edges={edges}
                selectedNode={selectedNode}
                selectedNodes={selectedNodes}
                hiddenNodes={hiddenNodes}
                draggedNode={draggedNode}
                alignmentLines={[]}
                panOffset={{ x: 0, y: 0 }}
                isPanning={isPanning}
                onMouseDown={handleNodeMouseDown}
                onTouchStart={handleNodeTouchStart}
                onNodeClick={(nodeId, e) => handleNodeClick(nodeId, e)}
                onEditNode={handleEditNode}
                onDeleteNode={deleteNode}
                onToggleNodeVisibility={toggleNodeVisibility}
                onChangeNodeType={handleChangeNodeType}
                onOpenNodeNotes={handleOpenNodeNotes}
                onAddChildNode={handleAddChildNode}
                onUpdateNodeAttachments={handleUpdateNodeAttachments}
                onInsertNodeInEdge={handleInsertNodeInEdge}
                onReconnectNode={handleReconnectNode}
              />
            </div>
            
            {/* Controles de Zoom */}
            <ZoomControls
              zoomLevel={zoomLevel}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
            />
          </div>
        )}
      </div>

      <DialogManager
        isAddingNode={isAddingNode}
        setIsAddingNode={handleCloseAddDialog}
        editingNode={editingNode}
        setEditingNode={setEditingNode}
        changingNodeType={changingNodeType}
        setChangingNodeType={setChangingNodeType}
        editingNotes={editingNotes}
        setEditingNotes={setEditingNotes}
        visibleNodes={visibleNodes}
        nodes={nodes}
        edges={edges}
        onAddNode={handleAddNode}
        onUpdateNodeLabel={updateNodeLabel}
        onUpdateNodeNotes={updateNodeNotes}
        getAvailableParents={getAvailableParents}
        onChangeToMain={changeNodeToMain}
        onChangeToChild={changeNodeToChild}
        onChangeToGrandchild={changeNodeToGrandchild}
        selectedParentForNewNode={selectedParentForNewNode}
      />

      <ReconnectNodeDialog
        isOpen={!!reconnectingNode}
        onClose={handleReconnectNodeDialogClose}
        nodeId={reconnectingNode}
        nodes={nodes}
        edges={edges}
        onReconnect={handleConfirmReconnect}
      />
    </div>
  );
};

export default MindMapCanvas;
