
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
    updateNodeNotes, // Nova função
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

  // Auto-save hook
  useAutoSave({
    content: { nodes, edges },
    onSave,
    delay: 2000, // 2 segundos após a última modificação
    enabled: true
  });

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [changingNodeType, setChangingNodeType] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null); // Novo estado

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
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onNodeClick={handleNodeClick}
            onEditNode={handleEditNode}
            onDeleteNode={deleteNode}
            onToggleNodeVisibility={toggleNodeVisibility}
            onChangeNodeType={handleChangeNodeType}
            onOpenNodeNotes={handleOpenNodeNotes} // Nova prop
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
        editingNotes={editingNotes} // Nova prop
        setEditingNotes={setEditingNotes} // Nova prop
        visibleNodes={visibleNodes}
        nodes={nodes}
        edges={edges}
        onAddNode={handleAddNode}
        onUpdateNodeLabel={updateNodeLabel}
        onUpdateNodeNotes={updateNodeNotes} // Nova prop
        getAvailableParents={getAvailableParents}
        onChangeToMain={changeNodeToMain}
        onChangeToChild={changeNodeToChild}
        onChangeToGrandchild={changeNodeToGrandchild}
      />
    </div>
  );
};

export default MindMapCanvas;
