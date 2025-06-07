
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

  // Análise dos dados integrados
  const hasSwotData = integratedData.swot && Object.values(integratedData.swot).some((arr: any) => 
    Array.isArray(arr) && arr.some(item => item.text && item.text.trim())
  );
  
  const hasBusinessMap = integratedData.businessMap && Object.values(integratedData.businessMap).some(value => 
    value && typeof value === 'string' && value.trim()
  );
  
  const hasPuvData = integratedData.puv && Object.values(integratedData.puv).some(value => 
    value && typeof value === 'string' && value.trim()
  );
  
  const hasMapaEquipe = integratedData.mapaEquipe && 
    integratedData.mapaEquipe.colaboradores && 
    integratedData.mapaEquipe.colaboradores.length > 0;

  const hasPhaseTest = integratedData.phaseTest && integratedData.phaseTest.score;

  // Template de ações base para diferentes categorias
  const actionTemplates = {
    gestao: [
      "Criar organograma detalhado da empresa",
      "Implementar sistema de reuniões periódicas estruturadas",
      "Desenvolver manual de procedimentos operacionais",
      "Estabelecer política de delegação de responsabilidades",
      "Criar sistema de acompanhamento de metas por setor",
      "Implementar software de gestão empresarial (ERP)",
      "Desenvolver política de tomada de decisões",
      "Criar comitê executivo de gestão",
      "Implementar sistema de gestão por indicadores (KPIs)",
      "Desenvolver plano de sucessão organizacional",
      "Criar política de comunicação interna",
      "Implementar gestão por processos",
      "Desenvolver sistema de gestão de projetos",
      "Criar política de gestão de mudanças",
      "Implementar sistema de gestão da qualidade",
      "Desenvolver programa de melhoria contínua",
      "Criar sistema de gestão de riscos empresariais",
      "Implementar balanced scorecard",
      "Desenvolver política de governança corporativa",
      "Criar sistema de auditoria interna"
    ],
    comercial: [
      "Implementar CRM profissional",
      "Criar funil de vendas estruturado",
      "Desenvolver scripts de vendas padronizados",
      "Estabelecer processo de qualificação de leads",
      "Criar programa de treinamento em vendas",
      "Implementar sistema de follow-up automatizado",
      "Desenvolver estratégia de pricing dinâmico",
      "Criar programa de pós-venda",
      "Implementar análise de concorrência",
      "Desenvolver estratégia de cross-selling",
      "Criar sistema de gestão de pipeline",
      "Implementar programa de indicações",
      "Desenvolver estratégia de up-selling",
      "Criar sistema de forecasting de vendas",
      "Implementar gestão de contas-chave",
      "Desenvolver programa de fidelização",
      "Criar estratégia de segmentação de clientes",
      "Implementar sistema de vendas consultivas",
      "Desenvolver programa de parcerias comerciais",
      "Criar sistema de gestão de propostas"
    ],
    marketing: [
      "Desenvolver identidade visual profissional",
      "Criar estratégia de marketing digital",
      "Implementar presença nas redes sociais",
      "Desenvolver site responsivo e otimizado",
      "Criar estratégia de conteúdo (blog/artigos)",
      "Implementar campanhas de Google Ads",
      "Desenvolver estratégia de e-mail marketing",
      "Criar programa de marketing de relacionamento",
      "Implementar análise de ROI em marketing",
      "Desenvolver estratégia de SEO",
      "Criar campanhas de remarketing",
      "Implementar marketing automation",
      "Desenvolver estratégia de influencers",
      "Criar programa de eventos e networking",
      "Implementar análise de comportamento do cliente",
      "Desenvolver estratégia de branding",
      "Criar programa de relações públicas",
      "Implementar marketing de conteúdo B2B",
      "Desenvolver estratégia omnichannel",
      "Criar sistema de lead scoring"
    ],
    financeiro: [
      "Implementar controle de fluxo de caixa diário",
      "Separar contas pessoais das empresariais",
      "Criar sistema de controle de custos",
      "Implementar orçamento empresarial anual",
      "Desenvolver análise de rentabilidade por produto",
      "Criar reserva de emergência empresarial",
      "Implementar sistema de cobrança automatizada",
      "Desenvolver política de crédito e cobrança",
      "Criar análise de viabilidade de investimentos",
      "Implementar controle de estoque financeiro",
      "Desenvolver sistema de precificação estratégica",
      "Criar dashboard financeiro executivo",
      "Implementar controle de contas a pagar/receber",
      "Desenvolver análise de break-even",
      "Criar política de investimentos",
      "Implementar sistema de auditoria financeira",
      "Desenvolver planejamento tributário",
      "Criar análise de margem de contribuição",
      "Implementar sistema de budget por departamento",
      "Desenvolver análise de ROI por projeto"
    ],
    rh: [
      "Criar descrição de cargos e responsabilidades",
      "Implementar processo de recrutamento estruturado",
      "Desenvolver programa de integração (onboarding)",
      "Estabelecer política salarial e benefícios",
      "Criar sistema de avaliação de desempenho",
      "Implementar programa de treinamento e desenvolvimento",
      "Desenvolver plano de carreira interno",
      "Criar política de feedback contínuo",
      "Implementar sistema de gestão por competências",
      "Desenvolver programa de reconhecimento",
      "Criar política de trabalho remoto/híbrido",
      "Implementar pesquisa de clima organizacional",
      "Desenvolver programa de mentoria interna",
      "Criar sistema de gestão de talentos",
      "Implementar programa de sucessão",
      "Desenvolver política de diversidade e inclusão",
      "Criar programa de bem-estar dos funcionários",
      "Implementar sistema de comunicação interna",
      "Desenvolver política de desenvolvimento de liderança",
      "Criar programa de retenção de talentos"
    ],
    operacional: [
      "Mapear todos os processos principais",
      "Implementar controle de qualidade rigoroso",
      "Criar manual de procedimentos operacionais",
      "Desenvolver sistema de gestão de fornecedores",
      "Implementar controle de estoque inteligente",
      "Criar sistema de logística otimizada",
      "Desenvolver programa de produtividade",
      "Implementar automação de processos repetitivos",
      "Criar sistema de gestão de projetos operacionais",
      "Desenvolver política de terceirização estratégica",
      "Implementar sistema de gestão de ativos",
      "Criar programa de redução de desperdícios",
      "Desenvolver sistema de gestão da cadeia de suprimentos",
      "Implementar controle de tempo e produtividade",
      "Criar sistema de gestão de facilidades",
      "Desenvolver programa de otimização de custos",
      "Implementar sistema de gestão de contratos",
      "Criar política de gestão de estoques",
      "Desenvolver sistema de gestão de manutenção",
      "Implementar programa de inovação operacional"
    ],
    tecnologia: [
      "Avaliar e modernizar infraestrutura de TI",
      "Implementar sistema de backup automatizado",
      "Criar política de segurança da informação",
      "Desenvolver sistema de gestão de dados",
      "Implementar automação de processos (RPA)",
      "Criar sistema de business intelligence",
      "Desenvolver aplicativo móvel empresarial",
      "Implementar sistema de videoconferência profissional",
      "Criar política de uso de tecnologia",
      "Desenvolver sistema de gestão documental",
      "Implementar solução de cloud computing",
      "Criar sistema de monitoramento de performance",
      "Desenvolver integração entre sistemas",
      "Implementar solução de e-commerce",
      "Criar sistema de gestão de relacionamento digital",
      "Desenvolver dashboard executivo em tempo real",
      "Implementar sistema de assinatura digital",
      "Criar política de transformação digital",
      "Desenvolver sistema de análise preditiva",
      "Implementar solução de inteligência artificial"
    ],
    cultura: [
      "Definir missão, visão e valores empresariais",
      "Criar código de ética e conduta",
      "Implementar programa de cultura organizacional",
      "Desenvolver rituais e tradições empresariais",
      "Criar programa de comunicação de valores",
      "Implementar sistema de reconhecimento cultural",
      "Desenvolver programa de engajamento",
      "Criar espaços de convivência e colaboração",
      "Implementar programa de voluntariado corporativo",
      "Desenvolver política de responsabilidade social",
      "Criar programa de diversidade e inclusão",
      "Implementar sistema de feedback cultural",
      "Desenvolver programa de embaixadores da cultura",
      "Criar eventos de integração e team building",
      "Implementar programa de desenvolvimento de liderança cultural",
      "Desenvolver sistema de onboarding cultural",
      "Criar programa de storytelling empresarial",
      "Implementar política de work-life balance",
      "Desenvolver programa de inovação colaborativa",
      "Criar sistema de gestão da mudança cultural"
    ]
  };

  // Função para gerar dica da IA baseada na ação
  const generateAITip = (acao: string, categoria: string): string => {
    const tips = {
      gestao: [
        "Comece mapeando a situação atual antes de implementar mudanças. Envolva a equipe no processo de definição para garantir engajamento.",
        "Defina marcos claros e mensuráveis. Estabeleça reuniões semanais de acompanhamento para ajustar a rota conforme necessário.",
        "Documente todo o processo para facilitar futuras implementações. Crie um cronograma realista considerando outros projetos em andamento.",
        "Implemente gradualmente, testando em pequena escala primeiro. Busque feedback constante da equipe e faça ajustes necessários."
      ],
      comercial: [
        "Analise seus dados históricos de vendas para identificar padrões. Implemente um sistema de CRM simples antes de partir para soluções complexas.",
        "Treine sua equipe antes de implementar novos processos. Defina métricas claras de sucesso e acompanhe semanalmente.",
        "Teste diferentes abordagens com pequenos grupos de clientes. Documente o que funciona e padronize os processos vencedores.",
        "Integre marketing e vendas desde o início. Crie materiais de apoio que facilitem o trabalho da equipe comercial."
      ],
      marketing: [
        "Comece definindo seu público-alvo claramente. Crie personas detalhadas antes de desenvolver qualquer material ou campanha.",
        "Teste pequeno antes de investir grande. Use dados e analytics para tomar decisões, não apenas intuição.",
        "Mantenha consistência visual e de mensagem em todos os canais. Crie um calendário editorial para organizar o conteúdo.",
        "Meça ROI de cada ação de marketing. Foque nos canais que trazem melhor retorno e otimize constantemente."
      ],
      financeiro: [
        "Implemente controles simples primeiro, como fluxo de caixa diário. Automatize processos repetitivos para reduzir erros.",
        "Separe imediatamente contas pessoais das empresariais. Crie reservas de emergência antes de fazer investimentos.",
        "Use ferramentas gratuitas no início, como planilhas bem estruturadas. Evolua para softwares pagos conforme a complexidade aumenta.",
        "Monitore indicadores financeiros semanalmente. Crie dashboards simples que mostrem a saúde financeira em tempo real."
      ],
      rh: [
        "Documente processos desde o recrutamento até o desligamento. Crie descrições de cargo claras para evitar conflitos futuros.",
        "Implemente feedback regular, não apenas anual. Use ferramentas simples como formulários online para pesquisas de clima.",
        "Invista em treinamento interno antes de buscar externos. Desenvolva lideranças internas para reduzir turnover.",
        "Crie políticas claras e comunique bem. Use onboarding estruturado para acelerar a adaptação de novos funcionários."
      ],
      operacional: [
        "Mapeie processos atuais antes de otimizar. Elimine desperdícios e gargalos identificados no mapeamento.",
        "Automatize tarefas repetitivas e de baixo valor. Invista em treinamento da equipe para usar novas ferramentas.",
        "Implemente controles de qualidade em pontos críticos. Use indicadores simples para monitorar performance operacional.",
        "Padronize procedimentos para reduzir variações. Crie checklists para garantir que nada seja esquecido."
      ],
      tecnologia: [
        "Avalie necessidades reais antes de comprar tecnologia. Comece com soluções simples e gratuitas quando possível.",
        "Treine a equipe antes de implementar novas tecnologias. Crie backups e planos de contingência para sistemas críticos.",
        "Integre sistemas gradualmente para evitar problemas. Monitore performance e faça ajustes conforme necessário.",
        "Mantenha foco na segurança desde o início. Use senhas fortes e atualize sistemas regularmente."
      ],
      cultura: [
        "Envolva a equipe na definição de valores e cultura. Seja autêntico - a cultura deve refletir a realidade da empresa.",
        "Comunique valores através de ações, não apenas palavras. Reconheça comportamentos que demonstram os valores da empresa.",
        "Implemente mudanças culturais gradualmente. Use storytelling para comunicar a cultura de forma envolvente.",
        "Meça engajamento regularmente através de pesquisas. Ajuste estratégias baseado no feedback da equipe."
      ]
    };

    const categoryTips = tips[categoria as keyof typeof tips] || tips.gestao;
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  };

  // Gerar pelo menos 100 ações distribuídas em 26 semanas (6 meses)
  const categoriasChave = ['gestao', 'comercial', 'marketing', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura'];
  
  for (let semana = 1; semana <= 26; semana++) {
    // Adicionar 4 ações por semana para garantir pelo menos 104 ações
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

      // Definir status baseado na data
      const hoje = new Date();
      let status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado' = 'pendente';
      if (dataVencimento < hoje) {
        status = 'atrasado';
      }

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
        recursos: categoria === 'tecnologia' ? 'Software, treinamento técnico, consultoria especializada' :
                 categoria === 'financeiro' ? 'Sistema financeiro, tempo para análise, consultoria contábil' :
                 categoria === 'marketing' ? 'Ferramentas de design, orçamento para campanhas, criação de conteúdo' :
                 'Tempo da equipe, materiais de apoio, ferramentas básicas',
        metricas: categoria === 'comercial' ? 'Aumento de 15% nas vendas, melhoria na conversão' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos, controle 100% atualizado' :
                 categoria === 'rh' ? 'Redução de 30% no turnover, melhoria no clima organizacional' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento, mais leads qualificados' :
                 'Melhoria mensurável no indicador específico da área',
        beneficios: categoria === 'gestao' ? 'Maior organização e eficiência operacional' :
                   categoria === 'comercial' ? 'Aumento das vendas e melhor relacionamento com clientes' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca e geração de leads' :
                   categoria === 'financeiro' ? 'Melhor controle financeiro e tomada de decisões' :
                   categoria === 'rh' ? 'Equipe mais engajada e produtiva' :
                   categoria === 'operacional' ? 'Processos mais eficientes e menor retrabalho' :
                   categoria === 'tecnologia' ? 'Maior eficiência e competitividade' :
                   'Cultura mais forte e alinhada',
        dataVencimento,
        concluida: false,
        detalhesImplementacao: `Implementar ${acaoTemplate.toLowerCase()} seguindo as melhores práticas da indústria`,
        dicaIA: generateAITip(acaoTemplate, categoria),
        status,
        semana
      };

      actions.push(action);
    }
  }

  // Personalizar algumas ações baseadas nos dados coletados
  if (diagnosticData.problemasComerciais && actions.length > 10) {
    actions[5].acao = `Resolver problema comercial identificado: ${diagnosticData.problemasComerciais.substring(0, 100)}...`;
    actions[5].dicaIA = "Foque na raiz do problema comercial. Analise dados de vendas, feedback de clientes e processos atuais. Implemente mudanças graduais e meça resultados semanalmente.";
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 20) {
    actions[15].acao = `Implementar solução para problema financeiro: ${diagnosticData.problemasFinanceiros.substring(0, 100)}...`;
    actions[15].dicaIA = "Problemas financeiros requerem ação imediata. Comece com controle de fluxo de caixa diário e separe contas pessoais das empresariais antes de implementar outras soluções.";
  }

  if (diagnosticData.objetivos6Meses && actions.length > 50) {
    actions[25].acao = `Executar estratégia para atingir objetivo: ${diagnosticData.objetivos6Meses.substring(0, 100)}...`;
    actions[25].dicaIA = "Quebre grandes objetivos em metas menores e mensuráveis. Crie um plano de 90 dias com marcos específicos e ajuste a estratégia baseado nos resultados.";
  }

  // Ajustar ações baseadas nos dados integrados
  if (!hasSwotData && actions.length > 0) {
    actions[0].acao = 'Realizar Análise SWOT completa usando a ferramenta da plataforma';
    actions[0].prioridade = 'alta';
    actions[0].dicaIA = "A análise SWOT é fundamental para estratégia. Use a ferramenta da plataforma para mapear forças, fraquezas, oportunidades e ameaças. Envolva a equipe nesta análise.";
  }

  if (!hasBusinessMap && actions.length > 5) {
    actions[3].acao = 'Mapear modelo de negócio usando Business Model Canvas da plataforma';
    actions[3].prioridade = 'alta';
    actions[3].dicaIA = "O Business Model Canvas ajuda a visualizar como sua empresa cria, entrega e captura valor. Complete todos os 9 blocos com a equipe.";
  }

  if (!hasPuvData && actions.length > 10) {
    actions[8].acao = 'Desenvolver Proposta Única de Valor usando a ferramenta PUV da plataforma';
    actions[8].categoria = 'marketing';
    actions[8].dicaIA = "Uma PUV clara diferencia você da concorrência. Foque no que realmente importa para seus clientes e como você entrega isso de forma única.";
  }

  if (!hasMapaEquipe && actions.length > 15) {
    actions[12].acao = 'Mapear perfil comportamental da equipe usando a ferramenta Mapa da Equipe';
    actions[12].categoria = 'rh';
    actions[12].dicaIA = "Conhecer o perfil da equipe permite gestão mais eficaz. Use os resultados para melhorar comunicação, motivação e alocação de tarefas.";
  }

  return actions.slice(0, 104); // Garantir exatamente 104 ações
};
