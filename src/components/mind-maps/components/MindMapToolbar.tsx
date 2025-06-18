
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const MindMapToolbar = ({ onAddNode, onSave, isSaving }: MindMapToolbarProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <Button
        onClick={onAddNode}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Adicionar Nó
      </Button>
      
      <Button
        onClick={onSave}
        disabled={isSaving}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        {isSaving ? 'Salvando...' : 'Salvar'}
      </Button>
    </div>
  );
};

export default MindMapToolbar;
