
import { useState } from 'react';
import { MindMapNode, MindMapEdge, MindMapContent } from '@/types/mindMap';
import { useNodeOperations } from './useNodeOperations';
import { useEdgeOperations } from './useEdgeOperations';
import { useNodeVisibility } from './useNodeVisibility';
import { useAlignmentOperations } from './useAlignmentOperations';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes || []);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges || []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeOperations = useNodeOperations({ nodes, setNodes, setSelectedNode });
  const edgeOperations = useEdgeOperations({ edges, setEdges });
  const { hiddenNodes, toggleNodeVisibility } = useNodeVisibility({ edges });
  const alignmentOperations = useAlignmentOperations();

  // Enhanced addNode that also handles edge creation
  const addNode = (label: string, connectToNodeId?: string) => {
    const newNodeId = nodeOperations.addNode(label);
    
    if (connectToNodeId) {
      edgeOperations.addEdge(connectToNodeId, newNodeId);
    }
  };

  // Enhanced deleteNode that also removes edges
  const deleteNode = (id: string) => {
    edgeOperations.removeEdgesForNode(id);
    nodeOperations.deleteNode(id);
  };

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNodeLabel: nodeOperations.updateNodeLabel,
    updateNodePosition: nodeOperations.updateNodePosition,
    updateNodeNotes: nodeOperations.updateNodeNotes,
    updateNodeAttachments: nodeOperations.updateNodeAttachments,
    toggleNodeVisibility,
    getAvailableParents: nodeOperations.getAvailableParents,
    changeNodeToMain: edgeOperations.changeNodeToMain,
    changeNodeToChild: edgeOperations.changeNodeToChild,
    changeNodeToGrandchild: edgeOperations.changeNodeToGrandchild,
    moveNodeInList: nodeOperations.moveNodeInList,
    ...alignmentOperations
  };
};
