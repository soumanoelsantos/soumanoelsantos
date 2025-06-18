
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, Eye, EyeOff, Network } from 'lucide-react';
import { MindMapNode as MindMapNodeType } from '@/types/mindMap';

interface MindMapNodeProps {
  node: MindMapNodeType;
  isSelected: boolean;
  isDragged: boolean;
  hasChildNodes: boolean;
  hasHiddenDirectChildren: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleConnections: () => void;
  onChangeType: () => void;
}

const MindMapNode = ({
  node,
  isSelected,
  isDragged,
  hasChildNodes,
  hasHiddenDirectChildren,
  onMouseDown,
  onClick,
  onEdit,
  onDelete,
  onToggleConnections,
  onChangeType
}: MindMapNodeProps) => {
  return (
    <div
      className={`absolute cursor-move select-none ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${isDragged ? 'z-50' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <Card className={`min-w-[120px] shadow-lg hover:shadow-xl transition-all relative ${
        isSelected ? 'border-blue-500 bg-blue-50' : ''
      }`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: node.data.color }}
            />
            {hasChildNodes && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleConnections();
                }}
                title={hasHiddenDirectChildren ? "Mostrar próximo nível" : "Ocultar filhos diretos"}
              >
                {hasHiddenDirectChildren ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <EyeOff className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
          
          <div className="text-sm font-medium text-center break-words">
            {node.data.label}
          </div>
          
          {isSelected && (
            <div className="flex gap-1 mt-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                title="Editar nó"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeType();
                }}
                title="Alterar tipo do nó"
              >
                <Network className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                title="Excluir nó"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MindMapNode;
