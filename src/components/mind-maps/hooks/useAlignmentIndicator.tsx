
import { useState, useCallback, useRef } from 'react';
import { MindMapNode } from '@/types/mindMap';

interface AlignmentLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'horizontal' | 'vertical';
}

export const useAlignmentIndicator = (
  nodes: MindMapNode[],
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void
) => {
  const [alignmentLines, setAlignmentLines] = useState<AlignmentLine[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showAlignmentIndicator = useCallback((draggedNodeId: string) => {
    const draggedNode = nodes.find(n => n.id === draggedNodeId);
    if (!draggedNode) return;

    const lines: AlignmentLine[] = [];
    const threshold = 10; // pixels

    nodes.forEach(node => {
      if (node.id === draggedNodeId) return;

      // Check horizontal alignment
      if (Math.abs(node.position.y - draggedNode.position.y) <= threshold) {
        const minX = Math.min(node.position.x, draggedNode.position.x) - 50;
        const maxX = Math.max(node.position.x, draggedNode.position.x) + 50;
        
        lines.push({
          id: `h-${node.id}`,
          x1: minX,
          y1: node.position.y,
          x2: maxX,
          y2: node.position.y,
          type: 'horizontal'
        });

        // Snap to alignment
        if (Math.abs(node.position.y - draggedNode.position.y) <= threshold) {
          updateNodePosition(draggedNodeId, {
            x: draggedNode.position.x,
            y: node.position.y
          });
        }
      }

      // Check vertical alignment
      if (Math.abs(node.position.x - draggedNode.position.x) <= threshold) {
        const minY = Math.min(node.position.y, draggedNode.position.y) - 50;
        const maxY = Math.max(node.position.y, draggedNode.position.y) + 50;
        
        lines.push({
          id: `v-${node.id}`,
          x1: node.position.x,
          y1: minY,
          x2: node.position.x,
          y2: maxY,
          type: 'vertical'
        });

        // Snap to alignment
        if (Math.abs(node.position.x - draggedNode.position.x) <= threshold) {
          updateNodePosition(draggedNodeId, {
            x: node.position.x,
            y: draggedNode.position.y
          });
        }
      }
    });

    setAlignmentLines(lines);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to hide lines
    timeoutRef.current = setTimeout(() => {
      setAlignmentLines([]);
    }, 1500);
  }, [nodes, updateNodePosition]);

  return {
    alignmentLines,
    showAlignmentIndicator
  };
};
