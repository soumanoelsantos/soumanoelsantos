import React from 'react';
import { MindMapNode, MindMapEdge } from '@/types/mindMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Plus, 
  ChevronUp, 
  ChevronDown,
  NotebookPen,
  Paperclip
} from 'lucide-react';

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
  console.log('MindMapListView renderizando com', nodes.length, 'nodes');
  
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

  const hasDirectChildren = (nodeId: string): boolean => {
    return getChildNodes(nodeId).length > 0;
  };

  const hasHiddenDirectChildren = (nodeId: string): boolean => {
    const directChildren = getChildNodes(nodeId);
    return directChildren.some(childId => hiddenNodes.has(childId));
  };

  const buildHierarchy = (parentId: string | null = null, level: number = 0): any[] => {
    return edges
      .filter(edge => {
        if (parentId === null) {
          return !edges.some(e => e.target === edge.source);
        }
        return edge.source === parentId;
      })
      .map(edge => {
        const nodeId = parentId === null ? edge.source : edge.target;
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return null;

        return {
          ...node,
          level,
          children: buildHierarchy(nodeId, level + 1)
        };
      })
      .filter(Boolean);
  };

  const renderNode = (nodeData: any): React.ReactNode => {
    if (hiddenNodes.has(nodeData.id)) {
      return null;
    }

    const node = nodeData as MindMapNode & { level: number; children: any[] };
    const hasNotes = node.data.notes && node.data.notes.trim().length > 0;
    const hasAttachments = node.data.attachments && node.data.attachments.length > 0;
    const nodeHasChildren = hasDirectChildren(node.id);
    const nodeHasHiddenChildren = hasHiddenDirectChildren(node.id);

    return (
      <div key={node.id} className="mb-2">
        <Card 
          className={`transition-colors cursor-pointer ${
            selectedNode === node.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          style={{ marginLeft: `${node.level * 20}px` }}
          onClick={() => onNodeClick(node.id)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: node.data.color || '#3b82f6' }}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm break-words">
                    {node.data.label}
                  </div>
                  
                  {(hasNotes || hasAttachments) && (
                    <div className="flex gap-2 mt-1">
                      {hasNotes && (
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1 py-0.5 rounded">
                          <NotebookPen className="h-2 w-2" />
                          <span>Notas</span>
                        </div>
                      )}
                      {hasAttachments && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                          <Paperclip className="h-2 w-2" />
                          <span>{node.data.attachments!.length}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {nodeHasChildren && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleNodeVisibility(node.id);
                      }}
                      title={nodeHasHiddenChildren ? "Mostrar filhos" : "Ocultar filhos"}
                    >
                      {nodeHasHiddenChildren ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddChildNode(node.id);
                    }}
                    title="Adicionar nó filho"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenNodeNotes(node.id);
                    }}
                    title="Ver/Editar notas"
                  >
                    <NotebookPen className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditNode(node.id);
                    }}
                    title="Editar nó"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveNode(node.id, 'up');
                    }}
                    title="Mover para cima"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveNode(node.id, 'down');
                    }}
                    title="Mover para baixo"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode(node.id);
                    }}
                    title="Excluir nó"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Render children recursively */}
        {node.children && node.children.map((child: any) => renderNode(child))}
      </div>
    );
  };

  const hierarchy = buildHierarchy();

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">Nenhum nó criado</p>
          <p className="text-sm">Adicione o primeiro nó para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Estrutura do Mapa Mental</h2>
        <div className="text-sm text-gray-500">
          {nodes.length} nó{nodes.length !== 1 ? 's' : ''} • {visibleNodes.length} visível{visibleNodes.length !== 1 ? 'eis' : ''}
        </div>
      </div>

      <div className="space-y-2">
        {hierarchy.map((node: any) => renderNode(node))}
      </div>
    </div>
  );
};

export default MindMapListView;
