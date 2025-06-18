import { useState, useCallback, useEffect, useRef } from 'react';

interface UseDragAndDropProps {
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  setSelectedNode: (nodeId: string | null) => void;
}

export const useDragAndDrop = ({ updateNodePosition, setSelectedNode }: UseDragAndDropProps) => {
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string, nodePosition: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect) {
      // Calculate offset from mouse to node center
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;
      
      setDragOffset({
        x: mouseX - nodePosition.x,
        y: mouseY - nodePosition.y
      });
    }
    
    setDraggedNode(nodeId);
    setSelectedNode(nodeId);
    setIsDragging(true);
    
    // Change cursor to grabbing
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedNode || !canvasRef.current || !isDragging) return;
    
    e.preventDefault();
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;
    
    // Calculate new position
    const newX = mouseX - dragOffset.x;
    const newY = mouseY - dragOffset.y;
    
    // Add boundaries to keep nodes within reasonable area
    const minX = 60;
    const minY = 60;
    const maxX = Math.max(800, canvasRect.width - 60);
    const maxY = Math.max(600, canvasRect.height - 60);
    
    const limitedX = Math.max(minX, Math.min(newX, maxX));
    const limitedY = Math.max(minY, Math.min(newY, maxY));
    
    updateNodePosition(draggedNode, { x: limitedX, y: limitedY });
  }, [draggedNode, dragOffset, updateNodePosition, isDragging]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setDraggedNode(null);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      
      // Reset cursor
      document.body.style.cursor = '';
    }
  }, [isDragging]);

  // Add touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent, nodeId: string, nodePosition: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect && touch) {
      const touchX = touch.clientX - canvasRect.left;
      const touchY = touch.clientY - canvasRect.top;
      
      setDragOffset({
        x: touchX - nodePosition.x,
        y: touchY - nodePosition.y
      });
    }
    
    setDraggedNode(nodeId);
    setSelectedNode(nodeId);
    setIsDragging(true);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!draggedNode || !canvasRef.current || !isDragging) return;
    
    e.preventDefault();
    
    const touch = e.touches[0];
    if (!touch) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const touchX = touch.clientX - canvasRect.left;
    const touchY = touch.clientY - canvasRect.top;
    
    const newX = touchX - dragOffset.x;
    const newY = touchY - dragOffset.y;
    
    const minX = 60;
    const minY = 60;
    const maxX = Math.max(800, canvasRect.width - 60);
    const maxY = Math.max(600, canvasRect.height - 60);
    
    const limitedX = Math.max(minX, Math.min(newX, maxX));
    const limitedY = Math.max(minY, Math.min(newY, maxY));
    
    updateNodePosition(draggedNode, { x: limitedX, y: limitedY });
  }, [draggedNode, dragOffset, updateNodePosition, isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setDraggedNode(null);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return {
    draggedNode,
    canvasRef,
    handleMouseDown,
    handleTouchStart,
    isDragging
  };
};
