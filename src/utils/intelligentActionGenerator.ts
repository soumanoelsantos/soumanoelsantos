
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

// Base expandida de ações específicas por categoria
const comprehensiveActionTemplates = {
  comercial: [
    'Revisar e otimizar o ICP (Ideal Customer Profile)',
    'Mapear a jornada de compra do cliente completa',
    'Desenvolver novos canais de aquisição de leads',
    'Criar um funil de vendas baseado em conteúdo (Inbound Sales)',
    'Implementar um funil de vendas de alta conversão',
    'Definir e monitorar taxas de conversão em cada etapa do funil',
    'Realizar prospecção ativa (Outbound Sales) otimizada',
    'Personalizar abordagens de vendas para cada segmento',
    'Criar roteiros de vendas flexíveis (Playbooks)',
    'Oferecer treinamento contínuo em negociação e fechamento',
    'Desenvolver programas de incentivo para a equipe de vendas',
    'Implementar processo de qualificação de leads rigoroso (BANT, SPIN)',
    'Utilizar provas sociais e cases de sucesso nas propostas',
    'Criar pacotes de serviços otimizados para diferentes segmentos',
    'Realizar análise de perda de oportunidades (Lost Deals Analysis)',
    'Promover colaboração entre Marketing e Vendas (Smarketing)',
    'Explorar vendas consultivas e posicionamento como solucionador',
    'Desenvolver programas de parceria para revendedores/afiliados',
    'Realizar eventos de prospecção (Workshops, Feiras Virtuais)',
    'Monitorar o ciclo de vendas e buscar reduzi-lo'
  ],
  marketing: [
    'Otimizar o Site/Loja Online (SEO completo)',
    'Investir em Marketing de Conteúdo estratégico',
    'Utilizar Mídias Sociais de forma estratégica',
    'Desenvolver campanhas de E-mail Marketing segmentadas',
    'Implementar anúncios pagos (Google Ads, Meta Ads)',
    'Criar parcerias estratégicas (Co-marketing)',
    'Otimizar o funil de conversão digital',
    'Oferecer webinars ou workshops gratuitos',
    'Solicitar e publicar depoimentos de clientes',
    'Participar de eventos do setor para networking',
    'Desenvolver programas de indicação de clientes',
    'Implementar automação de marketing avançada',
    'Realizar auditoria completa de marketing digital',
    'Aprimorar estratégia de SEO On-page e Off-page',
    'Investir em publicidade programática e retargeting',
    'Desenvolver estratégia de conteúdo multicanal',
    'Explorar marketing de influência setorial',
    'Otimizar marketing de vídeo (YouTube, Reels, TikTok)',
    'Personalizar experiência do usuário no site',
    'Utilizar LinkedIn estrategicamente para leads B2B'
  ],
  gestao: [
    'Revisar Missão, Visão e Valores da empresa',
    'Definir ou reafirmar nicho de mercado específico',
    'Analisar concorrência (Benchmarking detalhado)',
    'Realizar análise SWOT completa',
    'Estabelecer metas SMART para todas as áreas',
    'Desenvolver plano de negócios flexível',
    'Criar cronograma de revisão estratégica',
    'Identificar e priorizar maiores oportunidades de crescimento',
    'Mapear cenário econômico e político',
    'Definir indicadores chave de performance (KPIs)',
    'Documentar todos os processos comerciais',
    'Automatizar tarefas repetitivas no CRM',
    'Implementar sistema de gestão de contratos eletrônico',
    'Criar dashboard de performance comercial',
    'Revisar e otimizar ciclo de pagamento',
    'Centralizar informações de clientes em CRM único',
    'Desenvolver fluxo de aprovação de propostas claro',
    'Definir SLAs para processos internos e externos',
    'Realizar auditorias internas de processos',
    'Simplificar processo de cotação e orçamento'
  ],
  financeiro: [
    'Fazer planejamento financeiro detalhado',
    'Controlar rigorosamente o fluxo de caixa',
    'Buscar fontes de financiamento estratégicas',
    'Negociar com fornecedores para reduzir custos',
    'Otimizar gestão de estoques',
    'Monitorar custos fixos e variáveis',
    'Realizar análise de viabilidade econômica para projetos',
    'Revisar estrutura de preços regularmente',
    'Digitalizar processos financeiros',
    'Buscar assessoria contábil e financeira especializada',
    'Gerenciar recebíveis e inadimplência',
    'Definir ponto de equilíbrio operacional',
    'Considerar otimização fiscal',
    'Monitorar margem de lucro',
    'Criar reservas de emergência',
    'Implementar controles internos robustos',
    'Automatizar conciliação bancária',
    'Criar relatórios financeiros gerenciais',
    'Estabelecer orçamento por centro de custo',
    'Implementar análise de ROI por projeto'
  ],
  rh: [
    'Contratar talentos alinhados à cultura da empresa',
    'Investir em treinamento e desenvolvimento da equipe',
    'Delegar tarefas de forma eficaz',
    'Fomentar ambiente de trabalho positivo e colaborativo',
    'Implementar sistema de reconhecimento e recompensas',
    'Estabelecer metas claras e feedback regular',
    'Promover comunicação transparente e aberta',
    'Incentivar proatividade e inovação na equipe',
    'Desenvolver líderes internos',
    'Realizar pesquisas de clima organizacional',
    'Oferecer flexibilidade no trabalho',
    'Promover saúde mental e bem-estar dos colaboradores',
    'Criar plano de carreira para colaboradores chave',
    'Promover diversidade e inclusão',
    'Celebrar conquistas da equipe',
    'Implementar processo de recrutamento estruturado',
    'Criar programa de integração (onboarding)',
    'Estabelecer política de remuneração competitiva',
    'Desenvolver programa de sucessão',
    'Implementar avaliação de desempenho 360°'
  ],
  operacional: [
    'Mapear e otimizar processos internos',
    'Digitalizar e automatizar tarefas repetitivas',
    'Implementar sistema de gestão empresarial (ERP)',
    'Utilizar ferramentas de gestão de projetos',
    'Assegurar segurança da informação',
    'Adotar computação em nuvem',
    'Investir em hardware e software atualizados',
    'Padronizar documentos e modelos',
    'Criar manual de procedimentos operacionais padrão',
    'Implementar metodologias ágeis',
    'Garantir qualidade consistente do produto/serviço',
    'Padronizar processos de entrega do serviço',
    'Simplificar experiência do usuário (UX)',
    'Criar diferenciais competitivos claros',
    'Desenvolver versões premium ou pacotes agregados',
    'Otimizar gestão de fornecedores',
    'Implementar controle de qualidade total',
    'Criar sistema de manutenção preventiva',
    'Estabelecer controle de produtividade',
    'Implementar melhorias de layout operacional'
  ],
  tecnologia: [
    'Implementar infraestrutura de TI robusta',
    'Criar backup e segurança de dados',
    'Estabelecer conectividade adequada',
    'Implementar softwares essenciais integrados',
    'Criar política de uso de tecnologia',
    'Otimizar sistemas existentes',
    'Implementar soluções em nuvem',
    'Criar automações inteligentes',
    'Estabelecer suporte técnico especializado',
    'Implementar atualizações de segurança',
    'Desenvolver soluções de analytics avançado',
    'Criar integrações entre sistemas',
    'Desenvolver soluções customizadas',
    'Estabelecer processo de inovação tecnológica',
    'Implementar ferramentas de BI (Business Intelligence)',
    'Criar sistema de monitoramento de performance',
    'Implementar chatbots e automação de atendimento',
    'Estabelecer política de LGPD e proteção de dados',
    'Criar aplicativo mobile para clientes',
    'Implementar sistema de assinatura eletrônica'
  ],
  cultura: [
    'Definir missão, visão e valores atualizados',
    'Criar código de conduta empresarial',
    'Estabelecer comunicação clara de propósito',
    'Implementar práticas de transparência',
    'Criar ambiente de trabalho saudável',
    'Desenvolver eventos de integração da equipe',
    'Implementar práticas de feedback contínuo',
    'Criar programas de reconhecimento',
    'Estabelecer rituais organizacionais',
    'Implementar práticas de bem-estar',
    'Criar programa de embaixadores da cultura',
    'Implementar inovação organizacional',
    'Desenvolver responsabilidade social corporativa',
    'Estabelecer cultura de alta performance',
    'Promover aprendizado contínuo organizacional',
    'Criar cultura orientada a dados',
    'Fomentar responsabilidade social corporativa (RSC)',
    'Promover sustentabilidade nas operações',
    'Encorajar pensamento "fora da caixa"',
    'Comunicar regularmente visão de futuro da empresa'
  ],
  relacionamento: [
    'Fortalecer relacionamento com fornecedores chave',
    'Construir rede de contatos (Networking) ativa',
    'Participar de associações e câmaras de comércio',
    'Buscar parceiros estratégicos para crescimento',
    'Cultivar relações com influenciadores do setor',
    'Oferecer conteúdo de valor para rede de contatos',
    'Participar de grupos de discussão e fóruns online',
    'Realizar eventos para clientes e parceiros',
    'Solicitar indicações de clientes satisfeitos',
    'Manter relacionamento pós-venda ativo',
    'Criar programa de embaixadores de marca',
    'Desenvolver parcerias de co-criação',
    'Estabelecer programa de mentoring setorial',
    'Criar comunidade online de clientes',
    'Implementar programa de fidelidade avançado',
    'Desenvolver relacionamento com investidores',
    'Criar parcerias acadêmicas',
    'Estabelecer relacionamento com mídia especializada',
    'Desenvolver programa de parceiros tecnológicos',
    'Criar relacionamento com órgãos reguladores'
  ],
  produto: [
    'Inovar continuamente no produto/serviço',
    'Escutar ativamente feedback do cliente',
    'Realizar testes A/B em ofertas e páginas',
    'Investir em P&D (Pesquisa e Desenvolvimento)',
    'Oferecer suporte ao cliente excepcional',
    'Realizar pesquisas de necessidades do cliente',
    'Priorizar desenvolvimento baseado no impacto (ROI)',
    'Implementar ciclos de desenvolvimento ágeis',
    'Testar novas funcionalidades com grupos beta',
    'Realizar testes de usabilidade (User Testing)',
    'Monitorar métricas de uso do produto',
    'Desenvolver roadmaps de produto claros',
    'Garantir escalabilidade da infraestrutura',
    'Implementar gerenciamento de bugs e melhorias',
    'Focar em diferencial competitivo único (USP)',
    'Criar versões simplificadas (MVP)',
    'Integrar produto com outras ferramentas/sistemas',
    'Desenvolver tutoriais em vídeo e guias de uso',
    'Realizar análises de mercado para novas oportunidades',
    'Conduzir análises de concorrência de produto'
  ],
  "sucesso-cliente": [
    'Mapear jornada do cliente pós-venda',
    'Implementar processo de onboarding robusto',
    'Realizar pesquisas de satisfação (CSAT, NPS, CES)',
    'Criar programa de acompanhamento proativo',
    'Designar gerentes de sucesso do cliente dedicados',
    'Oferecer canais de suporte múltiplos e eficientes',
    'Desenvolver base de conhecimento para autoatendimento',
    'Implementar sistema de gestão de tickets/chamados',
    'Personalizar comunicação de pós-venda',
    'Criar programa de fidelidade para clientes leais',
    'Realizar webinars exclusivos para clientes',
    'Monitorar churn rate e identificar causas raiz',
    'Desenvolver estratégias de reengajamento',
    'Criar canal exclusivo para clientes VIP',
    'Promover encontros ou comunidades online',
    'Coletar feedback contínuo para melhorias',
    'Oferecer consultorias personalizadas',
    'Antecipar necessidades futuras dos clientes',
    'Desenvolver plano de recuperação para insatisfeitos',
    'Implementar programa de upsell e cross-sell ético'
  ]
};

