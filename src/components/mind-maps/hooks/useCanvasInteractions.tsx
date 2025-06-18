
import { useState, useCallback } from 'react';

interface UseCanvasInteractionsProps {
  setSelectedNode: (nodeId: string | null) => void;
  isPanning: boolean;
  isDragging: boolean;
}

export const useCanvasInteractions = ({ 
  setSelectedNode, 
  isPanning, 
  isDragging 
}: UseCanvasInteractionsProps) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [showAlignmentToolbar, setShowAlignmentToolbar] = useState(false);

  const handleNodeClick = useCallback((e: React.MouseEvent, nodeId: string) => {
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
  }, [selectedNodes, setSelectedNode]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!isPanning && !isDragging) {
      setSelectedNode(null);
      setSelectedNodes([]);
      setShowAlignmentToolbar(false);
    }
  }, [isPanning, isDragging, setSelectedNode]);

  const clearSelection = useCallback(() => {
    setSelectedNodes([]);
    setShowAlignmentToolbar(false);
  }, []);

  return {
    selectedNodes,
    setSelectedNodes,
    showAlignmentToolbar,
    setShowAlignmentToolbar,
    handleNodeClick,
    handleCanvasClick,
    clearSelection
  };
};
