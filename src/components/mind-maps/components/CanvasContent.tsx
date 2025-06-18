
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import MindMapEdges from './MindMapEdges';
import NodesRenderer from './NodesRenderer';

interface CanvasContentProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  selectedNode: string | null;
  selectedNodes: string[];
  hiddenNodes: Set<string>;
  draggedNode: string | null;
  alignmentLines: any[];
  panOffset: { x: number; y: number };
  isPanning: boolean;
  onMouseDown: (e: React.MouseEvent, nodeId: string, position: { x: number; y: number }) => void;
  onTouchStart: (e: React.TouchEvent, nodeId: string, position: { x: number; y: number }) => void;
  onNodeClick: (e: React.MouseEvent, nodeId: string) => void;
  onEditNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onToggleNodeVisibility: (nodeId: string) => void;
  onChangeNodeType: (nodeId: string) => void;
}

const CanvasContent = ({
  nodes,
  edges,
  selectedNode,
  selectedNodes,
  hiddenNodes,
  draggedNode,
  onMouseDown,
  onTouchStart,
  onNodeClick,
  onEditNode,
  onDeleteNode,
  onToggleNodeVisibility,
  onChangeNodeType
}: CanvasContentProps) => {
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));

  return (
    <div className="absolute inset-0">
      <MindMapEdges 
        nodes={nodes} 
        edges={edges} 
        hiddenNodes={hiddenNodes}
      />

      <NodesRenderer
        visibleNodes={visibleNodes}
        selectedNode={selectedNode}
        selectedNodes={selectedNodes}
        draggedNode={draggedNode}
        hiddenNodes={hiddenNodes}
        edges={edges}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onNodeClick={onNodeClick}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
        onToggleNodeVisibility={onToggleNodeVisibility}
        onChangeNodeType={onChangeNodeType}
      />
    </div>
  );
};

export default CanvasContent;
