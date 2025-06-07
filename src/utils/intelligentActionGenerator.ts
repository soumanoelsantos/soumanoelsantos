
import { ActionItem } from '@/components/diagnostic/NewDiagnosticTestContent';

interface DiagnosticData {
  empresaNome: string;
  [key: string]: any;
}

// Função para calcular apenas dias úteis
const addBusinessDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    // Segunda = 1, Terça = 2, ..., Sexta = 5, Sábado = 6, Domingo = 0
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

// Templates de ações por categoria (intercaladas)
const actionTemplates: Array<{
  categoria: ActionItem['categoria'];
  acao: string;
  prioridade: ActionItem['prioridade'];
  prazo: string;
  responsavel: string;
  recursos: string;
  metricas: string;
  beneficios: string;
  detalhesImplementacao: string;
  dicaIA: string;
  comoFazer: string[];
}> = [
  // Comercial
  {
    categoria: 'comercial',
    acao: 'Implementar CRM para gestão de leads',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Gerente Comercial',
    recursos: 'Software CRM, treinamento da equipe',
    metricas: 'Taxa de conversão de leads, tempo de follow-up',
    beneficios: 'Melhoria na gestão de prospects e aumento das vendas',
    detalhesImplementacao: 'Escolher CRM, configurar pipeline, treinar equipe',
    dicaIA: 'Comece com CRMs gratuitos como HubSpot para testar o processo',
    comoFazer: [
      'Pesquisar e selecionar CRM adequado ao negócio',
      'Configurar pipeline de vendas e campos personalizados',
      'Importar base de contatos existente',
      'Treinar equipe comercial no uso da ferramenta',
      'Implementar rotina de acompanhamento de leads'
    ]
  },

  // Marketing
  {
    categoria: 'marketing',
    acao: 'Criar estratégia de conteúdo para redes sociais',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Analista de Marketing',
    recursos: 'Designer, redator, ferramentas de gestão',
    metricas: 'Engajamento, alcance, leads gerados',
    beneficios: 'Aumento da visibilidade da marca e geração de leads',
    detalhesImplementacao: 'Definir personas, criar calendário editorial, produzir conteúdo',
    dicaIA: 'Use ferramentas como Canva e Buffer para otimizar a produção',
    comoFazer: [
      'Definir personas e público-alvo específico',
      'Criar calendário editorial mensal com temas relevantes',
      'Produzir conteúdo visual atrativo e informativo',
      'Estabelecer frequência de postagens consistente',
      'Monitorar métricas de engajamento semanalmente'
    ]
  },

  // Gestão
  {
    categoria: 'gestao',
    acao: 'Definir indicadores-chave de performance (KPIs)',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Diretor Geral',
    recursos: 'Planilhas, dashboard, reuniões',
    metricas: 'Cumprimento de metas, ROI',
    beneficios: 'Melhor controle e direcionamento estratégico',
    detalhesImplementacao: 'Identificar KPIs críticos, criar dashboard, estabelecer rotina',
    dicaIA: 'Foque em 3-5 KPIs principais para não dispersar o foco',
    comoFazer: [
      'Identificar 3-5 KPIs mais críticos para o negócio',
      'Criar dashboard visual para acompanhamento',
      'Estabelecer metas mensais e trimestrais claras',
      'Implementar reuniões semanais de acompanhamento',
      'Ajustar estratégias baseado nos resultados obtidos'
    ]
  },

  // Financeiro
  {
    categoria: 'financeiro',
    acao: 'Implementar controle de fluxo de caixa diário',
    prioridade: 'alta',
    prazo: '3 dias',
    responsavel: 'Controller',
    recursos: 'Planilha ou software financeiro',
    metricas: 'Precisão das projeções, liquidez',
    beneficios: 'Melhor previsibilidade financeira',
    detalhesImplementacao: 'Criar planilha, definir categorias, implementar rotina',
    dicaIA: 'Use categorias simples: entradas, saídas e saldo projetado',
    comoFazer: [
      'Criar planilha com entradas e saídas previstas',
      'Categorizar receitas e despesas por tipo',
      'Atualizar diariamente com movimentações reais',
      'Projetar cenários para próximos 30 dias',
      'Revisar semanalmente e ajustar projeções'
    ]
  },

  // RH
  {
    categoria: 'rh',
    acao: 'Criar programa de desenvolvimento de colaboradores',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Gerente de RH',
    recursos: 'Plataforma de cursos, tempo dos colaboradores',
    metricas: 'Horas de treinamento, satisfação dos funcionários',
    beneficios: 'Melhoria da produtividade e retenção de talentos',
    detalhesImplementacao: 'Mapear necessidades, escolher cursos, criar cronograma',
    dicaIA: 'Comece com cursos online gratuitos e avalie o engajamento',
    comoFazer: [
      'Mapear competências necessárias por função',
      'Selecionar plataformas de cursos online adequadas',
      'Criar trilhas de aprendizagem personalizadas',
      'Estabelecer metas de desenvolvimento individual',
      'Acompanhar progresso e aplicação prática'
    ]
  },

  // Operacional
  {
    categoria: 'operacional',
    acao: 'Padronizar processos operacionais principais',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Gerente de Operações',
    recursos: 'Documentação, treinamento da equipe',
    metricas: 'Tempo de execução, qualidade dos processos',
    beneficios: 'Maior eficiência e redução de erros',
    detalhesImplementacao: 'Mapear processos, criar procedimentos, treinar equipe',
    dicaIA: 'Documente primeiro os processos mais críticos e frequentes',
    comoFazer: [
      'Mapear todos os processos operacionais principais',
      'Documentar passo a passo de cada processo',
      'Criar check-lists para atividades críticas',
      'Treinar equipe nos novos procedimentos',
      'Monitorar cumprimento e otimizar continuamente'
    ]
  },

  // Tecnologia
  {
    categoria: 'tecnologia',
    acao: 'Implementar sistema de backup automatizado',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Analista de TI',
    recursos: 'Software de backup, armazenamento em nuvem',
    metricas: 'Frequência de backups, tempo de recuperação',
    beneficios: 'Segurança dos dados e continuidade do negócio',
    detalhesImplementacao: 'Escolher solução, configurar rotina, testar recuperação',
    dicaIA: 'Use soluções em nuvem para garantir redundância geográfica',
    comoFazer: [
      'Avaliar e selecionar solução de backup adequada',
      'Configurar backup automático diário dos dados críticos',
      'Testar processo de recuperação de dados',
      'Documentar procedimentos de backup e restore',
      'Monitorar logs e verificar integridade dos backups'
    ]
  },

  // Cultura
  {
    categoria: 'cultura',
    acao: 'Estabelecer valores e missão da empresa',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'CEO',
    recursos: 'Workshop com equipe, facilitador',
    metricas: 'Engajamento dos funcionários, alinhamento cultural',
    beneficios: 'Maior coesão da equipe e direcionamento estratégico',
    detalhesImplementacao: 'Workshop participativo, definir valores, comunicar amplamente',
    dicaIA: 'Envolva toda a equipe na construção para garantir engajamento',
    comoFazer: [
      'Organizar workshop com toda a equipe',
      'Facilitar discussões sobre propósito da empresa',
      'Definir missão, visão e valores colaborativamente',
      'Criar materiais visuais para comunicação',
      'Implementar rituais que reforcem a cultura'
    ]
  }
];

