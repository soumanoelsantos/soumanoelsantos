
import { useState, useCallback } from 'react';

interface UseMultipleSelectionProps {
  setSelectedNode: (nodeId: string | null) => void;
}

export const useMultipleSelection = ({ setSelectedNode }: UseMultipleSelectionProps) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const handleNodeClick = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    
    if (e.ctrlKey || e.metaKey) {
      // Multi-selection with Ctrl/Cmd
      setSelectedNodes(prev => {
        if (prev.includes(nodeId)) {
          // Remove from selection
          const newSelection = prev.filter(id => id !== nodeId);
          if (newSelection.length === 1) {
            setSelectedNode(newSelection[0]);
          } else if (newSelection.length === 0) {
            setSelectedNode(null);
          }
          return newSelection;
        } else {
          // Add to selection
          setSelectedNode(null); // Clear single selection when multi-selecting
          return [...prev, nodeId];
        }
      });
    } else {
      // Single selection
      setSelectedNode(nodeId);
      setSelectedNodes([]);
    }
  }, [setSelectedNode]);

  const clearSelection = useCallback(() => {
    setSelectedNodes([]);
    setSelectedNode(null);
  }, [setSelectedNode]);

  const isNodeSelected = useCallback((nodeId: string, selectedNode: string | null) => {
    return selectedNodes.includes(nodeId) || selectedNode === nodeId;
  }, [selectedNodes]);

  return {
    selectedNodes,
    setSelectedNodes,
    handleNodeClick,
    clearSelection,
    isNodeSelected
  };
};
