
import { IntegratedData } from '@/hooks/useIntegratedData';

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
  dicaIA: string;
  status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
  semana: number;
}

export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData, 
  integratedData: IntegratedData
): ActionItem[] => {
  const actions: ActionItem[] = [];
  let actionId = 1;

  // Template de ações expandido para garantir 104 ações únicas e diversas
  const actionTemplates = {
    gestao: [
      "Criar organograma detalhado da empresa com definição clara de hierarquias e responsabilidades",
      "Implementar sistema de reuniões periódicas estruturadas (daily, weekly, monthly) com atas",
      "Desenvolver manual completo de procedimentos operacionais padrão (POP) para cada área",
      "Estabelecer política clara de delegação de responsabilidades com matriz RACI",
      "Criar sistema de acompanhamento de metas por setor com KPIs mensuráveis",
      "Implementar software de gestão empresarial (ERP) adequado ao porte da empresa",
      "Desenvolver política estruturada de tomada de decisões com níveis de alçada",
      "Criar comitê executivo de gestão estratégica com reuniões quinzenais",
      "Implementar dashboard de indicadores gerenciais em tempo real",
      "Desenvolver plano de sucessão organizacional detalhado para cargos-chave",
      "Criar política de comunicação interna eficaz com canais definidos",
      "Implementar gestão por processos mapeados com fluxogramas detalhados",
      "Desenvolver sistema robusto de gestão de projetos com metodologia ágil",
      "Criar política estruturada de gestão de mudanças organizacionais",
      "Implementar sistema certificado de gestão da qualidade ISO 9001",
      "Desenvolver programa contínuo de melhoria operacional (Kaizen)",
      "Criar sistema preventivo de gestão de riscos empresariais",
      "Implementar balanced scorecard empresarial com perspectivas balanceadas",
      "Desenvolver política completa de governança corporativa transparente",
      "Criar sistema interno de auditoria e controles preventivos"
    ],
    comercial: [
      "Implementar CRM profissional integrado com automações de vendas",
      "Criar funil de vendas estruturado com etapas bem definidas e métricas",
      "Desenvolver scripts de vendas padronizados e testados para toda equipe",
      "Estabelecer processo rigoroso de qualificação de leads com scoring",
      "Criar programa intensivo de treinamento em vendas consultivas",
      "Implementar sistema automatizado de follow-up comercial multicanal",
      "Desenvolver estratégia inteligente de pricing dinâmico baseada em valor",
      "Criar programa estruturado de pós-venda e retenção de clientes",
      "Implementar análise competitiva sistemática da concorrência mensal",
      "Desenvolver estratégia eficaz de cross-selling para aumentar ticket médio",
      "Criar sistema avançado de gestão de pipeline com previsões precisas",
      "Implementar programa estruturado de indicações e referências premiadas",
      "Desenvolver estratégia lucrativa de up-selling baseada em necessidades",
      "Criar sistema preciso de forecasting de vendas com cenários",
      "Implementar gestão especializada de contas-chave com account managers",
      "Desenvolver programa completo de fidelização de clientes VIP",
      "Criar estratégia detalhada de segmentação de clientes por valor",
      "Implementar metodologia de vendas consultivas com certificação",
      "Desenvolver programa estratégico de parcerias comerciais win-win",
      "Criar sistema eficiente de gestão de propostas comerciais automatizado"
    ],
    marketing: [
      "Desenvolver identidade visual profissional e manual de marca completo",
      "Criar estratégia completa de marketing digital multicanal integrada",
      "Implementar presença estratégica e consistente nas redes sociais",
      "Desenvolver site responsivo otimizado para conversões e SEO",
      "Criar estratégia robusta de conteúdo (blog, artigos, vídeos, podcasts)",
      "Implementar campanhas otimizadas de Google Ads com ROI positivo",
      "Desenvolver estratégia eficaz de e-mail marketing segmentado",
      "Criar programa estruturado de marketing de relacionamento CRM",
      "Implementar análise detalhada de ROI em todas campanhas de marketing",
      "Desenvolver estratégia completa de SEO e SEM para dominar buscas",
      "Criar campanhas inteligentes de remarketing para recuperar visitantes",
      "Implementar plataforma de marketing automation com nurturing",
      "Desenvolver estratégia colaborativa com influencers do nicho",
      "Criar programa regular de eventos e networking para relacionamento",
      "Implementar análise comportamental avançada do cliente com heatmaps",
      "Desenvolver estratégia consistente de branding e posicionamento",
      "Criar programa estratégico de relações públicas e assessoria",
      "Implementar marketing de conteúdo especializado B2B ou B2C",
      "Desenvolver estratégia integrada omnichannel para experiência única",
      "Criar sistema inteligente de lead scoring automatizado"
    ],
    financeiro: [
      "Implementar controle rigoroso de fluxo de caixa diário e projeções",
      "Separar definitivamente contas pessoais das empresariais com auditoria",
      "Criar sistema detalhado de controle de custos por centro de resultado",
      "Implementar orçamento empresarial anual com revisões trimestrais",
      "Desenvolver análise precisa de rentabilidade por produto/serviço",
      "Criar reserva robusta de emergência empresarial (6 meses custos)",
      "Implementar sistema automatizado de cobrança com régua definida",
      "Desenvolver política clara de crédito e cobrança preventiva",
      "Criar análise detalhada de viabilidade de investimentos com TIR",
      "Implementar controle preciso de estoque com giro otimizado",
      "Desenvolver sistema estratégico de precificação baseada em valor",
      "Criar dashboard financeiro executivo em tempo real automatizado",
      "Implementar controle automatizado de contas a pagar e receber",
      "Desenvolver análise precisa de break-even por produto/serviço",
      "Criar política estruturada de investimentos com critérios claros",
      "Implementar sistema rigoroso de auditoria financeira interna",
      "Desenvolver planejamento tributário otimizado com consultoria",
      "Criar análise detalhada de margem de contribuição por segmento",
      "Implementar sistema de budget departamental com responsabilização",
      "Desenvolver análise precisa de ROI por projeto e investimento"
    ],
    rh: [
      "Criar descrições detalhadas de cargos com competências e responsabilidades",
      "Implementar processo estruturado de recrutamento e seleção por competências",
      "Desenvolver programa completo de integração (onboarding) de 90 dias",
      "Estabelecer política justa de salários e benefícios competitiva",
      "Criar sistema regular de avaliação de desempenho 360 graus",
      "Implementar programa contínuo de treinamento e desenvolvimento pessoal",
      "Desenvolver plano estruturado de carreira interno com trilhas",
      "Criar política regular de feedback construtivo e coaching",
      "Implementar sistema de gestão por competências comportamentais",
      "Desenvolver programa eficaz de reconhecimento e recompensas",
      "Criar política flexível de trabalho remoto/híbrido estruturada",
      "Implementar pesquisa regular de clima organizacional trimestral",
      "Desenvolver programa estruturado de mentoria interna cruzada",
      "Criar sistema avançado de gestão de talentos e sucessão",
      "Implementar programa eficaz de retenção de talentos críticos",
      "Desenvolver política inclusiva de diversidade e inclusão ativa",
      "Criar programa completo de bem-estar e qualidade de vida",
      "Implementar sistema eficaz de comunicação interna transparente",
      "Desenvolver política robusta de desenvolvimento de liderança",
      "Criar programa estratégico de employer branding interno"
    ],
    operacional: [
      "Mapear detalhadamente todos os processos principais com VSM",
      "Implementar controle rigoroso de qualidade em todas as etapas",
      "Criar manual completo de procedimentos operacionais padronizados",
      "Desenvolver sistema eficaz de gestão de fornecedores estratégicos",
      "Implementar controle inteligente de estoque com sistema WMS",
      "Criar sistema otimizado de logística e distribuição eficiente",
      "Desenvolver programa intensivo de produtividade e eficiência",
      "Implementar automação de processos repetitivos com RPA",
      "Criar sistema robusto de gestão de projetos operacionais",
      "Desenvolver política estratégica de terceirização com SLAs",
      "Implementar sistema completo de gestão de ativos fixos",
      "Criar programa eficaz de redução de desperdícios lean",
      "Desenvolver sistema integrado de gestão da cadeia de suprimentos",
      "Implementar controle preciso de tempo e produtividade pessoal",
      "Criar sistema eficiente de gestão de facilidades e infraestrutura",
      "Desenvolver programa estruturado de otimização de custos operacionais",
      "Implementar sistema robusto de gestão de contratos e SLAs",
      "Criar política inteligente de gestão de estoques JIT",
      "Desenvolver sistema preventivo de gestão de manutenção preditiva",
      "Implementar programa contínuo de inovação operacional incremental"
    ],
    tecnologia: [
      "Avaliar e modernizar completamente infraestrutura de TI estratégica",
      "Implementar sistema automatizado e seguro de backup em nuvem",
      "Criar política robusta de segurança da informação e LGPD",
      "Desenvolver sistema integrado de gestão de dados e BI",
      "Implementar automação inteligente de processos (RPA avançado)",
      "Criar sistema avançado de business intelligence com dashboards",
      "Desenvolver aplicativo móvel empresarial customizado para negócio",
      "Implementar sistema profissional de videoconferência e colaboração",
      "Criar política clara de uso de tecnologia e governança",
      "Desenvolver sistema eficiente de gestão documental eletrônica",
      "Implementar solução completa de cloud computing híbrida",
      "Criar sistema de monitoramento de performance em tempo real",
      "Desenvolver integração completa entre sistemas empresariais",
      "Implementar solução robusta de e-commerce omnichannel",
      "Criar sistema avançado de gestão de relacionamento digital",
      "Desenvolver dashboard executivo interativo em tempo real",
      "Implementar sistema seguro de assinatura digital certificada",
      "Criar política estruturada de transformação digital gradual",
      "Desenvolver sistema inteligente de análise preditiva de dados",
      "Implementar solução customizada de inteligência artificial aplicada"
    ],
    cultura: [
      "Definir claramente missão, visão e valores empresariais autênticos",
      "Criar código detalhado de ética e conduta organizacional",
      "Implementar programa estruturado de cultura organizacional forte",
      "Desenvolver rituais e tradições empresariais significativas e únicas",
      "Criar programa eficaz de comunicação de valores através de ações",
      "Implementar sistema regular de reconhecimento cultural público",
      "Desenvolver programa contínuo de engajamento e motivação",
      "Criar espaços inspiradores de convivência e colaboração criativa",
      "Implementar programa estruturado de voluntariado corporativo",
      "Desenvolver política responsável de responsabilidade social empresarial",
      "Criar programa inclusivo de diversidade e inclusão genuína",
      "Implementar sistema regular de feedback cultural anônimo",
      "Desenvolver programa ativo de embaixadores da cultura interna",
      "Criar eventos regulares de integração e team building significativos",
      "Implementar programa robusto de desenvolvimento de liderança cultural",
      "Desenvolver sistema eficaz de onboarding cultural imersivo",
      "Criar programa envolvente de storytelling empresarial autêntico",
      "Implementar política equilibrada de work-life balance real",
      "Desenvolver programa contínuo de inovação colaborativa bottom-up",
      "Criar sistema eficaz de gestão da mudança cultural sustentável"
    ],
    pesquisa: [
      "Implementar pesquisa de satisfação NPS trimestral com clientes ativos",
      "Criar pesquisa anônima 360 graus para avaliação de lideranças",
      "Desenvolver pesquisa de clima organizacional semestral abrangente",
      "Implementar pesquisa de satisfação de funcionários pós-onboarding",
      "Criar pesquisa de mercado para identificar novas oportunidades",
      "Desenvolver pesquisa de satisfação pós-venda para melhoria contínua",
      "Implementar pesquisa de marca e posicionamento no mercado",
      "Criar pesquisa de necessidades não atendidas dos clientes",
      "Desenvolver pesquisa de eficácia de treinamentos corporativos",
      "Implementar pesquisa de canais de comunicação mais eficazes",
      "Criar pesquisa de benchmarking com concorrentes diretos",
      "Desenvolver pesquisa de tendências do setor e inovações",
      "Implementar pesquisa de motivação e engajamento da equipe",
      "Criar pesquisa de eficiência de processos internos críticos"
    ],
    endomarketing: [
      "Criar programa de comunicação interna mensal com newsletter",
      "Implementar mural digital interativo para comunicação transparente",
      "Desenvolver programa de reconhecimento público 'funcionário destaque'",
      "Criar eventos internos de confraternização e networking",
      "Implementar programa de sugestões e ideias inovadoras premiadas",
      "Desenvolver campanha interna de valores e cultura empresarial",
      "Criar programa de mentoria reversa entre gerações",
      "Implementar sistema de comunicação de resultados e conquistas",
      "Desenvolver programa de desenvolvimento pessoal e profissional",
      "Criar campanha interna de orgulho de pertencer à empresa",
      "Implementar programa de embaixadores da marca internos",
      "Desenvolver eventos de lançamento de produtos internamente primeiro",
      "Criar programa de comunicação de oportunidades internas",
      "Implementar sistema de feedback contínuo e melhoria sugerida"
    ],
    aceleracao: [
      "Implementar programa de inovação disruptiva com budget dedicado",
      "Criar laboratório de ideias e prototipagem rápida",
      "Desenvolver programa de parcerias estratégicas para crescimento",
      "Implementar sistema de métricas de crescimento (growth hacking)",
      "Criar programa de automação de processos para escalar rapidamente",
      "Desenvolver estratégia de expansão geográfica estruturada",
      "Implementar programa de aquisição de empresas menores",
      "Criar sistema de franquias ou licenciamento do modelo",
      "Desenvolver programa de diversificação de produtos/serviços",
      "Implementar estratégia de marketing viral e referências",
      "Criar programa de aceleração de vendas com novos canais",
      "Desenvolver sistema de precificação premium e valor agregado",
      "Implementar programa de fidelização avançada com gamificação",
      "Criar estratégia de marketplace ou plataforma digital",
      "Desenvolver programa de economia circular e sustentabilidade lucrativa"
    ]
  };

  // Função para gerar dica da IA mais específica e prática
  const generateAITip = (acao: string, categoria: string): string => {
    const tips = {
      gestao: [
        "Para implementar esta ação de gestão, comece mapeando a situação atual e envolvendo a equipe no processo. Defina marcos claros, estabeleça reuniões de acompanhamento semanal e documente todo o progresso para facilitar futuras melhorias.",
        "Esta ação requer planejamento detalhado e execução gradual. Inicie com um projeto piloto, colete feedback da equipe, ajuste o processo e depois expanda para toda a organização.",
        "Foque na padronização e documentação. Crie templates, checklists e procedimentos claros. Treine a equipe adequadamente e estabeleça métricas de sucesso para acompanhar o progresso."
      ],
      comercial: [
        "Para maximizar resultados comerciais, analise seus dados históricos primeiro. Identifique padrões de sucesso, mapeie o perfil do cliente ideal e estruture processos que possam ser replicados pela equipe.",
        "Implemente esta ação comercial gradualmente: teste com um grupo pequeno de clientes, refine o processo, treine a equipe e depois expanda. Sempre acompanhe métricas de conversão e ROI."
      ],
      marketing: [
        "Para esta ação de marketing, comece definindo personas detalhadas e objetivos SMART. Crie um calendário editorial, teste diferentes formatos de conteúdo e use analytics para otimizar resultados.",
        "Implemente esta estratégia de marketing de forma multicanal. Mantenha consistência de marca, teste diferentes mensagens e canais, e sempre meça ROI para direcionar investimentos futuros."
      ],
      financeiro: [
        "Esta ação financeira requer disciplina e controle rigoroso. Implemente controles diários, automatize processos quando possível e crie dashboards para acompanhar indicadores em tempo real.",
        "Comece organizando e categorizando todas as informações financeiras. Use ferramentas adequadas ao porte da empresa, treine a equipe e estabeleça rotinas de revisão regular dos resultados."
      ],
      rh: [
        "Esta ação de RH deve ser implementada com transparência e comunicação clara. Envolva a equipe no processo, colete feedback regular e ajuste políticas conforme necessário.",
        "Para implementar esta ação de pessoas, comece mapeando a situação atual, defina políticas claras e justas, e invista em treinamento adequado para gestores e colaboradores."
      ],
      operacional: [
        "Para esta ação operacional, mapeie todos os processos primeiro, identifique gargalos e oportunidades de melhoria. Implemente mudanças gradualmente e monitore impactos na produtividade.",
        "Foque na padronização e otimização. Crie procedimentos claros, treine a equipe adequadamente e use tecnologia para automatizar tarefas repetitivas."
      ],
      tecnologia: [
        "Para esta implementação tecnológica, avalie necessidades reais primeiro, pesquise soluções adequadas ao orçamento e porte da empresa. Priorize segurança e facilidade de uso.",
        "Implemente tecnologia gradualmente: piloto → treinamento → expansão → otimização. Sempre tenha backup dos dados e planos de contingência para problemas técnicos."
      ],
      cultura: [
        "Para implementar esta ação cultural, seja autêntico e consistente. Envolva a equipe na definição de valores, comunique através de ações práticas e reconheça comportamentos alinhados.",
        "Mudanças culturais acontecem gradualmente. Comunique claramente o 'porquê' das mudanças, dê exemplo como liderança e celebre pequenas vitórias no caminho."
      ],
      pesquisa: [
        "Para esta pesquisa, defina objetivos claros e perguntas específicas. Use metodologia adequada, garanta anonimato quando necessário e communique resultados e ações decorrentes transparentemente.",
        "Implemente pesquisas de forma sistemática e regular. Crie processo de análise, definição de ações corretivas e acompanhamento de melhorias baseadas nos resultados obtidos."
      ],
      endomarketing: [
        "Para esta ação de endomarketing, foque na autenticidade e relevância para a equipe. Crie conteúdo que realmente agregue valor, use canais preferidos pelos funcionários e meça engajamento.",
        "Implemente endomarketing de forma consistente e planejada. Desenvolva calendário de ações, envolva lideranças como porta-vozes e sempre colete feedback para melhorar."
      ],
      aceleracao: [
        "Para esta ação de aceleração, analise o mercado e capacidade interna primeiro. Desenvolva plano piloto, teste em pequena escala, valide resultados e então escale rapidamente.",
        "Foque em ações que geram resultados exponenciais. Use tecnologia como alavanca, automatize processos, crie parcerias estratégicas e sempre monitore ROI para direcionamento."
      ]
    };

    const categoryTips = tips[categoria as keyof typeof tips] || tips.gestao;
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  };

  // Gerar exatamente 104 ações únicas distribuídas em 26 semanas (4 ações por semana)
  const categoriasChave = ['gestao', 'comercial', 'marketing', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura', 'pesquisa', 'endomarketing', 'aceleracao'];
  const allTemplates: string[] = [];
  const usedActions = new Set<string>();

  // Criar pool de ações únicas
  Object.values(actionTemplates).forEach(categoryActions => {
    categoryActions.forEach(action => {
      if (!usedActions.has(action)) {
        allTemplates.push(action);
        usedActions.add(action);
      }
    });
  });

  // Shufflear as ações para distribuição aleatória
  const shuffledTemplates = allTemplates.sort(() => Math.random() - 0.5);

  for (let semana = 1; semana <= 26; semana++) {
    for (let acaoPorSemana = 0; acaoPorSemana < 4; acaoPorSemana++) {
      const actionIndex = (semana - 1) * 4 + acaoPorSemana;
      
      // Garantir que temos ações suficientes
      if (actionIndex >= shuffledTemplates.length) {
        break;
      }

      const acaoTemplate = shuffledTemplates[actionIndex];
      
      // Determinar categoria da ação
      let categoria = 'gestao';
      for (const [cat, templates] of Object.entries(actionTemplates)) {
        if (templates.includes(acaoTemplate)) {
          categoria = cat;
          break;
        }
      }

      // Definir prioridade baseada na semana
      let prioridade: 'alta' | 'media' | 'baixa' = 'media';
      if (semana <= 8) prioridade = 'alta';
      else if (semana >= 20) prioridade = 'baixa';

      // Calcular data de vencimento
      const dataVencimento = new Date();
      dataVencimento.setDate(dataVencimento.getDate() + (semana * 7));

      const action: ActionItem = {
        id: `action_${actionId++}`,
        acao: acaoTemplate,
        categoria,
        prioridade,
        prazo: `${7} dias`,
        responsavel: categoria === 'gestao' ? 'Diretor Geral' : 
                    categoria === 'comercial' ? 'Gestor Comercial' :
                    categoria === 'marketing' ? 'Gestor de Marketing' :
                    categoria === 'financeiro' ? 'Gestor Financeiro' :
                    categoria === 'rh' ? 'Gestor de RH' :
                    categoria === 'operacional' ? 'Gestor Operacional' :
                    categoria === 'tecnologia' ? 'Responsável de TI' :
                    categoria === 'pesquisa' ? 'Analista de Pesquisa' :
                    categoria === 'endomarketing' ? 'Coordenador de RH' :
                    categoria === 'aceleracao' ? 'Diretor de Crescimento' :
                    'Gestor Responsável',
        recursos: categoria === 'tecnologia' ? 'Software especializado, treinamento técnico, consultoria especializada' :
                 categoria === 'financeiro' ? 'Sistema financeiro robusto, tempo para análise, consultoria contábil' :
                 categoria === 'marketing' ? 'Ferramentas de design, orçamento para campanhas, criação de conteúdo' :
                 categoria === 'pesquisa' ? 'Ferramentas de pesquisa, plataforma de coleta, análise estatística' :
                 categoria === 'endomarketing' ? 'Ferramentas de comunicação, designer, conteúdo criativo' :
                 categoria === 'aceleracao' ? 'Budget para inovação, equipe dedicada, tecnologia avançada' :
                 'Tempo da equipe qualificada, materiais de apoio, ferramentas adequadas',
        metricas: categoria === 'comercial' ? 'Aumento de 15-25% nas vendas, melhoria na conversão de leads' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos, controle 100% atualizado' :
                 categoria === 'rh' ? 'Redução de 30% no turnover, melhoria significativa no clima' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento, mais leads qualificados' :
                 categoria === 'pesquisa' ? 'Taxa de resposta >70%, insights acionáveis obtidos' :
                 categoria === 'endomarketing' ? 'Engajamento >80%, melhoria no clima organizacional' :
                 categoria === 'aceleracao' ? 'Crescimento >50% em métricas-chave, ROI >300%' :
                 'Melhoria mensurável no indicador específico da área',
        beneficios: categoria === 'gestao' ? 'Maior organização, eficiência operacional e tomada de decisão' :
                   categoria === 'comercial' ? 'Aumento sustentável das vendas e melhor relacionamento com clientes' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca, autoridade no mercado e geração de leads' :
                   categoria === 'financeiro' ? 'Melhor controle financeiro, previsibilidade e tomada de decisões' :
                   categoria === 'rh' ? 'Equipe mais engajada, produtiva e alinhada com objetivos' :
                   categoria === 'operacional' ? 'Processos mais eficientes, menor retrabalho e custos otimizados' :
                   categoria === 'tecnologia' ? 'Maior eficiência, competitividade e escalabilidade' :
                   categoria === 'pesquisa' ? 'Decisões baseadas em dados, melhoria contínua orientada' :
                   categoria === 'endomarketing' ? 'Equipe mais motivada, orgulhosa e alinhada culturalmente' :
                   categoria === 'aceleracao' ? 'Crescimento exponencial, vantagem competitiva e inovação' :
                   'Cultura organizacional mais forte, alinhada e sustentável',
        dataVencimento,
        concluida: false,
        detalhesImplementacao: `Implementar ${acaoTemplate.toLowerCase()} seguindo as melhores práticas da indústria e adaptando à realidade da empresa`,
        dicaIA: generateAITip(acaoTemplate, categoria),
        status: 'pendente' as const,
        semana
      };

      actions.push(action);
    }
  }

  // Personalizar algumas ações baseadas nos dados coletados
  if (diagnosticData.problemasComerciais && actions.length > 10) {
    actions[5].acao = `Resolver urgentemente: ${diagnosticData.problemasComerciais.substring(0, 80)}...`;
    actions[5].prioridade = 'alta';
    actions[5].dicaIA = "Este é um problema comercial específico da sua empresa. Analise a raiz do problema, colete dados detalhados de vendas e feedback de clientes. Implemente mudanças graduais e meça resultados semanalmente.";
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 20) {
    actions[15].acao = `Implementar solução financeira urgente: ${diagnosticData.problemasFinanceiros.substring(0, 80)}...`;
    actions[15].prioridade = 'alta';
    actions[15].dicaIA = "Problemas financeiros requerem ação imediata e controle rigoroso. Comece com fluxo de caixa diário, separe contas pessoais das empresariais e crie reservas de emergência.";
  }

  if (diagnosticData.objetivos6Meses && actions.length > 50) {
    actions[25].acao = `Executar estratégia para atingir: ${diagnosticData.objetivos6Meses.substring(0, 80)}...`;
    actions[25].prioridade = 'alta';
    actions[25].dicaIA = "Para atingir este objetivo, quebre-o em metas menores e mensuráveis. Crie um plano de 90 dias com marcos específicos e monitore progresso semanalmente.";
  }

  console.log(`Geradas ${actions.length} ações únicas para o programa de aceleração empresarial`);
  return actions.slice(0, 104); // Garantir exatamente 104 ações
};
