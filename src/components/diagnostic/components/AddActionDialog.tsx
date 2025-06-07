
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface AddActionDialogProps {
  onAddAction: (action: Partial<ActionItem>) => boolean;
}

const AddActionDialog = ({ onAddAction }: AddActionDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    acao: '',
    categoria: 'gestao',
    prioridade: 'media',
    prazo: '1 semana',
    responsavel: '',
    recursos: '',
    metricas: '',
    beneficios: '',
    detalhesImplementacao: '',
    dicaIA: '',
    status: 'pendente',
    semana: 1,
    comoFazer: []
  });

  const handleAdd = () => {
    const success = onAddAction(newAction);
    if (success) {
      setShowDialog(false);
      setNewAction({
        acao: '',
        categoria: 'gestao',
        prioridade: 'media',
        prazo: '1 semana',
        responsavel: '',
        recursos: '',
        metricas: '',
        beneficios: '',
        detalhesImplementacao: '',
        dicaIA: '',
        status: 'pendente',
        semana: 1,
        comoFazer: []
      });
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Ação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Ação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="acao">Ação</Label>
            <Textarea
              id="acao"
              value={newAction.acao}
              onChange={(e) => setNewAction({...newAction, acao: e.target.value})}
              placeholder="Descreva a ação..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select 
                value={newAction.categoria} 
                onValueChange={(value) => setNewAction({...newAction, categoria: value as ActionItem['categoria']})}
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
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select 
                value={newAction.prioridade} 
                onValueChange={(value) => setNewAction({...newAction, prioridade: value as ActionItem['prioridade']})}
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
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={newAction.responsavel}
                onChange={(e) => setNewAction({...newAction, responsavel: e.target.value})}
                placeholder="Nome do responsável"
              />
            </div>
            
            <div>
              <Label htmlFor="prazo">Prazo</Label>
              <Input
                id="prazo"
                value={newAction.prazo}
                onChange={(e) => setNewAction({...newAction, prazo: e.target.value})}
                placeholder="ex: 2 semanas"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="metricas">Métricas de Sucesso</Label>
            <Textarea
              id="metricas"
              value={newAction.metricas}
              onChange={(e) => setNewAction({...newAction, metricas: e.target.value})}
              placeholder="Como medir o sucesso desta ação..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>
              Adicionar Ação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddActionDialog;
