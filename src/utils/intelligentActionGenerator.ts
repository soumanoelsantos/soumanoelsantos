
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
}

export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData, 
  integratedData: IntegratedData
): ActionItem[] => {
  const actions: ActionItem[] = [];
  let actionId = 1;

  // Análise dos dados integrados para personalizar ações
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

  // SEMANA 1-2: Diagnóstico e Fundamentos
  if (!hasSwotData) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Realizar Análise SWOT completa da empresa usando a ferramenta disponível',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '7 dias',
      responsavel: 'Diretor/Sócio',
      recursos: 'Ferramenta SWOT da plataforma, tempo para análise estratégica',
      metricas: 'Análise SWOT completa com pelo menos 3 itens em cada quadrante',
      beneficios: 'Visão estratégica clara dos pontos fortes, fracos, oportunidades e ameaças',
      dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Acesse a ferramenta SWOT na plataforma e preencha todos os quadrantes com análise detalhada'
    });
  } else {
    // Se já tem SWOT, usar os dados para ações específicas
    const weaknesses = integratedData.swot.weaknesses?.filter((w: any) => w.text?.trim()) || [];
    if (weaknesses.length > 0) {
      actions.push({
        id: `action_${actionId++}`,
        acao: `Implementar plano de melhoria baseado nas fraquezas identificadas na SWOT: ${weaknesses[0]?.text}`,
        categoria: 'gestao',
        prioridade: 'alta',
        prazo: '14 dias',
        responsavel: 'Gestor Responsável',
        recursos: 'Plano de ação específico, recursos para implementação',
        metricas: 'Melhoria mensurável na área identificada como fraqueza',
        beneficios: 'Redução dos pontos fracos identificados na análise estratégica',
        dataVencimento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Criar plano específico para resolver a principal fraqueza identificada'
      });
    }
  }

  if (!hasBusinessMap) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Mapear modelo de negócio completo usando Business Model Canvas',
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '10 dias',
      responsavel: 'Diretor/Sócio',
      recursos: 'Ferramenta Mapa do Negócio da plataforma',
      metricas: 'Canvas completo com todos os 9 blocos preenchidos',
      beneficios: 'Clareza sobre modelo de negócio e identificação de oportunidades',
      dataVencimento: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Use a ferramenta disponível na plataforma para mapear completamente seu modelo de negócio'
    });
  }

  // SEMANA 3-4: Proposta de Valor e Pessoas
  if (!hasPuvData) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Desenvolver Proposta Única de Valor usando a ferramenta Canvas PUV',
      categoria: 'marketing',
      prioridade: 'alta',
      prazo: '14 dias',
      responsavel: 'Gestor Comercial/Marketing',
      recursos: 'Ferramenta PUV da plataforma, análise do cliente',
      metricas: 'Proposta de valor clara e diferenciada definida',
      beneficios: 'Maior clareza na comunicação de valor e diferenciação no mercado',
      dataVencimento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Complete o Canvas de Proposta Única de Valor na plataforma'
    });
  }

  if (!hasMapaEquipe) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Mapear perfil comportamental de toda a equipe usando Mapa da Equipe',
      categoria: 'rh',
      prioridade: 'media',
      prazo: '21 dias',
      responsavel: 'Gestor de RH',
      recursos: 'Ferramenta Mapa da Equipe da plataforma',
      metricas: '100% da equipe mapeada com perfis comportamentais',
      beneficios: 'Gestão de pessoas mais eficaz baseada em dados comportamentais',
      dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Use a ferramenta de Mapa da Equipe para avaliar cada colaborador'
    });
  } else {
    // Se já tem mapa da equipe, usar dados para ações específicas
    const colaboradores = integratedData.mapaEquipe.colaboradores || [];
    const colaboradoresComBaixoPotencial = colaboradores.filter((c: any) => 
      c.potencial === 'Stand by' || c.nivelMaturidade === 'M1 (Bebê)'
    );
    
    if (colaboradoresComBaixoPotencial.length > 0) {
      actions.push({
        id: `action_${actionId++}`,
        acao: `Implementar plano de desenvolvimento para colaboradores com baixo potencial identificados`,
        categoria: 'rh',
        prioridade: 'media',
        prazo: '28 dias',
        responsavel: 'Gestor de RH',
        recursos: 'Programas de treinamento, mentoria',
        metricas: 'Melhoria no desempenho dos colaboradores identificados',
        beneficios: 'Desenvolvimento da equipe e melhor aproveitamento do potencial humano',
        dataVencimento: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        concluida: false,
        detalhesImplementacao: 'Criar plano específico para desenvolver colaboradores com potencial limitado'
      });
    }
  }

  // SEMANA 5-6: Processos Comerciais
  if (diagnosticData.problemasComerciais) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Implementar CRM e funil de vendas estruturado',
      categoria: 'comercial',
      prioridade: 'alta',
      prazo: '35 dias',
      responsavel: 'Gestor Comercial',
      recursos: 'Sistema CRM, treinamento da equipe comercial',
      metricas: '20% de melhoria na conversão de vendas',
      beneficios: 'Maior previsibilidade e controle do processo comercial',
      dataVencimento: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Escolher e implementar CRM adequado ao tamanho da empresa'
    });
  }

  // SEMANA 7-8: Gestão Financeira
  if (diagnosticData.problemasFinanceiros) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Implementar controle de fluxo de caixa diário e separação PJ/PF',
      categoria: 'financeiro',
      prioridade: 'alta',
      prazo: '42 dias',
      responsavel: 'Gestor Financeiro',
      recursos: 'Sistema financeiro, conta PJ separada',
      metricas: 'Controle diário 100% atualizado e contas separadas',
      beneficios: 'Maior controle financeiro e profissionalização da gestão',
      dataVencimento: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Abrir conta PJ e implementar rotina de controle financeiro diário'
    });
  }

  // SEMANA 9-10: Marketing e Presença Digital
  if (diagnosticData.problemasMarketing) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Criar estratégia de marketing digital e presença online',
      categoria: 'marketing',
      prioridade: 'media',
      prazo: '49 dias',
      responsavel: 'Gestor de Marketing',
      recursos: 'Criação de conteúdo, redes sociais, site',
      metricas: '3 posts por semana e 500 seguidores em 60 dias',
      beneficios: 'Maior visibilidade da marca e geração de leads',
      dataVencimento: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Definir estratégia de conteúdo e calendário editorial'
    });
  }

  // SEMANA 11-12: Processos Operacionais
  if (diagnosticData.problemasOperacionais) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Padronizar processos operacionais principais',
      categoria: 'operacional',
      prioridade: 'alta',
      prazo: '56 dias',
      responsavel: 'Gestor Operacional',
      recursos: 'Documentação de processos, treinamentos',
      metricas: '100% dos processos críticos documentados',
      beneficios: 'Redução de erros e maior consistência na entrega',
      dataVencimento: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Mapear, documentar e treinar equipe nos processos essenciais'
    });
  }

  // SEMANA 13-14: Gestão de Pessoas
  if (diagnosticData.problemasRH) {
    actions.push({
      id: `action_${actionId++}`,
      acao: 'Implementar sistema de avaliação de desempenho e feedback',
      categoria: 'rh',
      prioridade: 'media',
      prazo: '63 dias',
      responsavel: 'Gestor de RH',
      recursos: 'Sistema de avaliação, treinamento de gestores',
      metricas: '100% da equipe avaliada trimestralmente',
      beneficios: 'Melhoria no desempenho e motivação da equipe',
      dataVencimento: new Date(Date.now() + 63 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Criar formulários e estabelecer rotina de avaliações'
    });
  }

  // SEMANA 15-16: Cultura e Valores
  actions.push({
    id: `action_${actionId++}`,
    acao: 'Definir e implementar valores e cultura organizacional',
    categoria: 'gestao',
    prioridade: 'media',
    prazo: '70 dias',
    responsavel: 'Diretor/Sócio',
    recursos: 'Workshops com equipe, consultoria em cultura',
    metricas: 'Valores definidos e comunicados para 100% da equipe',
    beneficios: 'Maior alinhamento e engajamento da equipe',
    dataVencimento: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
    concluida: false,
    detalhesImplementacao: 'Realizar workshops participativos para definir valores'
  });

  // SEMANA 17-18: Inovação e Melhoria Contínua
  actions.push({
    id: `action_${actionId++}`,
    acao: 'Implementar programa de inovação e melhoria contínua',
    categoria: 'gestao',
    prioridade: 'baixa',
    prazo: '77 dias',
    responsavel: 'Gestor de Inovação',
    recursos: 'Sistema de sugestões, reuniões de brainstorming',
    metricas: '10 ideias implementadas por trimestre',
    beneficios: 'Melhoria contínua e engajamento da equipe',
    dataVencimento: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000),
    concluida: false,
    detalhesImplementacao: 'Criar caixa de sugestões e processo de avaliação de ideias'
  });

  // SEMANA 19-20: Métricas e Indicadores
  actions.push({
    id: `action_${actionId++}`,
    acao: 'Implementar dashboard de KPIs e métricas principais',
    categoria: 'gestao',
    prioridade: 'alta',
    prazo: '84 dias',
    responsavel: 'Gestor Geral',
    recursos: 'Software de BI, dashboard personalizado',
    metricas: '15 KPIs principais acompanhados semanalmente',
    beneficios: 'Tomada de decisão baseada em dados',
    dataVencimento: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000),
    concluida: false,
    detalhesImplementacao: 'Definir KPIs críticos e criar dashboard de acompanhamento'
  });

  // SEMANA 21-22: Automação e Tecnologia
  actions.push({
    id: `action_${actionId++}`,
    acao: 'Automatizar processos repetitivos com ferramentas digitais',
    categoria: 'operacional',
    prioridade: 'media',
    prazo: '91 dias',
    responsavel: 'Responsável por Tecnologia',
    recursos: 'Ferramentas de automação, integração de sistemas',
    metricas: '5 processos automatizados, 20% economia de tempo',
    beneficios: 'Maior eficiência e redução de erros manuais',
    dataVencimento: new Date(Date.now() + 91 * 24 * 60 * 60 * 1000),
    concluida: false,
    detalhesImplementacao: 'Identificar processos repetitivos e implementar automações'
  });

  // SEMANA 23-24: Expansão e Crescimento
  actions.push({
    id: `action_${actionId++}`,
    acao: 'Desenvolver plano de expansão e crescimento sustentável',
    categoria: 'gestao',
    prioridade: 'media',
    prazo: '98 dias',
    responsavel: 'Diretor Geral',
    recursos: 'Análise de mercado, plano de investimentos',
    metricas: 'Plano de expansão validado e aprovado',
    beneficios: 'Crescimento estruturado e sustentável',
    dataVencimento: new Date(Date.now() + 98 * 24 * 60 * 60 * 1000),
    concluida: false,
    detalhesImplementacao: 'Analisar oportunidades de mercado e criar plano de expansão'
  });

  // Adicionar mais ações baseadas nos objetivos específicos
  if (diagnosticData.objetivos6Meses) {
    actions.push({
      id: `action_${actionId++}`,
      acao: `Implementar estratégias específicas para atingir objetivo: ${diagnosticData.objetivos6Meses.substring(0, 50)}...`,
      categoria: 'gestao',
      prioridade: 'alta',
      prazo: '105 dias',
      responsavel: 'Diretor Geral',
      recursos: 'Recursos específicos para o objetivo',
      metricas: 'Progresso mensurável em direção ao objetivo definido',
      beneficios: 'Alcance dos objetivos estratégicos definidos',
      dataVencimento: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Quebrar objetivo em metas menores e executar sistematicamente'
    });
  }

  // Completar até 24 ações (uma por semana)
  while (actions.length < 24) {
    const remainingWeeks = 24 - actions.length;
    const daysFromNow = (actions.length + 1) * 7;
    
    actions.push({
      id: `action_${actionId++}`,
      acao: `Revisar e ajustar estratégias implementadas - Semana ${actions.length + 1}`,
      categoria: 'gestao',
      prioridade: 'baixa',
      prazo: '7 dias',
      responsavel: 'Gestor Responsável',
      recursos: 'Tempo para análise e ajustes',
      metricas: 'Relatório de progresso e ajustes implementados',
      beneficios: 'Melhoria contínua e otimização das estratégias',
      dataVencimento: new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000),
      concluida: false,
      detalhesImplementacao: 'Analisar resultados e fazer ajustes necessários'
    });
  }

  return actions;
};
