
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import EdgeInsertButton from './EdgeInsertButton';

interface MindMapEdgesProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  hiddenNodes?: Set<string>;
  onInsertNodeInEdge?: (sourceId: string, targetId: string) => void;
}

const MindMapEdges = ({ nodes, edges, hiddenNodes = new Set(), onInsertNodeInEdge }: MindMapEdgesProps) => {
  const getNodeBounds = (node: MindMapNode) => ({
    left: node.position.x - 60,
    right: node.position.x + 60,
    top: node.position.y - 30,
    bottom: node.position.y + 30,
    centerX: node.position.x,
    centerY: node.position.y
  });

  const getClosestPoints = (sourceNode: MindMapNode, targetNode: MindMapNode) => {
    const source = getNodeBounds(sourceNode);
    const target = getNodeBounds(targetNode);
    
    // Determinar a direção da conexão
    const dx = target.centerX - source.centerX;
    const dy = target.centerY - source.centerY;
    
    let sourcePoint = { x: source.centerX, y: source.centerY };
    let targetPoint = { x: target.centerX, y: target.centerY };
    
    // Conectar pelas bordas mais próximas
    if (Math.abs(dx) > Math.abs(dy)) {
      // Conexão horizontal
      if (dx > 0) {
        // Target está à direita do source
        sourcePoint = { x: source.right, y: source.centerY };
        targetPoint = { x: target.left, y: target.centerY };
      } else {
        // Target está à esquerda do source
        sourcePoint = { x: source.left, y: source.centerY };
        targetPoint = { x: target.right, y: target.centerY };
      }
    } else {
      // Conexão vertical
      if (dy > 0) {
        // Target está abaixo do source
        sourcePoint = { x: source.centerX, y: source.bottom };
        targetPoint = { x: target.centerX, y: target.top };
      } else {
        // Target está acima do source
        sourcePoint = { x: source.centerX, y: source.top };
        targetPoint = { x: target.centerX, y: target.bottom };
      }
    }
    
    return { sourcePoint, targetPoint };
  };

  const createSmoothPath = (source: { x: number; y: number }, target: { x: number; y: number }) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Criar curva suave baseada na distância
    const controlPointOffset = Math.min(distance * 0.4, 80);
    
    let cp1x, cp1y, cp2x, cp2y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      // Conexão mais horizontal
      cp1x = source.x + (dx > 0 ? controlPointOffset : -controlPointOffset);
      cp1y = source.y;
      cp2x = target.x - (dx > 0 ? controlPointOffset : -controlPointOffset);
      cp2y = target.y;
    } else {
      // Conexão mais vertical
      cp1x = source.x;
      cp1y = source.y + (dy > 0 ? controlPointOffset : -controlPointOffset);
      cp2x = target.x;
      cp2y = target.y - (dy > 0 ? controlPointOffset : -controlPointOffset);
    }

    return `M ${source.x} ${source.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${target.x} ${target.y}`;
  };

  const getMidPoint = (source: { x: number; y: number }, target: { x: number; y: number }) => {
    return {
      x: (source.x + target.x) / 2,
      y: (source.y + target.y) / 2
    };
  };

  return (
    <div className="absolute inset-0">
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ zIndex: -1 }}
      >
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

          const { sourcePoint, targetPoint } = getClosestPoints(sourceNode, targetNode);
          const pathData = createSmoothPath(sourcePoint, targetPoint);

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

      {/* Botões de inserção de nós */}
      {onInsertNodeInEdge && edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return null;
        
        // Hide button if either node is hidden
        if (hiddenNodes.has(edge.source) || hiddenNodes.has(edge.target)) return null;

        const { sourcePoint, targetPoint } = getClosestPoints(sourceNode, targetNode);
        const midPoint = getMidPoint(sourcePoint, targetPoint);

        return (
          <EdgeInsertButton
            key={`insert-${edge.id}`}
            sourceId={edge.source}
            targetId={edge.target}
            position={midPoint}
            onInsertNode={onInsertNodeInEdge}
          />
        );
      })}
    </div>
  );
};

export default MindMapEdges;