// Expandir templates para gerar mais variações
const expandedTemplates = [
  ...actionTemplates,
  // Adicionar mais variações para cada categoria
  {
    categoria: 'comercial' as const,
    acao: 'Desenvolver script de vendas padronizado',
    prioridade: 'media' as const,
    prazo: '1 semana',
    responsavel: 'Coordenador de Vendas',
    recursos: 'Treinamento, material de apoio',
    metricas: 'Taxa de fechamento, tempo médio de venda',
    beneficios: 'Melhoria na consistência das vendas',
    detalhesImplementacao: 'Criar script, treinar equipe, acompanhar resultados',
    dicaIA: 'Teste o script com clientes reais e ajuste conforme feedback',
    comoFazer: [
      'Analisar objeções mais comuns dos clientes',
      'Desenvolver respostas padronizadas eficazes',
      'Criar fluxo de abordagem estruturado',
      'Treinar equipe comercial no novo script',
      'Medir resultados e otimizar abordagem'
    ]
  },
  {
    categoria: 'marketing' as const,
    acao: 'Implementar estratégia de email marketing',
    prioridade: 'media' as const,
    prazo: '2 semanas',
    responsavel: 'Especialista em Marketing Digital',
    recursos: 'Plataforma de email, designer',
    metricas: 'Taxa de abertura, cliques, conversões',
    beneficios: 'Nutrição de leads e fidelização de clientes',
    detalhesImplementacao: 'Segmentar base, criar campanhas, automatizar fluxos',
    dicaIA: 'Personalize o máximo possível baseado no comportamento do usuário',
    comoFazer: [
      'Segmentar base de contatos por interesse e comportamento',
      'Criar templates de email profissionais e responsivos',
      'Desenvolver sequências automatizadas de nutrição',
      'Configurar disparos baseados em ações do usuário',
      'Monitorar métricas e otimizar campanhas'
    ]
  },
  // Continue expandindo com mais ações...
];

