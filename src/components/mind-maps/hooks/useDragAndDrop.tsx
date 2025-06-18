
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseDragAndDropProps {
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  setSelectedNode: (nodeId: string | null) => void;
}

export const useDragAndDrop = ({ updateNodePosition, setSelectedNode }: UseDragAndDropProps) => {
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string, nodePosition: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - (canvasRect.left + nodePosition.x),
        y: e.clientY - (canvasRect.top + nodePosition.y)
      });
    }
    
    setDraggedNode(nodeId);
    setSelectedNode(nodeId);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedNode || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;
    
    // Limit within canvas bounds
    const limitedX = Math.max(50, Math.min(newX, canvasRect.width - 50));
    const limitedY = Math.max(50, Math.min(newY, canvasRect.height - 50));
    
    updateNodePosition(draggedNode, { x: limitedX, y: limitedY });
  }, [draggedNode, dragOffset, updateNodePosition]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (draggedNode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, handleMouseMove, handleMouseUp]);

  return {
    draggedNode,
    canvasRef,
    handleMouseDown
  };
};
