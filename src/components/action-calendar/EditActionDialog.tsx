
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActionCalendar, CreateActionData } from '@/types/actionCalendar';

interface EditActionDialogProps {
  action: ActionCalendar;
  isOpen: boolean;
  onClose: () => void;
  onUpdateAction: (id: string, data: Partial<CreateActionData>) => Promise<ActionCalendar>;
}

const EditActionDialog = ({ action, isOpen, onClose, onUpdateAction }: EditActionDialogProps) => {
  const [formData, setFormData] = useState<Partial<CreateActionData>>({
    title: action.title,
    description: action.description || '',
    responsible_person: action.responsible_person,
    department: action.department,
    due_date: action.due_date,
    status: action.status,
    details: action.details || '',
    is_public: action.is_public,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.responsible_person || !formData.department || !formData.due_date) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdateAction(action.id, formData);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar ação:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: action.title,
      description: action.description || '',
      responsible_person: action.responsible_person,
      department: action.department,
      due_date: action.due_date,
      status: action.status,
      details: action.details || '',
      is_public: action.is_public,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Ação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nome da Ação *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Implementar novo sistema"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Data Limite *</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Breve descrição da ação"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsible_person">Pessoa Responsável *</Label>
              <Input
                id="responsible_person"
                value={formData.responsible_person || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, responsible_person: e.target.value }))}
                placeholder="Ex: João Silva"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Setor Responsável *</Label>
              <Input
                id="department"
                value={formData.department || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Ex: TI, Marketing, Vendas"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Detalhes de Execução</Label>
            <Textarea
              id="details"
              value={formData.details || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
              placeholder="Descreva como a ação será realizada, passos necessários, recursos etc."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditActionDialog;
