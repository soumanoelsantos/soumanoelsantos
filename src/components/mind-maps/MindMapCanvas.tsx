
import React, { useState, useEffect } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useAlignmentIndicator } from './hooks/useAlignmentIndicator';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';
import MindMapToolbar from './components/MindMapToolbar';
import AlignmentToolbar from './components/AlignmentToolbar';
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

  const { draggedNode, canvasRef, handleMouseDown, handleTouchStart, isDragging } = useDragAndDrop({
    updateNodePosition,
    setSelectedNode
  });

  const { panOffset, isPanning, handleCanvasMouseDown } = usePanAndZoom();

  const { alignmentLines, showAlignmentIndicator } = useAlignmentIndicator(nodes, updateNodePosition);

  const {
    selectedNodes,
    setSelectedNodes,
    showAlignmentToolbar,
    setShowAlignmentToolbar,
    handleNodeClick,
    handleCanvasClick,
    clearSelection
  } = useCanvasInteractions({
    setSelectedNode,
    isPanning,
    isDragging
  });

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [changingNodeType, setChangingNodeType] = useState<string | null>(null);

  const handleSave = async () => {
    console.log('Salvando mapa mental com conteúdo:', { nodes, edges });
    try {
      await onSave({ nodes, edges });
      console.log('Mapa mental salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar mapa mental:', error);
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

  const handleAlignmentAction = (action: string) => {
    const nodesToAlign = selectedNodes.length > 0 ? selectedNodes : (selectedNode ? [selectedNode] : []);
    
    switch (action) {
      case 'horizontal':
        alignNodesHorizontally(nodesToAlign);
        break;
      case 'vertical':
        alignNodesVertically(nodesToAlign);
        break;
      case 'distributeH':
        distributeNodesHorizontally(nodesToAlign);
        break;
      case 'distributeV':
        distributeNodesVertically(nodesToAlign);
        break;
    }
  };

  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  useEffect(() => {
    setShowAlignmentToolbar(selectedNodes.length >= 2);
  }, [selectedNodes, setShowAlignmentToolbar]);

  useEffect(() => {
    if (draggedNode) {
      showAlignmentIndicator(draggedNode);
    }
  }, [draggedNode, showAlignmentIndicator]);

  return (
    <div className="relative w-full h-full bg-white">
      <MindMapToolbar
        onAddNode={() => setIsAddingNode(true)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div 
        ref={canvasRef}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ minHeight: '600px' }}
        onMouseDown={handleCanvasMouseDown}
        onClick={handleCanvasClick}
      >
        <CanvasContent
          nodes={nodes}
          edges={edges}
          selectedNode={selectedNode}
          selectedNodes={selectedNodes}
          hiddenNodes={hiddenNodes}
          draggedNode={draggedNode}
          alignmentLines={alignmentLines}
          panOffset={panOffset}
          isPanning={isPanning}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onNodeClick={handleNodeClick}
          onEditNode={handleEditNode}
          onDeleteNode={deleteNode}
          onToggleNodeVisibility={toggleNodeVisibility}
          onChangeNodeType={handleChangeNodeType}
        />
      </div>

      {showAlignmentToolbar && (
        <AlignmentToolbar
          selectedNodes={selectedNodes}
          onAlignHorizontally={alignNodesHorizontally}
          onAlignVertically={alignNodesVertically}
          onDistributeHorizontally={distributeNodesHorizontally}
          onDistributeVertically={distributeNodesVertically}
          onArrangeInGrid={arrangeInGrid}
          onClose={clearSelection}
        />
      )}

      <DialogManager
        isAddingNode={isAddingNode}
        setIsAddingNode={setIsAddingNode}
        editingNode={editingNode}
        setEditingNode={setEditingNode}
        changingNodeType={changingNodeType}
        setChangingNodeType={setChangingNodeType}
        visibleNodes={visibleNodes}
        nodes={nodes}
        onAddNode={handleAddNode}
        onUpdateNodeLabel={updateNodeLabel}
        getAvailableParents={getAvailableParents}
        onChangeToMain={changeNodeToMain}
        onChangeToChild={changeNodeToChild}
        onChangeToGrandchild={changeNodeToGrandchild}
      />
    </div>
  );
};

export default MindMapCanvas;
