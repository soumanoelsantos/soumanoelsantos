
import React, { useState } from 'react';
import { MindMapContent } from '@/types/mindMap';
import { useMindMapState } from './hooks/useMindMapState';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import MindMapToolbar from './components/MindMapToolbar';
import MindMapEdges from './components/MindMapEdges';
import MindMapNode from './components/MindMapNode';
import AddNodeDialog from './components/AddNodeDialog';
import EditNodeDialog from './components/EditNodeDialog';

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
    getConnectedNodes
  } = useMindMapState(initialContent);

  const { draggedNode, canvasRef, handleMouseDown } = useDragAndDrop({
    updateNodePosition,
    setSelectedNode
  });

  const [isAddingNode, setIsAddingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<string | null>(null);

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

  // Filter visible nodes
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
        className="w-full h-full relative overflow-hidden"
        style={{ minHeight: '600px' }}
        onClick={() => setSelectedNode(null)}
      >
        <MindMapEdges 
          nodes={nodes} 
          edges={edges} 
          hiddenNodes={hiddenNodes}
        />

        {visibleNodes.map(node => {
          const connectedNodes = getConnectedNodes(node.id);
          const hasConnections = connectedNodes.length > 0;
          const hasHiddenConnections = connectedNodes.some(id => hiddenNodes.has(id));

          return (
            <MindMapNode
              key={node.id}
              node={node}
              isSelected={selectedNode === node.id}
              isDragged={draggedNode === node.id}
              hasConnections={hasConnections}
              hasHiddenConnections={hasHiddenConnections}
              onMouseDown={(e) => handleMouseDown(e, node.id, node.position)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node.id);
              }}
              onEdit={() => handleEditNode(node.id)}
              onDelete={() => deleteNode(node.id)}
              onToggleConnections={() => toggleNodeVisibility(node.id)}
            />
          );
        })}
      </div>

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
