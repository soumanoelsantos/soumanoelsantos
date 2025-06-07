
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface AddActionDialogProps {
  onAddAction: (action: Partial<ActionItem>) => boolean;
}

const AddActionDialog = ({ onAddAction }: AddActionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    acao: '',
    categoria: 'gestao' as ActionItem['categoria'],
    prioridade: 'media' as ActionItem['prioridade'],
    responsavel: '',
    prazo: '',
    recursos: '',
    metricas: '',
    beneficios: '',
    detalhesImplementacao: '',
    dicaIA: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = onAddAction(formData);
    
    if (success) {
      setFormData({
        acao: '',
        categoria: 'gestao',
        prioridade: 'media',
        responsavel: '',
        prazo: '',
        recursos: '',
        metricas: '',
        beneficios: '',
        detalhesImplementacao: '',
        dicaIA: ''
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Ação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Ação</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="acao">Nome da Ação *</Label>
            <Input
              id="acao"
              value={formData.acao}
              onChange={(e) => setFormData({ ...formData, acao: e.target.value })}
              required
              placeholder="Descreva a ação a ser implementada"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value as ActionItem['categoria'] })}>
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
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={formData.prioridade} onValueChange={(value) => setFormData({ ...formData, prioridade: value as ActionItem['prioridade'] })}>
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
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                placeholder="Nome do responsável"
              />
            </div>

            <div>
              <Label htmlFor="prazo">Prazo</Label>
              <Input
                id="prazo"
                value={formData.prazo}
                onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                placeholder="Ex: 2 semanas"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="recursos">Recursos Necessários</Label>
            <Input
              id="recursos"
              value={formData.recursos}
              onChange={(e) => setFormData({ ...formData, recursos: e.target.value })}
              placeholder="Recursos humanos, financeiros, tecnológicos..."
            />
          </div>

          <div>
            <Label htmlFor="metricas">Métricas de Sucesso</Label>
            <Input
              id="metricas"
              value={formData.metricas}
              onChange={(e) => setFormData({ ...formData, metricas: e.target.value })}
              placeholder="Como medir o sucesso desta ação"
            />
          </div>

          <div>
            <Label htmlFor="beneficios">Benefícios Esperados</Label>
            <Textarea
              id="beneficios"
              value={formData.beneficios}
              onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
              placeholder="Quais benefícios esta ação trará para a empresa"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="detalhesImplementacao">Detalhes de Implementação</Label>
            <Textarea
              id="detalhesImplementacao"
              value={formData.detalhesImplementacao}
              onChange={(e) => setFormData({ ...formData, detalhesImplementacao: e.target.value })}
              placeholder="Como implementar esta ação na prática"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dicaIA">Dica da IA</Label>
            <Textarea
              id="dicaIA"
              value={formData.dicaIA}
              onChange={(e) => setFormData({ ...formData, dicaIA: e.target.value })}
              placeholder="Dica ou orientação especial para esta ação"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar Ação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddActionDialog;
