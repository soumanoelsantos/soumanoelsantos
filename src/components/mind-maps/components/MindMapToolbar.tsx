
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save, Loader2 } from 'lucide-react';

interface MindMapToolbarProps {
  onAddNode: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

const MindMapToolbar = ({ onAddNode, onSave, isSaving = false }: MindMapToolbarProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <Button
        onClick={onAddNode}
        size="sm"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Adicionar Nó
      </Button>
      
      <Button
        onClick={onSave}
        variant="outline"
        size="sm"
        disabled={isSaving}
        className="flex items-center gap-2"
      >
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        Salvar Agora
      </Button>
      
      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Salvamento automático ativo
      </div>
    </div>
  );
};

export default MindMapToolbar;
