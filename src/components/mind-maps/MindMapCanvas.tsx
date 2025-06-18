import React, { useState } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { usePanAndZoom } from './hooks/usePanAndZoom';
import { useAlignmentIndicator } from './hooks/useAlignmentIndicator';
import MindMapToolbar from './components/MindMapToolbar';
import MindMapEdges from './components/MindMapEdges';
import MindMapNode from './components/MindMapNode';
import AddNodeDialog from './components/AddNodeDialog';
import EditNodeDialog from './components/EditNodeDialog';
import AlignmentToolbar from './components/AlignmentToolbar';
import ChangeNodeTypeDialog from './components/ChangeNodeTypeDialog';
import AlignmentIndicator from './components/AlignmentIndicator';

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
    getConnectedNodes,
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

  const { draggedNode, canvasRef, handleMouseDown } = useDragAndDrop({
    updateNodePosition,
    setSelectedNode
  });

  const { panOffset, isPanning, handlePanStart, handleCanvasMouseDown } = usePanAndZoom();

  const { alignmentLines, showAlignmentIndicator } = useAlignmentIndicator(nodes, updateNodePosition);

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [changingNodeType, setChangingNodeType] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [showAlignmentToolbar, setShowAlignmentToolbar] = useState(false);

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

  const handleSaveEdit = (label: string) => {
    if (editingNode) {
      updateNodeLabel(editingNode, label);
      setEditingNode(null);
    }
  };

  const getEditingNodeLabel = () => {
    if (!editingNode) return '';
    const node = nodes.find(n => n.id === editingNode);
    return node?.data.label || '';
  };

  const getChangingNode = () => {
    if (!changingNodeType) return null;
    return nodes.find(n => n.id === changingNodeType) || null;
  };

  const getDirectChildNodes = (nodeId: string): string[] => {
    const children: string[] = [];
    edges.forEach(edge => {
      if (edge.source === nodeId) {
        children.push(edge.target);
      }
    });
    return children;
  };

  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    
    if (e.ctrlKey || e.metaKey) {
      if (selectedNodes.includes(nodeId)) {
        setSelectedNodes(prev => prev.filter(id => id !== nodeId));
      } else {
        setSelectedNodes(prev => [...prev, nodeId]);
      }
    } else {
      setSelectedNode(nodeId);
      setSelectedNodes([]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isPanning) {
      setSelectedNode(null);
      setSelectedNodes([]);
      setShowAlignmentToolbar(false);
    }
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

  React.useEffect(() => {
    setShowAlignmentToolbar(selectedNodes.length >= 2);
  }, [selectedNodes]);

  React.useEffect(() => {
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
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
            transition: isPanning ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <MindMapEdges 
            nodes={nodes} 
            edges={edges} 
            hiddenNodes={hiddenNodes}
          />

          {visibleNodes.map(node => {
            const directChildNodes = getDirectChildNodes(node.id);
            const hasChildNodes = directChildNodes.length > 0;
            const hasHiddenDirectChildren = directChildNodes.some(id => hiddenNodes.has(id));
            const isNodeSelected = selectedNode === node.id || selectedNodes.includes(node.id);

            return (
              <MindMapNode
                key={node.id}
                node={node}
                isSelected={isNodeSelected}
                isDragged={draggedNode === node.id}
                hasChildNodes={hasChildNodes}
                hasHiddenDirectChildren={hasHiddenDirectChildren}
                onMouseDown={(e) => handleMouseDown(e, node.id, node.position)}
                onClick={(e) => handleNodeClick(e, node.id)}
                onEdit={() => handleEditNode(node.id)}
                onDelete={() => deleteNode(node.id)}
                onToggleConnections={() => toggleNodeVisibility(node.id)}
                onChangeType={() => handleChangeNodeType(node.id)}
              />
            );
          })}

          <AlignmentIndicator lines={alignmentLines} />
        </div>
      </div>

      {showAlignmentToolbar && (
        <AlignmentToolbar
          selectedNodes={selectedNodes}
          onAlignHorizontally={alignNodesHorizontally}
          onAlignVertically={alignNodesVertically}
          onDistributeHorizontally={distributeNodesHorizontally}
          onDistributeVertically={distributeNodesVertically}
          onArrangeInGrid={arrangeInGrid}
          onClose={() => {
            setSelectedNodes([]);
            setShowAlignmentToolbar(false);
          }}
        />
      )}

      <AddNodeDialog
        isOpen={isAddingNode}
        onClose={() => setIsAddingNode(false)}
        onAdd={handleAddNode}
        nodes={visibleNodes}
      />

      <EditNodeDialog
        isOpen={!!editingNode}
        currentLabel={getEditingNodeLabel()}
        onClose={() => setEditingNode(null)}
        onSave={handleSaveEdit}
      />

      <ChangeNodeTypeDialog 
        isOpen={!!changingNodeType}
        node={getChangingNode()}
        availableParents={changingNodeType ? getAvailableParents(changingNodeType) : []}
        onClose={() => setChangingNodeType(null)}
        onChangeToMain={changeNodeToMain}
        onChangeToChild={changeNodeToChild}
        onChangeToGrandchild={changeNodeToGrandchild}
      />
    </div>
  );
};

export default MindMapCanvas;
