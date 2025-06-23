
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProcessFolder } from '@/types/processDocuments';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';

interface EditFolderDialogProps {
  folder: ProcessFolder;
  isOpen: boolean;
  onClose: () => void;
}

const EditFolderDialog = ({ folder, isOpen, onClose }: EditFolderDialogProps) => {
  const { updateFolder } = useProcessDocuments();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (folder) {
      setFormData({
        name: folder.name,
        description: folder.description || '',
        is_public: folder.is_public,
      });
    }
  }, [folder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await updateFolder(folder.id, formData);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar pasta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pasta</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Pasta *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Vendas, Operacional, RH..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição da pasta"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
            />
            <Label htmlFor="is_public">Tornar pasta pública</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.name.trim() || isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolderDialog;
