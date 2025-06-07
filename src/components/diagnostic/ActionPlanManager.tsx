import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Filter, CheckCircle2, Clock, AlertTriangle, Target, TrendingUp, Users, DollarSign, Settings, Lightbulb, ArrowLeft, Download, Edit, Trash2, Plus, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generatePDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { ActionItem } from './NewDiagnosticTestContent';

interface ActionPlanManagerProps {
  actionPlan: ActionItem[];
  companyName?: string;
  diagnosticData?: any;
  onBack?: () => void;
  onUpdatePlan?: (updatedPlan: ActionItem[]) => void;
}

const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ 
  actionPlan: initialActionPlan, 
  companyName,
  diagnosticData,
  onBack,
  onUpdatePlan 
}) => {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionPlan);
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    categoria: 'comercial',
    prioridade: 'media',
    status: 'pendente'
  });

  const updateActions = (updatedActions: ActionItem[]) => {
    setActionItems(updatedActions);
    onUpdatePlan?.(updatedActions);
  };

  const toggleActionStatus = (actionId: string, comoFazerIndex?: number) => {
    const updatedActions = actionItems.map(action => {
      if (action.id === actionId) {
        if (comoFazerIndex !== undefined) {
          // Toggle individual step
          const updatedComoFazer = [...action.comoFazer];
          const step = updatedComoFazer[comoFazerIndex];
          if (step.startsWith('✓ ')) {
            updatedComoFazer[comoFazerIndex] = step.substring(2);
          } else {
            updatedComoFazer[comoFazerIndex] = '✓ ' + step;
          }
          
          // Check if all steps are completed
          const allCompleted = updatedComoFazer.every(step => step.startsWith('✓ '));
          
          return {
            ...action,
            comoFazer: updatedComoFazer,
            concluida: allCompleted,
            status: allCompleted ? 'realizado' as const : 'pendente' as const
          };
        } else {
          // Toggle entire action
          return {
            ...action,
            concluida: !action.concluida,
            status: action.status === 'realizado' ? 'pendente' as const : 'realizado' as const
          };
        }
      }
      return action;
    });
    updateActions(updatedActions);
  };

  const updateActionStatus = (actionId: string, newStatus: ActionItem['status']) => {
    const updatedActions = actionItems.map(action => 
      action.id === actionId 
        ? { ...action, status: newStatus, concluida: newStatus === 'realizado' }
        : action
    );
    updateActions(updatedActions);
  };

  const deleteAction = (actionId: string) => {
    const updatedActions = actionItems.filter(action => action.id !== actionId);
    updateActions(updatedActions);
    toast({
      title: "Ação removida",
      description: "A ação foi removida do plano.",
    });
  };

  const moveAction = (actionId: string, direction: 'up' | 'down') => {
    const currentIndex = actionItems.findIndex(action => action.id === actionId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= actionItems.length) return;
    
    const updatedActions = [...actionItems];
    [updatedActions[currentIndex], updatedActions[newIndex]] = [updatedActions[newIndex], updatedActions[currentIndex]];
    
    updateActions(updatedActions);
  };

  const saveAction = () => {
    if (editingAction) {
      const updatedActions = actionItems.map(action => 
        action.id === editingAction.id ? editingAction : action
      );
      updateActions(updatedActions);
      setEditingAction(null);
      toast({
        title: "Ação atualizada",
        description: "As alterações foram salvas.",
      });
    }
  };

  const addNewAction = () => {
    if (!newAction.acao) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "O título da ação é obrigatório.",
      });
      return;
    }

    const action: ActionItem = {
      id: `action_${Date.now()}`,
      acao: newAction.acao!,
      categoria: newAction.categoria as ActionItem['categoria'] || 'comercial',
      prioridade: newAction.prioridade as ActionItem['prioridade'] || 'media',
      prazo: newAction.prazo || '1 semana',
      responsavel: newAction.responsavel || 'Responsável',
      recursos: newAction.recursos || 'A definir',
      metricas: newAction.metricas || 'A definir',
      beneficios: newAction.beneficios || 'A definir',
      dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: newAction.detalhesImplementacao || '',
      dicaIA: 'Ação criada manualmente pelo usuário',
      status: newAction.status as ActionItem['status'] || 'pendente',
      semana: 1,
      comoFazer: newAction.comoFazer || ['Definir passos específicos para implementação']
    };

    const updatedActions = [...actionItems, action];
    updateActions(updatedActions);
    setIsAddingAction(false);
    setNewAction({
      categoria: 'comercial',
      prioridade: 'media',
      status: 'pendente'
    });
    
    toast({
      title: "Ação adicionada",
      description: "Nova ação foi adicionada ao plano.",
    });
  };

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    // Add PDF styles
    pdfRef.current.classList.add('pdf-export');
    
    toast({
      title: "Download iniciado!",
      description: "O PDF do seu plano de ação está sendo gerado.",
    });

    generatePDF(pdfRef.current, `plano-acao-${companyName || 'empresa'}.pdf`);
    
    // Remove PDF styles after generation
    setTimeout(() => {
      pdfRef.current?.classList.remove('pdf-export');
    }, 1000);
  };

  const filteredActions = useMemo(() => {
    return actionItems.filter(action => {
      const categoriaMatch = filtroCategoria === 'todas' || action.categoria === filtroCategoria;
      const statusMatch = filtroStatus === 'todos' || action.status === filtroStatus;
      return categoriaMatch && statusMatch;
    });
  }, [actionItems, filtroCategoria, filtroStatus]);

  const getIconeCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return <TrendingUp className="h-4 w-4" />;
      case 'gestao': return <Target className="h-4 w-4" />;
      case 'rh': return <Users className="h-4 w-4" />;
      case 'marketing': return <Target className="h-4 w-4" />;
      case 'financeiro': return <DollarSign className="h-4 w-4" />;
      case 'operacional': return <Settings className="h-4 w-4" />;
      case 'tecnologia': return <Settings className="h-4 w-4" />;
      case 'cultura': return <Users className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getCorCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return 'bg-green-100 text-green-800';
      case 'gestao': return 'bg-blue-100 text-blue-800';
      case 'rh': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-orange-100 text-orange-800';
      case 'financeiro': return 'bg-red-100 text-red-800';
      case 'operacional': return 'bg-gray-100 text-gray-800';
      case 'tecnologia': return 'bg-cyan-100 text-cyan-800';
      case 'cultura': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'realizado': return 'text-green-600';
      case 'em_andamento': return 'text-yellow-600';
      case 'atrasado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'realizado': return <CheckCircle2 className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'atrasado': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const acoesRealizadas = actionItems.filter(action => action.concluida).length;
  const progresso = actionItems.length > 0 ? (acoesRealizadas / actionItems.length) * 100 : 0;

  return (
    <div ref={pdfRef} className="space-y-6 action-plan-section">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white print:bg-white print:text-black">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">
                {companyName ? `Plano de Aceleração - ${companyName}` : 'Plano de Aceleração Empresarial'}
              </CardTitle>
              <p className="text-blue-100 print:text-gray-600">
                {actionItems.length} ações estratégicas personalizadas
              </p>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button 
                onClick={downloadPDF}
                className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 font-semibold"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
              {onBack && (
                <Button 
                  onClick={onBack} 
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Novo Diagnóstico
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progresso */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Progresso do Plano</h3>
            <span className="text-2xl font-bold text-blue-600">{Math.round(progresso)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{acoesRealizadas} de {actionItems.length} ações concluídas</span>
            <span>{actionItems.length - acoesRealizadas} restantes</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Plano de Ação Personalizado ({filteredActions.length} ações)
            </CardTitle>
            <div className="print:hidden">
              <Dialog open={isAddingAction} onOpenChange={setIsAddingAction}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Ação
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Ação</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="acao">Título da Ação</Label>
                      <Input
                        id="acao"
                        value={newAction.acao || ''}
                        onChange={(e) => setNewAction({...newAction, acao: e.target.value})}
                        placeholder="Descreva a ação..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="categoria">Categoria</Label>
                        <Select value={newAction.categoria} onValueChange={(value) => setNewAction({...newAction, categoria: value as ActionItem['categoria']})}>
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
                        <Select value={newAction.prioridade} onValueChange={(value) => setNewAction({...newAction, prioridade: value as ActionItem['prioridade']})}>
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
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Input
                        id="responsavel"
                        value={newAction.responsavel || ''}
                        onChange={(e) => setNewAction({...newAction, responsavel: e.target.value})}
                        placeholder="Nome do responsável..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="detalhes">Detalhes da Implementação</Label>
                      <Textarea
                        id="detalhes"
                        value={newAction.detalhesImplementacao || ''}
                        onChange={(e) => setNewAction({...newAction, detalhesImplementacao: e.target.value})}
                        placeholder="Descreva como implementar esta ação..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addNewAction}>Adicionar</Button>
                      <Button variant="outline" onClick={() => setIsAddingAction(false)}>Cancelar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 print:hidden">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filtrar por Categoria:</label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="todas">Todas as categorias</SelectItem>
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
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filtrar por Status:</label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Ações */}
          <div className="space-y-4">
            {filteredActions.map((action, index) => (
              <Card key={action.id} className={`border-l-4 ${action.status === 'realizado' ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={action.concluida}
                        onCheckedChange={() => toggleActionStatus(action.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium ${action.concluida ? 'line-through text-gray-500' : ''}`}>
                          {action.acao}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getCorCategoria(action.categoria)}>
                            {getIconeCategoria(action.categoria)}
                            <span className="ml-1 capitalize">{action.categoria}</span>
                          </Badge>
                          <Select value={action.status} onValueChange={(value) => updateActionStatus(action.id, value as ActionItem['status'])}>
                            <SelectTrigger className="w-32 h-6 text-xs">
                              <div className={`flex items-center gap-1 ${getStatusColor(action.status)}`}>
                                {getStatusIcon(action.status)}
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendente">Pendente</SelectItem>
                              <SelectItem value="em_andamento">Em Andamento</SelectItem>
                              <SelectItem value="realizado">Realizado</SelectItem>
                              <SelectItem value="atrasado">Atrasado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(action.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        <div>Prazo: {action.prazo}</div>
                      </div>
                      <div className="flex flex-col gap-1 print:hidden">
                        <Button size="sm" variant="outline" onClick={() => moveAction(action.id, 'up')} disabled={index === 0}>
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => moveAction(action.id, 'down')} disabled={index === filteredActions.length - 1}>
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingAction(action)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Editar Ação</DialogTitle>
                            </DialogHeader>
                            {editingAction && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-acao">Título da Ação</Label>
                                  <Input
                                    id="edit-acao"
                                    value={editingAction.acao}
                                    onChange={(e) => setEditingAction({...editingAction, acao: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-categoria">Categoria</Label>
                                    <Select value={editingAction.categoria} onValueChange={(value) => setEditingAction({...editingAction, categoria: value as ActionItem['categoria']})}>
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
                                    <Label htmlFor="edit-responsavel">Responsável</Label>
                                    <Input
                                      id="edit-responsavel"
                                      value={editingAction.responsavel}
                                      onChange={(e) => setEditingAction({...editingAction, responsavel: e.target.value})}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-detalhes">Detalhes da Implementação</Label>
                                  <Textarea
                                    id="edit-detalhes"
                                    value={editingAction.detalhesImplementacao}
                                    onChange={(e) => setEditingAction({...editingAction, detalhesImplementacao: e.target.value})}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={saveAction}>Salvar</Button>
                                  <Button variant="outline" onClick={() => setEditingAction(null)}>Cancelar</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="destructive" onClick={() => deleteAction(action.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Como Fazer na Prática */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      Como Fazer na Prática:
                    </h5>
                    <div className="space-y-2">
                      {action.comoFazer?.map((passo, passoIndex) => (
                        <div key={passoIndex} className="flex items-start gap-2">
                          <Checkbox 
                            checked={passo.startsWith('✓ ')}
                            onCheckedChange={() => toggleActionStatus(action.id, passoIndex)}
                            className="mt-0.5" 
                          />
                          <span className={`text-sm ${passo.startsWith('✓ ') ? 'line-through text-gray-500' : 'text-blue-900'}`}>
                            {passo.startsWith('✓ ') ? passo.substring(2) : passo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {action.recursos && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Recursos necessários:</strong> {action.recursos}
                    </div>
                  )}

                  {action.metricas && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Métricas de sucesso:</strong> {action.metricas}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPlanManager;
