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
  Lightbulb
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
  const [aiTipAction, setAiTipAction] = useState<ActionItem | null>(null);
  const [isAiTipDialogOpen, setIsAiTipDialogOpen] = useState(false);
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);

  const acoesCompletas = acoes.filter(acao => acao.concluida).length;
  const progresso = (acoesCompletas / acoes.length) * 100;

  const toggleAcaoConcluida = (acaoId: string) => {
    setAcoes(prev => prev.map(acao => 
      acao.id === acaoId ? { ...acao, concluida: !acao.concluida } : acao
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
      id: Date.now().toString()
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
      case 'qualidade': return <CheckCircle2 className="h-4 w-4" />;
      case 'estrategia': return <Target className="h-4 w-4" />;
      case 'dados': return <Target className="h-4 w-4" />;
      case 'inovacao': return <Lightbulb className="h-4 w-4" />;
      case 'risco': return <Target className="h-4 w-4" />;
      case 'compliance': return <CheckCircle2 className="h-4 w-4" />;
      case 'capacitacao': return <Users className="h-4 w-4" />;
      case 'lideranca': return <Users className="h-4 w-4" />;
      case 'sustentabilidade': return <Target className="h-4 w-4" />;
      case 'comunidade': return <Users className="h-4 w-4" />;
      case 'expansao': return <TrendingUp className="h-4 w-4" />;
      case 'consolidacao': return <Target className="h-4 w-4" />;
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
      case 'qualidade': return 'bg-emerald-100 text-emerald-800';
      case 'estrategia': return 'bg-cyan-100 text-cyan-800';
      case 'dados': return 'bg-violet-100 text-violet-800';
      case 'inovacao': return 'bg-yellow-100 text-yellow-800';
      case 'risco': return 'bg-rose-100 text-rose-800';
      case 'compliance': return 'bg-teal-100 text-teal-800';
      case 'capacitacao': return 'bg-amber-100 text-amber-800';
      case 'lideranca': return 'bg-lime-100 text-lime-800';
      case 'sustentabilidade': return 'bg-green-100 text-green-800';
      case 'comunidade': return 'bg-blue-100 text-blue-800';
      case 'expansao': return 'bg-purple-100 text-purple-800';
      case 'consolidacao': return 'bg-gray-100 text-gray-800';
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
      detalhesImplementacao: action?.detalhesImplementacao || ''
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
                <SelectItem value="qualidade">Qualidade</SelectItem>
                <SelectItem value="estrategia">Estratégia</SelectItem>
                <SelectItem value="dados">Dados/KPIs</SelectItem>
                <SelectItem value="inovacao">Inovação</SelectItem>
                <SelectItem value="risco">Gestão de Riscos</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="capacitacao">Capacitação</SelectItem>
                <SelectItem value="lideranca">Liderança</SelectItem>
                <SelectItem value="sustentabilidade">Sustentabilidade</SelectItem>
                <SelectItem value="comunidade">Comunidade</SelectItem>
                <SelectItem value="expansao">Expansão</SelectItem>
                <SelectItem value="consolidacao">Consolidação</SelectItem>
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
            <Label htmlFor="prazo">Prazo</Label>
            <Input
              id="prazo"
              value={formData.prazo}
              onChange={(e) => setFormData(prev => ({ ...prev, prazo: e.target.value }))}
              placeholder="Ex: 30 dias, 2 semanas..."
            />
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

        <div>
          <Label htmlFor="metricas">Como Medir o Sucesso</Label>
          <Textarea
            id="metricas"
            value={formData.metricas}
            onChange={(e) => setFormData(prev => ({ ...prev, metricas: e.target.value }))}
            placeholder="Como você vai saber se a ação foi bem-sucedida?"
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

  const AITipsDialog = ({ action }: { action: ActionItem }) => {
    const [pergunta, setPergunta] = useState("");
    const [respostaAi, setRespostaAi] = useState("");

    const gerarDicas = () => {
      const dicas = `Para implementar "${action.acao}", recomendo:

1. **Primeira Semana**: Mapeie a situação atual e defina marcos específicos
2. **Recursos Necessários**: ${action.recursos || 'Avalie os recursos disponíveis'}
3. **Métricas de Acompanhamento**: ${action.metricas || 'Defina indicadores claros de progresso'}
4. **Benefícios Esperados**: ${action.beneficios}

**Dicas Práticas:**
- Divida a ação em tarefas menores e mais gerenciáveis
- Estabeleça check-points semanais para acompanhar o progresso
- Documente todo o processo para futuras implementações
- Envolva a equipe desde o início para garantir o engajamento`;

      setRespostaAi(dicas);
    };

    return (
      <Dialog open={isAiTipDialogOpen} onOpenChange={setIsAiTipDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Como Implementar: {action.acao}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Benefícios desta Ação:
                </h4>
                <p className="text-blue-800 text-sm">{action.beneficios}</p>
              </CardContent>
            </Card>

            <div>
              <Button onClick={gerarDicas} className="mb-4">
                <Brain className="mr-2 h-4 w-4" />
                Gerar Dicas da IA
              </Button>

              {respostaAi && (
                <Card>
                  <CardContent className="p-4">
                    <pre className="whitespace-pre-wrap text-sm">{respostaAi}</pre>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Label htmlFor="pergunta-ai">Faça uma pergunta específica sobre esta ação:</Label>
              <Textarea
                id="pergunta-ai"
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                placeholder="Como posso começar? Quais são os primeiros passos? Que ferramentas preciso?"
                className="mt-2"
              />
              <Button className="mt-2" onClick={() => setRespostaAi("Esta funcionalidade será implementada em breve com IA real.")}>
                Perguntar para IA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
                <p className="text-blue-100">Plano de Ação Estratégico - 6 Meses</p>
                <p className="text-blue-100 text-sm mt-2">
                  {acoes.length} ações para acelerar o crescimento da empresa
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

        {/* Progresso */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Progresso do Plano</h3>
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

        {/* Lista de Ações - só no PDF */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ações do Plano de Aceleração</h2>
          {acoes.map((acao, index) => (
            <Card key={acao.id} className={acao.concluida ? 'bg-green-50 border-green-200' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className={`font-medium text-lg ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                        {acao.acao}
                      </h4>
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
                    
                    {acao.beneficios && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm"><strong>Benefícios:</strong> {acao.beneficios}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600"><strong>Prazo:</strong> {acao.prazo}</p>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Controles - não aparecem no PDF */}
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-xl font-semibold">Ações do Plano</h2>
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

      {/* Lista de Ações Interativas - não aparecem no PDF */}
      <div className="print:hidden">
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
                        } ${acao.concluida ? 'bg-green-50 border-green-200' : ''}`}
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
                                <h4 className={`font-medium text-lg ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                                  {acao.acao}
                                </h4>
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
                              
                              {acao.beneficios && (
                                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                                  <p className="text-sm"><strong>Benefícios:</strong> {acao.beneficios}</p>
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600"><strong>Prazo:</strong> {acao.prazo}</p>
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

                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setAiTipAction(acao);
                                    setIsAiTipDialogOpen(true);
                                  }}
                                  className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                                >
                                  <Brain className="mr-1 h-3 w-3" />
                                  Dicas IA
                                </Button>
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
      </div>

      {/* Dialogs */}
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

      {aiTipAction && (
        <AITipsDialog action={aiTipAction} />
      )}
    </div>
  );
};

export default ActionPlanManager;
