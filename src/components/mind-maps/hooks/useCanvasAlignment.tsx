
import { useCallback } from 'react';
import { Node } from '@xyflow/react';

interface UseCanvasAlignmentProps {
  nodes: Node[];
  selectedNode: string | null;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export const useCanvasAlignment = ({ nodes, selectedNode, setNodes }: UseCanvasAlignmentProps) => {
  const alignNodesHorizontally = useCallback(() => {
    if (!selectedNode) return;
    const selectedNodeObj = nodes.find(n => n.id === selectedNode);
    if (!selectedNodeObj) return;
    
    setNodes((prev) => prev.map(node => 
      node.id === selectedNode ? node : { ...node, position: { ...node.position, y: selectedNodeObj.position.y } }
    ));
  }, [selectedNode, nodes, setNodes]);

  const alignNodesVertically = useCallback(() => {
    if (!selectedNode) return;
    const selectedNodeObj = nodes.find(n => n.id === selectedNode);
    if (!selectedNodeObj) return;
    
    setNodes((prev) => prev.map(node => 
      node.id === selectedNode ? node : { ...node, position: { ...node.position, x: selectedNodeObj.position.x } }
    ));
  }, [selectedNode, nodes, setNodes]);

  const distributeNodesHorizontally = useCallback(() => {
    const selectedNodes = nodes.filter(n => n.id === selectedNode);
    if (selectedNodes.length < 2) return;
    
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.x - b.position.x);
    const totalWidth = sortedNodes[sortedNodes.length - 1].position.x - sortedNodes[0].position.x;
    const spacing = totalWidth / (sortedNodes.length - 1);
    
    setNodes((prev) => prev.map(node => {
      const index = sortedNodes.findIndex(n => n.id === node.id);
      if (index === -1) return node;
      return { ...node, position: { ...node.position, x: sortedNodes[0].position.x + index * spacing } };
    }));
  }, [selectedNode, nodes, setNodes]);

  const distributeNodesVertically = useCallback(() => {
    const selectedNodes = nodes.filter(n => n.id === selectedNode);
    if (selectedNodes.length < 2) return;
    
    const sortedNodes = [...selectedNodes].sort((a, b) => a.position.y - b.position.y);
    const totalHeight = sortedNodes[sortedNodes.length - 1].position.y - sortedNodes[0].position.y;
    const spacing = totalHeight / (sortedNodes.length - 1);
    
    setNodes((prev) => prev.map(node => {
      const index = sortedNodes.findIndex(n => n.id === node.id);
      if (index === -1) return node;
      return { ...node, position: { ...node.position, y: sortedNodes[0].position.y + index * spacing } };
    }));
  }, [selectedNode, nodes, setNodes]);

  const arrangeInGrid = useCallback(() => {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const spacing = 200;
    
    setNodes((prev) => prev.map((node, index) => ({
      ...node,
      position: {
        x: (index % cols) * spacing,
        y: Math.floor(index / cols) * spacing
      }
    })));
  }, [nodes.length, setNodes]);

  return {
    alignNodesHorizontally,
    alignNodesVertically,
    distributeNodesHorizontally,
    distributeNodesVertically,
    arrangeInGrid
  };
};
