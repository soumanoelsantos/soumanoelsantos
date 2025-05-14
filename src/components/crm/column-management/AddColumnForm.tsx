
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddColumnFormProps {
  onAddColumn: (name: string) => Promise<boolean>;
  isSubmitting: boolean;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn, isSubmitting }) => {
  const [newColumnName, setNewColumnName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnName.trim()) return;
    
    const success = await onAddColumn(newColumnName.trim());
    if (success) {
      setNewColumnName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1">
        <Label htmlFor="new-column">Nova Coluna</Label>
        <Input
          id="new-column"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Nome da coluna"
        />
      </div>
      <Button type="submit" disabled={isSubmitting || !newColumnName.trim()}>
        Adicionar
      </Button>
    </form>
  );
};

export default AddColumnForm;
