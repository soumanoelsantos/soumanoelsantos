
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateFolderData, ProcessFolder } from '@/types/processDocuments';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';

interface CreateFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parentFolderId?: string;
  folders?: ProcessFolder[];
}

const CreateFolderDialog = ({ isOpen, onClose, parentFolderId, folders = [] }: CreateFolderDialogProps) => {
  const { createFolder } = useProcessDocuments();
  const [formData, setFormData] = useState<CreateFolderData>({
    name: '',
    description: '',
    is_public: false,
    parent_folder_id: parentFolderId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await createFolder(formData);
      setFormData({
        name: '',
        description: '',
        is_public: false,
        parent_folder_id: parentFolderId,
      });
      onClose();
    } catch (error) {
      console.error('Erro ao criar pasta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        description: '',
        is_public: false,
        parent_folder_id: parentFolderId,
      });
      onClose();
    }
  };

  // Filter folders to prevent circular references
  const availableFolders = folders.filter(folder => 
    !parentFolderId || folder.id !== parentFolderId
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Pasta</DialogTitle>
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

          {!parentFolderId && (
            <div>
              <Label htmlFor="parent_folder">Pasta Pai (Opcional)</Label>
              <Select
                value={formData.parent_folder_id || ''}
                onValueChange={(value) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    parent_folder_id: value || undefined 
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma pasta pai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma (pasta raiz)</SelectItem>
                  {availableFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
            />
            <Label htmlFor="is_public">Tornar pasta pública</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.name.trim() || isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar Pasta'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
