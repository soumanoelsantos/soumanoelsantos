
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActionItem } from '../NewDiagnosticTestContent';

interface EditActionDialogProps {
  editingAction: ActionItem | null;
  setEditingAction: (action: ActionItem | null) => void;
  onSaveEdit: () => void;
}

const EditActionDialog = ({ editingAction, setEditingAction, onSaveEdit }: EditActionDialogProps) => {
  if (!editingAction) return null;

  return (
    <Dialog open={!!editingAction} onOpenChange={() => setEditingAction(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Ação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-acao">Ação</Label>
            <Textarea
              id="edit-acao"
              value={editingAction.acao}
              onChange={(e) => setEditingAction({...editingAction, acao: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-categoria">Categoria</Label>
              <Select 
                value={editingAction.categoria} 
                onValueChange={(value) => setEditingAction({...editingAction, categoria: value as ActionItem['categoria']})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="gestao">Gestão</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="cultura">Cultura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="edit-prioridade">Prioridade</Label>
              <Select 
                value={editingAction.prioridade} 
                onValueChange={(value) => setEditingAction({...editingAction, prioridade: value as ActionItem['prioridade']})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
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
                onChange={(e) => setEditingAction({...editingAction, responsavel: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-prazo">Prazo</Label>
              <Input
                id="edit-prazo"
                value={editingAction.prazo}
                onChange={(e) => setEditingAction({...editingAction, prazo: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-metricas">Métricas de Sucesso</Label>
            <Textarea
              id="edit-metricas"
              value={editingAction.metricas}
              onChange={(e) => setEditingAction({...editingAction, metricas: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingAction(null)}>
              Cancelar
            </Button>
            <Button onClick={onSaveEdit}>
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditActionDialog;
