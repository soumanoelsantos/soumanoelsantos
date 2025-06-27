
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2, Eye, EyeOff, Network, NotebookPen, Plus, Paperclip } from 'lucide-react';
import { MindMapNode as MindMapNodeType } from '@/types/mindMap';
import NodeAttachmentsDialog from './NodeAttachmentsDialog';

interface MindMapNodeProps {
  node: MindMapNodeType;
  isSelected: boolean;
  isDragged: boolean;
  hasChildNodes: boolean;
  hasHiddenDirectChildren: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleConnections: () => void;
  onChangeType: () => void;
  onOpenNotes: () => void;
  onAddChild: () => void;
  onReconnect?: () => void;
  onUpdateNodeAttachments?: (attachments: any[]) => void;
}

const MindMapNode = ({
  node,
  isSelected,
  isDragged,
  hasChildNodes,
  hasHiddenDirectChildren,
  onMouseDown,
  onTouchStart,
  onClick,
  onEdit,
  onDelete,
  onToggleConnections,
  onChangeType,
  onOpenNotes,
  onAddChild,
  onReconnect,
  onUpdateNodeAttachments
}: MindMapNodeProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if not clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onMouseDown(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start dragging if not touching buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (onTouchStart) {
      onTouchStart(e);
    }
  };

  const hasNotes = node.data.notes && node.data.notes.trim().length > 0;
  const hasAttachments = node.data.attachments && node.data.attachments.length > 0;

  return (
    <div
      className={`absolute select-none group ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${isDragged ? 'z-50 scale-105' : 'z-10'} transition-all duration-200`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(-50%, -50%)',
        cursor: isDragged ? 'grabbing' : 'grab',
        zIndex: isDragged ? 1000 : 100
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={onClick}
    >
      <Card className={`min-w-[120px] max-w-[200px] shadow-lg hover:shadow-xl transition-all relative ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'bg-white'
      } ${isDragged ? 'shadow-2xl' : ''}`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: node.data.color }}
              />
              <Button
                size="sm"
                variant="ghost"
                className={`h-5 w-5 p-0 hover:bg-gray-100 ${
                  hasNotes ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNotes();
                }}
                title={hasNotes ? "Ver/Editar notas" : "Adicionar notas"}
              >
                <NotebookPen className="h-3 w-3" />
              </Button>
              
              {onUpdateNodeAttachments && (
                <NodeAttachmentsDialog
                  attachments={node.data.attachments || []}
                  onUpdateAttachments={(attachments) => onUpdateNodeAttachments(attachments)}
                />
              )}
            </div>
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
          
          <div className="text-sm font-medium text-center break-words pointer-events-none mb-2">
            {node.data.label}
          </div>
          
          {/* Indicadores de conteúdo */}
          {(hasAttachments || hasNotes) && (
            <div className="flex justify-center gap-1 mb-2">
              {hasAttachments && (
                <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                  <Paperclip className="h-2 w-2" />
                  <span>{node.data.attachments!.length}</span>
                </div>
              )}
              {hasNotes && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1 py-0.5 rounded">
                  <NotebookPen className="h-2 w-2" />
                </div>
              )}
            </div>
          )}
          
          {isSelected && (
            <div className="flex gap-1 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                title="Editar nó"
                className="h-6 px-2 text-xs"
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
                className="h-6 px-2 text-xs"
              >
                <Network className="h-3 w-3" />
              </Button>
              {onReconnect && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReconnect();
                  }}
                  title="Reconectar nó"
                  className="h-6 px-2 text-xs"
                >
                  <Network className="h-3 w-3" />
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                title="Excluir nó"
                className="h-6 px-2 text-xs"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Child Button - appears on hover */}
      <Button
        size="sm"
        variant="default"
        className="absolute -bottom-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          onAddChild();
        }}
        title="Adicionar nó filho"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default MindMapNode;
