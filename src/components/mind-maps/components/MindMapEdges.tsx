
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface MindMapEdgesProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

const MindMapEdges = ({ nodes, edges }: MindMapEdgesProps) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return null;

        return (
          <line
            key={edge.id}
            x1={sourceNode.position.x + 60}
            y1={sourceNode.position.y + 30}
            x2={targetNode.position.x + 60}
            y2={targetNode.position.y + 30}
            stroke="#6b7280"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

export default MindMapEdges;
