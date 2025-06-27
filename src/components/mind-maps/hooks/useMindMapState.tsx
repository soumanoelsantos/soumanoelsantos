
import { useState, useCallback } from 'react';
import { MindMapContent, MindMapNode, MindMapEdge } from '@/types/mindMap';
import { useNodeOperations } from './useNodeOperations';
import { useEdgeOperations } from './useEdgeOperations';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  const nodeOperations = useNodeOperations({ 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    selectedNode, 
    hiddenNodes, 
    setHiddenNodes 
  });

  const edgeOperations = useEdgeOperations({ 
    edges, 
    setEdges, 
    addNodeAtPosition: nodeOperations.addNodeAtPosition 
  });

  const updateNodeColor = useCallback((nodeId: string, color: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, color } }
        : node
    ));
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode: nodeOperations.addNode,
    deleteNode: nodeOperations.deleteNode,
    updateNodeLabel: nodeOperations.updateNodeLabel,
    updateNodeColor,
    updateNodePosition: nodeOperations.updateNodePosition,
    updateNodeNotes: nodeOperations.updateNodeNotes,
    updateNodeAttachments: nodeOperations.updateNodeAttachments,
    toggleNodeVisibility: nodeOperations.toggleNodeVisibility,
    getAvailableParents: nodeOperations.getAvailableParents,
    changeNodeToMain: nodeOperations.changeNodeToMain,
    changeNodeToChild: nodeOperations.changeNodeToChild,
    changeNodeToGrandchild: nodeOperations.changeNodeToGrandchild,
    alignNodesHorizontally: nodeOperations.alignNodesHorizontally,
    alignNodesVertically: nodeOperations.alignNodesVertically,
    distributeNodesHorizontally: nodeOperations.distributeNodesHorizontally,
    distributeNodesVertically: nodeOperations.distributeNodesVertically,
    arrangeInGrid: nodeOperations.arrangeInGrid,
    moveNodeInList: nodeOperations.moveNodeInList,
    insertNodeInEdge: edgeOperations.insertNodeInEdge,
    reconnectNode: nodeOperations.reconnectNode
  };
};
