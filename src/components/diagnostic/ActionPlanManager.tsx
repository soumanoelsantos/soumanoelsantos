
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Filter, CheckCircle2, Clock, AlertTriangle, Target, TrendingUp, Users, DollarSign, Settings, Lightbulb, ArrowLeft } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActionItem {
  id: string;
  acao: string;
  categoria: 'comercial' | 'gestao' | 'financeiro' | 'rh' | 'marketing' | 'operacional' | 'tecnologia' | 'cultura';
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
  comoFazer: string[];
}

interface ActionPlanManagerProps {
  actionPlan: ActionItem[];
  companyName?: string;
  diagnosticData?: any;
  onBack?: () => void;
}

const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ 
  actionPlan: initialActionPlan, 
  companyName,
  onBack 
}) => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionPlan);

  const toggleActionStatus = (actionId: string, comoFazerIndex?: number) => {
    setActionItems(prev => prev.map(action => {
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
    }));
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
  const progresso = (acoesRealizadas / actionItems.length) * 100;

  return (
    <div className="space-y-6 action-plan-section">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">
                {companyName ? `Plano de Aceleração - ${companyName}` : 'Plano de Aceleração Empresarial'}
              </CardTitle>
              <p className="text-blue-100">
                {actionItems.length} ações estratégicas personalizadas
              </p>
            </div>
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
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Plano de Ação Personalizado ({filteredActions.length} ações)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
            {filteredActions.map((action) => (
              <Card key={action.id} className={`border-l-4 ${action.status === 'realizado' ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={action.concluida}
                        onCheckedChange={() => toggleActionStatus(action.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className={`font-medium ${action.concluida ? 'line-through text-gray-500' : ''}`}>
                          {action.acao}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getCorCategoria(action.categoria)}>
                            {getIconeCategoria(action.categoria)}
                            <span className="ml-1 capitalize">{action.categoria}</span>
                          </Badge>
                          <span className={`text-sm flex items-center gap-1 ${getStatusColor(action.status)}`}>
                            {getStatusIcon(action.status)}
                            {action.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(action.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                      <div>Prazo: {action.prazo}</div>
                    </div>
                  </div>

                  {/* Como Fazer na Prática - Individual para cada ação */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      Como Fazer na Prática:
                    </h5>
                    <div className="space-y-2">
                      {action.comoFazer?.map((passo, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Checkbox 
                            checked={passo.startsWith('✓ ')}
                            onCheckedChange={() => toggleActionStatus(action.id, index)}
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
