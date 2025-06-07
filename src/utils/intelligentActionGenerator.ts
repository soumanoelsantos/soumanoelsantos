
import { ActionItem } from '@/components/diagnostic/NewDiagnosticTestContent';

interface DiagnosticResults {
  [key: string]: {
    pontuacao: number;
    nivel: 'critico' | 'atencao' | 'bom' | 'excelente';
    problemas: string[];
    solucoes: string[];
  };
}

interface GenerateActionsParams {
  results: DiagnosticResults;
  companyName: string;
  maxActions?: number;
}

// Base de ações específicas por categoria e nível
const actionTemplates = {
  comercial: {
    critico: [
      'Implementar sistema de CRM para gestão de leads',
      'Criar processo estruturado de vendas com etapas definidas',
      'Desenvolver treinamento de técnicas de vendas para equipe',
      'Estabelecer metas comerciais claras e mensuráveis',
      'Implementar follow-up sistemático de propostas'
    ],
    atencao: [
      'Otimizar processo de qualificação de leads',
      'Criar scripts de abordagem comercial',
      'Implementar sistema de acompanhamento de pipeline',
      'Desenvolver material de apoio às vendas',
      'Estabelecer processo de pós-venda'
    ],
    bom: [
      'Automatizar relatórios de vendas',
      'Implementar programa de fidelização de clientes',
      'Criar estratégias de upsell e cross-sell',
      'Desenvolver parcerias comerciais estratégicas'
    ]
  },
  marketing: {
    critico: [
      'Desenvolver identidade visual e posicionamento da marca',
      'Criar presença digital básica (site e redes sociais)',
      'Implementar estratégia de marketing digital',
      'Desenvolver materiais promocionais básicos',
      'Estabelecer estratégia de comunicação'
    ],
    atencao: [
      'Otimizar SEO do site da empresa',
      'Criar campanhas de marketing direcionadas',
      'Implementar automação de marketing',
      'Desenvolver conteúdo relevante para o público-alvo',
      'Estabelecer métricas de marketing'
    ],
    bom: [
      'Implementar marketing de conteúdo avançado',
      'Criar programa de referência de clientes',
      'Desenvolver estratégias de remarketing',
      'Implementar testes A/B em campanhas'
    ]
  },
  gestao: {
    critico: [
      'Implementar sistema de gestão empresarial (ERP)',
      'Criar organograma e definir responsabilidades',
      'Estabelecer processos operacionais básicos',
      'Implementar controles internos básicos',
      'Criar sistema de comunicação interna'
    ],
    atencao: [
      'Otimizar processos existentes',
      'Implementar gestão por indicadores (KPIs)',
      'Criar manuais de procedimentos',
      'Estabelecer reuniões de acompanhamento',
      'Implementar sistema de feedback'
    ],
    bom: [
      'Implementar gestão de projetos',
      'Criar programa de melhoria contínua',
      'Desenvolver liderança da equipe',
      'Estabelecer planejamento estratégico formal'
    ]
  },
  financeiro: {
    critico: [
      'Implementar controle de fluxo de caixa diário',
      'Criar sistema de controle de contas a pagar e receber',
      'Estabelecer separação entre pessoa física e jurídica',
      'Implementar controle de custos básico',
      'Criar reserva de emergência'
    ],
    atencao: [
      'Otimizar gestão de capital de giro',
      'Implementar análise de rentabilidade por produto/serviço',
      'Criar relatórios financeiros mensais',
      'Estabelecer controle de inadimplência',
      'Implementar orçamento empresarial'
    ],
    bom: [
      'Implementar planejamento financeiro estratégico',
      'Criar análises de investimento (ROI)',
      'Desenvolver cenários financeiros',
      'Estabelecer métricas financeiras avançadas'
    ]
  },
  rh: {
    critico: [
      'Criar processos de recrutamento e seleção',
      'Implementar controles trabalhistas básicos',
      'Estabelecer política de remuneração',
      'Criar descrição de cargos e funções',
      'Implementar treinamento de integração'
    ],
    atencao: [
      'Desenvolver programa de treinamento e capacitação',
      'Implementar avaliação de desempenho',
      'Criar plano de carreira',
      'Estabelecer pesquisa de clima organizacional',
      'Implementar programa de benefícios'
    ],
    bom: [
      'Criar programa de desenvolvimento de liderança',
      'Implementar gestão por competências',
      'Desenvolver cultura organizacional',
      'Estabelecer programa de reconhecimento'
    ]
  },
  operacional: {
    critico: [
      'Implementar controle de qualidade básico',
      'Criar procedimentos operacionais padrão',
      'Estabelecer controle de estoque',
      'Implementar gestão de fornecedores',
      'Criar sistema de atendimento ao cliente'
    ],
    atencao: [
      'Otimizar processos produtivos',
      'Implementar gestão de projetos operacionais',
      'Criar sistema de manutenção preventiva',
      'Estabelecer controle de produtividade',
      'Implementar melhorias de layout'
    ],
    bom: [
      'Implementar automação de processos',
      'Criar programa de inovação',
      'Desenvolver parcerias operacionais',
      'Estabelecer benchmarking setorial'
    ]
  },
  tecnologia: {
    critico: [
      'Implementar infraestrutura de TI básica',
      'Criar backup e segurança de dados',
      'Estabelecer conectividade adequada',
      'Implementar softwares essenciais',
      'Criar política de uso de tecnologia'
    ],
    atencao: [
      'Otimizar sistemas existentes',
      'Implementar soluções em nuvem',
      'Criar automações básicas',
      'Estabelecer suporte técnico',
      'Implementar atualizações de segurança'
    ],
    bom: [
      'Implementar soluções avançadas de analytics',
      'Criar integrações entre sistemas',
      'Desenvolver soluções customizadas',
      'Estabelecer inovação tecnológica'
    ]
  },
  cultura: {
    critico: [
      'Definir missão, visão e valores da empresa',
      'Criar código de conduta empresarial',
      'Estabelecer comunicação clara de propósito',
      'Implementar práticas de transparência',
      'Criar ambiente de trabalho saudável'
    ],
    atencao: [
      'Desenvolver eventos de integração da equipe',
      'Implementar práticas de feedback contínuo',
      'Criar programas de reconhecimento',
      'Estabelecer rituais organizacionais',
      'Implementar práticas de bem-estar'
    ],
    bom: [
      'Criar programa de embaixadores da cultura',
      'Implementar inovação organizacional',
      'Desenvolver responsabilidade social',
      'Estabelecer cultura de alta performance'
    ]
  }
};

