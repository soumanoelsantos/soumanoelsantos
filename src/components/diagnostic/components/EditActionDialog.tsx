
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActionItem } from '../NewDiagnosticTestContent';

interface EditActionDialogProps {
  editingAction: ActionItem | null;
  setEditingAction: (action: ActionItem | null) => void;
  onSaveEdit: () => void;
}

const EditActionDialog = ({ editingAction, setEditingAction, onSaveEdit }: EditActionDialogProps) => {
  if (!editingAction) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEdit();
  };

  return (
    <Dialog open={!!editingAction} onOpenChange={() => setEditingAction(null)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Editar Ação</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-acao">Nome da Ação</Label>
            <Input
              id="edit-acao"
              value={editingAction.acao}
              onChange={(e) => setEditingAction({ ...editingAction, acao: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-categoria">Categoria</Label>
              <Select 
                value={editingAction.categoria} 
                onValueChange={(value) => setEditingAction({ ...editingAction, categoria: value as ActionItem['categoria'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="comercial" className="bg-white hover:bg-gray-50">Comercial</SelectItem>
                  <SelectItem value="marketing" className="bg-white hover:bg-gray-50">Marketing</SelectItem>
                  <SelectItem value="gestao" className="bg-white hover:bg-gray-50">Gestão</SelectItem>
                  <SelectItem value="financeiro" className="bg-white hover:bg-gray-50">Financeiro</SelectItem>
                  <SelectItem value="rh" className="bg-white hover:bg-gray-50">RH</SelectItem>
                  <SelectItem value="operacional" className="bg-white hover:bg-gray-50">Operacional</SelectItem>
                  <SelectItem value="tecnologia" className="bg-white hover:bg-gray-50">Tecnologia</SelectItem>
                  <SelectItem value="cultura" className="bg-white hover:bg-gray-50">Cultura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-prioridade">Prioridade</Label>
              <Select 
                value={editingAction.prioridade} 
                onValueChange={(value) => setEditingAction({ ...editingAction, prioridade: value as ActionItem['prioridade'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="alta" className="bg-white hover:bg-gray-50">Alta</SelectItem>
                  <SelectItem value="media" className="bg-white hover:bg-gray-50">Média</SelectItem>
                  <SelectItem value="baixa" className="bg-white hover:bg-gray-50">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-responsavel">Responsável</Label>
              <Input
                id="edit-responsavel"
                value={editingAction.responsavel}
                onChange={(e) => setEditingAction({ ...editingAction, responsavel: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-prazo">Prazo</Label>
              <Input
                id="edit-prazo"
                value={editingAction.prazo}
                onChange={(e) => setEditingAction({ ...editingAction, prazo: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-recursos">Recursos Necessários</Label>
            <Input
              id="edit-recursos"
              value={editingAction.recursos || ''}
              onChange={(e) => setEditingAction({ ...editingAction, recursos: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="edit-metricas">Métricas de Sucesso</Label>
            <Input
              id="edit-metricas"
              value={editingAction.metricas}
              onChange={(e) => setEditingAction({ ...editingAction, metricas: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="edit-beneficios">Benefícios Esperados</Label>
            <Textarea
              id="edit-beneficios"
              value={editingAction.beneficios}
              onChange={(e) => setEditingAction({ ...editingAction, beneficios: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="edit-detalhes">Detalhes de Implementação</Label>
            <Textarea
              id="edit-detalhes"
              value={editingAction.detalhesImplementacao}
              onChange={(e) => setEditingAction({ ...editingAction, detalhesImplementacao: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="edit-dica">Dica da IA</Label>
            <Textarea
              id="edit-dica"
              value={editingAction.dicaIA}
              onChange={(e) => setEditingAction({ ...editingAction, dicaIA: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setEditingAction(null)}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditActionDialog;
