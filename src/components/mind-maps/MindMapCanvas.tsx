
import React, { useState } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import MindMapToolbar from './components/MindMapToolbar';
import MindMapEdges from './components/MindMapEdges';
import MindMapNode from './components/MindMapNode';
import AddNodeDialog from './components/AddNodeDialog';
import EditNodeDialog from './components/EditNodeDialog';
import AlignmentToolbar from './components/AlignmentToolbar';

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

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);
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
      // Multi-selection with Ctrl/Cmd
      if (selectedNodes.includes(nodeId)) {
        setSelectedNodes(prev => prev.filter(id => id !== nodeId));
      } else {
        setSelectedNodes(prev => [...prev, nodeId]);
      }
    } else {
      // Single selection
      setSelectedNode(nodeId);
      setSelectedNodes([]);
    }
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
    setSelectedNodes([]);
    setShowAlignmentToolbar(false);
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

  // Filter visible nodes
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  // Show alignment toolbar when multiple nodes are selected
  React.useEffect(() => {
    setShowAlignmentToolbar(selectedNodes.length >= 2);
  }, [selectedNodes]);

  return (
    <div className="relative w-full h-full bg-white">
      <MindMapToolbar
        onAddNode={() => setIsAddingNode(true)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Instructions */}
      {selectedNodes.length === 0 && (
        <div className="absolute top-16 left-4 z-40 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          💡 Dica: Segure Ctrl/Cmd e clique nos nós para seleção múltipla e alinhamento
        </div>
      )}

      <div 
        ref={canvasRef}
        className="w-full h-full relative overflow-hidden"
        style={{ minHeight: '600px' }}
        onClick={handleCanvasClick}
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
            />
          );
        })}
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
    </div>
  );
};

export default MindMapCanvas;
