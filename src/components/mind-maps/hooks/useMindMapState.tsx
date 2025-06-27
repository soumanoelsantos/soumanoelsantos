import { useState, useCallback } from 'react';
import { MindMapContent, MindMapNode, MindMapEdge } from '@/types/mindMap';
import { useNodeOperations } from './useNodeOperations';
import { useEdgeOperations } from './useEdgeOperations';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  const nodeOperations = useNodeOperations(nodes, edges, setNodes, setEdges);
  const edgeOperations = useEdgeOperations(edges, setEdges);

  const updateNodeLabel = useCallback((nodeId: string, label: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, label } }
        : node
    ));
  }, []);

  const updateNodeColor = useCallback((nodeId: string, color: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, color } }
        : node
    ));
  }, []);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, position }
        : node
    ));
  }, []);

  const updateNodeNotes = useCallback((nodeId: string, notes: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, notes } }
        : node
    ));
  }, []);

  const updateNodeAttachments = useCallback((nodeId: string, attachments: any[]) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, attachments } }
        : node
    ));
  }, []);

  const toggleNodeVisibility = useCallback((nodeId: string) => {
    setHiddenNodes(prev => {
      const newHiddenNodes = new Set(prev);
      if (newHiddenNodes.has(nodeId)) {
        newHiddenNodes.delete(nodeId);
      } else {
        newHiddenNodes.add(nodeId);
      }
      return newHiddenNodes;
    });
  }, []);

  const getAvailableParents = useCallback((nodeId: string) => {
    return nodes.filter(node => node.id !== nodeId);
  }, [nodes]);

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prev => [...prev, { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId }]);
  }, []);

  const changeNodeToGrandchild = useCallback((nodeId: string, grandparentId: string) => {
    const availableParents = getAvailableParents(nodeId);
    if (availableParents.length > 0) {
      const parentId = availableParents[0].id;
      setEdges(prev => [
        ...prev,
        { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId },
        { id: `${grandparentId}-${parentId}`, source: grandparentId, target: parentId }
      ]);
    }
  }, [getAvailableParents]);

  const alignNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        setNodes(prev => prev.map(node => ({
          ...node,
          position: {
            ...node.position,
            y: selected.position.y
          }
        })));
      }
    }
  }, [nodes, selectedNode]);

  const alignNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        setNodes(prev => prev.map(node => ({
          ...node,
          position: {
            ...node.position,
            x: selected.position.x
          }
        })));
      }
    }
  }, [nodes, selectedNode]);

  const distributeNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);
        const totalWidth = sortedNodes.reduce((acc, node) => acc + 100, 0); // Assuming each node is 100px wide
        const startX = selected.position.x - totalWidth / 2;
        setNodes(prev => sortedNodes.map((node, index) => ({
          ...node,
          position: {
            ...node.position,
            x: startX + index * 100
          }
        })));
      }
    }
  }, [nodes, selectedNode]);

  const distributeNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
        const totalHeight = sortedNodes.reduce((acc, node) => acc + 100, 0); // Assuming each node is 100px high
        const startY = selected.position.y - totalHeight / 2;
        setNodes(prev => sortedNodes.map((node, index) => ({
          ...node,
          position: {
            ...node.position,
            y: startY + index * 100
          }
        })));
      }
    }
  }, [nodes, selectedNode]);

  const arrangeInGrid = useCallback(() => {
    const numNodes = nodes.length;
    const numCols = Math.ceil(Math.sqrt(numNodes));
    const numRows = Math.ceil(numNodes / numCols);

    setNodes(prev => prev.map((node, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      return {
        ...node,
        position: {
          x: 100 + col * 200,
          y: 100 + row * 200
        }
      };
    }));
  }, [nodes]);

  const moveNodeInList = useCallback((nodeId: string, direction: 'up' | 'down') => {
    setNodes(prevNodes => {
      const nodeIndex = prevNodes.findIndex(node => node.id === nodeId);
      if (nodeIndex === -1) return prevNodes;

      const newNodes = [...prevNodes];
      const temp = newNodes[nodeIndex];

      if (direction === 'up' && nodeIndex > 0) {
        newNodes[nodeIndex] = newNodes[nodeIndex - 1];
        newNodes[nodeIndex - 1] = temp;
      } else if (direction === 'down' && nodeIndex < prevNodes.length - 1) {
        newNodes[nodeIndex] = newNodes[nodeIndex + 1];
        newNodes[nodeIndex + 1] = temp;
      }

      return newNodes;
    });
  }, []);

  const insertNodeInEdge = useCallback((sourceId: string, targetId: string) => {
    const newLabel = prompt('Digite o texto para o novo nó:');
    if (newLabel) {
      const newNode = nodeOperations.addNode(newLabel);
      setEdges(prev => {
        const newEdges = prev.filter(edge => edge.source !== sourceId || edge.target !== targetId);
        newEdges.push({ id: `${sourceId}-${newNode.id}`, source: sourceId, target: newNode.id });
        newEdges.push({ id: `${newNode.id}-${targetId}`, source: newNode.id, target: targetId });
        return newEdges;
      });
    }
  }, [nodeOperations, setEdges]);

  const reconnectNode = useCallback((nodeId: string, newParentId: string | null) => {
    setEdges(prev => {
      // Remove todas as arestas existentes conectadas ao nó
      const updatedEdges = prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
  
      if (newParentId) {
        // Adiciona a nova aresta se um novo pai for selecionado
        updatedEdges.push({ id: `${newParentId}-${nodeId}`, source: newParentId, target: nodeId });
      }
  
      return updatedEdges;
    });
  }, [setEdges]);

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode: nodeOperations.addNode,
    deleteNode: nodeOperations.deleteNode,
    updateNodeLabel,
    updateNodeColor,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
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
