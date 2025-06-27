
import { useState, useCallback } from 'react';
import { useMultipleSelection } from './useMultipleSelection';

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
  const [showAlignmentToolbar, setShowAlignmentToolbar] = useState(false);
  
  const multiSelection = useMultipleSelection({ setSelectedNode });

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!isPanning && !isDragging) {
      multiSelection.clearSelection();
      setShowAlignmentToolbar(false);
    }
  }, [isPanning, isDragging, multiSelection]);

  const clearSelection = useCallback(() => {
    multiSelection.clearSelection();
    setShowAlignmentToolbar(false);
  }, [multiSelection]);

  return {
    selectedNodes: multiSelection.selectedNodes,
    setSelectedNodes: multiSelection.setSelectedNodes,
    showAlignmentToolbar,
    setShowAlignmentToolbar,
    handleNodeClick: multiSelection.handleNodeClick,
    handleCanvasClick,
    clearSelection,
    isNodeSelected: multiSelection.isNodeSelected
  };
};
