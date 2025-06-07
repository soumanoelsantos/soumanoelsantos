
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

// Função para calcular data útil (apenas dias de semana)
const calcularDataUtil = (diasParaAdicionar: number): Date => {
  const hoje = new Date();
  let diasAdicionados = 0;
  let dataAtual = new Date(hoje);
  
  while (diasAdicionados < diasParaAdicionar) {
    dataAtual.setDate(dataAtual.getDate() + 1);
    // Se não for sábado (6) nem domingo (0), conta como dia útil
    if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
      diasAdicionados++;
    }
  }
  
  return dataAtual;
};

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
      "Desenvolver estratégia de vendas B2B especializada",
      "Implementar sistema de análise de conversão por canal",
      "Criar programa de mentoria comercial interna",
      "Desenvolver estratégia de vendas consultivas",
      "Implementar sistema de gamificação para vendas",
      "Criar programa de customer success estruturado",
      "Desenvolver estratégia de account management",
      "Implementar sistema de análise de lifetime value",
      "Criar programa de upselling automatizado",
      "Desenvolver estratégia de vendas sazonais",
      "Implementar sistema de gestão de pipeline avançado",
      "Criar programa de vendas por indicação",
      "Desenvolver estratégia de vendas corporativas",
      "Implementar sistema de análise de churn",
      "Criar programa de vendas consultivas especializadas",
      "Desenvolver estratégia de vendas multi-canal",
      "Implementar sistema de análise de margem por produto",
      "Criar programa de desenvolvimento de novos mercados",
      "Desenvolver estratégia de vendas por região",
      "Implementar sistema de gestão de conta-chave",
      "Criar programa de vendas por telefone estruturado",
      "Desenvolver estratégia de vendas digitais",
      "Implementar sistema de análise de ROI comercial",
      "Criar programa de vendas em eventos e feiras"
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
      "Criar estratégia de marketing local geo-segmentado",
      "Desenvolver programa de webinars educativos",
      "Implementar estratégia de vídeo marketing",
      "Criar programa de marketing viral",
      "Desenvolver estratégia de growth hacking",
      "Implementar sistema de análise de funil de marketing",
      "Criar programa de co-marketing com parceiros",
      "Desenvolver estratégia de marketplace",
      "Implementar programa de affiliate marketing",
      "Criar estratégia de marketing conversacional",
      "Desenvolver programa de podcasting corporativo",
      "Implementar estratégia de marketing experiencial",
      "Criar programa de marketing de guerrilha",
      "Desenvolver estratégia de marketing de conteúdo interativo",
      "Implementar programa de marketing mobile",
      "Criar estratégia de marketing por geolocalização",
      "Desenvolver programa de marketing de eventos virtuais",
      "Implementar estratégia de marketing de retenção",
      "Criar programa de marketing de advocacy",
      "Desenvolver estratégia de marketing de nicho",
      "Implementar programa de marketing comportamental",
      "Criar estratégia de marketing de temporada",
      "Desenvolver programa de marketing internacional",
      "Implementar estratégia de marketing sustentável"
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
      "Desenvolver sistema de gestão de compliance",
      "Implementar programa de transformação digital",
      "Criar sistema de gestão de performance organizacional",
      "Desenvolver programa de liderança situacional",
      "Implementar sistema de gestão ágil",
      "Criar programa de inteligência competitiva",
      "Desenvolver sistema de gestão de stakeholders",
      "Implementar programa de sustentabilidade corporativa",
      "Criar sistema de gestão de indicadores estratégicos",
      "Desenvolver programa de gestão de talentos",
      "Implementar sistema de gestão de processos digitais",
      "Criar programa de inovação aberta",
      "Desenvolver sistema de gestão de ecossistema",
      "Implementar programa de gestão de mudança cultural",
      "Criar sistema de gestão de parceiros estratégicos",
      "Desenvolver programa de gestão de portfólio",
      "Implementar sistema de gestão de capacidades",
      "Criar programa de gestão de valor",
      "Desenvolver sistema de gestão de operações",
      "Implementar programa de gestão de recursos",
      "Criar sistema de gestão de informações estratégicas",
      "Desenvolver programa de gestão de relacionamentos",
      "Implementar sistema de gestão de resultados",
      "Criar programa de gestão de excelência operacional"
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
      "Implementar análise de sensibilidade financeira",
      "Desenvolver sistema de gestão de tesouraria",
      "Criar programa de otimização fiscal",
      "Implementar sistema de análise de crédito",
      "Desenvolver política de hedge financeiro",
      "Criar sistema de gestão de investimentos",
      "Implementar programa de educação financeira",
      "Desenvolver sistema de análise de cenários",
      "Criar política de distribuição de lucros",
      "Implementar sistema de controle de margem",
      "Desenvolver programa de redução de custos",
      "Criar sistema de análise de rentabilidade",
      "Implementar política de gestão de caixa",
      "Desenvolver sistema de análise de valor",
      "Criar programa de gestão de ativos",
      "Implementar sistema de análise de liquidez",
      "Desenvolver política de endividamento",
      "Criar sistema de gestão de passivos",
      "Implementar programa de análise de mercado financeiro",
      "Desenvolver sistema de gestão de carteira",
      "Criar política de diversificação de investimentos",
      "Implementar sistema de análise de performance financeira",
      "Desenvolver programa de gestão de derivativos",
      "Criar sistema de análise de volatilidade"
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
      "Desenvolver programa de educação corporativa",
      "Criar sistema de gestão de performance",
      "Implementar programa de coaching interno",
      "Desenvolver política de trabalho flexível",
      "Criar sistema de gestão de engajamento",
      "Implementar programa de voluntariado corporativo",
      "Desenvolver política de diversidade e inclusão",
      "Criar sistema de gestão de conhecimento",
      "Implementar programa de desenvolvimento de líderes",
      "Desenvolver política de qualidade de vida",
      "Criar sistema de gestão de feedback 360",
      "Implementar programa de mobilidade interna",
      "Desenvolver política de reconhecimento e recompensas",
      "Criar sistema de gestão de pessoas analytics",
      "Implementar programa de desenvolvimento de soft skills",
      "Desenvolver política de work-life balance",
      "Criar sistema de gestão de turnover",
      "Implementar programa de desenvolvimento comportamental",
      "Desenvolver política de gestão de gerações",
      "Criar sistema de gestão de motivação",
      "Implementar programa de liderança feminina",
      "Desenvolver política de inclusão digital",
      "Criar sistema de gestão de burnout",
      "Implementar programa de desenvolvimento sustentável"
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
      "Desenvolver sistema de gestão de energia",
      "Implementar programa de lean manufacturing",
      "Criar sistema de gestão de qualidade Six Sigma",
      "Desenvolver política de gestão de resíduos",
      "Implementar sistema de gestão de frota",
      "Criar programa de melhoria contínua kaizen",
      "Desenvolver sistema de gestão de layout",
      "Implementar política de gestão de inventário",
      "Criar sistema de gestão de compras estratégicas",
      "Desenvolver programa de padronização de processos",
      "Implementar sistema de gestão de documentos",
      "Criar política de gestão de mudanças operacionais",
      "Desenvolver sistema de gestão de indicadores operacionais",
      "Implementar programa de automação industrial",
      "Criar sistema de gestão de workflows",
      "Desenvolver programa de otimização de recursos",
      "Implementar sistema de gestão de produção",
      "Criar política de gestão de ciclo de vida",
      "Desenvolver sistema de gestão de eficiência",
      "Implementar programa de gestão de desperdícios",
      "Criar sistema de gestão de processos digitais",
      "Desenvolver política de gestão sustentável",
      "Implementar sistema de gestão de operações integradas",
      "Criar programa de excelência operacional"
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
      "Desenvolver sistema de IoT empresarial",
      "Implementar solução de machine learning",
      "Criar sistema de gestão de API",
      "Desenvolver plataforma de integração",
      "Implementar sistema de blockchain",
      "Criar solução de realidade aumentada",
      "Desenvolver sistema de chatbot inteligente",
      "Implementar plataforma de colaboração digital",
      "Criar sistema de gestão de dados",
      "Desenvolver solução de cybersecurity",
      "Implementar sistema de monitoramento de rede",
      "Criar plataforma de e-learning",
      "Desenvolver sistema de gestão de dispositivos",
      "Implementar solução de disaster recovery",
      "Criar sistema de gestão de identidade digital",
      "Desenvolver plataforma de comunicação unificada",
      "Implementar sistema de análise de dados avançada",
      "Criar solução de virtualização",
      "Desenvolver sistema de gestão de conteúdo",
      "Implementar plataforma de desenvolvimento ágil",
      "Criar sistema de gestão de configuração",
      "Desenvolver solução de monitoramento empresarial",
      "Implementar sistema de gestão de mudanças de TI",
      "Criar plataforma de inovação tecnológica"
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
      "Desenvolver programa de liderança participativa",
      "Criar sistema de gestão de valores",
      "Implementar programa de comunicação assertiva",
      "Desenvolver política de feedback contínuo",
      "Criar sistema de gestão de conflitos",
      "Implementar programa de mindfulness corporativo",
      "Desenvolver política de bem-estar mental",
      "Criar sistema de gestão de diversidade",
      "Implementar programa de inovação cultural",
      "Desenvolver política de colaboração",
      "Criar sistema de gestão de talentos culturais",
      "Implementar programa de transformação cultural",
      "Desenvolver política de inclusão social",
      "Criar sistema de gestão de mudança comportamental",
      "Implementar programa de liderança inspiradora",
      "Desenvolver política de empoderamento",
      "Criar sistema de gestão de propósito organizacional",
      "Implementar programa de desenvolvimento humano",
      "Desenvolver política de felicidade no trabalho",
      "Criar sistema de gestão de energia organizacional",
      "Implementar programa de conexão emocional",
      "Desenvolver política de autenticidade corporativa",
      "Criar sistema de gestão de experiência do colaborador",
      "Implementar programa de cultura de alto desempenho"
    ]
  };

  // Função para gerar passos práticos e detalhados para cada ação
  const generateComoFazer = (acao: string, categoria: string, diasUteis: number): string[] => {
    const comoFazerMap: {[key: string]: string[]} = {
      'Implementar CRM profissional para gestão completa do funil de vendas': [
        `Dia 1: Reunir equipe comercial e mapear processo atual de vendas (9h às 12h)`,
        `Dia 2: Pesquisar 5 opções de CRM no mercado (Pipedrive, HubSpot, RD Station, etc.) e solicitar demonstrações`,
        `Dia 3: Agendar demonstrações com 3 fornecedores selecionados para próxima semana`,
        `Dia 4: Criar planilha comparativa com critérios: preço, funcionalidades, integração, suporte`,
        `Dia 5: Primeira demonstração - Pipedrive (14h às 15h30) + avaliação da equipe`,
        `Dia 8: Segunda demonstração - HubSpot (10h às 11h30) + avaliação da equipe`,
        `Dia 9: Terceira demonstração - RD Station (15h às 16h30) + avaliação da equipe`,
        `Dia 10: Reunião de decisão com equipe comercial e diretoria (16h às 17h)`,
        `Dia 11: Negociar condições e fechar contrato com CRM escolhido`,
        `Dia 12: Configurar conta e importar base de clientes existente`,
        `Dia 15: Treinamento inicial da equipe (2h de manhã)`,
        `Dia 16: Configurar funil de vendas com 5 etapas principais`,
        `Dia 17: Migrar leads ativos para o sistema novo`,
        `Dia 18: Primeira semana de uso com acompanhamento diário`,
        `Dia 19: Ajustes baseados no feedback da equipe`,
        `Dia 22: Segunda semana - uso independente com suporte`,
        `Dia 23: Configurar relatórios automáticos semanais`,
        `Dia 24: Criar template de propostas integrado`,
        `Dia 25: Treinar equipe em funcionalidades avançadas`,
        `Dia 26: Primeira reunião de resultados com dados do CRM`
      ],
      'Criar identidade visual profissional e consistente da marca': [
        `Dia 1: Briefing detalhado - definir posicionamento, valores e público-alvo (manhã toda)`,
        `Dia 2: Pesquisar 10 referências visuais do segmento e concorrentes`,
        `Dia 3: Elaborar moodboard com estilo desejado e apresentar para aprovação`,
        `Dia 4: Contratar designer freelancer ou agência (orçamento: R$ 2.500 a R$ 8.000)`,
        `Dia 5: Primeira reunião com designer - apresentar briefing e referências`,
        `Dia 8: Receber primeira proposta de logotipo (3 opções diferentes)`,
        `Dia 9: Avaliar propostas com equipe e solicitar ajustes na opção escolhida`,
        `Dia 10: Receber logotipo finalizado e solicitar variações (horizontal, vertical, símbolo)`,
        `Dia 11: Definir paleta de cores oficial (3 cores principais + 2 secundárias)`,
        `Dia 12: Escolher tipografia oficial (fonte principal + fonte secundária)`,
        `Dia 15: Receber manual de identidade visual completo (30 páginas)`,
        `Dia 16: Aplicar nova identidade no cartão de visitas e papel timbrado`,
        `Dia 17: Atualizar assinatura de e-mail de toda equipe`,
        `Dia 18: Renovar fachada e placa da empresa`,
        `Dia 19: Atualizar perfis nas redes sociais com nova identidade`,
        `Dia 22: Criar templates para apresentações PowerPoint`,
        `Dia 23: Desenvolver uniformes ou camisetas da equipe`,
        `Dia 24: Aplicar identidade em veículos da empresa`,
        `Dia 25: Treinar equipe sobre uso correto da marca`,
        `Dia 26: Primeira campanha com nova identidade visual`
      ],
      'Implementar controle rigoroso de fluxo de caixa diário': [
        `Dia 1: Abrir conta empresarial separada da pessoa física (ir ao banco manhã)`,
        `Dia 2: Instalar app de gestão financeira (GuiaBolso Empresas, Conta Azul ou similar)`,
        `Dia 3: Categorizar todas as receitas em: vendas à vista, vendas a prazo, outras receitas`,
        `Dia 4: Categorizar todas as despesas em: fixas, variáveis, impostos, investimentos`,
        `Dia 5: Criar planilha de controle diário (template disponível online)`,
        `Dia 8: Estabelecer rotina: atualizar fluxo todo dia às 8h30`,
        `Dia 9: Configurar alertas no celular para vencimentos importantes`,
        `Dia 10: Fazer projeção de 30 dias baseada no histórico`,
        `Dia 11: Definir meta de reserva de emergência (3x o custo fixo mensal)`,
        `Dia 12: Primeira semana de controle - anotar todas entradas e saídas`,
        `Dia 15: Analisar primeira semana e ajustar categorias se necessário`,
        `Dia 16: Configurar lembretes para pagamentos recorrentes`,
        `Dia 17: Criar relatório semanal simples (1 página)`,
        `Dia 18: Revisar todas as contas a pagar dos próximos 30 dias`,
        `Dia 19: Negociar prazos com fornecedores se necessário`,
        `Dia 22: Segunda semana de controle rigoroso`,
        `Dia 23: Comparar projeção vs realizado da primeira semana`,
        `Dia 24: Ajustar projeções baseado nos resultados reais`,
        `Dia 25: Definir indicador de alerta para saldo mínimo`,
        `Dia 26: Primeira reunião mensal de análise financeira`
      ]
    };

    // Se existe um mapeamento específico, usa ele
    if (comoFazerMap[acao]) {
      return comoFazerMap[acao];
    }

    // Caso contrário, gera passos genéricos baseados na categoria com datas
    const passosGenericos: {[key: string]: (diasUteis: number) => string[]} = {
      comercial: (diasUteis) => [
        `Dia 1: Reunir equipe comercial para analisar situação atual (9h às 11h)`,
        `Dia 2: Mapear processo de vendas existente e identificar gargalos`,
        `Dia 3: Pesquisar 3 melhores práticas do mercado para esta área`,
        `Dia 4: Elaborar plano de implementação detalhado com cronograma`,
        `Dia 5: Apresentar plano para aprovação da diretoria`,
        `Dia ${Math.min(8, diasUteis)}: Iniciar implementação piloto com 2 vendedores`,
        `Dia ${Math.min(9, diasUteis)}: Treinar equipe nos novos procedimentos (2h)`,
        `Dia ${Math.min(10, diasUteis)}: Primeira semana de teste - acompanhar diariamente`,
        `Dia ${Math.min(11, diasUteis)}: Coletar feedback da equipe e clientes`,
        `Dia ${Math.min(12, diasUteis)}: Fazer ajustes baseados no feedback recebido`,
        `Dia ${Math.min(15, diasUteis)}: Expandir para toda equipe comercial`,
        `Dia ${Math.min(16, diasUteis)}: Implementar sistema de métricas de acompanhamento`,
        `Dia ${Math.min(17, diasUteis)}: Primeira reunião de resultados`,
        `Dia ${Math.min(18, diasUteis)}: Documentar processo finalizado`,
        `Dia ${Math.min(19, diasUteis)}: Treinar backup para continuidade do processo`
      ],
      marketing: (diasUteis) => [
        `Dia 1: Definir personas detalhadas do público-alvo (manhã toda)`,
        `Dia 2: Pesquisar concorrentes e analisar suas estratégias`,
        `Dia 3: Estabelecer objetivos SMART específicos para esta ação`,
        `Dia 4: Criar cronograma detalhado de implementação`,
        `Dia 5: Desenvolver conceitos e materiais necessários`,
        `Dia ${Math.min(8, diasUteis)}: Configurar ferramentas e canais apropriados`,
        `Dia ${Math.min(9, diasUteis)}: Lançar campanha piloto para teste`,
        `Dia ${Math.min(10, diasUteis)}: Monitorar métricas: engajamento, alcance, conversão`,
        `Dia ${Math.min(11, diasUteis)}: Coletar dados da primeira semana`,
        `Dia ${Math.min(12, diasUteis)}: Analisar resultados e otimizar campanha`,
        `Dia ${Math.min(15, diasUteis)}: Expandir estratégia para outros canais`,
        `Dia ${Math.min(16, diasUteis)}: Implementar automações quando possível`,
        `Dia ${Math.min(17, diasUteis)}: Treinar equipe interna nos processos`,
        `Dia ${Math.min(18, diasUteis)}: Criar relatório de performance`,
        `Dia ${Math.min(19, diasUteis)}: Planejar próximos passos de escalabilidade`
      ],
      gestao: (diasUteis) => [
        `Dia 1: Mapear situação atual dos processos organizacionais`,
        `Dia 2: Identificar gaps e oportunidades de melhoria específicas`,
        `Dia 3: Envolver stakeholders no planejamento da mudança`,
        `Dia 4: Criar documentação detalhada dos novos processos`,
        `Dia 5: Definir responsabilidades e hierarquias claramente`,
        `Dia ${Math.min(8, diasUteis)}: Comunicar mudanças para toda organização`,
        `Dia ${Math.min(9, diasUteis)}: Implementar mudanças gradualmente por setores`,
        `Dia ${Math.min(10, diasUteis)}: Treinar líderes nos novos procedimentos`,
        `Dia ${Math.min(11, diasUteis)}: Estabelecer métricas de acompanhamento`,
        `Dia ${Math.min(12, diasUteis)}: Primeira semana de monitoramento intensivo`,
        `Dia ${Math.min(15, diasUteis)}: Coletar feedback de todas as áreas`,
        `Dia ${Math.min(16, diasUteis)}: Ajustar processos conforme necessário`,
        `Dia ${Math.min(17, diasUteis)}: Implementar sistema de monitoramento contínuo`,
        `Dia ${Math.min(18, diasUteis)}: Treinar multiplicadores internos`,
        `Dia ${Math.min(19, diasUteis)}: Primeira avaliação formal de resultados`
      ],
      financeiro: (diasUteis) => [
        `Dia 1: Fazer auditoria completa da situação financeira atual`,
        `Dia 2: Organizar e categorizar todas as informações financeiras`,
        `Dia 3: Escolher ferramentas adequadas de controle (software/planilhas)`,
        `Dia 4: Estabelecer políticas e procedimentos financeiros claros`,
        `Dia 5: Separar definitivamente contas pessoais das empresariais`,
        `Dia ${Math.min(8, diasUteis)}: Treinar responsável pelo controle financeiro`,
        `Dia ${Math.min(9, diasUteis)}: Implementar controles e verificações diárias`,
        `Dia ${Math.min(10, diasUteis)}: Criar rotinas de monitoramento (manhã e tarde)`,
        `Dia ${Math.min(11, diasUteis)}: Desenvolver relatórios gerenciais semanais`,
        `Dia ${Math.min(12, diasUteis)}: Primeira semana de controle rigoroso`,
        `Dia ${Math.min(15, diasUteis)}: Analisar primeiros resultados e tendências`,
        `Dia ${Math.min(16, diasUteis)}: Ajustar processos baseado na experiência`,
        `Dia ${Math.min(17, diasUteis)}: Implementar alertas automáticos importantes`,
        `Dia ${Math.min(18, diasUteis)}: Criar backup e segurança dos dados`,
        `Dia ${Math.min(19, diasUteis)}: Primeira reunião mensal de análise financeira`
      ],
      rh: (diasUteis) => [
        `Dia 1: Avaliar situação atual da gestão de pessoas`,
        `Dia 2: Pesquisar melhores práticas de RH para empresas similares`,
        `Dia 3: Definir políticas claras e transparentes`,
        `Dia 4: Desenvolver documentação e procedimentos padronizados`,
        `Dia 5: Reunir líderes para alinhamento da nova política`,
        `Dia ${Math.min(8, diasUteis)}: Comunicar mudanças para toda equipe`,
        `Dia ${Math.min(9, diasUteis)}: Treinar líderes e gestores envolvidos`,
        `Dia ${Math.min(10, diasUteis)}: Implementar processo piloto em um setor`,
        `Dia ${Math.min(11, diasUteis)}: Coletar feedback da equipe sobre mudanças`,
        `Dia ${Math.min(12, diasUteis)}: Ajustar políticas baseado no feedback`,
        `Dia ${Math.min(15, diasUteis)}: Expandir implementação para toda empresa`,
        `Dia ${Math.min(16, diasUteis)}: Criar sistema de acompanhamento e métricas`,
        `Dia ${Math.min(17, diasUteis)}: Implementar canal de feedback contínuo`,
        `Dia ${Math.min(18, diasUteis)}: Monitorar satisfação e engagement da equipe`,
        `Dia ${Math.min(19, diasUteis)}: Primeira avaliação formal dos resultados`
      ],
      operacional: (diasUteis) => [
        `Dia 1: Mapear todos os processos operacionais atuais`,
        `Dia 2: Identificar gargalos, desperdícios e ineficiências`,
        `Dia 3: Pesquisar soluções e melhores práticas do setor`,
        `Dia 4: Desenvolver soluções específicas para cada problema`,
        `Dia 5: Criar documentação padronizada dos novos processos`,
        `Dia ${Math.min(8, diasUteis)}: Treinar equipe operacional nas mudanças`,
        `Dia ${Math.min(9, diasUteis)}: Implementar mudanças gradualmente por área`,
        `Dia ${Math.min(10, diasUteis)}: Monitorar impacto na produtividade diariamente`,
        `Dia ${Math.min(11, diasUteis)}: Coletar feedback da equipe operacional`,
        `Dia ${Math.min(12, diasUteis)}: Ajustar processos conforme necessário`,
        `Dia ${Math.min(15, diasUteis)}: Implementar controles de qualidade`,
        `Dia ${Math.min(16, diasUteis)}: Estabelecer métricas de performance`,
        `Dia ${Math.min(17, diasUteis)}: Treinar supervisores no novo processo`,
        `Dia ${Math.min(18, diasUteis)}: Implementar sistema de melhoria contínua`,
        `Dia ${Math.min(19, diasUteis)}: Primeira avaliação de eficiência`
      ],
      tecnologia: (diasUteis) => [
        `Dia 1: Avaliar necessidades tecnológicas atuais da empresa`,
        `Dia 2: Pesquisar 3 soluções adequadas ao orçamento disponível`,
        `Dia 3: Solicitar demonstrações e testes piloto`,
        `Dia 4: Fazer análise custo-benefício de cada opção`,
        `Dia 5: Escolher solução e negociar condições de implementação`,
        `Dia ${Math.min(8, diasUteis)}: Planejar implementação e migração de dados`,
        `Dia ${Math.min(9, diasUteis)}: Treinar usuários nas novas ferramentas`,
        `Dia ${Math.min(10, diasUteis)}: Implementar com suporte técnico especializado`,
        `Dia ${Math.min(11, diasUteis)}: Configurar backup e segurança adequados`,
        `Dia ${Math.min(12, diasUteis)}: Primeira semana de uso com acompanhamento`,
        `Dia ${Math.min(15, diasUteis)}: Monitorar performance e estabilidade`,
        `Dia ${Math.min(16, diasUteis)}: Otimizar configurações conforme uso real`,
        `Dia ${Math.min(17, diasUteis)}: Treinar equipe em funcionalidades avançadas`,
        `Dia ${Math.min(18, diasUteis)}: Implementar rotinas de manutenção`,
        `Dia ${Math.min(19, diasUteis)}: Primeira avaliação de ROI tecnológico`
      ],
      cultura: (diasUteis) => [
        `Dia 1: Avaliar cultura organizacional atual através de pesquisa`,
        `Dia 2: Definir valores e comportamentos desejados para empresa`,
        `Dia 3: Envolver liderança no processo de mudança cultural`,
        `Dia 4: Criar plano de comunicação transparente das mudanças`,
        `Dia 5: Desenvolver programa de engajamento da equipe`,
        `Dia ${Math.min(8, diasUteis)}: Comunicar nova cultura para toda organização`,
        `Dia ${Math.min(9, diasUteis)}: Implementar ações de forma consistente`,
        `Dia ${Math.min(10, diasUteis)}: Reconhecer comportamentos alinhados aos valores`,
        `Dia ${Math.min(11, diasUteis)}: Criar rituais e tradições que reforcem cultura`,
        `Dia ${Math.min(12, diasUteis)}: Primeira semana de observação comportamental`,
        `Dia ${Math.min(15, diasUteis)}: Medir clima e satisfação regularmente`,
        `Dia ${Math.min(16, diasUteis)}: Ajustar abordagem baseado no feedback`,
        `Dia ${Math.min(17, diasUteis)}: Treinar líderes como embaixadores da cultura`,
        `Dia ${Math.min(18, diasUteis)}: Implementar sistema de feedback cultural`,
        `Dia ${Math.min(19, diasUteis)}: Primeira avaliação de mudança cultural`
      ]
    };

    return passosGenericos[categoria] ? passosGenericos[categoria](diasUteis) : passosGenericos.gestao(diasUteis);
  };

  // Gerar ações de sucesso do cliente específicas
  const acoesSuccessCliente = [
    "Cliente aumentou faturamento em 40% após implementação do CRM",
    "Empresa reduziu 60% do tempo gasto em relatórios financeiros",
    "Equipe de vendas aumentou produtividade em 35% com novo processo",
    "Redução de 50% nas reclamações de clientes após melhoria operacional",
    "Aumento de 45% na retenção de funcionários com novas políticas de RH",
    "Empresa economizou R$ 15.000/mês com otimização de processos",
    "Tempo de resposta ao cliente melhorou 70% com nova tecnologia",
    "Margem de lucro aumentou 25% com controle financeiro rigoroso",
    "Produtividade da equipe cresceu 30% com treinamento adequado",
    "Empresa conquistou 60% mais clientes com nova estratégia de marketing"
  ];

  // Gerar ações sem limite - usar todas as ações disponíveis
  let contadorAcoesSuccesso = 0;
  
  for (let catIndex = 0; catIndex < categorias.length; catIndex++) {
    const categoria = categorias[catIndex];
    const templates = actionTemplates[categoria];
    
    for (let acaoIndex = 0; acaoIndex < templates.length; acaoIndex++) {
      const acaoTemplate = templates[acaoIndex];
      
      // Calcular prioridade baseada na posição
      let prioridade: ActionItem['prioridade'] = 'media';
      if (acaoIndex < 15) prioridade = 'alta';
      else if (acaoIndex >= 35) prioridade = 'baixa';

      // Calcular semanas de forma mais distribuída
      const totalActionsSoFar = (catIndex * templates.length) + acaoIndex;
      const semanas = Math.floor(totalActionsSoFar / 15) + 1; // Mais ações por semana
      const diasUteis = semanas * 5; // 5 dias úteis por semana
      
      // Calcular data de vencimento em dias úteis
      const dataVencimento = calcularDataUtil(diasUteis);

      const action: ActionItem = {
        id: `action_${actionId++}`,
        acao: acaoTemplate,
        categoria,
        prioridade,
        prazo: `${semanas} semana${semanas > 1 ? 's' : ''}`,
        responsavel: categoria === 'gestao' ? 'Diretor Geral' : 
                    categoria === 'comercial' ? 'Gestor Comercial' :
                    categoria === 'marketing' ? 'Gestor de Marketing' :
                    categoria === 'financeiro' ? 'Gestor Financeiro' :
                    categoria === 'rh' ? 'Gestor de RH' :
                    categoria === 'operacional' ? 'Gestor Operacional' :
                    categoria === 'tecnologia' ? 'Responsável de TI' :
                    'Gestor de Cultura e Pessoas',
        recursos: categoria === 'tecnologia' ? 'Software especializado (R$ 200-800/mês), treinamento técnico (R$ 1.500), consultoria externa (R$ 3.000)' :
                 categoria === 'financeiro' ? 'Sistema financeiro (R$ 100-400/mês), tempo para análise (20h/semana), consultoria contábil (R$ 2.000)' :
                 categoria === 'marketing' ? 'Ferramentas de design (R$ 300/mês), orçamento para campanhas (R$ 2.000-5.000), criação de conteúdo (R$ 1.500)' :
                 categoria === 'rh' ? 'Tempo da equipe (15h/semana), ferramentas de RH (R$ 150-500/mês), treinamento especializado (R$ 2.500)' :
                 'Tempo da equipe (10-20h/semana), ferramentas adequadas (R$ 200-600/mês), materiais de apoio (R$ 500-1.200)',
        metricas: categoria === 'comercial' ? 'Aumento de 15-30% nas vendas em 60 dias, melhoria de 25% na conversão de leads' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos em 90 dias, controle 100% atualizado diariamente' :
                 categoria === 'rh' ? 'Redução de 30% no turnover em 6 meses, melhoria de 40% no clima organizacional' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento em 30 dias, 50% mais leads qualificados' :
                 categoria === 'tecnologia' ? 'Aumento de 35% na eficiência operacional, redução de 60% em erros manuais' :
                 'Melhoria mensurável de 20-40% no indicador específico da área em 90 dias',
        beneficios: categoria === 'gestao' ? 'Maior organização e eficiência, decisões 50% mais rápidas, controle total dos processos' :
                   categoria === 'comercial' ? 'Aumento sustentável das vendas, fidelização de 80%+ dos clientes, previsibilidade de receita' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca (+200% alcance), autoridade no mercado, lead generation automatizada' :
                   categoria === 'financeiro' ? 'Controle total das finanças, previsibilidade de fluxo, redução de desperdícios financeiros' :
                   categoria === 'rh' ? 'Equipe 40% mais engajada, produtividade aumentada, cultura organizacional forte' :
                   categoria === 'operacional' ? 'Processos 30% mais eficientes, menor retrabalho, custos otimizados' :
                   categoria === 'tecnologia' ? 'Competitividade digital, eficiência 50% maior, escalabilidade garantida' :
                   'Cultura organizacional sólida, propósito claro, sustentabilidade a longo prazo',
        dataVencimento,
        concluida: false,
        detalhesImplementacao: `Implementar ${acaoTemplate.toLowerCase()} seguindo metodologia comprovada com acompanhamento semanal de resultados`,
        dicaIA: `⭐ SUCESSO REAL: ${acoesSuccessCliente[contadorAcoesSuccesso % acoesSuccessCliente.length]}. Esta ação deve ser implementada com foco em resultados mensuráveis. Comece mapeando a situação atual, defina objetivos específicos SMART, envolva a equipe no processo e monitore resultados semanalmente para ajustar conforme necessário.`,
        status: 'pendente',
        semana: semanas,
        comoFazer: generateComoFazer(acaoTemplate, categoria, diasUteis),
        completedSteps: []
      };

      actions.push(action);
      contadorAcoesSuccesso++;
    }
  }

  // Personalizar algumas ações baseadas nos dados do diagnóstico
  if (diagnosticData.problemasComerciais && actions.length > 5) {
    const diasProblemaComercial = calcularDataUtil(7); // 1 semana em dias úteis
    actions[5].acao = `URGENTE: Resolver ${diagnosticData.problemasComerciais.substring(0, 80)}...`;
    actions[5].prioridade = 'alta';
    actions[5].dataVencimento = diasProblemaComercial;
    actions[5].comoFazer = [
      'Dia 1: Reunião de emergência comercial às 9h para analisar o problema',
      'Dia 2: Mapear todos os impactos no faturamento e clientes afetados',
      'Dia 3: Desenvolver 3 soluções viáveis com prazos e custos',
      'Dia 4: Apresentar soluções para diretoria e escolher a melhor',
      'Dia 5: Implementar solução escolhida com toda equipe mobilizada',
      'Dia 8: Monitorar primeiros resultados e ajustar se necessário',
      'Dia 9: Comunicar progresso para clientes afetados',
      'Dia 10: Treinar equipe para evitar recorrência do problema',
      'Dia 11: Criar procedimentos preventivos documentados',
      'Dia 12: Estabelecer métricas de acompanhamento contínuo'
    ];
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 15) {
    const diasProblemaFinanceiro = calcularDataUtil(10); // 2 semanas em dias úteis
    actions[15].acao = `CRÍTICO: Implementar controle financeiro para ${diagnosticData.problemasFinanceiros.substring(0, 80)}...`;
    actions[15].prioridade = 'alta';
    actions[15].dataVencimento = diasProblemaFinanceiro;
    actions[15].comoFazer = [
      'Dia 1: Auditoria financeira de emergência - levantar tudo até 18h',
      'Dia 2: Separar contas pessoais das empresariais imediatamente',
      'Dia 3: Implementar controle diário de entradas e saídas',
      'Dia 4: Negociar prazos de emergência com fornecedores principais',
      'Dia 5: Criar plano de recuperação financeira de 30-60-90 dias',
      'Dia 8: Estabelecer cortes imediatos de gastos não essenciais',
      'Dia 9: Buscar fontes alternativas de receita para esta semana',
      'Dia 10: Monitorar fluxo de caixa 3x por dia (manhã, tarde, noite)',
      'Dia 11: Reunião diária de 15min sobre situação financeira',
      'Dia 12: Primeira avaliação de progresso e ajustes necessários'
    ];
  }

  console.log(`✅ Geradas ${actions.length} ações detalhadas para o programa de aceleração empresarial`);
  return actions;
};
