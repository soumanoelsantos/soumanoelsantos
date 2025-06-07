import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Target, TrendingUp, CheckCircle2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AiTipsDialog from '@/components/planejamento/AiTipsDialog';

interface ActionItem {
  id: string;
  acao: string;
  categoria: string;
  prioridade: 'alta' | 'media' | 'baixa';
  prazo: string;
  responsavel: string;
  recursos: string;
  metricas: string;
  beneficios: string;
  dataVencimento: Date;
  concluida: boolean;
  detalhesImplementacao: string;
  dicaIA: string;
  status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
  semana: number;
}

interface ActionPlanManagerProps {
  actionPlan: ActionItem[];
  onUpdateAction: (actionId: string, updates: Partial<ActionItem>) => void;
}

const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ actionPlan, onUpdateAction }) => {
  const [filteredActions, setFilteredActions] = useState<ActionItem[]>(actionPlan);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [priorityFilter, setPriorityFilter] = useState<string>('todas');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update action statuses based on due dates
  useEffect(() => {
    const now = new Date();
    const updatedActions = actionPlan.map(action => {
      if (action.status !== 'realizado' && action.dataVencimento < now) {
        return { ...action, status: 'atrasado' as const };
      }
      return action;
    });

    // Check if any actions need status updates
    const hasUpdates = updatedActions.some((action, index) => 
      action.status !== actionPlan[index].status
    );

    if (hasUpdates) {
      updatedActions.forEach(action => {
        if (action.status !== actionPlan.find(a => a.id === action.id)?.status) {
          onUpdateAction(action.id, { status: action.status });
        }
      });
    }
  }, [actionPlan, onUpdateAction]);

  // Filter actions based on current filters
  useEffect(() => {
    let filtered = actionPlan.filter(action => {
      const matchesStatus = statusFilter === 'todos' || action.status === statusFilter;
      const matchesPriority = priorityFilter === 'todas' || action.prioridade === priorityFilter;
      const matchesCategory = categoryFilter === 'todas' || action.categoria === categoryFilter;
      const matchesSearch = searchTerm === '' || 
        action.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
    });

    setFilteredActions(filtered);
  }, [actionPlan, statusFilter, priorityFilter, categoryFilter, searchTerm]);

  const handleStatusChange = (actionId: string, newStatus: ActionItem['status']) => {
    onUpdateAction(actionId, { status: newStatus });
  };

  const handleUpdateAction = (actionId: string, field: keyof ActionItem, value: any) => {
    onUpdateAction(actionId, { [field]: value });
  };

  const openActionDialog = (action: ActionItem) => {
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const getStatusColor = (status: ActionItem['status']) => {
    switch (status) {
      case 'pendente': return 'bg-gray-100 text-gray-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ActionItem['status']) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'em_andamento': return <TrendingUp className="h-4 w-4" />;
      case 'realizado': return <CheckCircle2 className="h-4 w-4" />;
      case 'atrasado': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUniqueCategories = () => {
    const categories = actionPlan.map(action => action.categoria);
    return [...new Set(categories)];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Plano de Ação Empresarial - {actionPlan.length} Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Prioridade</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as prioridades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {getUniqueCategories().map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <Input
                placeholder="Buscar ação ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Action List */}
          <div className="space-y-4">
            {filteredActions.map(action => (
              <Card key={action.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{action.acao}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={getStatusColor(action.status)}>
                              {getStatusIcon(action.status)}
                              <span className="ml-1">
                                {action.status === 'pendente' ? 'Pendente' :
                                 action.status === 'em_andamento' ? 'Em Andamento' :
                                 action.status === 'realizado' ? 'Realizado' :
                                 action.status === 'atrasado' ? 'Atrasado' : action.status}
                              </span>
                            </Badge>
                            <Badge className={getPriorityColor(action.prioridade)}>
                              {action.prioridade.charAt(0).toUpperCase() + action.prioridade.slice(1)} Prioridade
                            </Badge>
                            <Badge variant="outline">
                              {action.categoria.charAt(0).toUpperCase() + action.categoria.slice(1)}
                            </Badge>
                            <Badge variant="outline">
                              Semana {action.semana}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{action.responsavel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{format(action.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{action.prazo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Select 
                        value={action.status} 
                        onValueChange={(value) => handleStatusChange(action.id, value as ActionItem['status'])}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="realizado">Realizado</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                        </SelectContent>
                      </Select>

                      <AiTipsDialog acao={action} />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openActionDialog(action)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  {action.beneficios && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Benefícios:</strong> {action.beneficios}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredActions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma ação encontrada com os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Ação</DialogTitle>
          </DialogHeader>
          
          {selectedAction && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Ação</label>
                <Textarea
                  value={selectedAction.acao}
                  onChange={(e) => handleUpdateAction(selectedAction.id, 'acao', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Responsável</label>
                  <Input
                    value={selectedAction.responsavel}
                    onChange={(e) => handleUpdateAction(selectedAction.id, 'responsavel', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Prazo</label>
                  <Input
                    value={selectedAction.prazo}
                    onChange={(e) => handleUpdateAction(selectedAction.id, 'prazo', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Recursos Necessários</label>
                <Textarea
                  value={selectedAction.recursos}
                  onChange={(e) => handleUpdateAction(selectedAction.id, 'recursos', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Métricas de Sucesso</label>
                <Textarea
                  value={selectedAction.metricas}
                  onChange={(e) => handleUpdateAction(selectedAction.id, 'metricas', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Benefícios Esperados</label>
                <Textarea
                  value={selectedAction.beneficios}
                  onChange={(e) => handleUpdateAction(selectedAction.id, 'beneficios', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Detalhes de Implementação</label>
                <Textarea
                  value={selectedAction.detalhesImplementacao}
                  onChange={(e) => handleUpdateAction(selectedAction.id, 'detalhesImplementacao', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionPlanManager;