const getPriorityByScore = (score: number): 'alta' | 'media' | 'baixa' => {
  if (score <= 3) return 'alta';
  if (score <= 6) return 'media';
  return 'baixa';
};

const getStatusByPriority = (priority: 'alta' | 'media' | 'baixa'): 'pendente' | 'em_andamento' | 'realizado' | 'atrasado' => {
  if (priority === 'alta') return 'pendente';
  return 'pendente';
};

const getTimeframeByPriority = (priority: 'alta' | 'media' | 'baixa'): string => {
  switch (priority) {
    case 'alta': return '2 semanas';
    case 'media': return '1 mês';
    case 'baixa': return '2 meses';
    default: return '1 mês';
  }
};

const getResourcesByCategory = (category: string): string => {
  const resources = {
    comercial: 'Equipe comercial, sistema CRM, material de vendas',
    marketing: 'Designer, ferramentas de marketing digital, orçamento para mídia',
    gestao: 'Consultoria em gestão, sistema ERP, treinamento gerencial',
    financeiro: 'Contador, sistema financeiro, capital de giro',
    rh: 'Especialista em RH, plataforma de recrutamento, orçamento para treinamento',
    operacional: 'Equipe operacional, equipamentos, fornecedores',
    tecnologia: 'Especialista em TI, softwares, infraestrutura',
    cultura: 'Facilitador organizacional, eventos, comunicação interna'
  };
  return resources[category as keyof typeof resources] || 'Recursos internos e consultoria especializada';
};