const getPriorityByScore = (score: number): 'alta' | 'media' | 'baixa' => {
  if (score <= 3) return 'alta';
  if (score <= 6) return 'media';
  return 'baixa';
};

const getStatusByPriority = (priority: 'alta' | 'media' | 'baixa'): 'pendente' | 'em_andamento' | 'realizado' | 'atrasado' => {
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
    comercial: 'Equipe comercial, sistema CRM, material de vendas, ferramentas de prospecção',
    marketing: 'Designer, ferramentas de marketing digital, orçamento para mídia, automação',
    gestao: 'Consultoria em gestão, sistema ERP, treinamento gerencial, ferramentas de BI',
    financeiro: 'Contador, sistema financeiro, capital de giro, ferramentas de análise',
    rh: 'Especialista em RH, plataforma de recrutamento, orçamento para treinamento',
    operacional: 'Equipe operacional, equipamentos, fornecedores, sistemas de qualidade',
    tecnologia: 'Especialista em TI, softwares, infraestrutura, segurança digital',
    cultura: 'Facilitador organizacional, eventos, comunicação interna, pesquisas',
    relacionamento: 'Equipe de relacionamento, eventos, plataformas de networking',
    produto: 'Equipe de desenvolvimento, ferramentas de design, pesquisa de mercado',
    "sucesso-cliente": 'Customer Success Manager, ferramentas de suporte, plataforma de feedback'
  };
  return resources[category as keyof typeof resources] || 'Recursos internos e consultoria especializada';
};

