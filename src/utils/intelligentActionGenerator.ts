
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
  // Comercial - 8 templates únicos
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
  {
    categoria: 'comercial',
    acao: 'Implementar follow-up automático pós-venda',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Gerente de Relacionamento',
    recursos: 'Sistema de automação, templates',
    metricas: 'Taxa de recompra, satisfação cliente',
    beneficios: 'Aumento da retenção e fidelização',
    detalhesImplementacao: 'Configurar automação, criar templates, definir cronograma',
    dicaIA: 'Personalize mensagens baseado no perfil e histórico do cliente',
    comoFazer: [
      'Mapear jornada do cliente pós-venda',
      'Criar sequência de follow-up automatizada',
      'Desenvolver templates personalizados',
      'Configurar triggers baseados em comportamento',
      'Monitorar engajamento e ajustar frequência'
    ]
  },
  {
    categoria: 'comercial',
    acao: 'Criar programa de parcerias estratégicas',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Diretor Comercial',
    recursos: 'Prospecção, contratos, materiais',
    metricas: 'Número de parcerias, receita gerada',
    beneficios: 'Expansão de mercado através de parcerias',
    detalhesImplementacao: 'Identificar parceiros, negociar termos, formalizar acordos',
    dicaIA: 'Busque parceiros complementares que atendam o mesmo público',
    comoFazer: [
      'Identificar potenciais parceiros estratégicos',
      'Desenvolver proposta de valor mutual',
      'Negociar termos e condições de parceria',
      'Criar materiais de apoio para parceiros',
      'Implementar sistema de acompanhamento'
    ]
  },
  {
    categoria: 'comercial',
    acao: 'Desenvolver estratégia de pricing dinâmico',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Analista de Pricing',
    recursos: 'Análise de mercado, ferramentas de pricing',
    metricas: 'Margem de lucro, competitividade',
    beneficios: 'Otimização da margem e competitividade',
    detalhesImplementacao: 'Analisar concorrência, definir estratégias, implementar',
    dicaIA: 'Use análise baseada em valor entregue ao cliente',
    comoFazer: [
      'Analisar preços da concorrência detalhadamente',
      'Calcular custo real de cada produto/serviço',
      'Definir estratégia de posicionamento de preço',
      'Criar tabelas de preço dinâmicas',
      'Testar diferentes estratégias com grupos de clientes'
    ]
  },
  {
    categoria: 'comercial',
    acao: 'Implementar sistema de incentivos para vendas',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Gerente de Vendas',
    recursos: 'Orçamento para incentivos, sistema de tracking',
    metricas: 'Performance individual, motivação da equipe',
    beneficios: 'Aumento da produtividade da equipe comercial',
    detalhesImplementacao: 'Definir metas, criar sistema de recompensas, comunicar',
    dicaIA: 'Combine incentivos individuais com metas de equipe',
    comoFazer: [
      'Definir metas claras e alcançáveis',
      'Criar sistema de pontuação transparente',
      'Estabelecer diferentes tipos de recompensas',
      'Implementar tracking em tempo real',
      'Celebrar conquistas publicamente'
    ]
  },
  {
    categoria: 'comercial',
    acao: 'Criar processo de pós-venda estruturado',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Coordenador de Sucesso do Cliente',
    recursos: 'Sistema de acompanhamento, equipe dedicada',
    metricas: 'NPS, taxa de churn, upsell',
    beneficios: 'Redução do churn e aumento do lifetime value',
    detalhesImplementacao: 'Mapear processo, treinar equipe, implementar sistema',
    dicaIA: 'Foque na resolução proativa de problemas',
    comoFazer: [
      'Mapear jornada completa do cliente',
      'Definir pontos de contato obrigatórios',
      'Criar checklist de onboarding',
      'Implementar sistema de monitoramento de saúde',
      'Desenvolver estratégias de retenção personalizadas'
    ]
  },

  // Marketing - 8 templates únicos
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
  {
    categoria: 'marketing',
    acao: 'Criar campanha de SEO local',
    prioridade: 'alta',
    prazo: '3 semanas',
    responsavel: 'Especialista em SEO',
    recursos: 'Ferramentas SEO, criação de conteúdo',
    metricas: 'Ranking local, tráfego orgânico',
    beneficios: 'Aumento da visibilidade em buscas locais',
    detalhesImplementacao: 'Otimizar Google My Business, criar conteúdo local',
    dicaIA: 'Foque em palavras-chave geo-localizadas relevantes',
    comoFazer: [
      'Otimizar perfil do Google Meu Negócio completamente',
      'Criar conteúdo focado em termos locais',
      'Obter avaliações positivas de clientes',
      'Implementar schema markup local',
      'Monitorar rankings e ajustar estratégia'
    ]
  },
  {
    categoria: 'marketing',
    acao: 'Implementar marketing de influenciadores',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Coordenador de Influenciadores',
    recursos: 'Orçamento para parcerias, produtos para envio',
    metricas: 'Alcance, engajamento, conversões',
    beneficios: 'Expansão do alcance e credibilidade da marca',
    detalhesImplementacao: 'Identificar influenciadores, negociar parcerias, acompanhar resultados',
    dicaIA: 'Priorize micro-influenciadores com engajamento alto',
    comoFazer: [
      'Identificar influenciadores alinhados com a marca',
      'Analisar métricas de engajamento real',
      'Negociar termos de parceria transparentes',
      'Criar briefings claros para colaborações',
      'Acompanhar métricas de performance'
    ]
  },
  {
    categoria: 'marketing',
    acao: 'Desenvolver estratégia de marketing de conteúdo',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Content Manager',
    recursos: 'Equipe de criação, ferramentas de design',
    metricas: 'Tráfego do blog, tempo na página, leads',
    beneficios: 'Posicionamento como autoridade no setor',
    detalhesImplementacao: 'Criar calendário editorial, produzir conteúdo, distribuir',
    dicaIA: 'Foque em resolver problemas reais dos seus clientes',
    comoFazer: [
      'Pesquisar dores e necessidades do público-alvo',
      'Criar pilares de conteúdo estratégicos',
      'Desenvolver calendário editorial mensal',
      'Produzir conteúdo de alta qualidade consistentemente',
      'Distribuir conteúdo em múltiplos canais'
    ]
  },
  {
    categoria: 'marketing',
    acao: 'Criar sistema de automação de marketing',
    prioridade: 'alta',
    prazo: '3 semanas',
    responsavel: 'Marketing Automation Specialist',
    recursos: 'Plataforma de automação, integração com CRM',
    metricas: 'Taxa de conversão, nurturing score',
    beneficios: 'Escalonamento do processo de nurturing',
    detalhesImplementacao: 'Configurar fluxos, integrar sistemas, testar automações',
    dicaIA: 'Comece com fluxos simples e evolua gradualmente',
    comoFazer: [
      'Mapear jornada do cliente detalhadamente',
      'Configurar triggers baseados em comportamento',
      'Criar conteúdo para cada etapa do funil',
      'Integrar com CRM e outras ferramentas',
      'Testar e otimizar fluxos continuamente'
    ]
  },
  {
    categoria: 'marketing',
    acao: 'Implementar estratégia de retargeting',
    prioridade: 'media',
    prazo: '1 semana',
    responsavel: 'Especialista em Ads',
    recursos: 'Orçamento para anúncios, criativos',
    metricas: 'Taxa de retorno, custo por conversão',
    beneficios: 'Recuperação de visitantes que não converteram',
    detalhesImplementacao: 'Configurar pixels, criar audiências, desenvolver criativos',
    dicaIA: 'Segmente audiências por comportamento específico no site',
    comoFazer: [
      'Instalar pixels de rastreamento corretamente',
      'Criar audiências segmentadas por comportamento',
      'Desenvolver criativos específicos para cada segmento',
      'Configurar campanhas com orçamento controlado',
      'Monitorar performance e otimizar lances'
    ]
  },

  // Gestão - 8 templates únicos
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
  {
    categoria: 'gestao',
    acao: 'Implementar metodologia ágil de gestão',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Scrum Master',
    recursos: 'Treinamento em metodologias ágeis, ferramentas',
    metricas: 'Velocidade de entrega, qualidade dos projetos',
    beneficios: 'Maior agilidade e flexibilidade nos projetos',
    detalhesImplementacao: 'Treinar equipe, implementar sprints, definir cerimônias',
    dicaIA: 'Comece com Kanban antes de evoluir para Scrum',
    comoFazer: [
      'Treinar equipe nos conceitos ágeis básicos',
      'Implementar quadro Kanban visual',
      'Definir sprints de 2-4 semanas',
      'Estabelecer cerimônias (planning, review, retrospectiva)',
      'Medir velocidade e melhorar continuamente'
    ]
  },
  {
    categoria: 'gestao',
    acao: 'Criar sistema de gestão de riscos',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Gerente de Riscos',
    recursos: 'Matriz de riscos, planos de contingência',
    metricas: 'Número de riscos identificados, planos de mitigação',
    beneficios: 'Redução de impactos negativos nos negócios',
    detalhesImplementacao: 'Identificar riscos, avaliar impactos, criar planos',
    dicaIA: 'Foque nos riscos que podem ter maior impacto no negócio',
    comoFazer: [
      'Identificar principais riscos do negócio',
      'Avaliar probabilidade e impacto de cada risco',
      'Criar matriz de riscos visual',
      'Desenvolver planos de contingência específicos',
      'Revisar e atualizar riscos mensalmente'
    ]
  },
  {
    categoria: 'gestao',
    acao: 'Implementar gestão por competências',
    prioridade: 'media',
    prazo: '4 semanas',
    responsavel: 'Gerente de RH',
    recursos: 'Mapeamento de competências, avaliações',
    metricas: 'Nível de competências, gaps identificados',
    beneficios: 'Desenvolvimento direcionado da equipe',
    detalhesImplementacao: 'Mapear competências, avaliar equipe, criar planos',
    dicaIA: 'Alinhe competências com objetivos estratégicos da empresa',
    comoFazer: [
      'Mapear competências necessárias por função',
      'Avaliar nível atual de cada colaborador',
      'Identificar gaps de competências críticos',
      'Criar planos de desenvolvimento individualizados',
      'Acompanhar evolução trimestralmente'
    ]
  },
  {
    categoria: 'gestao',
    acao: 'Criar sistema de comunicação interna',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Coordenador de Comunicação',
    recursos: 'Ferramentas de comunicação, treinamento',
    metricas: 'Engajamento da equipe, clareza das informações',
    beneficios: 'Melhoria na comunicação e alinhamento interno',
    detalhesImplementacao: 'Escolher ferramentas, criar processos, treinar equipe',
    dicaIA: 'Use múltiplos canais para diferentes tipos de comunicação',
    comoFazer: [
      'Escolher ferramentas adequadas para cada tipo de comunicação',
      'Criar processos claros de comunicação',
      'Estabelecer responsáveis por cada canal',
      'Treinar equipe no uso das ferramentas',
      'Medir efetividade da comunicação regularmente'
    ]
  },
  {
    categoria: 'gestao',
    acao: 'Implementar balanced scorecard',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Controller',
    recursos: 'Software de BSC, dados históricos',
    metricas: 'Performance nas 4 perspectivas do BSC',
    beneficios: 'Visão holística da performance organizacional',
    detalhesImplementacao: 'Definir perspectivas, criar mapas estratégicos, implementar',
    dicaIA: 'Conecte objetivos das diferentes perspectivas causalmente',
    comoFazer: [
      'Definir objetivos para as 4 perspectivas do BSC',
      'Criar mapa estratégico com relações causais',
      'Estabelecer indicadores para cada objetivo',
      'Implementar sistema de acompanhamento',
      'Revisar e ajustar estratégia trimestralmente'
    ]
  },

  // Continue com os outros templates seguindo o mesmo padrão...
  // Financeiro, RH, Operacional, Tecnologia, Cultura
  // Cada categoria com 8 templates únicos e diferentes

  // Financeiro - 8 templates únicos
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
    acao: 'Implementar orçamento empresarial',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Diretor Financeiro',
    recursos: 'Dados históricos, projeções de mercado',
    metricas: 'Aderência ao orçado, variações',
    beneficios: 'Melhor planejamento e controle financeiro',
    detalhesImplementacao: 'Analisar histórico, projetar cenários, definir metas',
    dicaIA: 'Crie cenários otimista, realista e pessimista',
    comoFazer: [
      'Analisar performance histórica detalhadamente',
      'Projetar receitas baseado em pipeline',
      'Estimar custos e despesas por categoria',
      'Criar cenários de diferentes situações',
      'Acompanhar performance vs orçado mensalmente'
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
  {
    categoria: 'financeiro',
    acao: 'Criar sistema de cobrança eficiente',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Gerente de Cobrança',
    recursos: 'Sistema de cobrança, equipe treinada',
    metricas: 'Taxa de inadimplência, prazo médio de recebimento',
    beneficios: 'Redução da inadimplência e melhoria do fluxo',
    detalhesImplementacao: 'Mapear processo, treinar equipe, implementar sistema',
    dicaIA: 'Use múltiplos canais e abordagens personalizadas',
    comoFazer: [
      'Mapear processo atual de cobrança',
      'Segmentar clientes por perfil de pagamento',
      'Criar diferentes abordagens por segmento',
      'Treinar equipe em técnicas de cobrança',
      'Implementar sistema de acompanhamento'
    ]
  },
  {
    categoria: 'financeiro',
    acao: 'Implementar análise de viabilidade de projetos',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Analista de Projetos',
    recursos: 'Ferramentas de análise, dados de mercado',
    metricas: 'ROI dos projetos, payback',
    beneficios: 'Melhor seleção de investimentos',
    detalhesImplementacao: 'Criar metodologia, treinar equipe, implementar processo',
    dicaIA: 'Use múltiplos critérios: VPL, TIR, payback e risco',
    comoFazer: [
      'Definir metodologia de análise de viabilidade',
      'Criar templates padronizados de análise',
      'Treinar equipe na metodologia',
      'Implementar processo de aprovação',
      'Acompanhar performance dos projetos aprovados'
    ]
  },
  {
    categoria: 'financeiro',
    acao: 'Criar política de gestão de caixa',
    prioridade: 'alta',
    prazo: '1 semana',
    responsavel: 'Tesoureiro',
    recursos: 'Política documentada, treinamento',
    metricas: 'Liquidez, rentabilidade das aplicações',
    beneficios: 'Otimização da gestão de recursos financeiros',
    detalhesImplementacao: 'Documentar política, treinar equipe, implementar controles',
    dicaIA: 'Defina níveis mínimos de caixa para diferentes cenários',
    comoFazer: [
      'Definir política de níveis mínimos de caixa',
      'Estabelecer critérios para aplicações financeiras',
      'Criar processo de aprovação para movimentações',
      'Documentar procedimentos claramente',
      'Treinar equipe responsável pela execução'
    ]
  },
  {
    categoria: 'financeiro',
    acao: 'Implementar controle de margem por produto',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Analista de Custos',
    recursos: 'Sistema de custeio, dados de vendas',
    metricas: 'Margem por produto, rentabilidade',
    beneficios: 'Identificação dos produtos mais rentáveis',
    detalhesImplementacao: 'Mapear custos, calcular margens, criar relatórios',
    dicaIA: 'Use custeio ABC para produtos mais complexos',
    comoFazer: [
      'Mapear todos os custos por produto detalhadamente',
      'Implementar sistema de custeio adequado',
      'Calcular margens de contribuição individuais',
      'Criar relatórios de rentabilidade por produto',
      'Analisar mix de produtos e ajustar estratégia'
    ]
  },

  // RH - 8 templates únicos
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
  {
    categoria: 'rh',
    acao: 'Implementar avaliação de performance 360°',
    prioridade: 'media',
    prazo: '4 semanas',
    responsavel: 'Gerente de RH',
    recursos: 'Sistema de avaliação, treinamento de avaliadores',
    metricas: 'Qualidade das avaliações, desenvolvimento individual',
    beneficios: 'Visão mais completa do desempenho dos colaboradores',
    detalhesImplementacao: 'Escolher ferramenta, treinar avaliadores, implementar ciclo',
    dicaIA: 'Treine bem os avaliadores para garantir feedback construtivo',
    comoFazer: [
      'Escolher ferramenta de avaliação 360°',
      'Treinar todos os avaliadores no processo',
      'Definir competências e critérios de avaliação',
      'Implementar ciclo de avaliação semestral',
      'Criar planos de desenvolvimento baseados nos resultados'
    ]
  },
  {
    categoria: 'rh',
    acao: 'Criar programa de mentoria interna',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Coordenador de Desenvolvimento',
    recursos: 'Mentores sênior, materiais de apoio',
    metricas: 'Número de mentorias, satisfação dos participantes',
    beneficios: 'Desenvolvimento acelerado de talentos internos',
    detalhesImplementacao: 'Selecionar mentores, treinar, fazer matchings',
    dicaIA: 'Faça matching baseado em objetivos e compatibilidade',
    comoFazer: [
      'Identificar e selecionar mentores sênior',
      'Treinar mentores em técnicas de mentoria',
      'Fazer matching entre mentores e mentorados',
      'Estabelecer objetivos claros para cada mentoria',
      'Acompanhar progresso e resultados'
    ]
  },
  {
    categoria: 'rh',
    acao: 'Implementar banco de talentos interno',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Analista de RH',
    recursos: 'Sistema de gestão de talentos, mapeamento',
    metricas: 'Mobilidade interna, time to fill',
    beneficios: 'Aproveitamento melhor dos talentos internos',
    detalhesImplementacao: 'Mapear competências, criar banco, implementar processo',
    dicaIA: 'Mantenha o banco sempre atualizado com novas competências',
    comoFazer: [
      'Mapear competências de todos os colaboradores',
      'Criar sistema de gestão de talentos',
      'Implementar processo de movimentação interna',
      'Comunicar oportunidades internamente primeiro',
      'Acompanhar sucesso das movimentações'
    ]
  },
  {
    categoria: 'rh',
    acao: 'Criar programa de sucessão de lideranças',
    prioridade: 'alta',
    prazo: '4 semanas',
    responsavel: 'Diretor de RH',
    recursos: 'Avaliação de potencial, planos de desenvolvimento',
    metricas: 'Pipeline de sucessão, tempo de cobertura',
    beneficios: 'Continuidade da liderança e redução de riscos',
    detalhesImplementacao: 'Identificar sucessores, avaliar potencial, criar planos',
    dicaIA: 'Identifique múltiplos sucessores para cada posição crítica',
    comoFazer: [
      'Identificar posições críticas para sucessão',
      'Avaliar potencial de liderança dos colaboradores',
      'Criar planos de desenvolvimento específicos',
      'Implementar programa de preparação de sucessores',
      'Revisar e atualizar pipeline regularmente'
    ]
  },
  {
    categoria: 'rh',
    acao: 'Implementar programa de well-being',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Coordenador de Qualidade de Vida',
    recursos: 'Atividades de bem-estar, parcerias',
    metricas: 'Participação, satisfação, redução absenteísmo',
    beneficios: 'Melhoria do bem-estar e produtividade',
    detalhesImplementacao: 'Mapear necessidades, criar programa, implementar atividades',
    dicaIA: 'Foque em ações que realmente impactem o dia a dia',
    comoFazer: [
      'Pesquisar necessidades de bem-estar da equipe',
      'Criar programa abrangente de qualidade de vida',
      'Implementar atividades regulares de well-being',
      'Formar parcerias com profissionais da saúde',
      'Medir impacto na satisfação e produtividade'
    ]
  },

  // Operacional - 8 templates únicos
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
  {
    categoria: 'operacional',
    acao: 'Implementar melhoria contínua (Kaizen)',
    prioridade: 'media',
    prazo: '4 semanas',
    responsavel: 'Coordenador de Melhoria',
    recursos: 'Treinamento em Kaizen, ferramentas de melhoria',
    metricas: 'Número de melhorias implementadas, economia gerada',
    beneficios: 'Cultura de melhoria contínua e otimização',
    detalhesImplementacao: 'Treinar equipe, implementar eventos, acompanhar resultados',
    dicaIA: 'Comece com pequenas melhorias que geram resultados rápidos',
    comoFazer: [
      'Treinar equipe nos conceitos de Kaizen',
      'Implementar eventos de melhoria regulares',
      'Criar sistema de sugestões de melhorias',
      'Priorizar melhorias por impacto e facilidade',
      'Medir e comunicar resultados obtidos'
    ]
  },
  {
    categoria: 'operacional',
    acao: 'Criar sistema de manutenção preventiva',
    prioridade: 'alta',
    prazo: '3 semanas',
    responsavel: 'Gerente de Manutenção',
    recursos: 'Cronograma de manutenção, equipe técnica',
    metricas: 'Disponibilidade de equipamentos, custos de manutenção',
    beneficios: 'Redução de paradas não programadas',
    detalhesImplementacao: 'Mapear equipamentos, criar cronogramas, implementar rotina',
    dicaIA: 'Priorize equipamentos críticos para o negócio',
    comoFazer: [
      'Mapear todos os equipamentos críticos',
      'Criar cronograma de manutenção preventiva',
      'Treinar equipe em procedimentos específicos',
      'Implementar sistema de acompanhamento',
      'Monitorar indicadores de disponibilidade'
    ]
  },
  {
    categoria: 'operacional',
    acao: 'Implementar gestão visual (5S)',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Supervisor de Produção',
    recursos: 'Materiais de sinalização, treinamento',
    metricas: 'Organização dos espaços, produtividade',
    beneficios: 'Melhoria da organização e eficiência',
    detalhesImplementacao: 'Treinar equipe, implementar 5S, criar auditoria',
    dicaIA: 'Implemente gradualmente, um S por vez',
    comoFazer: [
      'Treinar equipe nos conceitos do 5S',
      'Implementar gradualmente cada etapa',
      'Criar sistema de auditoria visual',
      'Estabelecer responsáveis por cada área',
      'Manter disciplina através de acompanhamento'
    ]
  },
  {
    categoria: 'operacional',
    acao: 'Otimizar layout e fluxo de trabalho',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Analista de Processos',
    recursos: 'Estudo de layout, reformas menores',
    metricas: 'Tempo de fluxo, movimentação desnecessária',
    beneficios: 'Redução de desperdícios e aumento de produtividade',
    detalhesImplementacao: 'Analisar fluxo atual, projetar novo layout, implementar',
    dicaIA: 'Use simulação antes de implementar mudanças grandes',
    comoFazer: [
      'Mapear fluxo de trabalho atual detalhadamente',
      'Identificar gargalos e desperdícios',
      'Projetar novo layout otimizado',
      'Simular mudanças antes da implementação',
      'Implementar mudanças gradualmente'
    ]
  },
  {
    categoria: 'operacional',
    acao: 'Implementar controle estatístico de processo',
    prioridade: 'alta',
    prazo: '4 semanas',
    responsavel: 'Analista de Qualidade',
    recursos: 'Ferramentas estatísticas, treinamento',
    metricas: 'Variabilidade do processo, capacidade',
    beneficios: 'Maior previsibilidade e qualidade dos processos',
    detalhesImplementacao: 'Definir pontos de controle, treinar equipe, implementar cartas',
    dicaIA: 'Comece com processos mais críticos para a qualidade',
    comoFazer: [
      'Identificar processos críticos para controle',
      'Definir pontos de medição e coleta de dados',
      'Treinar equipe em conceitos estatísticos básicos',
      'Implementar cartas de controle',
      'Analisar dados e ajustar processos conforme necessário'
    ]
  },

  // Tecnologia - 8 templates únicos
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
  {
    categoria: 'tecnologia',
    acao: 'Implementar sistema de monitoramento de rede',
    prioridade: 'alta',
    prazo: '2 semanas',
    responsavel: 'Administrador de Rede',
    recursos: 'Software de monitoramento, sensores',
    metricas: 'Disponibilidade da rede, tempo de resposta',
    beneficios: 'Detecção proativa de problemas de rede',
    detalhesImplementacao: 'Instalar ferramentas, configurar alertas, treinar equipe',
    dicaIA: 'Configure alertas inteligentes para evitar spam de notificações',
    comoFazer: [
      'Selecionar ferramenta de monitoramento adequada',
      'Configurar monitoramento de todos os dispositivos críticos',
      'Estabelecer thresholds e alertas apropriados',
      'Treinar equipe para interpretar métricas',
      'Criar dashboards para visualização em tempo real'
    ]
  },
  {
    categoria: 'tecnologia',
    acao: 'Automatizar processos manuais com RPA',
    prioridade: 'media',
    prazo: '6 semanas',
    responsavel: 'Especialista em Automação',
    recursos: 'Ferramenta RPA, análise de processos',
    metricas: 'Processos automatizados, tempo economizado',
    beneficios: 'Redução de trabalho manual e erros',
    detalhesImplementacao: 'Mapear processos, desenvolver automação, testar',
    dicaIA: 'Comece com processos simples e repetitivos',
    comoFazer: [
      'Mapear processos manuais repetitivos',
      'Priorizar processos por impacto e complexidade',
      'Desenvolver automações piloto',
      'Testar automações em ambiente controlado',
      'Implementar e monitorar performance'
    ]
  },
  {
    categoria: 'tecnologia',
    acao: 'Implementar políticas de LGPD/GDPR',
    prioridade: 'alta',
    prazo: '3 semanas',
    responsavel: 'Data Protection Officer',
    recursos: 'Consultoria jurídica, ferramentas de compliance',
    metricas: 'Conformidade com LGPD, incidentes de privacidade',
    beneficios: 'Conformidade legal e proteção de dados',
    detalhesImplementacao: 'Mapear dados, criar políticas, treinar equipe',
    dicaIA: 'Documente todos os fluxos de dados pessoais',
    comoFazer: [
      'Mapear todos os fluxos de dados pessoais',
      'Criar políticas de privacidade e proteção',
      'Implementar controles de acesso adequados',
      'Treinar equipe sobre LGPD/GDPR',
      'Estabelecer processo de resposta a incidentes'
    ]
  },
  {
    categoria: 'tecnologia',
    acao: 'Migrar sistemas para nuvem',
    prioridade: 'media',
    prazo: '8 semanas',
    responsavel: 'Arquiteto de Soluções',
    recursos: 'Plataforma cloud, migração de dados',
    metricas: 'Sistemas migrados, performance na nuvem',
    beneficios: 'Maior escalabilidade e redução de custos',
    detalhesImplementacao: 'Planejar migração, executar por fases, otimizar',
    dicaIA: 'Faça migração gradual começando por sistemas menos críticos',
    comoFazer: [
      'Avaliar sistemas candidatos à migração',
      'Planejar estratégia de migração por fases',
      'Executar migração com testes rigorosos',
      'Otimizar configurações na nuvem',
      'Monitorar performance e custos pós-migração'
    ]
  },
  {
    categoria: 'tecnologia',
    acao: 'Implementar DevOps e CI/CD',
    prioridade: 'media',
    prazo: '6 semanas',
    responsavel: 'DevOps Engineer',
    recursos: 'Ferramentas CI/CD, treinamento da equipe',
    metricas: 'Frequência de deploys, tempo de release',
    beneficios: 'Maior agilidade no desenvolvimento e deploys',
    detalhesImplementacao: 'Configurar pipeline, treinar equipe, implementar práticas',
    dicaIA: 'Comece com automação de testes antes de automatizar deploys',
    comoFazer: [
      'Configurar pipeline de CI/CD básico',
      'Implementar testes automatizados',
      'Treinar equipe em práticas DevOps',
      'Automatizar processo de deploy gradualmente',
      'Monitorar métricas de qualidade e velocidade'
    ]
  },

  // Cultura - 8 templates únicos
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
  },
  {
    categoria: 'cultura',
    acao: 'Criar programa de diversidade e inclusão',
    prioridade: 'alta',
    prazo: '4 semanas',
    responsavel: 'Coordenador de D&I',
    recursos: 'Treinamento, políticas, métricas',
    metricas: 'Diversidade da equipe, índice de inclusão',
    beneficios: 'Ambiente mais inclusivo e diverso',
    detalhesImplementacao: 'Mapear situação atual, criar políticas, treinar lideranças',
    dicaIA: 'Comece com dados para entender a situação atual',
    comoFazer: [
      'Mapear diversidade atual da organização',
      'Criar políticas de diversidade e inclusão',
      'Treinar lideranças em viés inconsciente',
      'Implementar práticas inclusivas de recrutamento',
      'Monitorar progresso com métricas específicas'
    ]
  },
  {
    categoria: 'cultura',
    acao: 'Implementar trabalho flexível/híbrido',
    prioridade: 'alta',
    prazo: '3 semanas',
    responsavel: 'Gerente de RH',
    recursos: 'Políticas, tecnologia, treinamento',
    metricas: 'Satisfação com flexibilidade, produtividade',
    beneficios: 'Melhoria do work-life balance e atração de talentos',
    detalhesImplementacao: 'Criar políticas, preparar infraestrutura, treinar gestores',
    dicaIA: 'Estabeleça diretrizes claras para evitar confusões',
    comoFazer: [
      'Criar políticas claras de trabalho flexível',
      'Preparar infraestrutura tecnológica adequada',
      'Treinar gestores para liderança remota',
      'Implementar ferramentas de colaboração',
      'Monitorar produtividade e bem-estar'
    ]
  },
  {
    categoria: 'cultura',
    acao: 'Criar programa de voluntariado corporativo',
    prioridade: 'media',
    prazo: '4 semanas',
    responsavel: 'Coordenador de Responsabilidade Social',
    recursos: 'Parcerias com ONGs, tempo dos colaboradores',
    metricas: 'Participação em ações, impacto social',
    beneficios: 'Engajamento da equipe e impacto social positivo',
    detalhesImplementacao: 'Identificar causas, formar parcerias, organizar ações',
    dicaIA: 'Escolha causas que façam sentido para a cultura da empresa',
    comoFazer: [
      'Pesquisar causas que a equipe se identifica',
      'Formar parcerias com organizações sociais',
      'Organizar ações de voluntariado regulares',
      'Comunicar impacto das ações realizadas',
      'Integrar responsabilidade social à cultura'
    ]
  },
  {
    categoria: 'cultura',
    acao: 'Implementar rituais de integração da equipe',
    prioridade: 'media',
    prazo: '2 semanas',
    responsavel: 'Coordenador de Cultura',
    recursos: 'Atividades de integração, espaços adequados',
    metricas: 'Participação em eventos, coesão da equipe',
    beneficios: 'Fortalecimento dos relacionamentos internos',
    detalhesImplementacao: 'Planejar atividades, criar cronograma, implementar',
    dicaIA: 'Varie os tipos de atividades para incluir diferentes perfis',
    comoFazer: [
      'Planejar atividades diversificadas de integração',
      'Criar cronograma regular de eventos',
      'Incluir atividades para diferentes perfis',
      'Medir engajamento e satisfação',
      'Ajustar atividades baseado no feedback'
    ]
  },
  {
    categoria: 'cultura',
    acao: 'Criar programa de inovação e ideias',
    prioridade: 'media',
    prazo: '3 semanas',
    responsavel: 'Coordenador de Inovação',
    recursos: 'Plataforma de ideias, orçamento para projetos',
    metricas: 'Número de ideias, projetos implementados',
    beneficios: 'Cultura de inovação e melhoria contínua',
    detalhesImplementacao: 'Criar plataforma, definir processo, incentivar participação',
    dicaIA: 'Recompense tanto a submissão quanto a implementação de ideias',
    comoFazer: [
      'Criar plataforma para submissão de ideias',
      'Definir processo de avaliação transparente',
      'Estabelecer orçamento para projetos inovadores',
      'Comunicar casos de sucesso amplamente',
      'Recompensar participação e implementação'
    ]
  }
];

