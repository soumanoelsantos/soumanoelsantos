
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus, Eye, EyeOff, GitBranch, Palette, StickyNote } from 'lucide-react';
import { MindMapNodeData } from '@/types/mindMap';
import NodeAttachmentsDialog from './NodeAttachmentsDialog';

interface MindMapNodeComponentProps extends NodeProps {
  data: MindMapNodeData & {
    onEdit?: () => void;
    onDelete?: () => void;
    onAddChild?: () => void;
    onToggleVisibility?: () => void;
    onReconnect?: () => void;
    onChangeColor?: () => void;
    onOpenNotes?: () => void;
    onUpdateNodeAttachments?: (attachments: any[]) => void;
    hasChildren?: boolean;
    hasHiddenChildren?: boolean;
    mindMapId?: string;
  };
  isSelected?: boolean;
}

const MindMapNodeComponent = ({ data, isSelected, id }: MindMapNodeComponentProps) => {
  const { 
    label, 
    color = '#ffffff', 
    notes, 
    attachments = [],
    onEdit, 
    onDelete, 
    onAddChild, 
    onToggleVisibility, 
    onReconnect, 
    onChangeColor,
    onOpenNotes,
    onUpdateNodeAttachments,
    hasChildren,
    hasHiddenChildren,
    mindMapId
  } = data;

  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  const handleAddChild = () => {
    if (onAddChild) onAddChild();
  };

  const handleToggleVisibility = () => {
    if (onToggleVisibility) onToggleVisibility();
  };

  const handleReconnect = () => {
    if (onReconnect) onReconnect();
  };

  const handleChangeColor = () => {
    if (onChangeColor) onChangeColor();
  };

  const handleOpenNotes = () => {
    if (onOpenNotes) onOpenNotes();
  };

  const handleUpdateAttachments = (newAttachments: any[]) => {
    if (onUpdateNodeAttachments) {
      onUpdateNodeAttachments(newAttachments);
    }
  };

  const nodeStyle = {
    backgroundColor: color,
    borderColor: color === '#ffffff' ? '#e5e7eb' : color,
    borderWidth: '2px',
    borderStyle: 'solid'
  };

  return (
    <div 
      className={`group relative min-w-[120px] max-w-[200px] rounded-lg p-3 shadow-md transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={nodeStyle}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-blue-500 !border-2 !border-white"
      />
      
      <div className="text-sm font-medium text-gray-800 break-words">
        {label}
      </div>
      
      {notes && (
        <div className="mt-1 text-xs text-gray-600 italic truncate" title={notes}>
          📝 {notes.length > 30 ? `${notes.substring(0, 30)}...` : notes}
        </div>
      )}

      {attachments.length > 0 && (
        <div className="mt-1 text-xs text-blue-600">
          📎 {attachments.length} anexo{attachments.length > 1 ? 's' : ''}
        </div>
      )}

      <div className="absolute -top-2 -right-2 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {mindMapId && (
          <NodeAttachmentsDialog
            nodeId={id}
            mindMapId={mindMapId}
            attachments={attachments}
            onUpdateAttachments={handleUpdateAttachments}
          />
        )}
        
        {notes && (
          <Button
            size="sm"
            variant="ghost"
            className="h-5 w-5 p-0 hover:bg-gray-100 text-orange-600"
            onClick={handleOpenNotes}
            title="Ver anotações"
          >
            <StickyNote className="h-3 w-3" />
          </Button>
        )}
        
        <Button
          size="sm"
          variant="ghost"  
          className="h-5 w-5 p-0 hover:bg-gray-100"
          onClick={handleEdit}
          title="Editar"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-gray-100"
          onClick={handleAddChild}
          title="Adicionar filho"
        >
          <Plus className="h-3 w-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-gray-100"
          onClick={handleChangeColor}
          title="Mudar cor"
        >
          <Palette className="h-3 w-3" />
        </Button>
        
        {hasChildren && (
          <Button
            size="sm"
            variant="ghost"
            className={`h-5 w-5 p-0 hover:bg-gray-100 ${hasHiddenChildren ? 'text-orange-500' : ''}`}
            onClick={handleToggleVisibility}
            title={hasHiddenChildren ? "Mostrar conexões ocultas" : "Ocultar conexões"}
          >
            {hasHiddenChildren ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </Button>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-gray-100"
          onClick={handleReconnect}
          title="Reconectar"
        >
          <GitBranch className="h-3 w-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          className="h-5 w-5 p-0 hover:bg-red-100 text-red-600"
          onClick={handleDelete}
          title="Excluir"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
};

export default MindMapNodeComponent;
