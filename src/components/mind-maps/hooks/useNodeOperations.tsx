
import { useCallback } from 'react';
import { MindMapNode, MindMapEdge, MindMapAttachment } from '@/types/mindMap';

interface UseNodeOperationsProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
  selectedNode: string | null;
  hiddenNodes: Set<string>;
  setHiddenNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const useNodeOperations = ({ 
  nodes, 
  edges, 
  setNodes, 
  setEdges, 
  selectedNode, 
  hiddenNodes, 
  setHiddenNodes 
}: UseNodeOperationsProps) => {
  const addNode = useCallback((label: string, connectToNodeId?: string) => {
    const newNodeId = Date.now().toString();
    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position: {
        x: 200 + Math.random() * 200,
        y: 200 + Math.random() * 200
      },
      data: {
        label: label
      }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);

    // If connectToNodeId is provided, create an edge
    if (connectToNodeId) {
      setEdges(prevEdges => [...prevEdges, {
        id: `${connectToNodeId}-${newNodeId}`,
        source: connectToNodeId,
        target: newNodeId
      }]);
    }

    return newNodeId;
  }, [setNodes, setEdges]);

  const addNodeAtPosition = useCallback((label: string, position: { x: number; y: number }) => {
    const newNodeId = Date.now().toString();
    const newNode: MindMapNode = {
      id: newNodeId,
      type: 'default',
      position,
      data: {
        label: label
      }
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
    return newNodeId;
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    setEdges(prevEdges => prevEdges.filter(edge => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, [setNodes]);

  const updateNodePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prevNodes =>
      prevNodes.map(node => (node.id === id ? { ...node, position } : node))
    );
  }, [setNodes]);

  const updateNodeNotes = useCallback((id: string, notes: string) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, notes } } : node
      )
    );
  }, [setNodes]);

  const updateNodeAttachments = useCallback((nodeId: string, attachments: MindMapAttachment[]) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, attachments } }
          : node
      )
    );
  }, [setNodes]);

  // Função para obter filhos diretos de um nó
  const getDirectChildren = useCallback((nodeId: string): string[] => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => edge.target);
  }, [edges]);

  // Função recursiva para obter todos os descendentes de um nó
  const getAllDescendants = useCallback((nodeId: string): string[] => {
    const descendants: string[] = [];
    const directChildren = getDirectChildren(nodeId);
    
    for (const childId of directChildren) {
      descendants.push(childId);
      // Recursivamente adicionar descendentes do filho
      const childDescendants = getAllDescendants(childId);
      descendants.push(...childDescendants);
    }
    
    return descendants;
  }, [getDirectChildren]);

  // Nova lógica de visibilidade hierárquica com ocultação recursiva
  const toggleNodeVisibility = useCallback((nodeId: string) => {
    console.log('Toggling visibility for node:', nodeId);
    
    // Obter filhos diretos do nó
    const directChildren = getDirectChildren(nodeId);
    console.log('Direct children:', directChildren);
    
    if (directChildren.length === 0) {
      console.log('No children to toggle');
      return;
    }

    setHiddenNodes(prev => {
      const newHiddenNodes = new Set(prev);
      
      // Verificar se algum filho direto está visível
      const hasVisibleChildren = directChildren.some(childId => !newHiddenNodes.has(childId));
      
      if (hasVisibleChildren) {
        // Se tem filhos visíveis, ocultar todos os descendentes (filhos, netos, etc.)
        const allDescendants = getAllDescendants(nodeId);
        console.log('Hiding all descendants:', allDescendants);
        
        allDescendants.forEach(descendantId => {
          newHiddenNodes.add(descendantId);
        });
      } else {
        // Se todos os filhos estão ocultos, mostrar apenas os filhos diretos
        // (os netos permanecerão ocultos até que sejam explicitamente mostrados)
        directChildren.forEach(childId => {
          console.log('Showing direct child:', childId);
          newHiddenNodes.delete(childId);
        });
      }
      
      console.log('New hidden nodes:', Array.from(newHiddenNodes));
      return newHiddenNodes;
    });
  }, [setHiddenNodes, getDirectChildren, getAllDescendants]);

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
  }, [setNodes]);

  const getAvailableParents = useCallback((nodeId: string) => {
    return nodes.filter(node => node.id !== nodeId);
  }, [nodes]);

  const changeNodeToMain = useCallback((nodeId: string) => {
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, [setEdges]);

  const changeNodeToChild = useCallback((nodeId: string, parentId: string) => {
    setEdges(prev => [...prev, { id: `${parentId}-${nodeId}`, source: parentId, target: nodeId }]);
  }, [setEdges]);

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
  }, [getAvailableParents, setEdges]);

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
  }, [nodes, selectedNode, setNodes]);

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
  }, [nodes, selectedNode, setNodes]);

  const distributeNodesHorizontally = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);
        const totalWidth = sortedNodes.reduce((acc, node) => acc + 100, 0);
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
  }, [nodes, selectedNode, setNodes]);

  const distributeNodesVertically = useCallback(() => {
    if (selectedNode) {
      const selected = nodes.find(node => node.id === selectedNode);
      if (selected) {
        const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
        const totalHeight = sortedNodes.reduce((acc, node) => acc + 100, 0);
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
  }, [nodes, selectedNode, setNodes]);

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
  }, [nodes, setNodes]);

  const reconnectNode = useCallback((nodeId: string, newParentId: string | null) => {
    console.log('Reconectando nó:', nodeId, 'para novo pai:', newParentId);
    
    const nodeToMove = nodes.find(n => n.id === nodeId);
    if (!nodeToMove) return;

    // Obter todos os descendentes que serão movidos junto
    const allDescendants = getAllDescendants(nodeId);
    console.log('Descendentes que serão movidos:', allDescendants);
    
    // Calcular nova posição base
    let newBasePosition = { x: 300, y: 300 }; // posição padrão
    
    if (newParentId) {
      const newParent = nodes.find(n => n.id === newParentId);
      if (newParent) {
        // Posicionar próximo ao novo pai
        newBasePosition = {
          x: newParent.position.x + 150,
          y: newParent.position.y + 100
        };
      }
    }
    
    // Calcular offset da posição atual para a nova posição
    const offsetX = newBasePosition.x - nodeToMove.position.x;
    const offsetY = newBasePosition.y - nodeToMove.position.y;
    
    setEdges(prev => {
      // Remover conexão atual do nó principal
      const updatedEdges = prev.filter(edge => edge.target !== nodeId);
      
      // Adicionar nova conexão se houver novo pai
      if (newParentId) {
        updatedEdges.push({ 
          id: `${newParentId}-${nodeId}`, 
          source: newParentId, 
          target: nodeId 
        });
      }
      
      return updatedEdges;
    });

    // Mover o nó principal e todos os seus descendentes mantendo as posições relativas
    setNodes(prev => prev.map(node => {
      if (node.id === nodeId || allDescendants.includes(node.id)) {
        return {
          ...node,
          position: {
            x: node.position.x + offsetX,
            y: node.position.y + offsetY
          }
        };
      }
      return node;
    }));
    
    console.log('Reconexão concluída - nó e descendentes movidos juntos');
  }, [setEdges, nodes, getAllDescendants, setNodes]);

  return {
    addNode,
    addNodeAtPosition,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    updateNodeNotes,
    updateNodeAttachments,
    moveNodeInList,
    getAvailableParents,
    toggleNodeVisibility,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid,
    reconnectNode
  };
};