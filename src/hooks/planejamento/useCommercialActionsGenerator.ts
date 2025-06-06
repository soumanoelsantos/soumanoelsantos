
import { AcaoComercialSemanal } from '@/types/planejamentoEstrategico';

export const useCommercialActionsGenerator = () => {
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

  return { gerarAcoesComerciais };
};