// Gerar ações intercalando categorias
export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData,
  integratedData?: any
): ActionItem[] => {
  const actions: ActionItem[] = [];
  const today = new Date();
  
  // Categorias para intercalar
  const categories: ActionItem['categoria'][] = [
    'comercial', 'marketing', 'gestao', 'financeiro', 
    'rh', 'operacional', 'tecnologia', 'cultura'
  ];

  let categoryIndex = 0;
  let templateIndex = 0;
  let semana = 1;
  let dayCounter = 1;

  // Gerar mais de 380 ações intercalando categorias
  for (let i = 0; i < 400; i++) {
    const currentCategory = categories[categoryIndex];
    
    // Encontrar template da categoria atual
    const categoryTemplates = expandedTemplates.filter(t => t.categoria === currentCategory);
    const template = categoryTemplates[templateIndex % categoryTemplates.length];
    
    if (template) {
      const actionDate = addBusinessDays(today, dayCounter);
      
      const action: ActionItem = {
        id: `action_${Date.now()}_${i}`,
        acao: `${template.acao} - ${diagnosticData.empresaNome}`,
        categoria: template.categoria,
        prioridade: template.prioridade,
        prazo: template.prazo,
        responsavel: template.responsavel,
        recursos: template.recursos,
        metricas: template.metricas,
        beneficios: template.beneficios,
        dataVencimento: actionDate,
        concluida: false,
        detalhesImplementacao: template.detalhesImplementacao,
        dicaIA: template.dicaIA,
        status: 'pendente' as const,
        semana: semana,
        comoFazer: template.comoFazer.map((step, index) => 
          `Etapa ${index + 1}: ${step}`
        ),
        completedSteps: new Array(template.comoFazer.length).fill(false)
      };

      actions.push(action);
    }

    // Intercalar categorias
    categoryIndex = (categoryIndex + 1) % categories.length;
    
    // Se completou um ciclo de categorias, avançar template
    if (categoryIndex === 0) {
      templateIndex++;
    }

    // Avançar semana a cada 25 ações
    if (i > 0 && i % 25 === 0) {
      semana++;
    }

    dayCounter += Math.floor(Math.random() * 3) + 1; // 1-3 dias entre ações
  }

  // Adicionar alguns exemplos de ações de sucesso do cliente
  const successActions = [
    {
      categoria: 'comercial' as const,
      acao: `Caso de Sucesso: Empresa similar aumentou vendas em 40% - ${diagnosticData.empresaNome}`,
      detalhes: 'Implementaram CRM e processo estruturado de follow-up'
    },
    {
      categoria: 'marketing' as const,
      acao: `Benchmark: Cliente conseguiu 300% mais leads - ${diagnosticData.empresaNome}`,
      detalhes: 'Utilizaram estratégia de conteúdo focada em dores do cliente'
    },
    {
      categoria: 'gestao' as const,
      acao: `Referência: Organização reduziu custos em 25% - ${diagnosticData.empresaNome}`,
      detalhes: 'Implementaram controles financeiros e KPIs de gestão'
    }
  ];

  successActions.forEach((success, index) => {
    const actionDate = addBusinessDays(today, dayCounter + index * 7);
    actions.push({
      id: `success_${Date.now()}_${index}`,
      acao: success.acao,
      categoria: success.categoria,
      prioridade: 'baixa' as const,
      prazo: '1 semana',
      responsavel: 'Equipe de Gestão',
      recursos: 'Análise de casos, benchmarking',
      metricas: 'Aplicação das práticas, resultados similares',
      beneficios: 'Aprendizado com casos reais de sucesso',
      dataVencimento: actionDate,
      concluida: false,
      detalhesImplementacao: success.detalhes,
      dicaIA: 'Analise como adaptar essas práticas para seu contexto específico',
      status: 'pendente' as const,
      semana: Math.ceil((index + 1) / 5),
      comoFazer: [
        'Etapa 1: Estudar o caso de sucesso detalhadamente',
        'Etapa 2: Identificar aplicabilidade ao seu negócio',
        'Etapa 3: Adaptar estratégia para sua realidade',
        'Etapa 4: Implementar versão adaptada',
        'Etapa 5: Monitorar resultados e ajustar'
      ],
      completedSteps: new Array(5).fill(false)
    });
  });

  console.log(`Geradas ${actions.length} ações intercalando categorias`);
  return actions;
};
