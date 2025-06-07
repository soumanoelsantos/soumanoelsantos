
import { PlanoAcao } from '@/types/planejamentoEstrategico';

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

export const useActionPlanGenerator = () => {
  const gerarPlanoAcao = (resultados: DiagnosticoResultados): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    
    // Ações baseadas em áreas com baixa performance (menos de 70%)
    Object.entries(resultados).forEach(([area, dados]) => {
      if (dados.percentage < 70) {
        switch (area) {
          case 'comercial':
            acoes.push({
              id: `acao_comercial_${Date.now()}`,
              acao: 'Estruturar processo de vendas com etapas definidas e indicadores',
              categoria: 'Comercial',
              prazo: '60 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'Diretor Comercial',
              recursos: 'Sistema CRM, treinamento equipe',
              metricas: 'Taxa de conversão, ticket médio, tempo de ciclo',
              tipo: 'estrategica'
            });
            break;
            
          case 'gestao':
            acoes.push({
              id: `acao_gestao_${Date.now()}`,
              acao: 'Implementar reuniões semanais de acompanhamento com indicadores',
              categoria: 'Gestão',
              prazo: '30 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Diretor Geral',
              recursos: 'Dashboard de indicadores, agenda estruturada',
              metricas: 'Número de reuniões realizadas, ações acompanhadas',
              tipo: 'estrategica'
            });
            break;
            
          case 'rh':
            acoes.push({
              id: `acao_rh_${Date.now()}`,
              acao: 'Criar programa de desenvolvimento e capacitação da equipe',
              categoria: 'Recursos Humanos',
              prazo: '90 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              responsavel: 'Gestor de RH',
              recursos: 'Plataforma de treinamento, avaliação de competências',
              metricas: 'Horas de treinamento, satisfação dos funcionários',
              tipo: 'estrategica'
            });
            break;
            
          case 'marketing':
            acoes.push({
              id: `acao_marketing_${Date.now()}`,
              acao: 'Desenvolver estratégia de marketing digital e geração de leads',
              categoria: 'Marketing',
              prazo: '45 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Gerente de Marketing',
              recursos: 'Ferramentas de automação, criação de conteúdo',
              metricas: 'Leads qualificados, taxa de conversão de leads',
              tipo: 'estrategica'
            });
            break;
            
          case 'financeiro':
            acoes.push({
              id: `acao_financeiro_${Date.now()}`,
              acao: 'Implementar controle financeiro com fluxo de caixa e DRE mensal',
              categoria: 'Financeiro',
              prazo: '30 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Controller/CFO',
              recursos: 'Sistema ERP, consultoria contábil',
              metricas: 'Margem de lucro, fluxo de caixa projetado vs real',
              tipo: 'estrategica'
            });
            break;
            
          case 'cliente':
            acoes.push({
              id: `acao_cliente_${Date.now()}`,
              acao: 'Criar programa de relacionamento e fidelização de clientes',
              categoria: 'Relacionamento com Cliente',
              prazo: '60 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'Gerente de Relacionamento',
              recursos: 'CRM, pesquisa de satisfação, programa de benefícios',
              metricas: 'NPS, taxa de retenção, lifetime value',
              tipo: 'estrategica'
            });
            break;
            
          case 'sistema':
            acoes.push({
              id: `acao_sistema_${Date.now()}`,
              acao: 'Mapear e documentar processos principais da empresa',
              categoria: 'Sistemas e Processos',
              prazo: '90 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Processos',
              recursos: 'Software de mapeamento, consultoria em processos',
              metricas: 'Processos documentados, redução de retrabalho',
              tipo: 'implementacao'
            });
            break;
        }
      }
    });
    
    // Ações estratégicas gerais sempre incluídas
    acoes.push(
      {
        id: `acao_planejamento_${Date.now()}`,
        acao: 'Elaborar planejamento estratégico anual com metas SMART',
        categoria: 'Estratégia',
        prazo: '45 dias',
        prioridade: 'alta',
        concluida: false,
        dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor Geral',
        recursos: 'Consultoria estratégica, análise de mercado',
        metricas: 'Metas definidas, plano de ação detalhado',
        tipo: 'estrategica'
      },
      {
        id: `acao_indicadores_${Date.now()}`,
        acao: 'Implementar dashboard de indicadores estratégicos (KPIs)',
        categoria: 'Gestão',
        prazo: '60 dias',
        prioridade: 'alta',
        concluida: false,
        dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        responsavel: 'Analista de BI',
        recursos: 'Ferramentas de BI, integração de sistemas',
        metricas: 'Indicadores monitorados, frequência de atualizações',
        tipo: 'implementacao'
      }
    );
    
    return acoes;
  };

  return { gerarPlanoAcao };
};
