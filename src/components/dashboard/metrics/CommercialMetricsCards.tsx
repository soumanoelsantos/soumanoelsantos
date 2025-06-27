
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommercialMetricsCardsProps {
  config: DashboardConfig;
  indicatorKey: string;
}

const CommercialMetricsCards: React.FC<CommercialMetricsCardsProps> = ({ config, indicatorKey }) => {
  console.log('📊 [DEBUG] CommercialMetricsCards - Rendering:', indicatorKey);

  // Dados mockados para as métricas comerciais
  const getMetricData = (key: string) => {
    switch (key) {
      case 'showConversion':
        return { title: 'Taxa de Conversão', value: '12.5%', description: 'Conversão atual' };
      case 'showRevenue':
        return { title: 'Receita', value: 'R$ 45.000', description: 'Receita atual' };
      case 'showTicketFaturamento':
        return { title: 'Ticket Médio Faturamento', value: 'R$ 2.500', description: 'Ticket médio' };
      case 'showTicketReceita':
        return { title: 'Ticket Médio Receita', value: 'R$ 1.800', description: 'Ticket médio' };
      case 'showFaltaFaturamento':
        return { title: 'Falta Faturamento', value: 'R$ 15.000', description: 'Para atingir meta' };
      case 'showFaltaReceita':
        return { title: 'Falta Receita', value: 'R$ 8.000', description: 'Para atingir meta' };
      case 'showDiariaReceita':
        return { title: 'Diária Receita', value: 'R$ 1.200', description: 'Meta diária' };
      case 'showDiariaFaturamento':
        return { title: 'Diária Faturamento', value: 'R$ 2.000', description: 'Meta diária' };
      case 'showSuperMetaFaturamento':
        return { title: 'Super Meta Faturamento', value: 'R$ 300.000', description: 'Meta super' };
      case 'showSuperMetaReceita':
        return { title: 'Super Meta Receita', value: 'R$ 90.000', description: 'Meta super' };
      case 'showHiperMetaFaturamento':
        return { title: 'Hiper Meta Faturamento', value: 'R$ 500.000', description: 'Meta hiper' };
      case 'showHiperMetaReceita':
        return { title: 'Hiper Meta Receita', value: 'R$ 150.000', description: 'Meta hiper' };
      case 'showFaltaReceitaSuper':
        return { title: 'Falta Receita Super', value: 'R$ 25.000', description: 'Para super meta' };
      case 'showFaltaReceitaHiper':
        return { title: 'Falta Receita Hiper', value: 'R$ 75.000', description: 'Para hiper meta' };
      case 'showFaltaFaturamentoSuper':
        return { title: 'Falta Faturamento Super', value: 'R$ 40.000', description: 'Para super meta' };
      case 'showFaltaFaturamentoHiper':
        return { title: 'Falta Faturamento Hiper', value: 'R$ 120.000', description: 'Para hiper meta' };
      case 'showMetaFaturamento':
        return { title: 'Meta Faturamento', value: 'R$ 200.000', description: 'Meta atual' };
      case 'showMetaReceita':
        return { title: 'Meta Receita', value: 'R$ 60.000', description: 'Meta atual' };
      case 'showFaturamento':
        return { title: 'Faturamento', value: 'R$ 185.000', description: 'Faturamento atual' };
      case 'showReceita':
        return { title: 'Receita', value: 'R$ 52.000', description: 'Receita atual' };
      case 'showQuantidadeVendas':
        return { title: 'Quantidade de Vendas', value: '28', description: 'Vendas realizadas' };
      case 'showCashCollect':
        return { title: 'Cash Collect', value: '85%', description: 'Taxa de cobrança' };
      case 'showCac':
        return { title: 'CAC', value: 'R$ 450', description: 'Custo de aquisição' };
      case 'showProjecaoReceita':
        return { title: 'Projeção Receita', value: 'R$ 65.000', description: 'Projeção mensal' };
      case 'showProjecaoFaturamento':
        return { title: 'Projeção Faturamento', value: 'R$ 210.000', description: 'Projeção mensal' };
      case 'showNoShow':
        return { title: 'No-Show', value: '15%', description: 'Taxa de não comparecimento' };
      default:
        return { title: 'Métrica', value: '0', description: 'Valor padrão' };
    }
  };

  const metric = getMetricData(indicatorKey);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {metric.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
        <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
      </CardContent>
    </Card>
  );
};

export default CommercialMetricsCards;
