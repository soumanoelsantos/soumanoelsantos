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

// Ações sugeridas para adicionar ao longo dos 6 meses
const sugestedActions = [
  "Alinhamento de salários e comissões",
  "Indicar sistemas de gestão adequados",
  "Agendar reunião com a equipe de vendas",
  "Fazer pesquisa 360º anônima com os vendedores",
  "Solicitar criação do Dashboard de vendas",
  "Cadastrar vendedores no sistema de análise",
  "Mapeamento da jornada do cliente",
  "Agendar reunião de Planejamento estratégico",
  "Criar e enviar contrato de rotina do colaborador",
  "Enviar resultado da pesquisa 360º",
  "Criar e enviar contrato de expectativa",
  "Implementar feedback estruturado",
  "Mapear equipe com DISC Assessment",
  "Implementação de novos funis de vendas",
  "Criar e enviar Job description",
  "Criar persona detalhada do cliente",
  "Fazer cliente oculto para análise",
  "Mapeamento de processos operacionais",
  "Desenhar organograma empresarial",
  "Cadastrar reuniões mensais no Google Agenda",
  "Enviar relatório de performance mensal",
  "Enviar relatório de atividades realizadas",
  "Propor diversificação de canais de vendas",
  "Criar plano de Endomarketing",
  "Criar plano de carreira estruturado",
  "Desenvolver plano de pós-venda",
  "Desenvolver plano de parcerias estratégicas",
  "Desenvolver plano de gestão de talentos",
  "Criação de Storytelling corporativo",
  "Desenvolver fluxo de cadência comercial",
  "Desenvolver plano de fidelidade",
  "Implementar pesquisa de clima organizacional",
  "Enviar Playbook de vendas",
  "Criar Plano de ação para Cultura",
  "Implementar Manual de Cultura",
  "Sugerir estratégias de marketing digital",
  "Criar estratégias de engajamento",
  "Criação de Scripts de vendas",
  "Melhorar a experiência do cliente",
  "Criar plano de encantamento de cliente",
  "Implementar programa de Compliance",
  "Executar plano de Encantamento do cliente",
  "Preencher conexão com o Colaborador",
  "Criar processo de gestão de leads",
  "Implementar resolução de conflitos",
  "Implementar análise de métricas comerciais",
  "Otimizar gestão de tempo",
  "Implementar sistema CRM",
  "Desenvolver manual de boas práticas",
  "Criar sistema de feedback do cliente",
  "Propor estratégias de Upsell e Cross-Sell",
  "Estabelecer canais de comunicação interno",
  "Criar estratégias de negociação e fechamento",
  "Implementar processos de avaliação de desempenho",
  "Criar estratégias de abordagem e apresentação",
  "Criar processo de qualificação de leads",
  "Criar estratégia de geração de leads por prospecção ativa",
  "Desenvolver gestão de território",
  "Promover ambiente de positividade",
  "Estruturar sistema de Follow-up",
  "Estratégias de preços e promoções",
  "Desenvolver abordagem positiva",
  "Fazer avaliação de concorrentes",
  "Estratégias de fechamento de negócios",
  "Desenvolver programa de talentos",
  "Criar check list para contratação",
  "Modelagem do Funil de vendas",
  "Fazer Análise de Pareto",
  "Criar roteiro de visitação empresarial"
];

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
  const [showSuggestions, setShowSuggestions] = useState(false);
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
          "1. Faça uma lista de todos os clientes atuais em uma planilha Excel",
          "2. Categorize os clientes por: Ativo, Inativo, Prospect, VIP",
          "3. Defina campos obrigatórios: Nome, Email, Telefone, Último contato, Status",
          "4. Escolha uma ferramenta gratuita: HubSpot CRM ou Pipedrive (teste grátis)",
          "5. Importe os dados da planilha para a ferramenta escolhida",
          "6. Configure automações básicas: email de boas-vindas e follow-up",
          "7. Treine a equipe por 2 horas sobre como usar o sistema",
          "8. Defina responsável por manter os dados atualizados diariamente",
          "9. Crie relatórios semanais de acompanhamento",
          "10. Revise e ajuste o processo mensalmente"
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
          "1. Abra uma planilha Excel/Google e crie colunas: Data, Descrição, Entrada, Saída, Saldo",
          "2. Liste todas as contas bancárias da empresa (corrente, poupança, investimentos)",
          "3. Registre o saldo atual de cada conta na planilha",
          "4. Anote TODAS as receitas dos últimos 30 dias (vendas, recebimentos, etc.)",
          "5. Anote TODAS as despesas dos últimos 30 dias (fornecedores, salários, impostos)",
          "6. Calcule o saldo diário acumulado para identificar padrões",
          "7. Projete entradas e saídas confirmadas para os próximos 90 dias",
          "8. Configure alertas quando o saldo ficar abaixo de R$ X (defina o valor)",
          "9. Faça reunião semanal de 30min para revisar os números",
          "10. Crie reserva de emergência equivalente a 3 meses de despesas"
        ],
        ferramentas: ["Planilha Excel/Google", "Conta Azul", "Omie", "Granito", "ContaAzul"],
        prazoRecomendado: "1-2 semanas",
        dificuldade: "Fácil",
        custoEstimado: "R$ 0-100/mês"
      };
    }
    
    if (acaoLower.includes('site') || acaoLower.includes('website')) {
      return {
        passoAPasso: [
          "1. Defina 5 páginas essenciais: Home, Sobre, Serviços/Produtos, Portfólio, Contato",
          "2. Escreva o texto de cada página em um documento Word primeiro",
          "3. Colete 15-20 fotos de qualidade da empresa/produtos/equipe",
          "4. Escolha uma plataforma: WordPress.com, Wix ou Hostinger Website Builder",
          "5. Selecione um template profissional relacionado ao seu segmento",
          "6. Substitua textos e imagens do template pelo seu conteúdo",
          "7. Configure formulário de contato integrado com WhatsApp",
          "8. Teste o site em celular, tablet e computador",
          "9. Registre um domínio .com.br e conecte ao site",
          "10. Configure Google Analytics para acompanhar visitantes"
        ],
        ferramentas: ["WordPress.com", "Wix", "Hostinger", "Canva para imagens", "Unsplash para fotos"],
        prazoRecomendado: "2-4 semanas",
        dificuldade: "Média",
        custoEstimado: "R$ 50-150/mês"
      };
    }
    
    if (acaoLower.includes('redes sociais') || acaoLower.includes('instagram') || acaoLower.includes('marketing')) {
      return {
        passoAPasso: [
          "1. Crie perfil comercial no Instagram, Facebook e LinkedIn",
          "2. Configure foto do perfil com logo da empresa (tamanho 400x400px)",
          "3. Escreva bio clara: O que faz + Cidade + Link do site + Contato",
          "4. Planeje 30 posts para o primeiro mês (mix de conteúdo educativo e vendas)",
          "5. Use regra 80/20: 80% conteúdo útil/educativo, 20% vendas diretas",
          "6. Tire 50 fotos variadas: produtos, bastidores, equipe, clientes satisfeitos",
          "7. Poste 4-5x por semana nos melhores horários (18h-21h geralmente)",
          "8. Responda TODOS os comentários e DMs em até 2 horas",
          "9. Use hashtags locais: #suacidade #seusegmento #palavraschave",
          "10. Analise métricas semanalmente e ajuste estratégia conforme resultados"
        ],
        ferramentas: ["Canva Pro", "Later ou Buffer", "Instagram Creator Studio", "Hootsuite"],
        prazoRecomendado: "3-4 semanas",
        dificuldade: "Fácil",
        custoEstimado: "R$ 50-200/mês"
      };
    }
    
    if (acaoLower.includes('funil') || acaoLower.includes('vendas') || acaoLower.includes('prospecção')) {
      return {
        passoAPasso: [
          "1. Mapeie sua jornada atual de vendas da prospecção ao fechamento",
          "2. Identifique onde os clientes 'se perdem' no processo atual",
          "3. Defina seu cliente ideal (persona): idade, renda, problemas, onde encontrar",
          "4. Crie 3 canais de prospecção: redes sociais, indicações, networking",
          "5. Desenvolva script padronizado para primeiro contato (WhatsApp/telefone)",
          "6. Crie apresentação de 10 slides: problema + solução + benefícios + preço",
          "7. Estabeleça follow-up automático: 1º dia, 3º dia, 7º dia, 15º dia",
          "8. Treine equipe no novo processo com role-play de 2 horas",
          "9. Teste com 20 prospects e meça taxa de conversão",
          "10. Ajuste processo baseado nos resultados e escale"
        ],
        ferramentas: ["Planilha de controle", "WhatsApp Business", "Canva", "Loom para vídeos explicativos"],
        prazoRecomendado: "4-6 semanas",
        dificuldade: "Média-Alta",
        custoEstimado: "R$ 100-300/mês"
      };
    }
    
    if (acaoLower.includes('processo') || acaoLower.includes('procedimento') || acaoLower.includes('organização')) {
      return {
        passoAPasso: [
          "1. Escolha UM processo específico para documentar primeiro (ex: atendimento ao cliente)",
          "2. Acompanhe a execução do processo 3 vezes com pessoas diferentes",
          "3. Anote cada passo em detalhes: o que, como, quando, quem, onde",
          "4. Identifique pontos onde há dúvidas, erros ou retrabalho",
          "5. Crie documento com: Objetivo, Responsável, Passos numerados, Tempo estimado",
          "6. Teste o documento com outra pessoa executando sem sua ajuda",
          "7. Ajuste o documento baseado nas dificuldades encontradas no teste",
          "8. Treine TODA a equipe no novo processo (1 hora de treinamento)",
          "9. Monitore execução por 2 semanas e colete feedback",
          "10. Revise e aprimore o processo mensalmente"
        ],
        ferramentas: ["Google Docs", "Notion", "Lucidchart", "Loom para vídeos explicativos"],
        prazoRecomendado: "2-3 semanas por processo",
        dificuldade: "Média",
        custoEstimado: "R$ 0-50/mês"
      };
    }
    
    if (acaoLower.includes('equipe') || acaoLower.includes('funcionário') || acaoLower.includes('rh')) {
      return {
        passoAPasso: [
          "1. Liste todos os funcionários e suas funções atuais em planilha",
          "2. Identifique gaps de competência: o que cada um sabe vs. o que deveria saber",
          "3. Agende conversa individual de 30min com cada pessoa",
          "4. Perguntas-chave: satisfação (1-10), principais dificuldades, sugestões de melhoria",
          "5. Crie plano de desenvolvimento personalizado para cada funcionário",
          "6. Estabeleça 3 metas trimestrais específicas para cada pessoa",
          "7. Implemente reuniões mensais de feedback (30min por pessoa)",
          "8. Crie sistema de reconhecimento: funcionário do mês, elogios públicos",
          "9. Documente políticas básicas: horário, benefícios, código de conduta",
          "10. Faça pesquisa de clima trimestral e aja sobre os resultados"
        ],
        ferramentas: ["Planilha de avaliação", "Google Forms", "Calendário Google", "WhatsApp Business"],
        prazoRecomendado: "4-6 semanas",
        dificuldade: "Média-Alta",
        custoEstimado: "R$ 0-200/mês"
      };
    }
    
    // Dica genérica para ações não específicas
    return {
      passoAPasso: [
        "1. Analise a situação atual desta área na sua empresa (faça diagnóstico honesto)",
        "2. Defina exatamente o que você quer alcançar (meta específica e mensurável)",
        "3. Quebre o objetivo em 5-7 etapas menores e executáveis",
        "4. Identifique recursos necessários: tempo (horas/semana), dinheiro, pessoas",
        "5. Crie cronograma realista com prazos para cada etapa",
        "6. Execute APENAS a primeira etapa e teste o resultado antes de continuar",
        "7. Meça resultados da primeira etapa e documente lições aprendidas",
        "8. Ajuste o plano das próximas etapas baseado no que aprendeu",
        "9. Continue executando etapa por etapa, sempre testando e ajustando",
        "10. Faça revisão semanal do progresso e ajustes necessários"
      ],
      ferramentas: ["Planilha de controle", "Google Calendar", "Bloco de anotações", "Timer/cronômetro"],
      prazoRecomendado: "3-8 semanas",
      dificuldade: "Média",
      custoEstimado: "A definir baseado na ação específica"
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

  const updateActionStatus = (acaoId: string, newStatus: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado') => {
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

  const addSuggestedAction = (suggestion: string) => {
    // Filter out actions that already exist to prevent duplicates
    const existingActions = acoes.map(acao => acao.acao.toLowerCase());
    const suggestionLower = suggestion.toLowerCase();
    
    if (existingActions.includes(suggestionLower)) {
      toast({
        title: "Ação já existe",
        description: "Esta ação já está presente no seu plano.",
        variant: "destructive"
      });
      return;
    }

    const newAction: ActionItem = {
      id: Date.now().toString(),
      acao: suggestion,
      categoria: 'comercial',
      prioridade: 'media',
      prazo: '4 semanas',
      responsavel: '',
      recursos: 'A definir',
      metricas: 'A definir',
      beneficios: 'A definir',
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
      concluida: false,
      detalhesImplementacao: '',
      dicaIA: 'Ação sugerida baseada em boas práticas. Personalize conforme sua realidade.',
      status: 'pendente',
      semana: Math.ceil(acoes.length / 4) + 1
    };
    
    setAcoes(prev => [...prev, newAction]);
    toast({
      title: "Ação sugerida adicionada",
      description: `"${suggestion}" foi adicionada ao seu plano.`,
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

  // AI Tips Dialog Component - Melhorado com dicas práticas detalhadas
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
        `Para implementar "${acao.acao}", baseado na sua pergunta "${pergunta}": Comece fazendo um levantamento detalhado da situação atual, defina metas específicas e mensuráveis (números claros), e crie um cronograma semanal. É essencial ter alguém específico responsável pelo acompanhamento diário dos resultados.`,
        `Sobre "${pergunta}" relacionado a "${acao.acao}": A estratégia mais eficaz é começar pequeno com um teste piloto. Implemente apenas com 20% da operação primeiro, colete feedback real dos envolvidos durante 2 semanas, documente o que funcionou e o que não funcionou, ajuste o processo e só depois expanda para 100%.`,
        `Para sua dúvida "${pergunta}": Sugiro dividir esta implementação em 4 fases específicas. Fase 1: Preparação e planejamento (1 semana). Fase 2: Execução piloto com grupo pequeno (2 semanas). Fase 3: Avaliação dos resultados e ajustes (1 semana). Fase 4: Expansão completa e treinamento geral. Cada fase deve ter métricas claras de sucesso.`
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
            Como Fazer na Prática
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Wrench className="h-6 w-6 text-purple-600" />
              Guia Prático: {acao.acao}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informações práticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Prazo</p>
                <p className="text-blue-700 font-medium">{dicas.prazoRecomendado}</p>
              </div>
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Dificuldade</p>
                <p className="text-blue-700 font-medium">{dicas.dificuldade}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Investimento</p>
                <p className="text-blue-700 font-medium">{dicas.custoEstimado}</p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Passos</p>
                <p className="text-blue-700 font-medium">{dicas.passoAPasso.length} etapas</p>
              </div>
            </div>

            {/* Passo a passo detalhado */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-green-600" />
                Passo a Passo Detalhado
              </h3>
              <div className="space-y-3">
                {dicas.passoAPasso.map((passo, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white text-sm rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-green-800 font-medium leading-relaxed">{passo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ferramentas recomendadas */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="h-6 w-6 text-orange-600" />
                Ferramentas e Recursos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dicas.ferramentas.map((ferramenta, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-orange-800 font-medium text-sm">{ferramenta}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Perguntar para a IA */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                Precisa de Ajuda Específica?
              </h3>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="Ex: Como posso começar sem muito investimento? Que erros devo evitar? Como medir se está funcionando? Quanto tempo leva para ver resultados?"
                  value={pergunta}
                  onChange={(e) => setPergunta(e.target.value)}
                  className="min-h-[100px] text-base"
                />
                
                <Button 
                  onClick={() => simularRespostaAi(pergunta)}
                  disabled={carregando || !pergunta.trim()}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  {carregando ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Analisando sua pergunta...
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
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Brain className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-purple-900 mb-3 text-lg">💡 Resposta Personalizada da IA:</h4>
                          <p className="text-purple-800 leading-relaxed">{respostaAi}</p>
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
          <Button 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            {showSuggestions ? 'Ocultar' : 'Ver'} Sugestões de Ações
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

      {/* Sugestões de Ações */}
      {showSuggestions && (
        <Card className="print:hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Sugestões de Ações Complementares
            </CardTitle>
            <p className="text-gray-600">
              Clique em qualquer sugestão para adicioná-la ao seu plano de ação
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sugestedActions
                .filter(suggestion => {
                  // Filter out suggestions that already exist in the action plan
                  const existingActions = acoes.map(acao => acao.acao.toLowerCase());
                  return !existingActions.includes(suggestion.toLowerCase());
                })
                .map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => addSuggestedAction(suggestion)}
                >
                  <div className="flex items-start gap-2">
                    <Plus className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
                                    onValueChange={(value: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado') => updateActionStatus(acao.id, value)}
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