const getMetricsByCategory = (category: string): string => {
  const metrics = {
    comercial: 'Aumento de 20% nas vendas, melhoria na taxa de conversão, redução do ciclo de vendas',
    marketing: 'Aumento de 30% no tráfego, melhoria na geração de leads, maior engajamento',
    gestao: 'Melhoria de 25% na eficiência operacional, redução de retrabalho, maior satisfação da equipe',
    financeiro: 'Melhoria de 15% na margem de lucro, redução de custos, melhor fluxo de caixa',
    rh: 'Redução de 20% no turnover, aumento na produtividade, melhoria no clima organizacional',
    operacional: 'Aumento de 20% na produtividade, redução de desperdícios, melhoria na qualidade',
    tecnologia: 'Redução de 30% no tempo de processos, maior segurança, melhor integração',
    cultura: 'Aumento na satisfação dos colaboradores, melhoria no NPS interno, maior retenção'
  };
  return metrics[category as keyof typeof metrics] || 'Melhoria geral nos indicadores da área';
};

const getBenefitsByCategory = (category: string): string => {
  const benefits = {
    comercial: 'Aumento significativo do faturamento, melhoria na previsibilidade de vendas e fortalecimento da posição no mercado',
    marketing: 'Maior visibilidade da marca, atração de clientes qualificados e fortalecimento da imagem corporativa',
    gestao: 'Melhoria na eficiência operacional, tomada de decisões mais assertivas e crescimento sustentável',
    financeiro: 'Maior controle financeiro, melhor rentabilidade e redução de riscos financeiros',
    rh: 'Equipe mais qualificada e motivada, redução de custos com turnover e melhoria do ambiente de trabalho',
    operacional: 'Maior produtividade, redução de custos operacionais e melhoria na qualidade dos produtos/serviços',
    tecnologia: 'Maior agilidade nos processos, redução de erros e melhoria na competitividade',
    cultura: 'Ambiente de trabalho mais positivo, maior engajamento da equipe e fortalecimento dos valores organizacionais'
  };
  return benefits[category as keyof typeof benefits] || 'Melhoria geral no desempenho organizacional';
};

const generateSteps = (action: string, category: string): string[] => {
  const baseSteps = {
    comercial: [
      'Mapear processo atual de vendas',
      'Definir melhorias necessárias',
      'Implementar as mudanças',
      'Treinar equipe comercial',
      'Monitorar resultados'
    ],
    marketing: [
      'Analisar situação atual do marketing',
      'Desenvolver estratégia',
      'Criar materiais necessários',
      'Executar campanha',
      'Acompanhar métricas'
    ],
    gestao: [
      'Diagnosticar situação atual',
      'Definir novos processos',
      'Implementar mudanças',
      'Treinar equipe',
      'Avaliar resultados'
    ],
    financeiro: [
      'Levantar situação financeira atual',
      'Implementar controles',
      'Treinar responsáveis',
      'Monitorar indicadores',
      'Ajustar processos'
    ],
    rh: [
      'Avaliar necessidades de RH',
      'Desenvolver políticas',
      'Implementar processos',
      'Capacitar gestores',
      'Acompanhar resultados'
    ],
    operacional: [
      'Mapear processos atuais',
      'Identificar melhorias',
      'Implementar mudanças',
      'Treinar equipe operacional',
      'Monitorar performance'
    ],
    tecnologia: [
      'Avaliar infraestrutura atual',
      'Selecionar soluções',
      'Implementar tecnologia',
      'Treinar usuários',
      'Monitorar desempenho'
    ],
    cultura: [
      'Diagnosticar cultura atual',
      'Definir cultura desejada',
      'Implementar iniciativas',
      'Engajar colaboradores',
      'Avaliar evolução'
    ]
  };
  
  return baseSteps[category as keyof typeof baseSteps] || [
    'Analisar situação atual',
    'Planejar implementação',
    'Executar ação',
    'Monitorar progresso',
    'Avaliar resultados'
  ];
};

