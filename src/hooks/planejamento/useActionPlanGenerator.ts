
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
  const getAcaoParaArea = (area: string, percentage: number): string => {
    const acoesPorArea = {
      comercial: percentage < 40 
        ? 'Implementar processo estruturado de vendas com pipeline definido'
        : 'Otimizar processo de vendas existente e implementar métricas de acompanhamento',
      gestao: percentage < 40
        ? 'Documentar e padronizar os principais processos do negócio'
        : 'Implementar sistema de indicadores e métricas de performance',
      rh: percentage < 40
        ? 'Estruturar processo de recrutamento e programa de capacitação'
        : 'Implementar sistema de feedback e plano de desenvolvimento',
      marketing: percentage < 40
        ? 'Desenvolver estratégia de marketing digital e presença online'
        : 'Otimizar campanhas existentes e implementar funil de leads',
      financeiro: percentage < 40
        ? 'Implementar controle financeiro detalhado e fluxo de caixa'
        : 'Desenvolver planejamento financeiro e análise de margem',
      cliente: percentage < 40
        ? 'Estruturar processo de atendimento e pesquisa de satisfação'
        : 'Implementar programa de fidelização e pós-venda',
      sistema: percentage < 40
        ? 'Implementar planejamento estratégico e sistema de gestão'
        : 'Otimizar sistemas existentes e focar em atividades estratégicas'
    };
    
    return acoesPorArea[area as keyof typeof acoesPorArea] || 'Ação de melhoria';
  };

  const getResponsavelParaArea = (area: string): string => {
    const responsaveis = {
      comercial: 'Gerente Comercial/CEO',
      gestao: 'CEO/Diretor Operacional',
      rh: 'Responsável RH/CEO',
      marketing: 'Responsável Marketing',
      financeiro: 'CFO/Contador',
      cliente: 'Gerente de Relacionamento',
      sistema: 'CEO/CTO'
    };
    
    return responsaveis[area as keyof typeof responsaveis] || 'CEO';
  };

  const getRecursosParaArea = (area: string): string => {
    const recursos = {
      comercial: 'CRM, treinamento de vendas, material comercial',
      gestao: 'Software de gestão, consultoria especializada',
      rh: 'Plataforma de RH, treinamentos, assessoria jurídica',
      marketing: 'Ferramentas digitais, criação de conteúdo, anúncios',
      financeiro: 'Software financeiro, consultoria contábil',
      cliente: 'Sistema de atendimento, pesquisas, programa de relacionamento',
      sistema: 'ERP, consultoria estratégica, ferramentas de gestão'
    };
    
    return recursos[area as keyof typeof recursos] || 'Recursos diversos';
  };

  const getMetricasParaArea = (area: string): string => {
    const metricas = {
      comercial: 'Taxa de conversão, ticket médio, ciclo de vendas',
      gestao: 'Cumprimento de processos, indicadores de qualidade',
      rh: 'Turnover, satisfação da equipe, produtividade',
      marketing: 'Leads gerados, CAC, ROI de campanhas',
      financeiro: 'Margem de lucro, fluxo de caixa, inadimplência',
      cliente: 'NPS, taxa de retenção, satisfação do cliente',
      sistema: 'Cumprimento de metas, eficiência operacional'
    };
    
    return metricas[area as keyof typeof metricas] || 'Métricas de performance';
  };

  const gerarPlanoAcao = (resultados: DiagnosticoResultados): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    const hoje = new Date();

    const areas = ['comercial', 'gestao', 'rh', 'marketing', 'financeiro', 'cliente', 'sistema'];
    
    areas.forEach((area, index) => {
      const resultado = resultados[area as keyof DiagnosticoResultados];
      if (resultado.percentage < 60) {
        const dataVencimento = new Date(hoje);
        dataVencimento.setDate(hoje.getDate() + (index * 30));
        
        const acao: PlanoAcao = {
          id: `acao_${area}_${Date.now()}`,
          acao: getAcaoParaArea(area, resultado.percentage),
          categoria: area.charAt(0).toUpperCase() + area.slice(1),
          prazo: '30 dias',
          prioridade: resultado.percentage < 40 ? 'alta' : 'media',
          concluida: false,
          dataVencimento,
          responsavel: getResponsavelParaArea(area),
          recursos: getRecursosParaArea(area),
          metricas: getMetricasParaArea(area),
          tipo: 'estrategica'
        };
        
        acoes.push(acao);
      }
    });

    return acoes;
  };

  return { gerarPlanoAcao };
};
