
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ProcessDocument, ProcessFolder } from '@/types/processDocuments';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import AdvancedTextEditor from './AdvancedTextEditor';

interface EditDocumentDialogProps {
  document: ProcessDocument;
  folders: ProcessFolder[];
  isOpen: boolean;
  onClose: () => void;
}

const EditDocumentDialog = ({ document, folders, isOpen, onClose }: EditDocumentDialogProps) => {
  const { updateDocument } = useProcessDocuments();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    category: 'geral',
    folder_id: 'no-folder',
    is_public: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        content: document.content,
        description: document.description || '',
        category: document.category,
        folder_id: document.folder_id || 'no-folder',
        is_public: document.is_public,
      });
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        folder_id: formData.folder_id === 'no-folder' ? undefined : formData.folder_id,
      };
      await updateDocument(document.id, dataToSubmit);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Documento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Playbook de Vendas, Manual de Atendimento..."
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="atendimento">Atendimento</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Breve descrição do documento"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="folder">Pasta (opcional)</Label>
            <Select value={formData.folder_id} onValueChange={(value) => setFormData(prev => ({ ...prev, folder_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma pasta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-folder">Sem pasta</SelectItem>
                {folders.map(folder => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Conteúdo do Documento</Label>
            <AdvancedTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Digite o conteúdo do documento aqui...

Você pode usar formatação markdown:
- **texto em negrito**
- *texto em itálico*
- ## Para títulos
- • Para listas com marcadores
- 1. Para listas numeradas

Use a barra de ferramentas acima para facilitar a formatação!"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_public: checked }))}
            />
            <Label htmlFor="is_public">Tornar documento público (pode ser compartilhado via link)</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentDialog;