// Função para gerar ações únicas evitando duplicatas
export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData,
  integratedData?: any
): ActionItem[] => {
  const actions: ActionItem[] = [];
  const today = new Date();
  const usedActionTexts = new Set<string>(); // Para evitar duplicatas
  
  // Categorias para intercalar
  const categories: ActionItem['categoria'][] = [
    'comercial', 'marketing', 'gestao', 'financeiro', 
    'rh', 'operacional', 'tecnologia', 'cultura'
  ];

  let categoryIndex = 0;
  let templateIndex = 0;
  let semana = 1;
  let dayCounter = 1;
  let actionCounter = 1;

  // Gerar ações até atingir 400, evitando duplicatas
  while (actions.length < 400) {
    const currentCategory = categories[categoryIndex];
    
    // Filtrar templates da categoria atual
    const categoryTemplates = actionTemplates.filter(t => t.categoria === currentCategory);
    
    if (categoryTemplates.length > 0) {
      // Usar template baseado no índice atual
      const template = categoryTemplates[templateIndex % categoryTemplates.length];
      
      // Criar texto único da ação
      const baseActionText = template.acao;
      let uniqueActionText = `${baseActionText} - ${diagnosticData.empresaNome}`;
      
      // Se a ação já existe, adicionar sufixo para torná-la única
      let suffix = 1;
      while (usedActionTexts.has(uniqueActionText)) {
        suffix++;
        uniqueActionText = `${baseActionText} ${suffix} - ${diagnosticData.empresaNome}`;
      }
      
      // Adicionar à lista de ações usadas
      usedActionTexts.add(uniqueActionText);
      
      const actionDate = addBusinessDays(today, dayCounter);
      
      // Criar ID único
      const uniqueId = `action_${currentCategory}_${actionCounter}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const action: ActionItem = {
        id: uniqueId,
        acao: uniqueActionText,
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
      actionCounter++;
    }

    // Avançar para próxima categoria
    categoryIndex = (categoryIndex + 1) % categories.length;
    
    // Se completou uma volta em todas as categorias, avançar templateIndex
    if (categoryIndex === 0) {
      templateIndex++;
    }

    // Avançar semana a cada 25 ações
    if (actions.length > 0 && actions.length % 25 === 0) {
      semana++;
    }

    dayCounter += Math.floor(Math.random() * 3) + 1; // 1-3 dias entre ações
  }

  console.log(`Geradas ${actions.length} ações únicas sem duplicatas`);
  console.log(`Total de textos únicos: ${usedActionTexts.size}`);
  
  return actions;
};
