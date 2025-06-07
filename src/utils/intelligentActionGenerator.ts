
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

  // Template de ações base expandido para garantir 104 ações
  const actionTemplates = {
    gestao: [
      "Criar organograma detalhado da empresa com definição de hierarquias",
      "Implementar sistema de reuniões periódicas estruturadas (daily, weekly, monthly)",
      "Desenvolver manual de procedimentos operacionais padrão (POP)",
      "Estabelecer política clara de delegação de responsabilidades",
      "Criar sistema de acompanhamento de metas por setor com KPIs",
      "Implementar software de gestão empresarial (ERP) adequado ao porte",
      "Desenvolver política estruturada de tomada de decisões",
      "Criar comitê executivo de gestão estratégica",
      "Implementar dashboard de indicadores em tempo real",
      "Desenvolver plano de sucessão organizacional detalhado",
      "Criar política de comunicação interna eficaz",
      "Implementar gestão por processos mapeados",
      "Desenvolver sistema robusto de gestão de projetos",
      "Criar política estruturada de gestão de mudanças",
      "Implementar sistema certificado de gestão da qualidade",
      "Desenvolver programa contínuo de melhoria operacional",
      "Criar sistema preventivo de gestão de riscos",
      "Implementar balanced scorecard empresarial",
      "Desenvolver política completa de governança corporativa",
      "Criar sistema interno de auditoria e controles"
    ],
    comercial: [
      "Implementar CRM profissional integrado com automações",
      "Criar funil de vendas estruturado com etapas definidas",
      "Desenvolver scripts de vendas padronizados para equipe",
      "Estabelecer processo rigoroso de qualificação de leads",
      "Criar programa intensivo de treinamento em vendas",
      "Implementar sistema automatizado de follow-up comercial",
      "Desenvolver estratégia inteligente de pricing dinâmico",
      "Criar programa estruturado de pós-venda e retenção",
      "Implementar análise competitiva sistemática da concorrência",
      "Desenvolver estratégia eficaz de cross-selling",
      "Criar sistema avançado de gestão de pipeline",
      "Implementar programa estruturado de indicações e referências",
      "Desenvolver estratégia lucrativa de up-selling",
      "Criar sistema preciso de forecasting de vendas",
      "Implementar gestão especializada de contas-chave",
      "Desenvolver programa completo de fidelização de clientes",
      "Criar estratégia detalhada de segmentação de clientes",
      "Implementar metodologia de vendas consultivas",
      "Desenvolver programa estratégico de parcerias comerciais",
      "Criar sistema eficiente de gestão de propostas comerciais"
    ],
    marketing: [
      "Desenvolver identidade visual profissional e consistente",
      "Criar estratégia completa de marketing digital multicanal",
      "Implementar presença estratégica nas redes sociais",
      "Desenvolver site responsivo e otimizado para conversões",
      "Criar estratégia robusta de conteúdo (blog/artigos/vídeos)",
      "Implementar campanhas otimizadas de Google Ads",
      "Desenvolver estratégia eficaz de e-mail marketing",
      "Criar programa estruturado de marketing de relacionamento",
      "Implementar análise detalhada de ROI em marketing",
      "Desenvolver estratégia completa de SEO e SEM",
      "Criar campanhas inteligentes de remarketing",
      "Implementar plataforma de marketing automation",
      "Desenvolver estratégia colaborativa com influencers",
      "Criar programa regular de eventos e networking",
      "Implementar análise comportamental avançada do cliente",
      "Desenvolver estratégia consistente de branding",
      "Criar programa estratégico de relações públicas",
      "Implementar marketing de conteúdo especializado B2B",
      "Desenvolver estratégia integrada omnichannel",
      "Criar sistema inteligente de lead scoring"
    ],
    financeiro: [
      "Implementar controle rigoroso de fluxo de caixa diário",
      "Separar definitivamente contas pessoais das empresariais",
      "Criar sistema detalhado de controle de custos",
      "Implementar orçamento empresarial anual estruturado",
      "Desenvolver análise precisa de rentabilidade por produto",
      "Criar reserva robusta de emergência empresarial",
      "Implementar sistema automatizado de cobrança",
      "Desenvolver política clara de crédito e cobrança",
      "Criar análise detalhada de viabilidade de investimentos",
      "Implementar controle preciso de estoque financeiro",
      "Desenvolver sistema estratégico de precificação",
      "Criar dashboard financeiro executivo em tempo real",
      "Implementar controle automatizado de contas a pagar/receber",
      "Desenvolver análise precisa de break-even por produto",
      "Criar política estruturada de investimentos",
      "Implementar sistema rigoroso de auditoria financeira",
      "Desenvolver planejamento tributário otimizado",
      "Criar análise detalhada de margem de contribuição",
      "Implementar sistema de budget departamental",
      "Desenvolver análise precisa de ROI por projeto"
    ],
    rh: [
      "Criar descrições detalhadas de cargos e responsabilidades",
      "Implementar processo estruturado de recrutamento e seleção",
      "Desenvolver programa completo de integração (onboarding)",
      "Estabelecer política justa de salários e benefícios",
      "Criar sistema regular de avaliação de desempenho",
      "Implementar programa contínuo de treinamento e desenvolvimento",
      "Desenvolver plano estruturado de carreira interno",
      "Criar política regular de feedback construtivo",
      "Implementar sistema de gestão por competências",
      "Desenvolver programa eficaz de reconhecimento",
      "Criar política flexível de trabalho remoto/híbrido",
      "Implementar pesquisa regular de clima organizacional",
      "Desenvolver programa estruturado de mentoria interna",
      "Criar sistema avançado de gestão de talentos",
      "Implementar programa eficaz de sucessão",
      "Desenvolver política inclusiva de diversidade",
      "Criar programa completo de bem-estar dos funcionários",
      "Implementar sistema eficaz de comunicação interna",
      "Desenvolver política robusta de desenvolvimento de liderança",
      "Criar programa estratégico de retenção de talentos"
    ],
    operacional: [
      "Mapear detalhadamente todos os processos principais",
      "Implementar controle rigoroso de qualidade em todas etapas",
      "Criar manual completo de procedimentos operacionais",
      "Desenvolver sistema eficaz de gestão de fornecedores",
      "Implementar controle inteligente de estoque",
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
      "Implementar programa contínuo de inovação operacional"
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
      "Criar sistema de monitoramento de performance em tempo real",
      "Desenvolver integração completa entre sistemas",
      "Implementar solução robusta de e-commerce",
      "Criar sistema avançado de gestão de relacionamento digital",
      "Desenvolver dashboard executivo interativo em tempo real",
      "Implementar sistema seguro de assinatura digital",
      "Criar política estruturada de transformação digital",
      "Desenvolver sistema inteligente de análise preditiva",
      "Implementar solução customizada de inteligência artificial"
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
      "Criar sistema eficaz de gestão da mudança cultural"
    ]
  };

  // Função para gerar dica da IA mais detalhada
  const generateAITip = (acao: string, categoria: string): string => {
    const tips = {
      gestao: [
        "Para implementar esta ação de gestão, comece mapeando a situação atual e envolvendo a equipe no processo. Defina marcos claros, estabeleça reuniões de acompanhamento semanal e documente todo o progresso para facilitar futuras melhorias.",
        "Esta ação requer planejamento detalhado e execução gradual. Inicie com um projeto piloto, colete feedback da equipe, ajuste o processo e depois expanda para toda a organização.",
        "Foque na padronização e documentação. Crie templates, checklists e procedimentos claros. Treine a equipe adequadamente e estabeleça métricas de sucesso para acompanhar o progresso.",
        "Implemente mudanças de forma estruturada: análise da situação atual → definição de objetivos → planejamento detalhado → execução monitorada → avaliação de resultados → ajustes necessários."
      ],
      comercial: [
        "Para maximizar resultados comerciais, analise seus dados históricos primeiro. Identifique padrões de sucesso, mapeie o perfil do cliente ideal e estruture processos que possam ser replicados pela equipe.",
        "Implemente esta ação comercial gradualmente: teste com um grupo pequeno de clientes, refine o processo, treine a equipe e depois expanda. Sempre acompanhe métricas de conversão e ROI.",
        "Integre esta ação com seu funil de vendas existente. Crie materiais de apoio, defina scripts padronizados e estabeleça um sistema de follow-up automatizado para maximizar conversões.",
        "Foque na experiência do cliente. Mapeie toda a jornada de compra, identifique pontos de atrito e otimize cada etapa. Use CRM para acompanhar interações e personalizar abordagens."
      ],
      marketing: [
        "Para esta ação de marketing, comece definindo personas detalhadas e objetivos SMART. Crie um calendário editorial, teste diferentes formatos de conteúdo e use analytics para otimizar resultados.",
        "Implemente esta estratégia de marketing de forma multicanal. Mantenha consistência de marca, teste diferentes mensagens e canais, e sempre meça ROI para direcionar investimentos futuros.",
        "Foque na criação de valor para o cliente. Desenvolva conteúdo educativo, use storytelling autêntico e construa relacionamentos de longo prazo em vez de focar apenas em vendas diretas.",
        "Use dados para guiar decisões. Implemente ferramentas de analytics, faça testes A/B regulares, acompanhe métricas de engajamento e ajuste estratégias baseado em resultados reais."
      ],
      financeiro: [
        "Esta ação financeira requer disciplina e controle rigoroso. Implemente controles diários, automatize processos quando possível e crie dashboards para acompanhar indicadores em tempo real.",
        "Comece organizando e categorizando todas as informações financeiras. Use ferramentas adequadas ao porte da empresa, treine a equipe e estabeleça rotinas de revisão regular dos resultados.",
        "Para esta implementação financeira, separe claramente o pessoal do empresarial, crie reservas de emergência e desenvolva políticas claras de investimento e gastos.",
        "Foque em prevenção e planejamento. Use projeções e cenários, monitore indicadores-chave diariamente e mantenha sempre uma visão de médio e longo prazo das finanças."
      ],
      rh: [
        "Esta ação de RH deve ser implementada com transparência e comunicação clara. Envolva a equipe no processo, colete feedback regular e ajuste políticas conforme necessário.",
        "Para implementar esta ação de pessoas, comece mapeando a situação atual, defina políticas claras e justas, e invista em treinamento adequado para gestores e colaboradores.",
        "Foque no desenvolvimento contínuo e retenção de talentos. Crie programas estruturados, ofereça oportunidades de crescimento e mantenha comunicação aberta com a equipe.",
        "Implemente esta ação gradualmente, começando com grupos menores. Use pesquisas de clima, feedback 360 e métricas de satisfação para avaliar a eficácia das mudanças."
      ],
      operacional: [
        "Para esta ação operacional, mapeie todos os processos primeiro, identifique gargalos e oportunidades de melhoria. Implemente mudanças gradualmente e monitore impactos na produtividade.",
        "Foque na padronização e otimização. Crie procedimentos claros, treine a equipe adequadamente e use tecnologia para automatizar tarefas repetitivas.",
        "Esta implementação operacional requer acompanhamento de indicadores de performance. Estabeleça métricas claras, faça reuniões de análise regular e promova melhoria contínua.",
        "Implemente controles de qualidade em pontos críticos, reduza desperdícios e otimize recursos. Use lean thinking e ferramentas de gestão visual para engajar a equipe."
      ],
      tecnologia: [
        "Para esta implementação tecnológica, avalie necessidades reais primeiro, pesquise soluções adequadas ao orçamento e porte da empresa. Priorize segurança e facilidade de uso.",
        "Implemente tecnologia gradualmente: piloto → treinamento → expansão → otimização. Sempre tenha backup dos dados e planos de contingência para problemas técnicos.",
        "Foque na integração entre sistemas e na experiência do usuário. Escolha soluções que se conectem bem e treine adequadamente a equipe para maximizar o retorno do investimento.",
        "Esta ação tecnológica deve incluir planejamento de segurança, backup regular e atualizações constantes. Monitore performance e faça ajustes conforme necessário."
      ],
      cultura: [
        "Para implementar esta ação cultural, seja autêntico e consistente. Envolva a equipe na definição de valores, comunique através de ações práticas e reconheça comportamentos alinhados.",
        "Mudanças culturais acontecem gradualmente. Comunique claramente o 'porquê' das mudanças, dê exemplo como liderança e celebre pequenas vitórias no caminho.",
        "Esta ação cultural requer engajamento genuíno da liderança. Use storytelling, crie rituais significativos e mantenha comunicação aberta para construir confiança.",
        "Implemente esta mudança cultural com paciência e persistência. Meça engajamento regularmente, colete feedback honesto e ajuste abordagens baseado na resposta da equipe."
      ]
    };

    const categoryTips = tips[categoria as keyof typeof tips] || tips.gestao;
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  };

  // Gerar exatamente 104 ações distribuídas em 26 semanas (4 ações por semana)
  const categoriasChave = ['gestao', 'comercial', 'marketing', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura'];
  
  for (let semana = 1; semana <= 26; semana++) {
    for (let acaoPorSemana = 0; acaoPorSemana < 4; acaoPorSemana++) {
      const categoria = categoriasChave[acaoPorSemana % categoriasChave.length];
      const templates = actionTemplates[categoria as keyof typeof actionTemplates];
      const acaoIndex = ((semana - 1) * 4 + acaoPorSemana) % templates.length;
      const acaoTemplate = templates[acaoIndex];

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
                    'Gestor Responsável',
        recursos: categoria === 'tecnologia' ? 'Software especializado, treinamento técnico, consultoria especializada' :
                 categoria === 'financeiro' ? 'Sistema financeiro robusto, tempo para análise, consultoria contábil' :
                 categoria === 'marketing' ? 'Ferramentas de design, orçamento para campanhas, criação de conteúdo' :
                 'Tempo da equipe qualificada, materiais de apoio, ferramentas adequadas',
        metricas: categoria === 'comercial' ? 'Aumento de 15-25% nas vendas, melhoria na conversão de leads' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos, controle 100% atualizado' :
                 categoria === 'rh' ? 'Redução de 30% no turnover, melhoria significativa no clima' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento, mais leads qualificados' :
                 'Melhoria mensurável no indicador específico da área',
        beneficios: categoria === 'gestao' ? 'Maior organização, eficiência operacional e tomada de decisão' :
                   categoria === 'comercial' ? 'Aumento sustentável das vendas e melhor relacionamento com clientes' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca, autoridade no mercado e geração de leads' :
                   categoria === 'financeiro' ? 'Melhor controle financeiro, previsibilidade e tomada de decisões' :
                   categoria === 'rh' ? 'Equipe mais engajada, produtiva e alinhada com objetivos' :
                   categoria === 'operacional' ? 'Processos mais eficientes, menor retrabalho e custos otimizados' :
                   categoria === 'tecnologia' ? 'Maior eficiência, competitividade e escalabilidade' :
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
    actions[5].dicaIA = "Este é um problema comercial específico da sua empresa. Analise a raiz do problema, colete dados detalhados de vendas e feedback de clientes. Implemente mudanças graduais e meça resultados semanalmente para ajustar a estratégia.";
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 20) {
    actions[15].acao = `Implementar solução financeira urgente: ${diagnosticData.problemasFinanceiros.substring(0, 80)}...`;
    actions[15].prioridade = 'alta';
    actions[15].dicaIA = "Problemas financeiros requerem ação imediata e controle rigoroso. Comece com fluxo de caixa diário, separe contas pessoais das empresariais e crie reservas de emergência antes de implementar outras soluções.";
  }

  if (diagnosticData.objetivos6Meses && actions.length > 50) {
    actions[25].acao = `Executar estratégia para atingir: ${diagnosticData.objetivos6Meses.substring(0, 80)}...`;
    actions[25].prioridade = 'alta';
    actions[25].dicaIA = "Para atingir este objetivo específico, quebre-o em metas menores e mensuráveis. Crie um plano de 90 dias com marcos específicos, monitore progresso semanalmente e ajuste estratégias baseado nos resultados obtidos.";
  }

  console.log(`Geradas ${actions.length} ações para o programa de aceleração empresarial`);
  return actions;
};
