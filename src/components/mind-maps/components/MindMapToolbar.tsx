
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save, LayoutGrid, List } from 'lucide-react';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  isSaving?: boolean;
  viewMode?: 'canvas' | 'list';
  onViewModeChange?: (mode: 'canvas' | 'list') => void;
}

const MindMapToolbar = ({ 
  onAddNode, 
  onSave, 
  isSaving = false,
  viewMode = 'canvas',
  onViewModeChange
}: MindMapToolbarProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <Button onClick={onAddNode} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nó
        </Button>
        
        {onViewModeChange && (
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'canvas' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('canvas')}
              className="rounded-r-none"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Mapa
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
          </div>
        )}
      </div>
      
      <Button 
        onClick={onSave} 
        disabled={isSaving}
        size="sm"
        variant="outline"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Salvando...' : 'Salvar'}
      </Button>
    </div>
  );
};

export default MindMapToolbar;
