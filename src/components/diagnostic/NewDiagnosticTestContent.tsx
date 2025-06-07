
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import SimpleDiagnosticForm from './SimpleDiagnosticForm';
import ActionPlanManager from './ActionPlanManager';
import { Loader2 } from 'lucide-react';

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

const NewDiagnosticTestContent = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
  const [actionPlan, setActionPlan] = useState<ActionItem[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já existe um plano salvo
    const checkExistingPlan = () => {
      const savedPlan = localStorage.getItem(`diagnostic_plan_${userId}`);
      const savedCompany = localStorage.getItem(`diagnostic_company_${userId}`);
      
      if (savedPlan && savedCompany) {
        try {
          const plan = JSON.parse(savedPlan);
          setActionPlan(plan);
          setCompanyName(savedCompany);
          setHasExistingPlan(true);
        } catch (error) {
          console.error('Erro ao carregar plano salvo:', error);
        }
      }
      setIsLoading(false);
    };

    if (userId) {
      checkExistingPlan();
    }
  }, [userId]);

  const generateActionPlan = (data: DiagnosticData): ActionItem[] => {
    const actions: ActionItem[] = [];
    
    // SEMANA 1-2: Organização e Fundamentos
    actions.push({
      id: 'gestao_1',
      acao: 'Criar organograma da empresa e definir responsabilidades claras para cada cargo',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '7 dias',
      responsavel: 'Diretor/Sócio',
      recursos: 'Tempo para mapeamento, software de organograma',
      metricas: '100% dos cargos definidos com responsabilidades claras',
      beneficios: 'Maior clareza organizacional, redução de conflitos de responsabilidade e melhoria na comunicação',
      dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear todos os funcionários, definir hierarquia, criar descrições de cargo'
    });

    actions.push({
      id: 'financeiro_1',
      acao: 'Implementar controle de fluxo de caixa diário com projeções de 90 dias',
      categoria: 'financeiro',
      prioridade: 'alta',
      prazo: '14 dias',
      responsavel: 'Gestor Financeiro',
      recursos: 'Planilha ou software financeiro, dedicação de 2h diárias',
      metricas: 'Controle diário 100% atualizado, projeções com 95% de precisão',
      beneficios: 'Maior previsibilidade financeira, redução de surpresas e melhor tomada de decisão',
      dataVencimento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Organizar contas, criar planilha de controle, treinar responsável'
    });

    // SEMANA 3-4: Processos Comerciais
    actions.push({
      id: 'comercial_1',
      acao: 'Estruturar funil de vendas completo com 5 etapas bem definidas',
      categoria: 'comercial',
      prioridade: 'alta',
      prazo: '21 dias',
      responsavel: 'Gestor Comercial',
      recursos: 'CRM simples, treinamento da equipe de vendas',
      metricas: 'Funil implementado com 20% de melhoria na conversão',
      beneficios: 'Maior previsibilidade de vendas, melhor acompanhamento de oportunidades',
      dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear processo atual, definir etapas, treinar equipe, implementar CRM'
    });

    actions.push({
      id: 'marketing_1',
      acao: 'Criar presença digital básica com perfis profissionais nas principais redes sociais',
      categoria: 'marketing',
      prioridade: 'media',
      prazo: '28 dias',
      responsavel: 'Responsável por Marketing',
      recursos: 'Tempo para criação de conteúdo, ferramentas gratuitas de design',
      metricas: 'Perfis criados em 3 redes sociais, 5 posts por semana',
      beneficios: 'Maior visibilidade da marca, geração de leads orgânicos',
      dataVencimento: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Criar perfis, definir identidade visual, planejar conteúdo'
    });

    // SEMANA 5-6: Gestão de Pessoas
    actions.push({
      id: 'rh_1',
      acao: 'Implementar processo de avaliação de desempenho trimestral',
      categoria: 'rh',
      prioridade: 'media',
      prazo: '35 dias',
      responsavel: 'Gestor de RH',
      recursos: 'Formulários de avaliação, tempo para reuniões individuais',
      metricas: '100% da equipe avaliada trimestralmente',
      beneficios: 'Melhoria no desempenho da equipe, maior motivação e direcionamento',
      dataVencimento: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Criar formulários, treinar gestores, estabelecer cronograma'
    });

    actions.push({
      id: 'cultura_1',
      acao: 'Definir valores e missão da empresa com participação de toda a equipe',
      categoria: 'gestao',
      prioridade: 'media',
      prazo: '42 dias',
      responsavel: 'Diretor/Sócio',
      recursos: 'Reuniões com equipe, tempo para reflexão e consenso',
      metricas: 'Valores definidos e comunicados para 100% da equipe',
      beneficios: 'Maior alinhamento da equipe, cultura organizacional mais forte',
      dataVencimento: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Realizar workshops, coletar feedbacks, documentar valores'
    });

    // SEMANA 7-8: Operacional e Qualidade
    actions.push({
      id: 'operacional_1',
      acao: 'Padronizar todos os processos operacionais principais com check-lists',
      categoria: 'operacional',
      prioridade: 'alta',
      prazo: '49 dias',
      responsavel: 'Gestor Operacional',
      recursos: 'Tempo para documentação, ferramentas de padronização',
      metricas: '100% dos processos críticos documentados e seguidos',
      beneficios: 'Redução de erros, maior consistência na entrega, facilita treinamentos',
      dataVencimento: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear processos, criar check-lists, treinar equipe'
    });

    actions.push({
      id: 'qualidade_1',
      acao: 'Implementar sistema de feedback dos clientes com NPS mensal',
      categoria: 'operacional',
      prioridade: 'media',
      prazo: '56 dias',
      responsavel: 'Atendimento ao Cliente',
      recursos: 'Ferramenta de pesquisa, tempo para análise de dados',
      metricas: 'NPS coletado mensalmente de 80% dos clientes',
      beneficios: 'Melhoria contínua da qualidade, maior satisfação do cliente',
      dataVencimento: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Escolher ferramenta, criar pesquisa, estabelecer rotina'
    });

    // SEMANA 9-10: Estratégia e Planejamento
    actions.push({
      id: 'estrategia_1',
      acao: 'Desenvolver plano estratégico de 12 meses com metas específicas por trimestre',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '63 dias',
      responsavel: 'Diretor/Sócio',
      recursos: 'Tempo para planejamento, análise de mercado',
      metricas: 'Plano criado com 12 metas específicas e mensuráveis',
      beneficios: 'Direcionamento claro para o crescimento, metas alcançáveis',
      dataVencimento: new Date(Date.now() + 63 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Analisar mercado, definir objetivos, criar cronograma'
    });

    actions.push({
      id: 'financeiro_2',
      acao: 'Separar completamente finanças pessoais das empresariais',
      categoria: 'financeiro',
      prioridade: 'alta',
      prazo: '70 dias',
      responsavel: 'Diretor Financeiro',
      recursos: 'Conta PJ, organização documental, controle rígido',
      metricas: '100% das transações separadas e organizadas',
      beneficios: 'Maior controle financeiro, benefícios fiscais, profissionalização',
      dataVencimento: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Abrir conta PJ, organizar documentos, estabelecer rotinas'
    });

    // SEMANA 11-12: Marketing e Vendas Avançado
    actions.push({
      id: 'marketing_2',
      acao: 'Criar estratégia de marketing de conteúdo com blog/canal especializado',
      categoria: 'marketing',
      prioridade: 'media',
      prazo: '77 dias',
      responsavel: 'Marketing',
      recursos: 'Criação de conteúdo, plataforma de publicação',
      metricas: '2 conteúdos por semana, 1000 visualizações mensais',
      beneficios: 'Autoridade no mercado, geração de leads qualificados',
      dataVencimento: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Definir temas, criar calendário editorial, produzir conteúdo'
    });

    actions.push({
      id: 'comercial_2',
      acao: 'Implementar programa de fidelização e retenção de clientes',
      categoria: 'comercial',
      prioridade: 'media',
      prazo: '84 dias',
      responsavel: 'Atendimento',
      recursos: 'Sistema de pontuação, benefícios para clientes fiéis',
      metricas: '30% de aumento na retenção de clientes',
      beneficios: 'Maior lifetime value, redução do custo de aquisição',
      dataVencimento: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Criar programa, comunicar clientes, acompanhar resultados'
    });

    // SEMANA 13-14: Tecnologia e Automação
    actions.push({
      id: 'tecnologia_1',
      acao: 'Automatizar processos repetitivos com ferramentas digitais',
      categoria: 'operacional',
      prioridade: 'media',
      prazo: '91 dias',
      responsavel: 'Responsável por Tecnologia',
      recursos: 'Ferramentas de automação, treinamento da equipe',
      metricas: '5 processos automatizados, 20% de economia de tempo',
      beneficios: 'Maior eficiência, redução de erros manuais, foco em atividades estratégicas',
      dataVencimento: new Date(Date.now() + 91 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Identificar processos, escolher ferramentas, implementar automações'
    });

    actions.push({
      id: 'dados_1',
      acao: 'Implementar sistema de métricas e indicadores de performance (KPIs)',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '98 dias',
      responsavel: 'Gestor Geral',
      recursos: 'Dashboard de métricas, tempo para análise semanal',
      metricas: '15 KPIs principais acompanhados semanalmente',
      beneficios: 'Tomada de decisão baseada em dados, identificação rápida de problemas',
      dataVencimento: new Date(Date.now() + 98 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Definir KPIs, criar dashboard, estabelecer rotina de análise'
    });

    // SEMANA 15-16: Expansão e Parcerias
    actions.push({
      id: 'comercial_3',
      acao: 'Desenvolver programa de parcerias estratégicas',
      categoria: 'comercial',
      prioridade: 'media',
      prazo: '105 dias',
      responsavel: 'Diretor Comercial',
      recursos: 'Tempo para networking, contratos de parceria',
      metricas: '3 parcerias estratégicas estabelecidas',
      beneficios: 'Ampliação do mercado, novos canais de distribuição',
      dataVencimento: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Identificar parceiros, negociar termos, formalizar acordos'
    });

    actions.push({
      id: 'inovacao_1',
      acao: 'Criar processo de inovação contínua com ideias da equipe',
      categoria: 'gestao',
      prioridade: 'baixa',
      prazo: '112 dias',
      responsavel: 'Gestor de Inovação',
      recursos: 'Caixa de sugestões, reuniões mensais de brainstorming',
      metricas: '10 ideias implementadas por trimestre',
      beneficios: 'Melhoria contínua, engajamento da equipe, vantagem competitiva',
      dataVencimento: new Date(Date.now() + 112 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Criar processo, estimular participação, avaliar ideias'
    });

    // SEMANA 17-18: Gestão de Riscos e Compliance
    actions.push({
      id: 'risco_1',
      acao: 'Implementar gestão de riscos empresariais e planos de contingência',
      categoria: 'gestao',
      prioridade: 'media',
      prazo: '119 dias',
      responsavel: 'Diretor Geral',
      recursos: 'Análise de riscos, criação de planos de contingência',
      metricas: '10 principais riscos mapeados com planos de ação',
      beneficios: 'Maior segurança empresarial, preparação para crises',
      dataVencimento: new Date(Date.now() + 119 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear riscos, criar planos, treinar equipe'
    });

    actions.push({
      id: 'compliance_1',
      acao: 'Regularizar toda documentação legal e fiscal da empresa',
      categoria: 'financeiro',
      prioridade: 'alta',
      prazo: '126 dias',
      responsavel: 'Contador/Advogado',
      recursos: 'Consulta especializada, organização documental',
      metricas: '100% da documentação regularizada e organizada',
      beneficios: 'Segurança jurídica, evitar multas e problemas fiscais',
      dataVencimento: new Date(Date.now() + 126 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Auditar documentação, regularizar pendências, organizar arquivo'
    });

    // SEMANA 19-20: Capacitação e Desenvolvimento
    actions.push({
      id: 'capacitacao_1',
      acao: 'Implementar programa de treinamento e desenvolvimento da equipe',
      categoria: 'rh',
      prioridade: 'media',
      prazo: '133 dias',
      responsavel: 'RH/Treinamento',
      recursos: 'Cursos, treinamentos, tempo dedicado ao desenvolvimento',
      metricas: '40 horas de treinamento por funcionário/ano',
      beneficios: 'Equipe mais qualificada, maior produtividade, redução de turnover',
      dataVencimento: new Date(Date.now() + 133 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear necessidades, escolher cursos, criar cronograma'
    });

    actions.push({
      id: 'lideranca_1',
      acao: 'Desenvolver programa de liderança para gestores intermediários',
      categoria: 'rh',
      prioridade: 'media',
      prazo: '140 dias',
      responsavel: 'Diretor de RH',
      recursos: 'Coaching, treinamentos de liderança, mentoria',
      metricas: '100% dos gestores treinados em liderança',
      beneficios: 'Melhor gestão de equipes, maior engajamento, crescimento sustentável',
      dataVencimento: new Date(Date.now() + 140 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Identificar líderes, criar programa, acompanhar evolução'
    });

    // SEMANA 21-22: Sustentabilidade e Responsabilidade Social
    actions.push({
      id: 'sustentabilidade_1',
      acao: 'Implementar práticas sustentáveis e responsabilidade social',
      categoria: 'gestao',
      prioridade: 'baixa',
      prazo: '147 dias',
      responsavel: 'Comitê de Sustentabilidade',
      recursos: 'Mudanças de processos, investimento em práticas verdes',
      metricas: '30% de redução no desperdício, 1 ação social por trimestre',
      beneficios: 'Melhoria da imagem da empresa, redução de custos, impacto social',
      dataVencimento: new Date(Date.now() + 147 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Avaliar impactos, criar políticas, implementar práticas'
    });

    actions.push({
      id: 'comunidade_1',
      acao: 'Criar programa de relacionamento com a comunidade local',
      categoria: 'marketing',
      prioridade: 'baixa',
      prazo: '154 dias',
      responsavel: 'Marketing/RH',
      recursos: 'Tempo para eventos, parcerias com organizações locais',
      metricas: '4 eventos comunitários por ano',
      beneficios: 'Fortalecimento da marca local, networking, responsabilidade social',
      dataVencimento: new Date(Date.now() + 154 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Identificar oportunidades, criar eventos, medir impacto'
    });

    // SEMANA 23-24: Expansão e Crescimento
    actions.push({
      id: 'expansao_1',
      acao: 'Desenvolver plano de expansão para novos mercados ou produtos',
      categoria: 'comercial',
      prioridade: 'media',
      prazo: '161 dias',
      responsavel: 'Diretor Comercial',
      recursos: 'Pesquisa de mercado, investimento em desenvolvimento',
      metricas: '1 novo mercado ou produto validado para expansão',
      beneficios: 'Crescimento do faturamento, diversificação de receitas',
      dataVencimento: new Date(Date.now() + 161 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Pesquisar mercado, validar oportunidades, criar plano'
    });

    actions.push({
      id: 'consolidacao_1',
      acao: 'Consolidar todas as melhorias implementadas e criar plano para os próximos 12 meses',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '168 dias',
      responsavel: 'Diretor Geral',
      recursos: 'Análise de resultados, planejamento estratégico avançado',
      metricas: 'Plano de 12 meses criado com base nos resultados dos 6 meses anteriores',
      beneficios: 'Crescimento sustentável, melhoria contínua, visão de longo prazo',
      dataVencimento: new Date(Date.now() + 168 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Avaliar resultados, identificar melhorias, planejar futuro'
    });

    return actions;
  };

  const handleSubmit = async (data: DiagnosticData) => {
    setIsSubmitting(true);
    
    try {
      // Simular processamento (aqui você pode integrar com IA real)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedPlan = generateActionPlan(data);
      
      // Salvar no localStorage
      localStorage.setItem(`diagnostic_plan_${userId}`, JSON.stringify(generatedPlan));
      localStorage.setItem(`diagnostic_company_${userId}`, data.empresaNome);
      
      setActionPlan(generatedPlan);
      setCompanyName(data.empresaNome);
      setHasExistingPlan(true);
      
      toast({
        title: "Plano de ação gerado!",
        description: `${generatedPlan.length} ações práticas foram criadas para acelerar sua empresa nos próximos 6 meses.`,
      });
      
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar plano",
        description: "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewDiagnostic = () => {
    // Limpar dados salvos
    localStorage.removeItem(`diagnostic_plan_${userId}`);
    localStorage.removeItem(`diagnostic_company_${userId}`);
    
    setHasExistingPlan(false);
    setActionPlan([]);
    setCompanyName('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (hasExistingPlan && actionPlan.length > 0) {
    return (
      <ActionPlanManager 
        initialActions={actionPlan}
        companyName={companyName}
        onBack={handleNewDiagnostic}
      />
    );
  }

  return (
    <SimpleDiagnosticForm 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default NewDiagnosticTestContent;
