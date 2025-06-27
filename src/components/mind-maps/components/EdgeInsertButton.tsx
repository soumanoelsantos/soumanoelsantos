
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EdgeInsertButtonProps {
  sourceId: string;
  targetId: string;
  position: { x: number; y: number };
  onInsertNode: (sourceId: string, targetId: string) => void;
}

const EdgeInsertButton = ({ sourceId, targetId, position, onInsertNode }: EdgeInsertButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInsertNode(sourceId, targetId);
  };

  return (
    <div
      className="absolute z-50 pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Button
        size="sm"
        variant="default"
        className="h-6 w-6 p-0 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg border-2 border-white"
        onClick={handleClick}
        title="Inserir nó aqui"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default EdgeInsertButton;
