
import { Priority, Status, ActionCategory } from './types';

export const getPriorityByScore = (score: number): Priority => {
  if (score <= 3) return 'alta';
  if (score <= 6) return 'media';
  return 'baixa';
};

export const getStatusByPriority = (priority: Priority): Status => {
  return 'pendente';
};

export const getTimeframeByPriority = (priority: Priority): string => {
  switch (priority) {
    case 'alta': return '2 semanas';
    case 'media': return '1 mês';
    case 'baixa': return '2 meses';
    default: return '1 mês';
  }
};

export const getResourcesByCategory = (category: string): string => {
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

export const getMetricsByCategory = (category: string): string => {
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

export const getBenefitsByCategory = (category: string): string => {
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

export const generateSteps = (action: string, category: string): string[] => {
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

export const generateAITip = (action: string, category: string): string => {
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
