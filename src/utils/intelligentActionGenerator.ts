
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

// Templates únicos de ações por categoria
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
  {
    categoria: 'comercial',
    acao: 'Desenvolver script de vendas padronizado',
    prioridade: 'media',
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
    categoria: 'comercial',
    acao: 'Criar sistema de qualificação de leads',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Analista Comercial',
    recursos: 'Critérios de qualificação, formulários',
    metricas: 'Taxa de qualificação, conversão qualificados',
    beneficios: 'Foco em leads com maior potencial de conversão',
    detalhesImplementacao: 'Definir critérios, criar formulários, treinar equipe',
    dicaIA: 'Use scoring baseado em perfil ideal de cliente e comportamento',
    comoFazer: [
      'Analisar perfil dos melhores clientes atuais',
      'Definir critérios objetivos de qualificação',
      'Criar sistema de pontuação (lead scoring)',
      'Implementar processo de classificação',
      'Monitorar taxa de conversão por score'
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
  {
    categoria: 'marketing',
    acao: 'Implementar estratégia de email marketing',
    prioridade: 'media',
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
  {
    categoria: 'marketing',
    acao: 'Desenvolver programa de indicações',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Gerente de Marketing',
    recursos: 'Sistema de tracking, incentivos',
    metricas: 'Número de indicações, taxa de conversão',
    beneficios: 'Aquisição de clientes com menor custo',
    detalhesImplementacao: 'Criar programa, definir incentivos, implementar tracking',
    dicaIA: 'Ofereça incentivos atrativos tanto para quem indica quanto para indicado',
    comoFazer: [
      'Definir estrutura de recompensas atrativa',
      'Criar materiais promocionais do programa',
      'Implementar sistema de tracking de indicações',
      'Treinar equipe para promover o programa',
      'Monitorar performance e ajustar incentivos'
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
  {
    categoria: 'gestao',
    acao: 'Implementar reuniões de acompanhamento semanal',
    prioridade: 'alta',
    prazo: '3 dias',
    responsavel: 'Gerente Geral',
    recursos: 'Sala de reunião, agenda estruturada',
    metricas: 'Cumprimento de prazos, alinhamento da equipe',
    beneficios: 'Melhor comunicação e acompanhamento de resultados',
    detalhesImplementacao: 'Definir agenda, estabelecer rotina, documentar decisões',
    dicaIA: 'Mantenha reuniões objetivas com agenda clara e tempo limitado',
    comoFazer: [
      'Definir dia e horário fixo para reuniões',
      'Criar agenda padrão com tópicos essenciais',
      'Estabelecer responsáveis por cada área',
      'Documentar decisões e próximos passos',
      'Acompanhar cumprimento das ações definidas'
    ]
  },
  {
    categoria: 'gestao',
    acao: 'Criar sistema de metas e recompensas',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'RH',
    recursos: 'Sistema de avaliação, orçamento para incentivos',
    metricas: 'Cumprimento de metas individuais, motivação',
    beneficios: 'Aumento da produtividade e engajamento',
    detalhesImplementacao: 'Definir metas, criar sistema de recompensas, comunicar equipe',
    dicaIA: 'Combine metas individuais com objetivos da empresa',
    comoFazer: [
      'Definir metas SMART para cada função',
      'Criar sistema de recompensas variadas',
      'Estabelecer critérios claros de avaliação',
      'Comunicar programa para toda equipe',
      'Revisar e ajustar metas trimestralmente'
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
  {
    categoria: 'financeiro',
    acao: 'Criar relatórios gerenciais mensais',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Analista Financeiro',
    recursos: 'Software de gestão, dados financeiros',
    metricas: 'Pontualidade dos relatórios, qualidade da informação',
    beneficios: 'Tomada de decisão baseada em dados',
    detalhesImplementacao: 'Definir template, automatizar coleta, estabelecer rotina',
    dicaIA: 'Foque nos indicadores mais relevantes para a tomada de decisão',
    comoFazer: [
      'Definir template padrão de relatório gerencial',
      'Automatizar coleta de dados financeiros',
      'Incluir análises e insights relevantes',
      'Estabelecer prazo fixo para entrega',
      'Apresentar resultados para gestores'
    ]
  },
  {
    categoria: 'financeiro',
    acao: 'Implementar controle de custos por centro',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Controller',
    recursos: 'Sistema de custeio, classificação contábil',
    metricas: 'Precisão do rateio, controle de gastos',
    beneficios: 'Melhor visibilidade dos custos por área',
    detalhesImplementacao: 'Definir centros de custo, reclassificar gastos, treinar equipe',
    dicaIA: 'Comece com centros principais e evolua gradualmente',
    comoFazer: [
      'Definir principais centros de custo da empresa',
      'Reclassificar gastos históricos por centro',
      'Treinar equipe para classificação correta',
      'Criar relatórios por centro de custo',
      'Analisar performance de cada área mensalmente'
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
  {
    categoria: 'rh',
    acao: 'Implementar pesquisa de clima organizacional',
    prioridade: 'media',
    prazo: '1 semana',
    responsavel: 'Analista de RH',
    recursos: 'Ferramenta de pesquisa, tempo da equipe',
    metricas: 'Taxa de participação, índice de satisfação',
    beneficios: 'Identificação de pontos de melhoria no ambiente',
    detalhesImplementacao: 'Criar questionário, aplicar pesquisa, analisar resultados',
    dicaIA: 'Mantenha anonimato e comunique ações tomadas baseadas nos resultados',
    comoFazer: [
      'Desenvolver questionário objetivo e anônimo',
      'Aplicar pesquisa para todos os colaboradores',
      'Analisar resultados e identificar padrões',
      'Criar plano de ação para pontos críticos',
      'Comunicar ações tomadas baseadas no feedback'
    ]
  },
  {
    categoria: 'rh',
    acao: 'Estruturar processo de onboarding',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Coordenador de RH',
    recursos: 'Material de apresentação, mentor designado',
    metricas: 'Tempo de adaptação, satisfação novos funcionários',
    beneficios: 'Integração mais rápida e efetiva de novos colaboradores',
    detalhesImplementacao: 'Criar checklist, designar mentores, preparar material',
    dicaIA: 'Inclua apresentação da cultura, processos e expectativas claras',
    comoFazer: [
      'Criar checklist completo de integração',
      'Preparar material de apresentação da empresa',
      'Designar mentor para cada novo colaborador',
      'Agendar reuniões de acompanhamento',
      'Coletar feedback do processo de integração'
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
  {
    categoria: 'operacional',
    acao: 'Implementar controle de qualidade',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Supervisor de Qualidade',
    recursos: 'Check-lists, sistema de acompanhamento',
    metricas: 'Taxa de conformidade, reclamações',
    beneficios: 'Melhoria na qualidade dos produtos/serviços',
    detalhesImplementacao: 'Definir padrões, criar check-lists, treinar equipe',
    dicaIA: 'Comece com pontos críticos que mais impactam o cliente',
    comoFazer: [
      'Definir padrões de qualidade por processo',
      'Criar check-lists de verificação',
      'Treinar equipe nos padrões definidos',
      'Implementar rotina de inspeção',
      'Monitorar indicadores e melhorar continuamente'
    ]
  },
  {
    categoria: 'operacional',
    acao: 'Otimizar gestão de estoque',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Analista de Suprimentos',
    recursos: 'Sistema de controle, inventário',
    metricas: 'Giro de estoque, ruptura, obsolescência',
    beneficios: 'Redução de custos e melhoria do capital de giro',
    detalhesImplementacao: 'Analisar giro, definir pontos de pedido, automatizar controle',
    dicaIA: 'Use análise ABC para priorizar itens mais importantes',
    comoFazer: [
      'Realizar análise ABC dos itens de estoque',
      'Definir ponto de pedido para cada item',
      'Implementar sistema de controle automatizado',
      'Estabelecer rotina de inventário cíclico',
      'Monitorar indicadores de giro e ruptura'
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
  {
    categoria: 'tecnologia',
    acao: 'Atualizar sistemas de segurança digital',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Especialista em Segurança',
    recursos: 'Software antivírus, firewall, treinamento',
    metricas: 'Incidentes de segurança, tempo de resposta',
    beneficios: 'Proteção contra ameaças digitais',
    detalhesImplementacao: 'Auditar segurança, atualizar sistemas, treinar usuários',
    dicaIA: 'Foque em educação dos usuários, principal vetor de ataques',
    comoFazer: [
      'Realizar auditoria de segurança completa',
      'Atualizar todos os softwares de proteção',
      'Implementar políticas de senha forte',
      'Treinar equipe sobre phishing e ameaças',
      'Criar plano de resposta a incidentes'
    ]
  },
  {
    categoria: 'tecnologia',
    acao: 'Modernizar infraestrutura de TI',
    prioridade: 'media',
    prazo: '4 semanas',
    responsavel: 'Gerente de TI',
    recursos: 'Hardware, software, consultoria',
    metricas: 'Performance dos sistemas, downtime',
    beneficios: 'Maior eficiência e confiabilidade dos sistemas',
    detalhesImplementacao: 'Avaliar infraestrutura atual, planejar migração, executar',
    dicaIA: 'Priorize sistemas críticos e faça migração gradual',
    comoFazer: [
      'Avaliar infraestrutura atual e identificar gargalos',
      'Planejar arquitetura futura desejada',
      'Definir cronograma de migração por etapas',
      'Executar migração com testes intensivos',
      'Monitorar performance pós-migração'
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
  },
  {
    categoria: 'cultura',
    acao: 'Criar programa de reconhecimento',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'RH',
    recursos: 'Sistema de premiação, orçamento',
    metricas: 'Participação no programa, satisfação',
    beneficios: 'Aumento da motivação e retenção',
    detalhesImplementacao: 'Definir critérios, criar sistema, comunicar programa',
    dicaIA: 'Combine reconhecimento público com recompensas tangíveis',
    comoFazer: [
      'Definir critérios claros de reconhecimento',
      'Criar sistema de indicação entre pares',
      'Estabelecer diferentes tipos de premiação',
      'Comunicar programa para toda empresa',
      'Celebrar conquistas publicamente'
    ]
  },
  {
    categoria: 'cultura',
    acao: 'Implementar programa de feedback contínuo',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Gerente de RH',
    recursos: 'Ferramenta de feedback, treinamento',
    metricas: 'Frequência de feedbacks, melhoria de performance',
    beneficios: 'Desenvolvimento contínuo da equipe',
    detalhesImplementacao: 'Escolher ferramenta, treinar gestores, implementar rotina',
    dicaIA: 'Foque em feedback construtivo e específico para ser mais efetivo',
    comoFazer: [
      'Treinar gestores em técnicas de feedback',
      'Implementar ferramenta de feedback digital',
      'Estabelecer rotina de feedback mensal',
      'Criar cultura de feedback peer-to-peer',
      'Acompanhar evolução baseada nos feedbacks'
    ]
  }
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
  let templatesByCategory: { [key: string]: number } = {};
  let semana = 1;
  let dayCounter = 1;

  // Inicializar contadores por categoria
  categories.forEach(cat => {
    templatesByCategory[cat] = 0;
  });

  // Gerar 400 ações únicas intercalando categorias
  for (let i = 0; i < 400; i++) {
    const currentCategory = categories[categoryIndex];
    
    // Filtrar templates da categoria atual
    const categoryTemplates = actionTemplates.filter(t => t.categoria === currentCategory);
    
    if (categoryTemplates.length > 0) {
      // Usar o próximo template da categoria
      const templateIndex = templatesByCategory[currentCategory] % categoryTemplates.length;
      const template = categoryTemplates[templateIndex];
      
      // Incrementar contador da categoria
      templatesByCategory[currentCategory]++;
      
      const actionDate = addBusinessDays(today, dayCounter);
      
      // Criar ação única com ID baseado em categoria e template
      const uniqueId = `${currentCategory}_${templateIndex}_${Math.floor(i / categories.length)}_${Date.now()}`;
      
      const action: ActionItem = {
        id: uniqueId,
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

    // Intercalar para próxima categoria
    categoryIndex = (categoryIndex + 1) % categories.length;

    // Avançar semana a cada 25 ações
    if (i > 0 && i % 25 === 0) {
      semana++;
    }

    dayCounter += Math.floor(Math.random() * 3) + 1; // 1-3 dias entre ações
  }

  console.log(`Geradas ${actions.length} ações únicas intercalando categorias`);
  return actions;
};
