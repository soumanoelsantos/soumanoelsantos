
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowLeft, 
  Download, 
  Edit, 
  Trash2, 
  Plus,
  Brain,
  Lightbulb,
  AlertTriangle,
  Timer
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import ProblemSolutionsDisplay from "./ProblemSolutionsDisplay";

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

interface DiagnosticData {
  empresaNome: string;
  segmento: string;
  tempoMercado: string;
  faturamentoMensal: string;
  numeroFuncionarios: string;
  problemasComerciais: string;
  problemasGestao: string;
  problemasFinanceiros: string;
  problemasRH: string;
  problemasMarketing: string;
  problemasOperacionais: string;
  maioresDificuldades: string;
  objetivos6Meses: string;
}

interface ActionPlanManagerProps {
  initialActions: ActionItem[];
  onBack: () => void;
  companyName: string;
  diagnosticData?: DiagnosticData;
}

const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ 
  initialActions, 
  onBack, 
  companyName,
  diagnosticData 
}) => {
  const [acoes, setAcoes] = useState<ActionItem[]>(initialActions);
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban'>('timeline');
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);

  // Calcular estatísticas
  const acoesCompletas = acoes.filter(acao => acao.concluida || acao.status === 'realizado').length;
  const acoesAtrasadas = acoes.filter(acao => acao.status === 'atrasado').length;
  const acoesEmAndamento = acoes.filter(acao => acao.status === 'em_andamento').length;
  const acoesPendentes = acoes.filter(acao => acao.status === 'pendente').length;
  const progresso = (acoesCompletas / acoes.length) * 100;

  // Atualizar status das ações baseado na data
  useEffect(() => {
    const hoje = new Date();
    setAcoes(prev => prev.map(acao => {
      if (acao.concluida) {
        return { ...acao, status: 'realizado' };
      }
      if (acao.dataVencimento < hoje && acao.status !== 'realizado') {
        return { ...acao, status: 'atrasado' };
      }
      return acao;
    }));
  }, []);

  const toggleAcaoConcluida = (acaoId: string) => {
    setAcoes(prev => prev.map(acao => 
      acao.id === acaoId ? { 
        ...acao, 
        concluida: !acao.concluida,
        status: !acao.concluida ? 'realizado' : 'pendente'
      } : acao
    ));
  };

  const updateActionStatus = (acaoId: string, newStatus: ActionItem['status']) => {
    setAcoes(prev => prev.map(acao => 
      acao.id === acaoId ? { 
        ...acao, 
        status: newStatus,
        concluida: newStatus === 'realizado'
      } : acao
    ));
  };

  const reordenarAcoes = (result: any) => {
    if (!result.destination) return;

    const novasAcoes = [...acoes];
    const [itemMovido] = novasAcoes.splice(result.source.index, 1);
    novasAcoes.splice(result.destination.index, 0, itemMovido);

    setAcoes(novasAcoes);
  };

  const deleteAction = (actionId: string) => {
    setAcoes(prev => prev.filter(acao => acao.id !== actionId));
    toast({
      title: "Ação removida",
      description: "A ação foi removida do plano com sucesso.",
    });
  };

  const editAction = (updatedAction: ActionItem) => {
    setAcoes(prev => prev.map(acao => 
      acao.id === updatedAction.id ? updatedAction : acao
    ));
    setIsEditDialogOpen(false);
    setEditingAction(null);
    toast({
      title: "Ação atualizada",
      description: "A ação foi atualizada com sucesso.",
    });
  };

  const addNewAction = (newAction: Omit<ActionItem, 'id'>) => {
    const actionWithId: ActionItem = {
      ...newAction,
      id: Date.now().toString(),
      dicaIA: "Nova ação adicionada. Defina marcos específicos e acompanhe o progresso semanalmente.",
      semana: Math.ceil(acoes.length / 4) + 1
    };
    setAcoes(prev => [...prev, actionWithId]);
    setIsAddDialogOpen(false);
    toast({
      title: "Nova ação adicionada",
      description: "A ação foi adicionada ao plano com sucesso.",
    });
  };

  const handleGeneratePDF = () => {
    if (!pdfRef.current) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Não foi possível encontrar o conteúdo para gerar o PDF.",
      });
      return;
    }

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu plano de ação está sendo gerado.",
    });

    const success = generatePDF(pdfRef.current, `plano-acao-${companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    
    if (!success) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente.",
      });
    }
  };

  const getIconeCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return <TrendingUp className="h-4 w-4" />;
      case 'gestao': return <Target className="h-4 w-4" />;
      case 'rh': return <Users className="h-4 w-4" />;
      case 'marketing': return <Target className="h-4 w-4" />;
      case 'financeiro': return <Target className="h-4 w-4" />;
      case 'operacional': return <Clock className="h-4 w-4" />;
      case 'tecnologia': return <Target className="h-4 w-4" />;
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
      case 'tecnologia': return 'bg-indigo-100 text-indigo-800';
      case 'cultura': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCorPrioridade = (prioridade: string) => {
    switch(prioridade) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCorStatus = (status: string) => {
    switch(status) {
      case 'realizado': return 'bg-green-100 text-green-800 border-green-200';
      case 'em_andamento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'atrasado': return 'bg-red-100 text-red-800 border-red-200';
      case 'pendente': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconeStatus = (status: string) => {
    switch(status) {
      case 'realizado': return <CheckCircle2 className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'atrasado': return <AlertTriangle className="h-4 w-4" />;
      case 'pendente': return <Timer className="h-4 w-4" />;
      default: return <Timer className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const ActionForm = ({ 
    action, 
    onSave, 
    onCancel 
  }: { 
    action?: ActionItem; 
    onSave: (action: ActionItem | Omit<ActionItem, 'id'>) => void; 
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState<Omit<ActionItem, 'id'>>({
      acao: action?.acao || '',
      categoria: action?.categoria || 'gestao',
      prioridade: action?.prioridade || 'media',
      prazo: action?.prazo || '',
      responsavel: action?.responsavel || '',
      recursos: action?.recursos || '',
      metricas: action?.metricas || '',
      beneficios: action?.beneficios || '',
      dataVencimento: action?.dataVencimento || new Date(),
      concluida: action?.concluida || false,
      detalhesImplementacao: action?.detalhesImplementacao || '',
      dicaIA: action?.dicaIA || '',
      status: action?.status || 'pendente',
      semana: action?.semana || 1
    });

    const handleSave = () => {
      if (action) {
        onSave({ ...action, ...formData });
      } else {
        onSave(formData);
      }
    };

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="acao">Ação *</Label>
          <Textarea
            id="acao"
            value={formData.acao}
            onChange={(e) => setFormData(prev => ({ ...prev, acao: e.target.value }))}
            placeholder="Descreva a ação a ser executada..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={formData.categoria} onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="gestao">Gestão</SelectItem>
                <SelectItem value="rh">RH/Pessoas</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="cultura">Cultura</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select value={formData.prioridade} onValueChange={(value: 'alta' | 'media' | 'baixa') => setFormData(prev => ({ ...prev, prioridade: value }))}>
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
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado') => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="realizado">Realizado</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
              placeholder="Quem será responsável?"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="beneficios">Benefícios Esperados</Label>
          <Textarea
            id="beneficios"
            value={formData.beneficios}
            onChange={(e) => setFormData(prev => ({ ...prev, beneficios: e.target.value }))}
            placeholder="Quais benefícios essa ação trará para a empresa?"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!formData.acao}>
            Salvar
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Conteúdo para PDF */}
      <div ref={pdfRef} className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{companyName}</CardTitle>
                <p className="text-blue-100">Programa de Aceleração Empresarial - 6 Meses</p>
                <p className="text-blue-100 text-sm mt-2">
                  {acoes.length} ações estratégicas para transformar sua empresa
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleGeneratePDF} 
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </Button>
                <Button 
                  onClick={onBack} 
                  className="bg-green-600 text-white border-2 border-green-600 hover:bg-green-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Novo Diagnóstico
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard de Progresso */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Realizadas</p>
                  <p className="text-2xl font-bold text-green-800">{acoesCompletas}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-blue-800">{acoesEmAndamento}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Atrasadas</p>
                  <p className="text-2xl font-bold text-red-800">{acoesAtrasadas}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-800">{acoesPendentes}</p>
                </div>
                <Timer className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progresso Geral */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Progresso do Programa</h3>
              <span className="text-2xl font-bold text-blue-600">{Math.round(progresso)}%</span>
            </div>
            <Progress value={progresso} className="mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{acoesCompletas} de {acoes.length} ações concluídas</span>
              <span>{acoes.length - acoesCompletas} restantes</span>
            </div>
          </CardContent>
        </Card>

        {/* Exibir Problemas e Soluções da IA */}
        {diagnosticData && (
          <ProblemSolutionsDisplay diagnosticData={diagnosticData} />
        )}
      </div>

      {/* Controles - não aparecem no PDF */}
      <div className="flex justify-between items-center print:hidden">
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            onClick={() => setViewMode('timeline')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
          </Button>
          <Button 
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            onClick={() => setViewMode('kanban')}
          >
            <Target className="mr-2 h-4 w-4" />
            Kanban
          </Button>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <ActionForm 
              onSave={addNewAction}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Ações - não aparecem no PDF */}
      <div className="print:hidden">
        {viewMode === 'timeline' ? (
          <DragDropContext onDragEnd={reordenarAcoes}>
            <Droppable droppableId="acoes">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {acoes.map((acao, index) => (
                    <Draggable key={acao.id} draggableId={acao.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${
                            snapshot.isDragging ? 'shadow-lg scale-105' : ''
                          } ${getCorStatus(acao.status)}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <Checkbox
                                  checked={acao.concluida}
                                  onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        Semana {acao.semana}
                                      </span>
                                      <Badge variant="outline" className={getCorStatus(acao.status)}>
                                        {getIconeStatus(acao.status)}
                                        <span className="ml-1 capitalize">{acao.status.replace('_', ' ')}</span>
                                      </Badge>
                                    </div>
                                    <h4 className={`font-medium text-lg ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                                      {acao.acao}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className={`w-3 h-3 rounded-full ${getCorPrioridade(acao.prioridade)}`}
                                      title={`Prioridade ${acao.prioridade}`}
                                    />
                                    <Badge variant="outline" className={getCorCategoria(acao.categoria)}>
                                      {getIconeCategoria(acao.categoria)}
                                      <span className="ml-1 capitalize">{acao.categoria}</span>
                                    </Badge>
                                  </div>
                                </div>

                                {/* Dica da IA - sempre visível */}
                                <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                  <div className="flex items-start gap-2">
                                    <Brain className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-purple-800 mb-1">Dica da IA:</p>
                                      <p className="text-sm text-purple-700">{acao.dicaIA}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                {acao.beneficios && (
                                  <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm"><strong>Benefícios:</strong> {acao.beneficios}</p>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                                  <div>
                                    <p className="text-gray-600"><strong>Data:</strong> {formatDate(acao.dataVencimento)}</p>
                                    {acao.responsavel && (
                                      <p className="text-gray-600"><strong>Responsável:</strong> {acao.responsavel}</p>
                                    )}
                                  </div>
                                  <div>
                                    {acao.recursos && (
                                      <p className="text-gray-600"><strong>Recursos:</strong> {acao.recursos}</p>
                                    )}
                                    {acao.metricas && (
                                      <p className="text-gray-600"><strong>Métricas:</strong> {acao.metricas}</p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex justify-between items-center">
                                  <div className="flex gap-2">
                                    <Select
                                      value={acao.status}
                                      onValueChange={(value: ActionItem['status']) => updateActionStatus(acao.id, value)}
                                    >
                                      <SelectTrigger className="w-32 h-8">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pendente">Pendente</SelectItem>
                                        <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                        <SelectItem value="realizado">Realizado</SelectItem>
                                        <SelectItem value="atrasado">Atrasado</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setEditingAction(acao);
                                        setIsEditDialogOpen(true);
                                      }}
                                    >
                                      <Edit className="mr-1 h-3 w-3" />
                                      Editar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => deleteAction(acao.id)}
                                      className="text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="mr-1 h-3 w-3" />
                                      Excluir
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          // Kanban View
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(['pendente', 'em_andamento', 'atrasado', 'realizado'] as const).map(status => (
              <Card key={status} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {getIconeStatus(status)}
                    <span className="capitalize">{status.replace('_', ' ')}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {acoes.filter(a => a.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {acoes.filter(acao => acao.status === status).map(acao => (
                    <Card key={acao.id} className="p-3 hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getCorCategoria(acao.categoria)}>
                            {acao.categoria}
                          </Badge>
                          <div 
                            className={`w-2 h-2 rounded-full ${getCorPrioridade(acao.prioridade)}`}
                            title={`Prioridade ${acao.prioridade}`}
                          />
                        </div>
                        <p className="text-sm font-medium">{acao.acao}</p>
                        <p className="text-xs text-gray-500">
                          Semana {acao.semana} • {formatDate(acao.dataVencimento)}
                        </p>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingAction(acao);
                              setIsEditDialogOpen(true);
                            }}
                            className="h-6 px-2 text-xs"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteAction(acao.id)}
                            className="h-6 px-2 text-xs text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Ação</DialogTitle>
          </DialogHeader>
          {editingAction && (
            <ActionForm 
              action={editingAction}
              onSave={editAction}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingAction(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionPlanManager;
