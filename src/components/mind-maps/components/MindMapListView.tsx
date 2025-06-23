
import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, NotebookPen, Plus, GripVertical, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';

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

  if (hierarchicalNodes.length === 0) {
    return (
      <div className="p-6 space-y-4 max-w-5xl mx-auto">
        <div className="text-sm text-gray-500 mb-6 bg-white p-3 rounded-lg shadow-sm">
          📋 Lista de Nós • Nenhum nó encontrado
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum nó encontrado
            </h3>
            <div className="text-sm text-gray-500">Adicione um nó para começar</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <div className="text-sm text-gray-500 mb-6 bg-white p-3 rounded-lg shadow-sm border">
        📋 {hierarchicalNodes.length} nós • Visualização em Lista • Arraste para reordenar
      </div>
      
      <div className="space-y-3">
        {hierarchicalNodes.map((node, index) => {
          const level = getNodeLevel(node.id);
          const hasChildren = getChildNodes(node.id).length > 0;
          const hasHiddenChildren = hasHiddenDirectChildren(node.id);
          const isSelected = selectedNode === node.id;
          
          return (
            <Card 
              key={node.id} 
              className={`transition-all duration-200 hover:shadow-md border ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
              }`}
              style={{ marginLeft: `${level * 24}px` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab hover:text-gray-600" />
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: node.data.color || '#6b7280' }}
                      />
                    </div>
                    
                    <div 
                      className="flex-1 cursor-pointer py-1" 
                      onClick={() => onNodeClick(node.id)}
                    >
                      <div className="font-medium text-gray-900">
                        {node.data.label}
                      </div>
                      {hasNotes(node) && (
                        <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                          📝 Possui anotações
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Nível {level}
                      </span>
                      
                      {hasChildren && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
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
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => onMoveNode(node.id, 'down')}
                      disabled={index === hierarchicalNodes.length - 1}
                      title="Mover para baixo"
                    >
                      <ChevronDown className="h-3 w-3" />
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
      </div>
    </div>
  );
};

export default MindMapListView;
