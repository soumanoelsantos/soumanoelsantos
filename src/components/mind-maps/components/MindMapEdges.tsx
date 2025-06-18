
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface MindMapEdgesProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  hiddenNodes?: Set<string>;
}

const MindMapEdges = ({ nodes, edges, hiddenNodes = new Set() }: MindMapEdgesProps) => {
  const getNodeCenter = (node: MindMapNode) => ({
    x: node.position.x + 60, // Assuming node width ~120px
    y: node.position.y + 30  // Assuming node height ~60px
  });

  const createSmoothPath = (source: { x: number; y: number }, target: { x: number; y: number }) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create a smooth curve
    const controlPointOffset = Math.min(distance * 0.3, 100);
    const cp1x = source.x + (dx > 0 ? controlPointOffset : -controlPointOffset);
    const cp1y = source.y;
    const cp2x = target.x - (dx > 0 ? controlPointOffset : -controlPointOffset);
    const cp2y = target.y;

    return `M ${source.x} ${source.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${target.x} ${target.y}`;
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#6b7280"
          />
        </marker>
      </defs>
      
      {edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return null;
        
        // Hide edge if either node is hidden
        if (hiddenNodes.has(edge.source) || hiddenNodes.has(edge.target)) return null;

        const sourceCenter = getNodeCenter(sourceNode);
        const targetCenter = getNodeCenter(targetNode);
        const pathData = createSmoothPath(sourceCenter, targetCenter);

        return (
          <path
            key={edge.id}
            d={pathData}
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="transition-all duration-200"
          />
        );
      })}
    </svg>
  );
};

export default MindMapEdges;