const getMetricsByCategory = (category: string): string => {
  const metrics = {
    comercial: 'Aumento de 25% nas vendas, melhoria na taxa de conversão, redução do ciclo de vendas',
    marketing: 'Aumento de 40% no tráfego, melhoria na geração de leads, maior engajamento',
    gestao: 'Melhoria de 30% na eficiência operacional, redução de retrabalho, maior satisfação da equipe',
    financeiro: 'Melhoria de 20% na margem de lucro, redução de custos, melhor fluxo de caixa',
    rh: 'Redução de 25% no turnover, aumento na produtividade, melhoria no clima organizacional',
    operacional: 'Aumento de 25% na produtividade, redução de desperdícios, melhoria na qualidade',
    tecnologia: 'Redução de 40% no tempo de processos, maior segurança, melhor integração',
    cultura: 'Aumento na satisfação dos colaboradores, melhoria no NPS interno, maior retenção',
    relacionamento: 'Aumento de 30% em indicações, melhoria no networking, parcerias estratégicas',
    produto: 'Aumento de 20% na satisfação do cliente, redução de bugs, maior adoção',
    "sucesso-cliente": 'Redução de 30% no churn, aumento no NPS, maior lifetime value'
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
    cultura: 'Ambiente de trabalho mais positivo, maior engajamento da equipe e fortalecimento dos valores organizacionais',
    relacionamento: 'Rede de contatos mais forte, parcerias estratégicas e maior visibilidade no mercado',
    produto: 'Produto mais competitivo, maior satisfação do cliente e diferenciação no mercado',
    "sucesso-cliente": 'Clientes mais satisfeitos e leais, maior lifetime value e crescimento por indicação'
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
    ],
    relacionamento: [
      'Mapear rede atual de contatos',
      'Identificar oportunidades',
      'Desenvolver estratégia de relacionamento',
      'Implementar ações',
      'Monitorar resultados'
    ],
    produto: [
      'Analisar produto atual',
      'Identificar melhorias',
      'Desenvolver soluções',
      'Testar com usuários',
      'Implementar melhorias'
    ],
    "sucesso-cliente": [
      'Mapear jornada atual do cliente',
      'Identificar pontos de melhoria',
      'Desenvolver estratégias',
      'Implementar melhorias',
      'Monitorar satisfação'
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
    cultura: 'A cultura organizacional é construída através de ações consistentes, não apenas de discursos.',
    relacionamento: 'Relacionamentos genuínos são construídos ao longo do tempo. Foque em agregar valor antes de pedir algo.',
    produto: 'Ouça mais o cliente do que sua intuição. O produto perfeito é aquele que resolve um problema real.',
    "sucesso-cliente": 'Um cliente bem-sucedido é seu melhor vendedor. Invista no sucesso dele antes do seu próprio.'
  };
  
  return tips[category as keyof typeof tips] || 'Mantenha o foco nos resultados e meça constantemente o progresso.';
};

