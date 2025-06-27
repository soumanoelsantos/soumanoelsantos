
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import { useBasicNodeOperations } from './useBasicNodeOperations';
import { useNodeHierarchyOperations } from './useNodeHierarchyOperations';
import { useNodeLayoutOperations } from './useNodeLayoutOperations';

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
  const basicOperations = useBasicNodeOperations({ 
    nodes, 
    edges, 
    setNodes, 
    setEdges 
  });

  const hierarchyOperations = useNodeHierarchyOperations({ 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    hiddenNodes, 
    setHiddenNodes 
  });

  const layoutOperations = useNodeLayoutOperations({ 
    nodes, 
    selectedNode, 
    setNodes 
  });

  return {
    ...basicOperations,
    ...hierarchyOperations,
    ...layoutOperations
  };
};
