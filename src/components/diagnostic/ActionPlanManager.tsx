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
  Timer,
  CheckSquare,
  FileText,
  Wrench
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
  // Ensure all actions have proper default values
  const [acoes, setAcoes] = useState<ActionItem[]>(
    initialActions.map(action => ({
      ...action,
      status: action.status || 'pendente',
      categoria: action.categoria || 'gestao',
      prioridade: action.prioridade || 'media',
      responsavel: action.responsavel || '',
      recursos: action.recursos || '',
      metricas: action.metricas || '',
      beneficios: action.beneficios || '',
      detalhesImplementacao: action.detalhesImplementacao || '',
      dicaIA: action.dicaIA || 'Nova ação adicionada. Defina marcos específicos e acompanhe o progresso semanalmente.',
      semana: action.semana || 1,
      dataVencimento: action.dataVencimento ? new Date(action.dataVencimento) : new Date()
    }))
  );
  
  const [editingAction, setEditingAction] = useState<ActionItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);

  // Atualizar status das ações baseado na data automaticamente
  useEffect(() => {
    const updateStatusBasedOnDate = () => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
      
      setAcoes(prev => prev.map(acao => {
        if (acao.concluida || acao.status === 'realizado') {
          return { ...acao, status: 'realizado' };
        }
        
        const dataVencimento = new Date(acao.dataVencimento);
        dataVencimento.setHours(0, 0, 0, 0);
        
        if (dataVencimento < hoje && acao.status !== 'realizado') {
          return { ...acao, status: 'atrasado' };
        }
        
        return acao;
      }));
    };

    updateStatusBasedOnDate();
    
    // Update status every hour
    const interval = setInterval(updateStatusBasedOnDate, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calcular estatísticas
  const acoesCompletas = acoes.filter(acao => acao.concluida || acao.status === 'realizado').length;
  const acoesAtrasadas = acoes.filter(acao => acao.status === 'atrasado').length;
  const acoesEmAndamento = acoes.filter(acao => acao.status === 'em_andamento').length;
  const acoesPendentes = acoes.filter(acao => acao.status === 'pendente').length;
  const progresso = (acoesCompletas / acoes.length) * 100;

  // Função para gerar dicas práticas específicas baseadas na ação
  const generatePracticalTips = (acao: ActionItem) => {
    const acaoLower = acao.acao.toLowerCase();
    
    // Dicas específicas baseadas no conteúdo da ação
    if (acaoLower.includes('crm') || acaoLower.includes('cliente')) {
      return {
        passoAPasso: [
          "1. Faça uma lista de todos os clientes atuais em uma planilha",
          "2. Categorize os clientes por: Ativo, Inativo, Prospect",
          "3. Defina campos obrigatórios: Nome, Email, Telefone, Último contato",
          "4. Escolha uma ferramenta: HubSpot (gratuito), Pipedrive ou RD Station",
          "5. Importe os dados da planilha para a ferramenta escolhida",
          "6. Configure automações básicas: email de boas-vindas e follow-up",
          "7. Treine a equipe por 2 horas sobre como usar o sistema",
          "8. Defina quem será responsável por manter os dados atualizados"
        ],
        ferramentas: ["HubSpot CRM (gratuito)", "Planilha Google Sheets", "Pipedrive", "RD Station"],
        prazoRecomendado: "2-3 semanas",
        dificuldade: "Média",
        custoEstimado: "R$ 0-200/mês"
      };
    }
    
    if (acaoLower.includes('fluxo de caixa') || acaoLower.includes('financeiro')) {
      return {
        passoAPasso: [
          "1. Abra uma planilha e crie colunas: Data, Descrição, Entrada, Saída, Saldo",
          "2. Liste todas as contas bancárias da empresa",
          "3. Registre o saldo atual de cada conta",
          "4. Anote todas as receitas dos últimos 30 dias",
          "5. Anote todas as despesas dos últimos 30 dias",
          "6. Calcule o saldo diário para identificar padrões",
          "7. Projete entradas e saídas para os próximos 90 dias",
          "8. Configure alertas para quando o saldo ficar baixo",
          "9. Faça reunião semanal de 30min para revisar os números"
        ],
        ferramentas: ["Planilha Excel/Google", "Conta Azul", "Omie", "Granito"],
        prazoRecomendado: "1-2 semanas",
        dificuldade: "Fácil",
        custoEstimado: "R$ 0-50/mês"
      };
    }
    
    if (acaoLower.includes('site') || acaoLower.includes('website')) {
      return {
        passoAPasso: [
          "1. Defina 3-5 páginas essenciais: Home, Sobre, Serviços, Contato",
          "2. Escreva o texto de cada página em um documento",
          "3. Colete 10-15 fotos de qualidade da empresa/produtos",
          "4. Escolha uma plataforma: WordPress.com, Wix ou Hostinger",
          "5. Selecione um template profissional relacionado ao seu segmento",
          "6. Substitua textos e imagens do template pelo seu conteúdo",
          "7. Configure formulário de contato com WhatsApp",
          "8. Teste o site em celular e computador",
          "9. Registre um domínio (.com.br) e conecte ao site"
        ],
        ferramentas: ["WordPress.com", "Wix", "Hostinger", "Canva para imagens"],
        prazoRecomendado: "2-4 semanas",
        dificuldade: "Média",
        custoEstimado: "R$ 30-100/mês"
      };
    }
    
    if (acaoLower.includes('redes sociais') || acaoLower.includes('instagram') || acaoLower.includes('marketing')) {
      return {
        passoAPasso: [
          "1. Crie perfil comercial no Instagram e Facebook",
          "2. Configure foto do perfil com logo da empresa",
          "3. Escreva bio clara: o que faz + cidade + contato",
          "4. Planeje 30 posts para o primeiro mês",
          "5. Use rule 80/20: 80% conteúdo útil, 20% vendas",
          "6. Tire 50 fotos variadas dos produtos/serviços",
          "7. Poste 3-5x por semana nos melhores horários",
          "8. Responda comentários e DMs em até 2 horas",
          "9. Use hashtags locais: #suacidade #seusegmento"
        ],
        ferramentas: ["Canva", "Later ou Buffer", "Instagram Creator Studio", "Unsplash"],
        prazoRecomendado: "3-4 semanas",
        dificuldade: "Fácil",
        custoEstimado: "R$ 0-80/mês"
      };
    }
    
    if (acaoLower.includes('processo') || acaoLower.includes('procedimento')) {
      return {
        passoAPasso: [
          "1. Escolha um processo específico para documentar primeiro",
          "2. Acompanhe a execução do processo 3 vezes",
          "3. Anote cada passo em detalhes",
          "4. Identifique pontos onde há dúvidas ou erros",
          "5. Crie um documento com: Objetivo, Responsável, Passos, Tempo",
          "6. Teste o documento com outra pessoa executando",
          "7. Ajuste o documento baseado no teste",
          "8. Treine toda equipe no novo processo",
          "9. Revise o processo mensalmente"
        ],
        ferramentas: ["Google Docs", "Notion", "Flowchart maker", "Loom para vídeos"],
        prazoRecomendado: "2-3 semanas por processo",
        dificuldade: "Média",
        custoEstimado: "R$ 0-30/mês"
      };
    }
    
    if (acaoLower.includes('equipe') || acaoLower.includes('funcionário') || acaoLower.includes('rh')) {
      return {
        passoAPasso: [
          "1. Liste todos os funcionários e suas funções atuais",
          "2. Identifique gaps de competência em cada função",
          "3. Converse individualmente com cada pessoa (30min)",
          "4. Pergunte: satisfação, dificuldades, sugestões",
          "5. Crie plano de desenvolvimento personalizado",
          "6. Estabeleça metas trimestrais para cada pessoa",
          "7. Agende reuniões mensais de feedback",
          "8. Implemente reconhecimento: funcionário do mês",
          "9. Documente políticas básicas: horário, benefícios, comportamento"
        ],
        ferramentas: ["Planilha de avaliação", "Google Forms", "Calendário", "WhatsApp Business"],
        prazoRecomendado: "4-6 semanas",
        dificuldade: "Média-Alta",
        custoEstimado: "R$ 0-100/mês"
      };
    }
    
    // Dica genérica para ações não específicas
    return {
      passoAPasso: [
        "1. Analise a situação atual desta área na sua empresa",
        "2. Defina exatamente o que você quer alcançar",
        "3. Quebre o objetivo em 3-5 etapas menores",
        "4. Identifique recursos necessários: tempo, dinheiro, pessoas",
        "5. Crie um cronograma realista com prazos",
        "6. Execute a primeira etapa e teste o resultado",
        "7. Ajuste o plano baseado no que aprendeu",
        "8. Continue executando etapa por etapa",
        "9. Monitore progresso semanalmente"
      ],
      ferramentas: ["Planilha de controle", "Google Calendar", "Bloco de notas"],
      prazoRecomendado: "3-8 semanas",
      dificuldade: "Média",
      custoEstimado: "A definir"
    };
  };

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
      dicaIA: newAction.dicaIA || "Nova ação adicionada. Defina marcos específicos e acompanhe o progresso semanalmente.",
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

  const formatDate = (date: Date | string) => {
    if (!date) return 'Data não definida';
    
    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    
    return dateObj.toLocaleDateString('pt-BR');
  };

  const formatStatusDisplay = (status: string) => {
    if (!status) return 'pendente';
    return status.replace('_', ' ');
  };

  // AI Tips Dialog Component - Melhorado com dicas práticas
  const AITipsDialog = ({ acao }: { acao: ActionItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pergunta, setPergunta] = useState("");
    const [respostaAi, setRespostaAi] = useState("");
    const [carregando, setCarregando] = useState(false);

    const dicas = generatePracticalTips(acao);

    const simularRespostaAi = async (pergunta: string) => {
      setCarregando(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const respostasEspecificas = [
        `Para "${acao.acao.toLowerCase()}", baseado na sua pergunta "${pergunta}", recomendo: Comece fazendo um levantamento da situação atual, defina metas específicas mensuráveis e crie um cronograma detalhado. É importante ter alguém responsável pelo acompanhamento semanal dos resultados.`,
        `Sobre "${pergunta}" relacionado a "${acao.acao.toLowerCase()}": A chave é começar pequeno e testar. Implemente uma versão piloto primeiro, colete feedback real dos envolvidos e ajuste antes de expandir. Isso reduz riscos e aumenta as chances de sucesso.`,
        `Para sua dúvida sobre "${pergunta}": Sugiro dividir esta implementação em fases. Primeira fase: preparação e planejamento (1 semana). Segunda fase: execução piloto (2 semanas). Terceira fase: avaliação e ajustes (1 semana). Quarta fase: expansão completa.`
      ];
      
      setRespostaAi(respostasEspecificas[Math.floor(Math.random() * respostasEspecificas.length)]);
      setCarregando(false);
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            <Brain className="h-4 w-4" />
            Dicas IA
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-purple-600" />
              Como Implementar: {acao.acao}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informações práticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Prazo Recomendado</p>
                <p className="text-blue-700">{dicas.prazoRecomendado}</p>
              </div>
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Dificuldade</p>
                <p className="text-blue-700">{dicas.dificuldade}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Custo Estimado</p>
                <p className="text-blue-700">{dicas.custoEstimado}</p>
              </div>
            </div>

            {/* Passo a passo detalhado */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                Passo a Passo Detalhado
              </h3>
              <div className="space-y-2">
                {dicas.passoAPasso.map((passo, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 w-7 h-7 bg-green-600 text-white text-sm rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-green-800 font-medium">{passo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ferramentas recomendadas */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-orange-500" />
                Ferramentas Recomendadas
              </h3>
              <div className="flex flex-wrap gap-2">
                {dicas.ferramentas.map((ferramenta, index) => (
                  <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                    {ferramenta}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Perguntar para a IA */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Tem dúvidas específicas? Pergunte para a IA
              </h3>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Ex: Como posso começar sem muito investimento? Que erros devo evitar? Como medir se está funcionando?"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  className="min-h-[80px]"
                />
                
                <Button 
                  onClick={() => simularRespostaAi(pergunta)}
                  disabled={carregando || !pergunta.trim()}
                  className="flex items-center gap-2"
                >
                  {carregando ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      Perguntar para IA
                    </>
                  )}
                </Button>

                {respostaAi && (
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900 mb-2">Resposta da IA:</h4>
                          <p className="text-purple-800 text-sm leading-relaxed">{respostaAi}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
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
          <Button className="flex items-center gap-2">
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
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

      {/* Lista de Ações Timeline - não aparecem no PDF */}
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
                                      <span className="ml-1 capitalize">{formatStatusDisplay(acao.status)}</span>
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
                                <div className="flex gap-2 items-center">
                                  <Select
                                    value={acao.status}
                                    onValueChange={(value: ActionItem['status']) => updateActionStatus(acao.id, value)}
                                  >
                                    <SelectTrigger className="w-32 h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                                      <SelectItem value="pendente">Pendente</SelectItem>
                                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                      <SelectItem value="realizado">Realizado</SelectItem>
                                      <SelectItem value="atrasado">Atrasado</SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <AITipsDialog acao={acao} />
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
