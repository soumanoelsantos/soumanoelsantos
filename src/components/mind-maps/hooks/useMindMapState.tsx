import { useState, useCallback } from 'react';
import { MindMapNode, MindMapEdge, MindMapContent, MindMapAttachment } from '@/types/mindMap';

export const useMindMapState = (initialContent: MindMapContent) => {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialContent.nodes || []);
  const [edges, setEdges] = useState<MindMapEdge[]>(initialContent.edges || []);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hiddenNodes, setHiddenNodes] = useState<Set<string>>(new Set());

  const addNode = useCallback((label: string, connectToNodeId?: string) => {
    setNodes(prevNodes => {
      const newNodeId = Date.now().toString();
      const newNode: MindMapNode = {
        id: newNodeId,
        type: 'default',
        position: {
          x: 0,
          y: 0
        },
        data: {
          label: label
        }
      };

      const newEdge: MindMapEdge = connectToNodeId ? {
        id: `${connectToNodeId}-${newNodeId}`,
        source: connectToNodeId,
        target: newNodeId
      } : null;

      return [
        ...prevNodes,
        newNode,
        ...(newEdge ? [newEdge] : [])
      ].map((node, index, arr) => ({
        ...node,
        position: {
          x: node.position.x || 100 + index * 100,
          y: node.position.y || 100
        }
      }));
    });

    if (connectToNodeId) {
      setEdges(prevEdges => {
        const newEdgeId = `${connectToNodeId}-${Date.now().toString()}`;
        const newEdge: MindMapEdge = {
          id: newEdgeId,
          source: connectToNodeId,
          target: Date.now().toString()
        };
        return [...prevEdges, newEdge];
      });
    }
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  }, []);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, []);

  const updateNodePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prevNodes =>
      prevNodes.map(node => (node.id === id ? { ...node, position } : node))
    );
  }, []);

  const updateNodeNotes = useCallback((id: string, notes: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, notes } } : node
      )
    );
  }, []);

  const toggleNodeVisibility = useCallback((nodeId: string) => {
    setHiddenNodes(prevHiddenNodes => {
      const newHiddenNodes = new Set(prevHiddenNodes);
      if (newHiddenNodes.has(nodeId)) {
        newHiddenNodes.delete(nodeId);
        // Make children visible
        edges.forEach(edge => {
          if (edge.source === nodeId) {
            newHiddenNodes.delete(edge.target);
          }
        });
      } else {
        newHiddenNodes.add(nodeId);
        // Hide children
        edges.forEach(edge => {
          if (edge.source === nodeId) {
            newHiddenNodes.add(edge.target);
          }
        });
      }
      return newHiddenNodes;
    });
  }, [edges]);

  const getAvailableParents = useCallback((nodeId: string) => {
    return nodes.filter(node => node.id !== nodeId);
  }, [nodes]);

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prevEdges => prevEdges.filter(edge => edge.target !== nodeId));
  }, []);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prevEdges => {
      // Remove existing edges where this node is a target
      const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
      
      // Add the new edge
      const newEdge: MindMapEdge = {
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId
      };
      
      return [...filteredEdges, newEdge];
    });
  }, []);

  const changeNodeToGrandchild = useCallback((nodeId: string, grandparentId: string) => {
    setEdges(prevEdges => {
      // Find the parent of the node
      const parentEdge = prevEdges.find(edge => edge.target === nodeId);
      
      if (parentEdge) {
        const parentId = parentEdge.source;
        
        // Remove existing edges where this node is a target
        const filteredEdges = prevEdges.filter(edge => edge.target !== nodeId);
        
        // Remove the edge between the node and its original parent
        const filteredEdges2 = filteredEdges.filter(edge => edge.source !== parentId || edge.target !== nodeId);
        
        // Add the new edge between the grandparent and the original parent
        const newEdgeToParent: MindMapEdge = {
          id: `${grandparentId}-${parentId}`,
          source: grandparentId,
          target: parentId
        };
        
        // Add the new edge between the original parent and the node
        const newEdgeToNode: MindMapEdge = {
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId
        };
        
        return [...filteredEdges2, newEdgeToParent, newEdgeToNode];
      }
      
      return prevEdges;
    });
  }, []);

  const alignNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selectedNodeObj = nodes.find(node => node.id === selectedNode);
      if (selectedNodeObj) {
        setNodes(prevNodes =>
          prevNodes.map(node =>
            selectedNodes.includes(node.id)
              ? { ...node, position: { ...node.position, y: selectedNodeObj.position.y } }
              : node
          )
        );
      }
    }
  }, [nodes, selectedNode, selectedNodes]);

  const alignNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selectedNodeObj = nodes.find(node => node.id === selectedNode);
      if (selectedNodeObj) {
        setNodes(prevNodes =>
          prevNodes.map(node =>
            selectedNodes.includes(node.id)
              ? { ...node, position: { ...node.position, x: selectedNodeObj.position.x } }
              : node
          )
        );
      }
    }
  }, [nodes, selectedNode, selectedNodes]);

  const distributeNodesHorizontally = useCallback(() => {
    if (selectedNodes.length >= 2) {
      const selectedNodesArray = nodes.filter(node => selectedNodes.includes(node.id)).sort((a, b) => a.position.x - b.position.x);
      const minX = selectedNodesArray[0].position.x;
      const maxX = selectedNodesArray[selectedNodesArray.length - 1].position.x;
      const spacing = (maxX - minX) / (selectedNodes.length - 1);

      setNodes(prevNodes =>
        prevNodes.map(node => {
          if (selectedNodes.includes(node.id)) {
            const index = selectedNodesArray.findIndex(n => n.id === node.id);
            return { ...node, position: { ...node.position, x: minX + index * spacing } };
          }
          return node;
        })
      );
    }
  }, [nodes, selectedNodes]);

  const distributeNodesVertically = useCallback(() => {
    if (selectedNodes.length >= 2) {
      const selectedNodesArray = nodes.filter(node => selectedNodes.includes(node.id)).sort((a, b) => a.position.y - b.position.y);
      const minY = selectedNodesArray[0].position.y;
      const maxY = selectedNodesArray[selectedNodesArray.length - 1].position.y;
      const spacing = (maxY - minY) / (selectedNodes.length - 1);

      setNodes(prevNodes =>
        prevNodes.map(node => {
          if (selectedNodes.includes(node.id)) {
            const index = selectedNodesArray.findIndex(n => n.id === node.id);
            return { ...node, position: { ...node.position, y: minY + index * spacing } };
          }
          return node;
        })
      );
    }
  }, [nodes, selectedNodes]);

  const arrangeInGrid = useCallback(() => {
    if (selectedNodes.length > 0) {
      const numCols = Math.ceil(Math.sqrt(selectedNodes.length));
      setNodes(prevNodes =>
        prevNodes.map(node => {
          if (selectedNodes.includes(node.id)) {
            const index = selectedNodes.indexOf(node.id);
            const col = index % numCols;
            const row = Math.floor(index / numCols);
            return { ...node, position: { x: 100 + col * 150, y: 100 + row * 100 } };
          }
          return node;
        })
      );
    }
  }, [selectedNodes]);

  const moveNodeInList = useCallback((nodeId: string, direction: 'up' | 'down') => {
    setNodes(prevNodes => {
      const nodeIndex = prevNodes.findIndex(node => node.id === nodeId);
      if (nodeIndex === -1) return prevNodes;

      const newNodes = [...prevNodes];
      const temp = newNodes[nodeIndex];

      if (direction === 'up' && nodeIndex > 0) {
        newNodes[nodeIndex] = newNodes[nodeIndex - 1];
        newNodes[nodeIndex - 1] = temp;
      } else if (direction === 'down' && nodeIndex < newNodes.length - 1) {
        newNodes[nodeIndex] = newNodes[nodeIndex + 1];
        newNodes[nodeIndex + 1] = temp;
      }

      return newNodes;
    });
  }, []);

  const updateNodeAttachments = useCallback((nodeId: string, attachments: MindMapAttachment[]) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, attachments } }
          : node
      )
    );
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    hiddenNodes,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments, // Nova função exportada
    toggleNodeVisibility,
    getAvailableParents,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid,
    moveNodeInList
  };
};
