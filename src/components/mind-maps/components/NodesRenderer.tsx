
import React from 'react';
import { MindMapNode } from '@/types/mindMap';
import MindMapNode from './MindMapNode';

interface NodesRendererProps {
  visibleNodes: MindMapNode[];
  selectedNode: string | null;
  selectedNodes: string[];
  draggedNode: string | null;
  hiddenNodes: Set<string>;
  edges: any[];
  onMouseDown: (e: React.MouseEvent, nodeId: string, position: { x: number; y: number }) => void;
  onTouchStart: (e: React.TouchEvent, nodeId: string, position: { x: number; y: number }) => void;
  onNodeClick: (e: React.MouseEvent, nodeId: string) => void;
  onEditNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onToggleNodeVisibility: (nodeId: string) => void;
  onChangeNodeType: (nodeId: string) => void;
}

const NodesRenderer = ({
  visibleNodes,
  selectedNode,
  selectedNodes,
  draggedNode,
  hiddenNodes,
  edges,
  onMouseDown,
  onTouchStart,
  onNodeClick,
  onEditNode,
  onDeleteNode,
  onToggleNodeVisibility,
  onChangeNodeType
}: NodesRendererProps) => {
  const getDirectChildNodes = (nodeId: string): string[] => {
    const children: string[] = [];
    edges.forEach(edge => {
      if (edge.source === nodeId) {
        children.push(edge.target);
      }
    });
    return children;
  };

  return (
    <>
      {visibleNodes.map(node => {
        const directChildNodes = getDirectChildNodes(node.id);
        const hasChildNodes = directChildNodes.length > 0;
        const hasHiddenDirectChildren = directChildNodes.some(id => hiddenNodes.has(id));
        const isNodeSelected = selectedNode === node.id || selectedNodes.includes(node.id);

        return (
          <MindMapNode
            key={node.id}
            node={node}
            isSelected={isNodeSelected}
            isDragged={draggedNode === node.id}
            hasChildNodes={hasChildNodes}
            hasHiddenDirectChildren={hasHiddenDirectChildren}
            onMouseDown={(e) => onMouseDown(e, node.id, node.position)}
            onTouchStart={(e) => onTouchStart(e, node.id, node.position)}
            onClick={(e) => onNodeClick(e, node.id)}
            onEdit={() => onEditNode(node.id)}
            onDelete={() => onDeleteNode(node.id)}
            onToggleConnections={() => onToggleNodeVisibility(node.id)}
            onChangeType={() => onChangeNodeType(node.id)}
          />
        );
      })}
    </>
  );
};

export default NodesRenderer;
