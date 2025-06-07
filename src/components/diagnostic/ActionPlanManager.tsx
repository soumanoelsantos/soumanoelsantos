
import React, { useState, useRef } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Filter,
  BarChart3,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { ActionItem } from './NewDiagnosticTestContent';
import DraggableActionItem from './DraggableActionItem';

interface ActionPlanManagerProps {
  actionPlan: ActionItem[];
  companyName: string;
  diagnosticData: any;
  onBack: () => void;
  onUpdatePlan: (plan: ActionItem[]) => void;
}

const ActionPlanManager = ({ 
  actionPlan, 
  companyName, 
  diagnosticData, 
  onBack, 
  onUpdatePlan 
}: ActionPlanManagerProps) => {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [actions, setActions] = useState<ActionItem[]>(actionPlan);
  const [filteredActions, setFilteredActions] = useState<ActionItem[]>(actionPlan);
  const [filterCategory, setFilterCategory] = useState<string>('todas');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Atualizar ações filtradas quando actions, filtros ou busca mudarem
  React.useEffect(() => {
    let filtered = actions;

    // Filtro por categoria
    if (filterCategory !== 'todas') {
      filtered = filtered.filter(action => action.categoria === filterCategory);
    }

    // Filtro por status
    if (filterStatus !== 'todos') {
      filtered = filtered.filter(action => action.status === filterStatus);
    }

    // Busca por texto
    if (searchTerm) {
      filtered = filtered.filter(action => 
        action.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActions(filtered);
  }, [actions, filterCategory, filterStatus, searchTerm]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = actions.findIndex(item => item.id === active.id);
      const newIndex = actions.findIndex(item => item.id === over.id);
      
      const reorderedActions = arrayMove(actions, oldIndex, newIndex);
      setActions(reorderedActions);
      onUpdatePlan(reorderedActions);
      
      toast({
        title: "Ordem atualizada",
        description: "A ordem das ações foi atualizada com sucesso.",
      });
    }
  };

  const handleEdit = (action: ActionItem) => {
    setEditingAction(action);
  };

  const handleSaveEdit = () => {
    if (!editingAction) return;

    const updatedActions = actions.map(action => 
      action.id === editingAction.id ? editingAction : action
    );
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    setEditingAction(null);
    
    toast({
      title: "Ação atualizada",
      description: "A ação foi atualizada com sucesso.",
    });
  };

  const handleDelete = (id: string) => {
    const updatedActions = actions.filter(action => action.id !== id);
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    
    toast({
      title: "Ação removida",
      description: "A ação foi removida com sucesso.",
    });
  };

  const handleAdd = () => {
    if (!newAction.acao) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha pelo menos o nome da ação.",
      });
      return;
    }

    const actionToAdd: ActionItem = {
      id: `action_${Date.now()}`,
      acao: newAction.acao || '',
      categoria: newAction.categoria as ActionItem['categoria'] || 'gestao',
      prioridade: newAction.prioridade as ActionItem['prioridade'] || 'media',
      prazo: newAction.prazo || '1 semana',
      responsavel: newAction.responsavel || 'A definir',
      recursos: newAction.recursos || 'A definir',
      metricas: newAction.metricas || 'A definir',
      beneficios: newAction.beneficios || 'A definir',
      dataVencimento: new Date(),
      concluida: false,
      detalhesImplementacao: newAction.detalhesImplementacao || '',
      dicaIA: newAction.dicaIA || 'Implemente esta ação seguindo as melhores práticas.',
      status: newAction.status as ActionItem['status'] || 'pendente',
      semana: newAction.semana || 1,
      comoFazer: newAction.comoFazer || ['Definir plano de implementação', 'Executar plano', 'Monitorar resultados'],
      completedSteps: []
    };

    const updatedActions = [...actions, actionToAdd];
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
    setShowAddDialog(false);
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
    
    toast({
      title: "Ação adicionada",
      description: "Nova ação foi adicionada com sucesso.",
    });
  };

  const handleStatusChange = (id: string, status: ActionItem['status']) => {
    const updatedActions = actions.map(action => 
      action.id === id ? { ...action, status } : action
    );
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
  };

  const handleStepComplete = (id: string, stepIndex: number, completed: boolean) => {
    const updatedActions = actions.map(action => {
      if (action.id === id) {
        const completedSteps = action.completedSteps || new Array(action.comoFazer.length).fill(false);
        completedSteps[stepIndex] = completed;
        
        // Se todos os passos estão completos, marcar como realizado
        const allCompleted = completedSteps.every(step => step);
        const newStatus = allCompleted ? 'realizado' : action.status;
        
        return { 
          ...action, 
          completedSteps, 
          status: newStatus,
          concluida: allCompleted 
        };
      }
      return action;
    });
    
    setActions(updatedActions);
    onUpdatePlan(updatedActions);
  };

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu plano de ação está sendo gerado.",
    });

    generatePDF(pdfRef.current, `plano_acao_${companyName.replace(/\s+/g, '_')}.pdf`);
  };

  // Calcular estatísticas
  const totalActions = actions.length;
  const completedActions = actions.filter(a => a.status === 'realizado').length;
  const inProgressActions = actions.filter(a => a.status === 'em_andamento').length;
  const pendingActions = actions.filter(a => a.status === 'pendente').length;
  const completionPercentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Plano de Aceleração Empresarial</h1>
            <p className="text-gray-600">{companyName} • {totalActions} ações estratégicas</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={downloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Estatísticas de Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Ações</p>
              <p className="text-2xl font-bold">{totalActions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold">{completedActions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold">{inProgressActions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Progresso</p>
              <p className="text-2xl font-bold">{completionPercentage}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
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

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="realizado">Realizado</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Buscar ações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAdd}>
                      Adicionar Ação
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Lista de Ações com Drag and Drop */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredActions.map(a => a.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {filteredActions.map((action, index) => (
              <DraggableActionItem
                key={action.id}
                action={action}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onStepComplete={handleStepComplete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredActions.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Nenhuma ação encontrada com os filtros aplicados.</p>
        </Card>
      )}

      {/* Dialog de Edição */}
      {editingAction && (
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
                <Button onClick={handleSaveEdit}>
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Conteúdo oculto para PDF */}
      <div ref={pdfRef} className="pdf-export" style={{ display: 'none' }}>
        <div className="action-plan-section p-8 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Plano de Aceleração Empresarial</h1>
            <h2 className="text-xl text-gray-600">{companyName}</h2>
            <p className="text-gray-500 mt-2">{totalActions} ações estratégicas para acelerar seu negócio</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Resumo do Progresso</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalActions}</div>
                <div className="text-sm text-gray-600">Total de Ações</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedActions}</div>
                <div className="text-sm text-gray-600">Concluídas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{inProgressActions}</div>
                <div className="text-sm text-gray-600">Em Andamento</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
                <div className="text-sm text-gray-600">Progresso</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {actions.map((action, index) => (
              <div key={action.id} className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900">
                    {index + 1}. {action.acao}
                  </h4>
                  <div className="flex space-x-2 mt-2">
                    <span className="badge text-xs px-2 py-1 rounded">{action.categoria}</span>
                    <span className="badge text-xs px-2 py-1 rounded">{action.prioridade}</span>
                    <span className="badge text-xs px-2 py-1 rounded">{action.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <strong>Prazo:</strong> {action.prazo}
                  </div>
                  <div>
                    <strong>Responsável:</strong> {action.responsavel}
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="font-medium text-sm">Métricas de Sucesso:</h5>
                  <p className="text-xs text-gray-600">{action.metricas}</p>
                </div>

                <div className="mb-3">
                  <h5 className="font-medium text-sm">Como Fazer na Prática:</h5>
                  <ul className="list-decimal list-inside text-xs space-y-1 mt-1">
                    {action.comoFazer.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-700">{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-2 rounded text-xs">
                  <strong>💡 Dica da IA:</strong> {action.dicaIA}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlanManager;
