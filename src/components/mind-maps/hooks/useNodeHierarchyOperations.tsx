
import { useCallback } from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';

interface UseNodeHierarchyOperationsProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
  hiddenNodes: Set<string>;
  setHiddenNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const useNodeHierarchyOperations = ({ 
  nodes, 
  edges, 
  setNodes, 
  setEdges, 
  hiddenNodes, 
  setHiddenNodes 
}: UseNodeHierarchyOperationsProps) => {
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
    getDirectChildren,
    getAllDescendants,
    toggleNodeVisibility,
    getAvailableParents,
    changeNodeToMain,
    changeNodeToChild,
    changeNodeToGrandchild,
    reconnectNode
  };
};
