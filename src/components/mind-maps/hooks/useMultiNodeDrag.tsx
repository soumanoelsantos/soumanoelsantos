
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseMultiNodeDragProps {
  selectedNodes: string[];
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  setSelectedNode: (nodeId: string | null) => void;
}

export const useMultiNodeDrag = ({ 
  selectedNodes, 
  updateNodePosition, 
  setSelectedNode 
}: UseMultiNodeDragProps) => {
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPositions, setInitialPositions] = useState<Record<string, { x: number; y: number }>>({});
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string, nodePosition: { x: number; y: number }, nodes: any[]) => {
    e.preventDefault();
    e.stopPropagation();
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect) {
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
    
    // Store initial positions of all selected nodes
    const positions: Record<string, { x: number; y: number }> = {};
    const nodesToMove = selectedNodes.includes(nodeId) ? selectedNodes : [nodeId];
    
    nodesToMove.forEach(id => {
      const node = nodes.find(n => n.id === id);
      if (node) {
        positions[id] = { x: node.position.x, y: node.position.y };
      }
    });
    
    setInitialPositions(positions);
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedNode || !canvasRef.current || !isDragging) return;
    
    e.preventDefault();
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;
    
    const newX = mouseX - dragOffset.x;
    const newY = mouseY - dragOffset.y;
    
    // Calculate the delta from the initial position of the dragged node
    const initialPos = initialPositions[draggedNode];
    if (!initialPos) return;
    
    const deltaX = newX - initialPos.x;
    const deltaY = newY - initialPos.y;
    
    // Move all selected nodes by the same delta
    const nodesToMove = selectedNodes.includes(draggedNode) ? selectedNodes : [draggedNode];
    
    nodesToMove.forEach(nodeId => {
      const initialNodePos = initialPositions[nodeId];
      if (initialNodePos) {
        updateNodePosition(nodeId, {
          x: initialNodePos.x + deltaX,
          y: initialNodePos.y + deltaY
        });
      }
    });
  }, [draggedNode, dragOffset, updateNodePosition, isDragging, selectedNodes, initialPositions]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setDraggedNode(null);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      setInitialPositions({});
      document.body.style.cursor = '';
    }
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent, nodeId: string, nodePosition: { x: number; y: number }, nodes: any[]) => {
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
    
    // Store initial positions of all selected nodes
    const positions: Record<string, { x: number; y: number }> = {};
    const nodesToMove = selectedNodes.includes(nodeId) ? selectedNodes : [nodeId];
    
    nodesToMove.forEach(id => {
      const node = nodes.find(n => n.id === id);
      if (node) {
        positions[id] = { x: node.position.x, y: node.position.y };
      }
    });
    
    setInitialPositions(positions);
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
    
    // Calculate the delta from the initial position of the dragged node
    const initialPos = initialPositions[draggedNode];
    if (!initialPos) return;
    
    const deltaX = newX - initialPos.x;
    const deltaY = newY - initialPos.y;
    
    // Move all selected nodes by the same delta
    const nodesToMove = selectedNodes.includes(draggedNode) ? selectedNodes : [draggedNode];
    
    nodesToMove.forEach(nodeId => {
      const initialNodePos = initialPositions[nodeId];
      if (initialNodePos) {
        updateNodePosition(nodeId, {
          x: initialNodePos.x + deltaX,
          y: initialNodePos.y + deltaY
        });
      }
    });
  }, [draggedNode, dragOffset, updateNodePosition, isDragging, selectedNodes, initialPositions]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setDraggedNode(null);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      setInitialPositions({});
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
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
