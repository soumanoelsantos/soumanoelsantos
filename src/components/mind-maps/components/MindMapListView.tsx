
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, NotebookPen, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';

interface MindMapListViewProps {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  selectedNode: string | null;
  hiddenNodes: Set<string>;
  onNodeClick: (nodeId: string) => void;
  onEditNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onOpenNodeNotes: (nodeId: string) => void;
  onAddChildNode: (parentNodeId: string) => void;
  onToggleNodeVisibility: (nodeId: string) => void;
  onMoveNode: (nodeId: string, direction: 'up' | 'down') => void;
}

const MindMapListView = ({
  nodes,
  edges,
  selectedNode,
  hiddenNodes,
  onNodeClick,
  onEditNode,
  onDeleteNode,
  onOpenNodeNotes,
  onAddChildNode,
  onToggleNodeVisibility,
  onMoveNode
}: MindMapListViewProps) => {
  const getNodeLevel = (nodeId: string): number => {
    let level = 0;
    let currentId = nodeId;
    
    while (true) {
      const parentEdge = edges.find(edge => edge.target === currentId);
      if (!parentEdge) break;
      level++;
      currentId = parentEdge.source;
    }
    
    return level;
  };

  const getChildNodes = (nodeId: string): string[] => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => edge.target);
  };

  const hasHiddenDirectChildren = (nodeId: string): boolean => {
    const directChildren = getChildNodes(nodeId);
    return directChildren.some(childId => hiddenNodes.has(childId));
  };

  const buildHierarchicalList = (): MindMapNode[] => {
    const rootNodes = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );
    
    const result: MindMapNode[] = [];
    
    const addNodeAndChildren = (node: MindMapNode, visited = new Set<string>()) => {
      if (visited.has(node.id) || hiddenNodes.has(node.id)) return;
      
      visited.add(node.id);
      result.push(node);
      
      const children = nodes.filter(childNode => 
        edges.some(edge => edge.source === node.id && edge.target === childNode.id) &&
        !hiddenNodes.has(childNode.id)
      );
      
      children.forEach(child => addNodeAndChildren(child, visited));
    };
    
    rootNodes.forEach(root => addNodeAndChildren(root));
    
    return result;
  };

  const hierarchicalNodes = buildHierarchicalList();
  const hasNotes = (node: MindMapNode) => node.data.notes && node.data.notes.trim().length > 0;

  return (
    <div className="p-4 space-y-2 max-w-4xl mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        {hierarchicalNodes.length} nós • Formato Lista
      </div>
      
      {hierarchicalNodes.map((node, index) => {
        const level = getNodeLevel(node.id);
        const hasChildren = getChildNodes(node.id).length > 0;
        const hasHiddenChildren = hasHiddenDirectChildren(node.id);
        const isSelected = selectedNode === node.id;
        
        return (
          <Card 
            key={node.id} 
            className={`transition-all duration-200 ${
              isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
            }`}
            style={{ marginLeft: `${level * 24}px` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: node.data.color }}
                    />
                  </div>
                  
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => onNodeClick(node.id)}
                  >
                    <div className="font-medium text-gray-900">
                      {node.data.label}
                    </div>
                    {hasNotes(node) && (
                      <div className="text-xs text-blue-600 mt-1">
                        📝 Possui anotações
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Nível {level}
                    </span>
                    
                    {hasChildren && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => onToggleNodeVisibility(node.id)}
                        title={hasHiddenChildren ? "Mostrar filhos" : "Ocultar filhos"}
                      >
                        {hasHiddenChildren ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => onMoveNode(node.id, 'up')}
                    disabled={index === 0}
                    title="Mover para cima"
                  >
                    ↑
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => onMoveNode(node.id, 'down')}
                    disabled={index === hierarchicalNodes.length - 1}
                    title="Mover para baixo"
                  >
                    ↓
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-7 w-7 p-0 ${hasNotes(node) ? 'text-blue-600' : 'text-gray-400'}`}
                    onClick={() => onOpenNodeNotes(node.id)}
                    title={hasNotes(node) ? "Ver/Editar notas" : "Adicionar notas"}
                  >
                    <NotebookPen className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-green-600"
                    onClick={() => onAddChildNode(node.id)}
                    title="Adicionar filho"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-blue-600"
                    onClick={() => onEditNode(node.id)}
                    title="Editar nó"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-600"
                    onClick={() => onDeleteNode(node.id)}
                    title="Deletar nó"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {hierarchicalNodes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-lg mb-2">Nenhum nó encontrado</div>
          <div className="text-sm">Adicione um nó para começar</div>
        </div>
      )}
    </div>
  );
};

export default MindMapListView;
