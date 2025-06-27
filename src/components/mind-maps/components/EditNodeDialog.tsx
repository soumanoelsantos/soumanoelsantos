
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MindMapNode } from '@/types/mindMap';

interface EditNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodes: MindMapNode[];
  onUpdateLabel: (nodeId: string, label: string) => void;
  onUpdateColor?: (nodeId: string, color: string) => void;
}

const EditNodeDialog = ({ 
  isOpen, 
  onClose, 
  nodeId, 
  nodes, 
  onUpdateLabel,
  onUpdateColor 
}: EditNodeDialogProps) => {
  const [editLabel, setEditLabel] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const currentNode = nodeId ? nodes.find(node => node.id === nodeId) : null;

  const colorOptions = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#6B7280', // Gray
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  useEffect(() => {
    if (isOpen && currentNode) {
      setEditLabel(currentNode.data.label);
      setSelectedColor(currentNode.data.color || '#3B82F6');
    }
  }, [isOpen, currentNode]);

  const handleSave = () => {
    if (editLabel.trim() && nodeId) {
      onUpdateLabel(nodeId, editLabel);
      if (onUpdateColor && selectedColor !== currentNode?.data.color) {
        onUpdateColor(nodeId, selectedColor);
      }
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Nó</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Texto</label>
            <Input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder="Digite o novo texto..."
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Cor</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-gray-800 scale-110' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  type="button"
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!editLabel.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditNodeDialog;
