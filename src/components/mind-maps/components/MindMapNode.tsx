
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { MindMapNode as MindMapNodeType } from '@/types/mindMap';

interface MindMapNodeProps {
  node: MindMapNodeType;
  isSelected: boolean;
  isDragged: boolean;
  hasConnections: boolean;
  hasHiddenConnections: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleConnections: () => void;
}

const MindMapNode = ({
  node,
  isSelected,
  isDragged,
  hasConnections,
  hasHiddenConnections,
  onMouseDown,
  onClick,
  onEdit,
  onDelete,
  onToggleConnections
}: MindMapNodeProps) => {
  return (
    <div
      className={`absolute cursor-move select-none ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } ${isDragged ? 'z-50' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <Card className="min-w-[120px] shadow-lg hover:shadow-xl transition-shadow relative">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: node.data.color }}
            />
            {hasConnections && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleConnections();
                }}
                title={hasHiddenConnections ? "Mostrar toda a cadeia conectada" : "Ocultar toda a cadeia conectada"}
              >
                {hasHiddenConnections ? (
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
            <div className="flex gap-1 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
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