export const generateIntelligentActions = ({ 
  results, 
  companyName, 
  maxActions = 200 
}: GenerateActionsParams): ActionItem[] => {
  const actions: ActionItem[] = [];
  const usedActions = new Set<string>();
  let actionCounter = 1;

  // Usar todas as categorias disponíveis, priorizando por pontuação
  const allCategories = ['comercial', 'marketing', 'gestao', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura', 'relacionamento', 'produto', 'sucesso-cliente'];
  
  // Para cada categoria, adicionar ações
  allCategories.forEach(categoria => {
    const categoryKey = categoria as keyof typeof comprehensiveActionTemplates;
    const availableTemplates = comprehensiveActionTemplates[categoryKey] || [];
    
    // Determinar prioridade baseada nos resultados do diagnóstico
    let priority: 'alta' | 'media' | 'baixa' = 'media';
    let nivel: 'critico' | 'atencao' | 'bom' = 'atencao';
    
    // Mapear categorias para resultados do diagnóstico
    const categoryMapping: {[key: string]: string} = {
      'comercial': 'resultados',
      'marketing': 'resultados', 
      'gestao': 'sistemaGestao',
      'financeiro': 'sistemaGestao',
      'rh': 'pessoas',
      'operacional': 'processos',
      'tecnologia': 'processos',
      'cultura': 'pessoas',
      'relacionamento': 'resultados',
      'produto': 'processos',
      'sucesso-cliente': 'pessoas'
    };
    
    const diagnosticArea = categoryMapping[categoria];
    if (diagnosticArea && results[diagnosticArea]) {
      const score = results[diagnosticArea].percentage || 50;
      if (score <= 40) {
        priority = 'alta';
        nivel = 'critico';
      } else if (score <= 70) {
        priority = 'media';
        nivel = 'atencao';
      } else {
        priority = 'baixa';
        nivel = 'bom';
      }
    }

    // Adicionar ações desta categoria
    availableTemplates.forEach((template, index) => {
      if (actionCounter > maxActions) return;
      
      const actionName = template;
      
      // Verificar se a ação já foi usada
      if (usedActions.has(actionName)) {
        return; // Pular esta ação se já existe
      }
      
      usedActions.add(actionName);
      
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + (actionCounter * 3)); // 3 dias entre ações

      const action: ActionItem = {
        id: `action_${actionCounter}`,
        acao: actionName,
        categoria: categoryKey as any,
        prioridade: priority,
        prazo: getTimeframeByPriority(priority),
        responsavel: 'A definir',
        recursos: getResourcesByCategory(categoryKey),
        metricas: getMetricsByCategory(categoryKey),
        beneficios: getBenefitsByCategory(categoryKey),
        dataVencimento: dueDate,
        concluida: false,
        detalhesImplementacao: `Ação estratégica focada em ${categoria} para acelerar o crescimento da empresa ${companyName}.`,
        dicaIA: generateAITip(template, categoryKey),
        status: getStatusByPriority(priority),
        semana: Math.ceil(actionCounter / 7),
        comoFazer: generateSteps(template, categoryKey),
        completedSteps: []
      };

      actions.push(action);
      actionCounter++;
    });
  });

  console.log(`Generated ${actions.length} unique actions across ${allCategories.length} categories`);
  
  return actions.slice(0, maxActions);
};
