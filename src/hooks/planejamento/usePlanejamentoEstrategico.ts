
import { useState } from 'react';
import { RespostaPlanejamento, PlanejamentoEstrategicoData, PlanoAcao, AcaoComercialSemanal } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

export const usePlanejamentoEstrategico = () => {
  const [etapa, setEtapa] = useState<'formulario' | 'resultado'>('formulario');
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [gerandoPlano, setGerandoPlano] = useState(false);
  const { toast } = useToast();

  const gerarPlanoAcao = (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    const hoje = new Date();

    // Gerar ações baseadas nas dores identificadas e pontuações baixas
    const areas = ['comercial', 'gestao', 'rh', 'marketing', 'financeiro', 'cliente', 'sistema'];
    
    areas.forEach((area, index) => {
      const resultado = resultados[area as keyof DiagnosticoResultados];
      if (resultado.percentage < 60) { // Área que precisa de atenção
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

  const gerarAcoesComerciais = (): AcaoComercialSemanal[] => {
    return [
      {
        id: 'comercial_1',
        acao: 'Realizar 20 ligações de prospecção para novos clientes',
        meta: '20 ligações, 5 leads qualificados',
        prazo: 'Toda segunda-feira',
        responsavel: 'Equipe Comercial',
        metricas: 'Número de ligações, leads qualificados, reuniões agendadas',
        semana: 1
      },
      {
        id: 'comercial_2',
        acao: 'Enviar propostas personalizadas para leads qualificados',
        meta: '5 propostas enviadas',
        prazo: 'Toda terça-feira',
        responsavel: 'Gerente Comercial',
        metricas: 'Propostas enviadas, taxa de resposta, vendas fechadas',
        semana: 2
      },
      {
        id: 'comercial_3',
        acao: 'Follow-up com clientes em negociação',
        meta: 'Contactar 100% dos clientes em pipeline',
        prazo: 'Toda quarta-feira',
        responsavel: 'Vendedor',
        metricas: 'Clientes contactados, avanço no pipeline',
        semana: 3
      },
      {
        id: 'comercial_4',
        acao: 'Análise semanal de resultados e ajustes na estratégia',
        meta: 'Relatório completo de performance',
        prazo: 'Toda sexta-feira',
        responsavel: 'Gerente Comercial',
        metricas: 'Vendas fechadas, meta atingida, ações corretivas',
        semana: 4
      }
    ];
  };

  const processarRespostas = async (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados) => {
    setGerandoPlano(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      const planoAcao = gerarPlanoAcao(respostas, resultados);
      const acoesComerciais = gerarAcoesComerciais();
      
      const dadosCompletos: PlanejamentoEstrategicoData = {
        empresaNome,
        respostas,
        ferramentasGeradas: {
          diagnostico: resultados
        },
        planoAcao,
        acoesComerciais,
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };
      
      setDados(dadosCompletos);
      setEtapa('resultado');
      
      toast({
        title: "Plano gerado com sucesso!",
        description: "Seu plano de ação estratégico está pronto.",
      });
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast({
        title: "Erro ao gerar plano",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setGerandoPlano(false);
    }
  };

  const handleUpdateProgresso = (novoProgresso: number) => {
    if (dados) {
      setDados({
        ...dados,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      });
    }
  };

  const voltarParaFormulario = () => {
    setEtapa('formulario');
    setDados(null);
  };

  return {
    etapa,
    dados,
    gerandoPlano,
    processarRespostas,
    handleUpdateProgresso,
    voltarParaFormulario
  };
};
