
import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  FileText,
  Move3D,
  Palette
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NodeNotesDialog from './NodeNotesDialog';
import NodeAttachmentsDialog from './NodeAttachmentsDialog';

interface MindMapNodeData extends Record<string, unknown> {
  label: string;
  color?: string;
  notes?: string;
  attachments?: any[];
  mindMapId?: string;
  onEdit?: (id: string, label: string) => void;
  onDelete?: (id: string) => void;
  onAddChild?: (parentId: string) => void;
  onToggleVisibility?: (nodeId: string) => void;
  onReconnect?: (nodeId: string) => void;
  onChangeColor?: (nodeId: string, color: string) => void;
  hasChildren?: boolean;
  childrenVisible?: boolean;
}

const MindMapNode = ({ 
  id, 
  data
}: NodeProps<MindMapNodeData>) => {
  const [showNotes, setShowNotes] = useState(false);

  const handleEditClick = useCallback(() => {
    if (data?.onEdit) {
      data.onEdit(id, data.label);
    }
  }, [id, data]);

  const handleDeleteClick = useCallback(() => {
    if (data?.onDelete) {
      data.onDelete(id);
    }
  }, [id, data]);

  const handleAddChildClick = useCallback(() => {
    if (data?.onAddChild) {
      data.onAddChild(id);
    }
  }, [id, data]);

  const handleToggleVisibilityClick = useCallback(() => {
    if (data?.onToggleVisibility) {
      data.onToggleVisibility(id);
    }
  }, [id, data]);

  const handleReconnectClick = useCallback(() => {
    if (data?.onReconnect) {
      data.onReconnect(id);
    }
  }, [id, data]);

  const handleColorChange = useCallback((color: string) => {
    if (data?.onChangeColor) {
      data.onChangeColor(id, color);
    }
  }, [id, data]);

  const handleUpdateNotes = useCallback((notes: string) => {
    // Notes are updated through the callback that already exists
    console.log('Notes updated for node:', id, notes);
  }, [id]);

  const handleUpdateAttachments = useCallback((attachments: any[]) => {
    // Attachments are updated through the callback that already exists
    console.log('Attachments updated for node:', id, attachments);
  }, [id]);

  const nodeStyle = {
    backgroundColor: data?.color || '#ffffff',
    borderColor: data?.color ? `${data.color}80` : '#e5e7eb',
  };

  const colors = [
    '#ffffff', // White
    '#fef3c7', // Light yellow
    '#dbeafe', // Light blue
    '#dcfce7', // Light green
    '#fce7f3', // Light pink
    '#f3e8ff', // Light purple
    '#fed7d7', // Light red
    '#e0f2fe', // Light cyan
  ];

  return (
    <>
      <div 
        className="group relative bg-white border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 min-w-[200px] max-w-[300px]"
        style={nodeStyle}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
        />
        
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 break-words leading-tight">
                {data?.label || 'New Node'}
              </div>
              {data?.notes && (
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {data.notes}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Notes Button */}
              <Button
                size="sm"
                variant="ghost"
                className={`h-5 w-5 p-0 hover:bg-gray-100 ${
                  data?.notes ? 'text-orange-600' : 'text-gray-400'
                }`}
                onClick={() => setShowNotes(true)}
                title={data?.notes ? "View notes" : "Add notes"}
              >
                <FileText className="h-3 w-3" />
              </Button>

              {/* Attachments Button */}
              {data?.mindMapId && (
                <NodeAttachmentsDialog
                  nodeId={id}
                  mindMapId={data.mindMapId as string}
                  attachments={data?.attachments || []}
                  onUpdateAttachments={handleUpdateAttachments}
                />
              )}

              {/* Options menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 hover:bg-gray-100"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit text
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAddChildClick}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add child
                  </DropdownMenuItem>
                  {data?.hasChildren && (
                    <DropdownMenuItem onClick={handleToggleVisibilityClick}>
                      {data?.childrenVisible ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide children
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Show children
                        </>
                      )}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleReconnectClick}>
                    <Move3D className="h-4 w-4 mr-2" />
                    Reconnect
                  </DropdownMenuItem>
                  
                  {/* Color submenu */}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1">
                    <div className="text-xs text-gray-500 mb-2 flex items-center">
                      <Palette className="h-3 w-3 mr-1" />
                      Node color
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange(color)}
                          className="w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          title={color === '#ffffff' ? 'White' : color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleDeleteClick}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove node
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
        />
      </div>

      {/* Notes Dialog */}
      <NodeNotesDialog
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        nodeId={id}
        initialNotes={data?.notes as string || ''}
        onSave={handleUpdateNotes}
      />
    </>
  );
};

export default MindMapNode;
