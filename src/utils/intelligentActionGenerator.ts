import { IntegratedData } from '@/hooks/useIntegratedData';
import { ActionItem } from '@/components/diagnostic/NewDiagnosticTestContent';

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

export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData, 
  integratedData: IntegratedData
): ActionItem[] => {
  const actions: ActionItem[] = [];
  let actionId = 1;

  // Categorias intercaladas
  const categorias: ActionItem['categoria'][] = ['comercial', 'marketing', 'gestao', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura'];

  // Templates expandidos para cada categoria
  const actionTemplates = {
    comercial: [
      "Implementar CRM profissional para gestão completa do funil de vendas",
      "Criar processo estruturado de qualificação de leads e prospects",
      "Desenvolver scripts de vendas padronizados para toda equipe",
      "Estabelecer metas claras e sistema de comissões motivadoras",
      "Implementar follow-up automatizado e estruturado pós-contato",
      "Criar programa de treinamento contínuo da equipe comercial",
      "Desenvolver estratégia de pricing dinâmico e competitivo",
      "Implementar sistema de análise da concorrência",
      "Criar programa estruturado de pós-venda e retenção",
      "Desenvolver estratégia de cross-selling e up-selling",
      "Implementar análise de performance individual dos vendedores",
      "Criar sistema de gestão de propostas comerciais",
      "Desenvolver parcerias estratégicas para geração de leads",
      "Implementar pesquisa de satisfação do cliente sistemática",
      "Criar programa de indicações e referências de clientes",
      "Desenvolver estratégia de recuperação de clientes inativos",
      "Implementar sistema de previsão de vendas (forecasting)",
      "Criar programa de fidelização de clientes estratégicos",
      "Desenvolver canais alternativos de vendas",
      "Implementar gestão de território e rotas otimizadas",
      "Criar sistema de análise de ciclo de vendas",
      "Desenvolver estratégia de vendas online integrada",
      "Implementar sistema de gestão de objeções",
      "Criar programa de capacitação em técnicas de negociação",
      "Desenvolver estratégia de vendas B2B especializada"
    ],
    marketing: [
      "Criar identidade visual profissional e consistente da marca",
      "Desenvolver estratégia completa de marketing digital multicanal",
      "Implementar presença estratégica nas redes sociais relevantes",
      "Criar site responsivo otimizado para conversões",
      "Desenvolver calendário de conteúdo educativo e relevante",
      "Implementar campanhas segmentadas de Google Ads",
      "Criar estratégia robusta de e-mail marketing automation",
      "Desenvolver programa de marketing de relacionamento",
      "Implementar análise detalhada de ROI em marketing",
      "Criar estratégia completa de SEO e SEM",
      "Desenvolver campanhas de remarketing inteligentes",
      "Implementar plataforma de marketing automation",
      "Criar parcerias com influencers do segmento",
      "Desenvolver programa regular de eventos e networking",
      "Implementar análise comportamental dos clientes",
      "Criar estratégia consistente de branding",
      "Desenvolver programa de relações públicas",
      "Implementar marketing de conteúdo B2B especializado",
      "Criar estratégia omnichannel integrada",
      "Desenvolver sistema de lead scoring automatizado",
      "Implementar análise de persona detalhada",
      "Criar campanhas sazonais estratégicas",
      "Desenvolver programa de embaixadores da marca",
      "Implementar monitoramento de reputação online",
      "Criar estratégia de marketing local geo-segmentado"
    ],
    gestao: [
      "Criar organograma detalhado com hierarquias bem definidas",
      "Implementar reuniões estruturadas de alinhamento estratégico",
      "Desenvolver manual completo de procedimentos operacionais",
      "Estabelecer sistema robusto de delegação de responsabilidades",
      "Implementar dashboard de KPIs em tempo real",
      "Criar sistema integrado de gestão empresarial (ERP)",
      "Desenvolver política clara de tomada de decisões",
      "Implementar comitê executivo de gestão estratégica",
      "Criar sistema de gestão por processos mapeados",
      "Desenvolver plano detalhado de sucessão organizacional",
      "Implementar política estruturada de comunicação interna",
      "Criar sistema de gestão de projetos organizacionais",
      "Desenvolver programa de gestão de mudanças",
      "Implementar sistema certificado de gestão da qualidade",
      "Criar programa contínuo de melhoria operacional",
      "Desenvolver sistema preventivo de gestão de riscos",
      "Implementar balanced scorecard empresarial completo",
      "Criar política abrangente de governança corporativa",
      "Desenvolver sistema interno de auditoria",
      "Implementar gestão estratégica de stakeholders",
      "Criar sistema de planejamento estratégico anual",
      "Desenvolver política de gestão de crises",
      "Implementar sistema de gestão do conhecimento",
      "Criar programa de inovação empresarial",
      "Desenvolver sistema de gestão de compliance"
    ],
    financeiro: [
      "Implementar controle rigoroso de fluxo de caixa diário",
      "Separar definitivamente contas pessoais das empresariais",
      "Criar sistema detalhado de controle de custos por centro",
      "Implementar orçamento empresarial anual detalhado",
      "Desenvolver análise precisa de rentabilidade por produto",
      "Criar reserva robusta de emergência empresarial",
      "Implementar sistema automatizado de cobrança eficaz",
      "Desenvolver política clara de crédito e cobrança",
      "Criar análise detalhada de viabilidade de investimentos",
      "Implementar controle preciso de estoque financeiro",
      "Desenvolver sistema estratégico de precificação",
      "Criar dashboard financeiro executivo em tempo real",
      "Implementar controle automatizado de contas a pagar/receber",
      "Desenvolver análise precisa de break-even por produto",
      "Criar política estruturada de investimentos seguros",
      "Implementar sistema rigoroso de auditoria financeira",
      "Desenvolver planejamento tributário otimizado legal",
      "Criar análise detalhada de margem de contribuição",
      "Implementar sistema de budget departamental",
      "Desenvolver análise precisa de ROI por projeto",
      "Criar sistema de gestão de capital de giro",
      "Implementar controle de indicadores financeiros",
      "Desenvolver política de gestão de risco financeiro",
      "Criar sistema de conciliação bancária automatizada",
      "Implementar análise de sensibilidade financeira"
    ],
    rh: [
      "Criar descrições detalhadas de cargos e competências",
      "Implementar processo estruturado de recrutamento moderno",
      "Desenvolver programa completo de integração (onboarding)",
      "Estabelecer política justa de salários e benefícios",
      "Criar sistema regular de avaliação de desempenho",
      "Implementar programa contínuo de treinamento especializado",
      "Desenvolver plano estruturado de carreira interno",
      "Criar política regular de feedback construtivo",
      "Implementar sistema de gestão por competências",
      "Desenvolver programa eficaz de reconhecimento",
      "Criar política flexível de trabalho remoto/híbrido",
      "Implementar pesquisa regular de clima organizacional",
      "Desenvolver programa estruturado de mentoria interna",
      "Criar sistema avançado de gestão de talentos",
      "Implementar programa eficaz de sucessão de cargos",
      "Desenvolver política inclusiva de diversidade",
      "Criar programa completo de bem-estar dos funcionários",
      "Implementar sistema eficaz de comunicação interna",
      "Desenvolver política robusta de desenvolvimento de liderança",
      "Criar programa estratégico de retenção de talentos",
      "Implementar sistema de gestão de conflitos",
      "Desenvolver programa de desenvolvimento pessoal",
      "Criar política de saúde e segurança do trabalho",
      "Implementar sistema de gestão de absenteísmo",
      "Desenvolver programa de educação corporativa"
    ],
    operacional: [
      "Mapear detalhadamente todos os processos críticos",
      "Implementar controle rigoroso de qualidade total",
      "Criar manual completo de procedimentos operacionais",
      "Desenvolver sistema eficaz de gestão de fornecedores",
      "Implementar controle inteligente de estoque otimizado",
      "Criar sistema otimizado de logística e distribuição",
      "Desenvolver programa intensivo de produtividade",
      "Implementar automação de processos repetitivos",
      "Criar sistema robusto de gestão de projetos operacionais",
      "Desenvolver política estratégica de terceirização",
      "Implementar sistema completo de gestão de ativos",
      "Criar programa eficaz de redução de desperdícios",
      "Desenvolver sistema integrado de gestão da cadeia de suprimentos",
      "Implementar controle preciso de tempo e produtividade",
      "Criar sistema eficiente de gestão de facilidades",
      "Desenvolver programa estruturado de otimização de custos",
      "Implementar sistema robusto de gestão de contratos",
      "Criar política inteligente de gestão de estoques",
      "Desenvolver sistema preventivo de gestão de manutenção",
      "Implementar programa contínuo de inovação operacional",
      "Criar sistema de gestão de capacidade produtiva",
      "Desenvolver política de gestão ambiental",
      "Implementar sistema de rastreabilidade de produtos",
      "Criar programa de segurança operacional",
      "Desenvolver sistema de gestão de energia"
    ],
    tecnologia: [
      "Avaliar e modernizar completamente infraestrutura de TI",
      "Implementar sistema automatizado e seguro de backup",
      "Criar política robusta de segurança da informação",
      "Desenvolver sistema integrado de gestão de dados",
      "Implementar automação inteligente de processos (RPA)",
      "Criar sistema avançado de business intelligence",
      "Desenvolver aplicativo móvel empresarial customizado",
      "Implementar sistema profissional de videoconferência",
      "Criar política clara de uso de tecnologia",
      "Desenvolver sistema eficiente de gestão documental",
      "Implementar solução completa de cloud computing",
      "Criar sistema de monitoramento de performance",
      "Desenvolver integração completa entre sistemas",
      "Implementar solução robusta de e-commerce",
      "Criar sistema avançado de CRM digital",
      "Desenvolver dashboard executivo interativo",
      "Implementar sistema seguro de assinatura digital",
      "Criar política estruturada de transformação digital",
      "Desenvolver sistema inteligente de análise preditiva",
      "Implementar solução customizada de inteligência artificial",
      "Criar sistema de gestão de relacionamento digital",
      "Desenvolver plataforma de automação de marketing",
      "Implementar sistema de gestão de projetos digitais",
      "Criar solução de análise de big data",
      "Desenvolver sistema de IoT empresarial"
    ],
    cultura: [
      "Definir claramente missão, visão e valores empresariais",
      "Criar código detalhado de ética e conduta",
      "Implementar programa estruturado de cultura organizacional",
      "Desenvolver rituais e tradições empresariais significativas",
      "Criar programa eficaz de comunicação de valores",
      "Implementar sistema regular de reconhecimento cultural",
      "Desenvolver programa contínuo de engajamento",
      "Criar espaços inspiradores de convivência e colaboração",
      "Implementar programa estruturado de voluntariado corporativo",
      "Desenvolver política responsável de responsabilidade social",
      "Criar programa inclusivo de diversidade e inclusão",
      "Implementar sistema regular de feedback cultural",
      "Desenvolver programa ativo de embaixadores da cultura",
      "Criar eventos regulares de integração e team building",
      "Implementar programa robusto de desenvolvimento de liderança cultural",
      "Desenvolver sistema eficaz de onboarding cultural",
      "Criar programa envolvente de storytelling empresarial",
      "Implementar política equilibrada de work-life balance",
      "Desenvolver programa contínuo de inovação colaborativa",
      "Criar sistema eficaz de gestão da mudança cultural",
      "Implementar programa de sustentabilidade empresarial",
      "Desenvolver política de transparência organizacional",
      "Criar programa de desenvolvimento de soft skills",
      "Implementar sistema de gestão de clima organizacional",
      "Desenvolver programa de liderança participativa"
    ]
  };

  // Função para gerar passos específicos para cada ação
  const generateComoFazer = (acao: string, categoria: string): string[] => {
    const comoFazerMap: {[key: string]: string[]} = {
      'Implementar CRM profissional para gestão completa do funil de vendas': [
        'Pesquisar e avaliar 3-5 opções de CRM adequadas ao porte da empresa',
        'Fazer demonstrações gratuitas com fornecedores selecionados',
        'Definir orçamento e escolher a solução mais custo-benefício',
        'Configurar estágios do funil conforme processo de vendas atual',
        'Importar base de clientes existente e organizar dados',
        'Treinar equipe comercial no uso da ferramenta',
        'Estabelecer rotina de atualização diária dos dados',
        'Criar relatórios personalizados para acompanhamento',
        'Integrar CRM com outras ferramentas da empresa',
        'Monitorar uso e resultados nas primeiras 4 semanas'
      ],
      'Criar identidade visual profissional e consistente da marca': [
        'Definir briefing completo com posicionamento da marca',
        'Pesquisar referências visuais do mercado e concorrentes',
        'Contratar designer profissional ou agência especializada',
        'Desenvolver logotipo principal e variações necessárias',
        'Criar paleta de cores e tipografia oficial da marca',
        'Desenvolver manual de identidade visual completo',
        'Aplicar nova identidade em todos materiais existentes',
        'Criar templates para apresentações e documentos',
        'Atualizar presença digital com nova identidade',
        'Treinar equipe sobre uso correto da marca'
      ],
      'Implementar controle rigoroso de fluxo de caixa diário': [
        'Escolher ferramenta adequada para controle financeiro',
        'Categorizar todas receitas e despesas da empresa',
        'Criar planilha ou sistema de lançamentos diários',
        'Estabelecer rotina matinal de atualização do fluxo',
        'Configurar alertas para vencimentos e compromissos',
        'Criar projeções semanais e mensais de caixa',
        'Definir responsável pelo controle e backup',
        'Estabelecer reuniões semanais de análise financeira',
        'Criar relatórios executivos para tomada de decisão',
        'Monitorar variações e ajustar projeções mensalmente'
      ]
    };

    // Se existe um mapeamento específico, usa ele
    if (comoFazerMap[acao]) {
      return comoFazerMap[acao];
    }

    // Caso contrário, gera passos genéricos baseados na categoria
    const passosGenericos: {[key: string]: string[]} = {
      comercial: [
        'Analisar situação atual do processo comercial',
        'Definir objetivos específicos e mensuráveis',
        'Pesquisar melhores práticas do mercado',
        'Desenvolver plano de implementação detalhado',
        'Treinar equipe envolvida no processo',
        'Implementar piloto com grupo reduzido',
        'Monitorar resultados e coletar feedback',
        'Ajustar processo baseado nos resultados',
        'Expandir implementação para toda equipe',
        'Acompanhar métricas de performance semanalmente'
      ],
      marketing: [
        'Definir personas e público-alvo detalhadamente',
        'Estabelecer objetivos SMART para a ação',
        'Pesquisar referências e benchmarks do mercado',
        'Criar cronograma de implementação realista',
        'Desenvolver conteúdo e materiais necessários',
        'Configurar ferramentas e canais apropriados',
        'Lançar campanha piloto para teste',
        'Monitorar métricas de engajamento e conversão',
        'Otimizar baseado nos dados coletados',
        'Escalar estratégia para outros canais'
      ],
      gestao: [
        'Mapear situação atual dos processos',
        'Identificar gaps e oportunidades de melhoria',
        'Envolver stakeholders no planejamento',
        'Criar documentação detalhada do processo',
        'Definir responsabilidades e hierarquias',
        'Implementar mudanças gradualmente',
        'Treinar equipe nos novos procedimentos',
        'Estabelecer métricas de acompanhamento',
        'Monitorar aderência e eficácia',
        'Ajustar processos conforme necessário'
      ],
      financeiro: [
        'Auditar situação financeira atual',
        'Organizar e categorizar informações',
        'Escolher ferramentas adequadas de controle',
        'Estabelecer políticas e procedimentos',
        'Treinar responsáveis pelo processo',
        'Implementar controles e verificações',
        'Criar rotinas de monitoramento diário',
        'Desenvolver relatórios gerenciais',
        'Revisar e ajustar processos mensalmente',
        'Manter backup e segurança dos dados'
      ],
      rh: [
        'Avaliar situação atual da gestão de pessoas',
        'Definir políticas claras e transparentes',
        'Desenvolver documentação e procedimentos',
        'Comunicar mudanças para toda equipe',
        'Treinar líderes e gestores envolvidos',
        'Implementar processo piloto',
        'Coletar feedback da equipe',
        'Ajustar políticas baseado no feedback',
        'Expandir implementação completa',
        'Monitorar satisfação e resultados'
      ],
      operacional: [
        'Mapear processos operacionais atuais',
        'Identificar gargalos e ineficiências',
        'Desenvolver soluções e melhorias',
        'Criar documentação padronizada',
        'Treinar equipe operacional',
        'Implementar mudanças gradualmente',
        'Monitorar impacto na produtividade',
        'Ajustar processos conforme necessário',
        'Estabelecer controles de qualidade',
        'Promover melhoria contínua'
      ],
      tecnologia: [
        'Avaliar necessidades tecnológicas atuais',
        'Pesquisar soluções adequadas ao orçamento',
        'Fazer demonstrações e testes piloto',
        'Planejar implementação e migração',
        'Treinar usuários nas novas ferramentas',
        'Implementar com suporte especializado',
        'Configurar backup e segurança',
        'Monitorar performance e estabilidade',
        'Otimizar configurações conforme uso',
        'Manter atualizações e manutenção'
      ],
      cultura: [
        'Avaliar cultura organizacional atual',
        'Definir valores e comportamentos desejados',
        'Envolver liderança no processo',
        'Comunicar mudanças de forma transparente',
        'Criar programa de engajamento',
        'Implementar ações de forma consistente',
        'Reconhecer comportamentos alinhados',
        'Medir clima e satisfação regularmente',
        'Ajustar abordagem baseado no feedback',
        'Manter consistência a longo prazo'
      ]
    };

    return passosGenericos[categoria] || passosGenericos.gestao;
  };

  // Gerar ações intercalando categorias (máximo de ações possível)
  const totalAcoesPorCategoria = 25; // 25 ações por categoria = 200 ações totais
  
  for (let round = 0; round < totalAcoesPorCategoria; round++) {
    for (let catIndex = 0; catIndex < categorias.length; catIndex++) {
      const categoria = categorias[catIndex];
      const templates = actionTemplates[categoria];
      const acaoIndex = round % templates.length;
      const acaoTemplate = templates[acaoIndex];

      // Definir prioridade baseada no round
      let prioridade: ActionItem['prioridade'] = 'media';
      if (round < 8) prioridade = 'alta';
      else if (round >= 20) prioridade = 'baixa';

      // Calcular data de vencimento (sem limite de 6 meses)
      const dataVencimento = new Date();
      const semanas = Math.floor((round * categorias.length + catIndex) / 4) + 1;
      dataVencimento.setDate(dataVencimento.getDate() + (semanas * 7));

      const action: ActionItem = {
        id: `action_${actionId++}`,
        acao: acaoTemplate,
        categoria,
        prioridade,
        prazo: `${Math.min(semanas, 4)} semana${semanas > 1 ? 's' : ''}`,
        responsavel: categoria === 'gestao' ? 'Diretor Geral' : 
                    categoria === 'comercial' ? 'Gestor Comercial' :
                    categoria === 'marketing' ? 'Gestor de Marketing' :
                    categoria === 'financeiro' ? 'Gestor Financeiro' :
                    categoria === 'rh' ? 'Gestor de RH' :
                    categoria === 'operacional' ? 'Gestor Operacional' :
                    categoria === 'tecnologia' ? 'Responsável de TI' :
                    'Gestor de Cultura e Pessoas',
        recursos: categoria === 'tecnologia' ? 'Software especializado, treinamento técnico, consultoria externa' :
                 categoria === 'financeiro' ? 'Sistema financeiro, tempo para análise, consultoria contábil' :
                 categoria === 'marketing' ? 'Ferramentas de design, orçamento para campanhas, criação de conteúdo' :
                 categoria === 'rh' ? 'Tempo da equipe, ferramentas de RH, treinamento especializado' :
                 'Tempo da equipe, ferramentas adequadas, materiais de apoio',
        metricas: categoria === 'comercial' ? 'Aumento de 15-30% nas vendas, melhoria na conversão' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos, controle 100% atualizado' :
                 categoria === 'rh' ? 'Redução de 30% no turnover, melhoria no clima organizacional' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento, mais leads qualificados' :
                 categoria === 'tecnologia' ? 'Aumento da eficiência, redução de erros manuais' :
                 'Melhoria mensurável no indicador específico da área',
        beneficios: categoria === 'gestao' ? 'Maior organização, eficiência e tomada de decisão estratégica' :
                   categoria === 'comercial' ? 'Aumento sustentável das vendas e fidelização de clientes' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca e autoridade no mercado' :
                   categoria === 'financeiro' ? 'Melhor controle, previsibilidade e saúde financeira' :
                   categoria === 'rh' ? 'Equipe mais engajada, produtiva e alinhada' :
                   categoria === 'operacional' ? 'Processos eficientes, menor retrabalho e custos otimizados' :
                   categoria === 'tecnologia' ? 'Maior competitividade, eficiência e escalabilidade' :
                   'Cultura organizacional forte e sustentável',
        dataVencimento,
        concluida: false,
        detalhesImplementacao: `Implementar ${acaoTemplate.toLowerCase()} seguindo as melhores práticas da indústria`,
        dicaIA: `Esta ação de ${categoria} deve ser implementada gradualmente. Comece mapeando a situação atual, defina objetivos claros, envolva a equipe no processo e monitore resultados semanalmente para ajustar conforme necessário.`,
        status: 'pendente',
        semana: semanas,
        comoFazer: generateComoFazer(acaoTemplate, categoria)
      };

      actions.push(action);
    }
  }

  // Personalizar algumas ações baseadas nos dados do diagnóstico
  if (diagnosticData.problemasComerciais && actions.length > 5) {
    actions[5].acao = `Resolver urgentemente: ${diagnosticData.problemasComerciais.substring(0, 100)}...`;
    actions[5].prioridade = 'alta';
    actions[5].comoFazer = [
      'Analisar detalhadamente o problema comercial identificado',
      'Mapear impactos no faturamento e relacionamento com clientes',
      'Desenvolver plano de ação específico para o problema',
      'Implementar soluções de forma prioritária',
      'Monitorar resultados diariamente nas primeiras semanas',
      'Ajustar estratégia baseado nos feedbacks dos clientes',
      'Treinar equipe para evitar recorrência do problema',
      'Criar procedimentos preventivos documentados',
      'Estabelecer métricas de acompanhamento contínuo',
      'Revisar processo mensalmente para melhorias'
    ];
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 15) {
    actions[15].acao = `Implementar controle financeiro urgente: ${diagnosticData.problemasFinanceiros.substring(0, 100)}...`;
    actions[15].prioridade = 'alta';
    actions[15].comoFazer = [
      'Fazer auditoria completa da situação financeira atual',
      'Identificar origem e impacto do problema financeiro',
      'Separar emergencialmente contas pessoais das empresariais',
      'Implementar controle diário de entradas e saídas',
      'Negociar prazos emergenciais com fornecedores',
      'Criar plano de recuperação financeira de 90 dias',
      'Estabelecer cortes de gastos não essenciais',
      'Buscar fontes alternativas de receita imediata',
      'Monitorar fluxo de caixa diariamente',
      'Revisar e ajustar plano semanalmente'
    ];
  }

  console.log(`Geradas ${actions.length} ações intercaladas para o programa de aceleração empresarial`);
  return actions;
};