const generateAITip = (action: string, category: string): string => {
  const tips = {
    comercial: 'Foque na qualificação de leads antes de investir em volume. Um lead bem qualificado vale mais que 10 leads frios.',
    marketing: 'Meça sempre o ROI das suas ações de marketing. O que não é medido, não pode ser melhorado.',
    gestao: 'Comece implementando processos simples e evolua gradualmente. Complexidade excessiva gera resistência.',
    financeiro: 'Mantenha sempre uma reserva de emergência equivalente a pelo menos 3 meses de despesas operacionais.',
    rh: 'Invista no desenvolvimento das pessoas. Colaboradores capacitados são o maior ativo de uma empresa.',
    operacional: 'Padronize os processos antes de automatizar. Automatizar um processo ruim só torna os problemas mais rápidos.',
    tecnologia: 'Escolha tecnologias que se integrem bem entre si. Ilhas de tecnologia geram ineficiência.',
    cultura: 'A cultura organizacional é construída através de ações consistentes, não apenas de discursos.'
  };
  
  return tips[category as keyof typeof tips] || 'Mantenha o foco nos resultados e meça constantemente o progresso.';
};

export const generateIntelligentActions = ({ 
  results, 
  companyName, 
  maxActions = 80 
}: GenerateActionsParams): ActionItem[] => {
  const actions: ActionItem[] = [];
  const usedActions = new Set<string>(); // Para controlar unicidade
  let actionCounter = 1;

  // Ordenar categorias por prioridade (menor pontuação = maior prioridade)
  const sortedCategories = Object.entries(results)
    .sort(([, a], [, b]) => a.pontuacao - b.pontuacao)
    .slice(0, 8); // Máximo 8 categorias

  // Distribuir ações por categoria
  const actionsPerCategory = Math.floor(maxActions / sortedCategories.length);
  const remainingActions = maxActions % sortedCategories.length;

  sortedCategories.forEach(([categoria, data], categoryIndex) => {
    const categoryKey = categoria as keyof typeof actionTemplates;
    const nivel = data.nivel;
    
    if (!actionTemplates[categoryKey]) return;

    const availableTemplates = [
      ...(actionTemplates[categoryKey][nivel] || []),
      ...(nivel === 'critico' ? [] : actionTemplates[categoryKey].critico || []),
      ...(nivel === 'bom' ? actionTemplates[categoryKey].atencao || [] : [])
    ];

    const categoryActionsLimit = actionsPerCategory + (categoryIndex < remainingActions ? 1 : 0);
    let categoryActionsCount = 0;

    // Gerar ações únicas para esta categoria
    for (const template of availableTemplates) {
      if (categoryActionsCount >= categoryActionsLimit) break;
      
      const actionName = `${template} - ${companyName}`;
      
      // Verificar se a ação já foi usada
      if (usedActions.has(actionName)) {
        continue; // Pular esta ação se já existe
      }
      
      usedActions.add(actionName);
      
      const priority = getPriorityByScore(data.pontuacao);
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + (actionCounter * 7)); // 1 semana entre ações

      const action: ActionItem = {
        id: `action_${actionCounter}`,
        acao: actionName,
        categoria: categoryKey,
        prioridade: priority,
        prazo: getTimeframeByPriority(priority),
        responsavel: 'A definir',
        recursos: getResourcesByCategory(categoryKey),
        metricas: getMetricsByCategory(categoryKey),
        beneficios: getBenefitsByCategory(categoryKey),
        dataVencimento: dueDate,
        concluida: false,
        detalhesImplementacao: `Ação focada em melhorar a área de ${categoria} da empresa, com base na pontuação obtida de ${data.pontuacao}/10.`,
        dicaIA: generateAITip(template, categoryKey),
        status: getStatusByPriority(priority),
        semana: Math.ceil(actionCounter / 7),
        comoFazer: generateSteps(template, categoryKey),
        completedSteps: []
      };

      actions.push(action);
      actionCounter++;
      categoryActionsCount++;
    }
  });

  console.log(`Generated ${actions.length} unique actions`);
  console.log(`Used actions count: ${usedActions.size}`);
  
  return actions.slice(0, maxActions);
};
