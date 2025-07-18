
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import MindMapNodeComponent from './MindMapNode';
import MindMapEdges from './MindMapEdges';

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
  isNodeSelected: (nodeId: string, selectedNode: string | null) => boolean;
  onMouseDown: (nodeId: string, e: React.MouseEvent) => void;
  onTouchStart: (nodeId: string, e: React.TouchEvent) => void;
  onNodeClick: (nodeId: string, e: React.MouseEvent) => void;
  onEditNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onToggleNodeVisibility: (nodeId: string) => void;
  onChangeNodeType: (nodeId: string) => void;
  onOpenNodeNotes: (nodeId: string) => void;
  onAddChildNode: (parentNodeId: string) => void;
  onUpdateNodeAttachments?: (nodeId: string, attachments: any[]) => void;
  onInsertNodeInEdge?: (sourceId: string, targetId: string) => void;
  onReconnectNode?: (nodeId: string) => void;
}

const CanvasContent = ({
  nodes,
  edges,
  selectedNode,
  selectedNodes,
  hiddenNodes,
  draggedNode,
  alignmentLines,
  panOffset,
  isPanning,
  isNodeSelected,
  onMouseDown,
  onTouchStart,
  onNodeClick,
  onEditNode,
  onDeleteNode,
  onToggleNodeVisibility,
  onChangeNodeType,
  onOpenNodeNotes,
  onAddChildNode,
  onUpdateNodeAttachments,
  onInsertNodeInEdge,
  onReconnectNode
}: CanvasContentProps) => {
  const visibleNodes = nodes.filter(node => !hiddenNodes.has(node.id));
  const visibleEdges = edges.filter(edge => 
    !hiddenNodes.has(edge.source) && !hiddenNodes.has(edge.target)
  );

  const getDirectChildren = (nodeId: string): string[] => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => edge.target);
  };

  const hasDirectChildren = (nodeId: string): boolean => {
    return getDirectChildren(nodeId).length > 0;
  };

  const hasHiddenDirectChildren = (nodeId: string): boolean => {
    const directChildren = getDirectChildren(nodeId);
    return directChildren.some(childId => hiddenNodes.has(childId));
  };

  return (
    <div className="absolute inset-0">
      {/* Render edges first so they appear behind nodes */}
      <MindMapEdges
        edges={visibleEdges}
        nodes={visibleNodes}
        hiddenNodes={hiddenNodes}
        onInsertNodeInEdge={onInsertNodeInEdge}
      />

      {/* Render alignment lines */}
      {alignmentLines.map((line, index) => (
        <div
          key={index}
          className="absolute border-dashed border-blue-500 pointer-events-none"
          style={{
            left: line.x1,
            top: line.y1,
            width: line.x2 - line.x1,
            height: line.y2 - line.y1,
            borderWidth: line.x1 === line.x2 ? '0 0 0 1px' : '1px 0 0 0'
          }}
        />
      ))}

      {/* Render nodes */}
      {visibleNodes.map(node => (
        <MindMapNodeComponent
          key={node.id}
          node={node}
          isSelected={isNodeSelected(node.id, selectedNode)}
          isDragged={draggedNode === node.id}
          hasChildNodes={hasDirectChildren(node.id)}
          hasHiddenDirectChildren={hasHiddenDirectChildren(node.id)}
          onMouseDown={(e) => onMouseDown(node.id, e)}
          onTouchStart={(e) => onTouchStart(node.id, e)}
          onClick={(e) => onNodeClick(node.id, e)}
          onEdit={() => onEditNode(node.id)}
          onDelete={() => onDeleteNode(node.id)}
          onToggleConnections={() => onToggleNodeVisibility(node.id)}
          onChangeType={() => onChangeNodeType(node.id)}
          onOpenNotes={() => onOpenNodeNotes(node.id)}
          onAddChild={() => onAddChildNode(node.id)}
          onReconnect={onReconnectNode ? () => onReconnectNode(node.id) : undefined}
          onUpdateNodeAttachments={onUpdateNodeAttachments ? (attachments) => onUpdateNodeAttachments(node.id, attachments) : undefined}
        />
      ))}
    </div>
  );
};

export default CanvasContent;
