
import React, { useState } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';
import { useAutoSave } from './hooks/useAutoSave';
import MindMapToolbar from './components/MindMapToolbar';
import CanvasContent from './components/CanvasContent';
import DialogManager from './components/DialogManager';

interface MindMapCanvasProps {
  initialContent: MindMapContent;
  onSave: (content: MindMapContent) => Promise<void>;
  isSaving?: boolean;
}

const MindMapCanvas = ({ initialContent, onSave, isSaving = false }: MindMapCanvasProps) => {
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
    toggleNodeVisibility,
    getAvailableParents,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid
  } = useMindMapState(initialContent);

  const { draggedNode, canvasRef, handleMouseDown: dragMouseDown, handleTouchStart: dragTouchStart, isDragging } = useDragAndDrop({
    updateNodePosition,
    setSelectedNode
  });

  const { panOffset, isPanning, handleCanvasMouseDown } = usePanAndZoom();

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

  // Auto-save hook
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

  const handleSave = async () => {
    console.log('Salvamento manual do mapa mental:', { nodes, edges });
    try {
      await onSave({ nodes, edges });
      console.log('Mapa mental salvo manualmente com sucesso');
    } catch (error) {
      console.error('Erro ao salvar mapa mental manualmente:', error);
    }
  };

  const handleAddNode = (label: string, connectToNodeId?: string) => {
    addNode(label, connectToNodeId);
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

  // Wrapper functions to match CanvasContent expected signatures
  const handleCanvasMouseDown = (nodeId: string, e: React.MouseEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      dragMouseDown(e, nodeId, node.position);
    }
  };

  const handleCanvasTouchStart = (nodeId: string, e: React.TouchEvent) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      dragTouchStart(e, nodeId, node.position);
    }
  };

  const handleCanvasNodeClick = (nodeId: string, e: React.MouseEvent) => {
    canvasNodeClick(e);
  };

  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  return (
    <div className="relative w-full h-full bg-white">
      <MindMapToolbar
        onAddNode={() => setIsAddingNode(true)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div 
        ref={canvasRef}
        className="w-full h-full relative overflow-auto cursor-grab active:cursor-grabbing"
        style={{ minHeight: '600px', minWidth: '100%' }}
        onMouseDown={handleCanvasMouseDown}
        onClick={handleCanvasClick}
      >
        <div 
          className="relative"
          style={{ 
            minWidth: '200vw', 
            minHeight: '200vh',
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
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
            onMouseDown={handleCanvasMouseDown}
            onTouchStart={handleCanvasTouchStart}
            onNodeClick={handleCanvasNodeClick}
            onEditNode={handleEditNode}
            onDeleteNode={deleteNode}
            onToggleNodeVisibility={toggleNodeVisibility}
            onChangeNodeType={handleChangeNodeType}
            onOpenNodeNotes={handleOpenNodeNotes}
          />
        </div>
      </div>

      <DialogManager
        isAddingNode={isAddingNode}
        setIsAddingNode={setIsAddingNode}
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
      />
    </div>
  );
};

export default MindMapCanvas;
