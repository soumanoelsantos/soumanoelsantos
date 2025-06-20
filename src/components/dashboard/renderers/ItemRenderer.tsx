
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target } from 'lucide-react';
import ProductMetricsCards from '../products/ProductMetricsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
  isPublicView?: boolean;
  sharedUserId?: string;
  selectedProductId?: string | null;
}

// Simple metric card component for now
const MetricCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <Card className="h-40 flex flex-col border-r border-b border-gray-200 rounded-none">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
      <CardTitle className="text-xs font-medium text-gray-600">{title}</CardTitle>
      <Icon className="h-3 w-3 text-blue-600 flex-shrink-0" />
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between p-3">
      <div className="text-lg font-bold">{value}</div>
      <div className="mt-auto">
        <p className="text-xs text-gray-600 mt-1">
          Dados do período
        </p>
        <div className="text-xs text-green-600 mt-2">
          +5% vs período anterior
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ItemRenderer: React.FC<ItemRendererProps> = ({ 
  itemKey, 
  config, 
  isPublicView = false, 
  sharedUserId,
  selectedProductId
}) => {
  // Verificar se o item está habilitado na configuração
  const isEnabled = config[itemKey as keyof DashboardConfig];
  
  if (!isEnabled) {
    console.log(`⚠️ ItemRenderer - Item ${itemKey} is disabled in config`);
    return null;
  }

  console.log(`🎯 ItemRenderer - Rendering item: ${itemKey}`, { isPublicView, sharedUserId, selectedProductId });

  // Para indicadores de produtos, usar o componente específico
  if (itemKey === 'productMetrics') {
    return <ProductMetricsCards config={config} selectedProductId={selectedProductId} />;
  }

  // Renderizar o componente apropriado baseado na chave
  switch (itemKey) {
    // Métricas básicas
    case 'showReceita':
      return <MetricCard title="Receita" value="R$ 0,00" icon={DollarSign} />;
    case 'showFaturamento':
      return <MetricCard title="Faturamento" value="R$ 0,00" icon={DollarSign} />;
    case 'showQuantidadeVendas':
      return <MetricCard title="Quantidade de Vendas" value="0" icon={Target} />;
    case 'showTicketReceita':
      return <MetricCard title="Ticket Médio Receita" value="R$ 0,00" icon={TrendingUp} />;
    case 'showTicketFaturamento':
      return <MetricCard title="Ticket Médio Faturamento" value="R$ 0,00" icon={TrendingUp} />;
    case 'showCashCollect':
      return <MetricCard title="Cash Collect" value="R$ 0,00" icon={DollarSign} />;
    case 'showCac':
      return <MetricCard title="CAC" value="R$ 0,00" icon={TrendingUp} />;
    case 'showConversion':
      return <MetricCard title="Taxa de Conversão" value="0%" icon={Target} />;
    
    // Metas
    case 'showMetaReceita':
      return <MetricCard title="Meta de Receita" value="R$ 0,00" icon={Target} />;
    case 'showMetaFaturamento':
      return <MetricCard title="Meta de Faturamento" value="R$ 0,00" icon={Target} />;
    
    // Super Metas
    case 'showSuperMetaReceita':
      return <MetricCard title="Super Meta Receita" value="R$ 0,00" icon={Target} />;
    case 'showSuperMetaFaturamento':
      return <MetricCard title="Super Meta Faturamento" value="R$ 0,00" icon={Target} />;
    
    // Hiper Metas
    case 'showHiperMetaReceita':
      return <MetricCard title="Hiper Meta Receita" value="R$ 0,00" icon={Target} />;
    case 'showHiperMetaFaturamento':
      return <MetricCard title="Hiper Meta Faturamento" value="R$ 0,00" icon={Target} />;
    
    // Faltas
    case 'showFaltaReceita':
      return <MetricCard title="Falta Receita" value="R$ 0,00" icon={Target} />;
    case 'showFaltaFaturamento':
      return <MetricCard title="Falta Faturamento" value="R$ 0,00" icon={Target} />;
    case 'showFaltaReceitaSuper':
      return <MetricCard title="Falta Receita Super" value="R$ 0,00" icon={Target} />;
    case 'showFaltaFaturamentoSuper':
      return <MetricCard title="Falta Faturamento Super" value="R$ 0,00" icon={Target} />;
    case 'showFaltaReceitaHiper':
      return <MetricCard title="Falta Receita Hiper" value="R$ 0,00" icon={Target} />;
    case 'showFaltaFaturamentoHiper':
      return <MetricCard title="Falta Faturamento Hiper" value="R$ 0,00" icon={Target} />;
    
    // Diárias
    case 'showDiariaReceita':
      return <MetricCard title="Diária Receita" value="R$ 0,00" icon={DollarSign} />;
    case 'showDiariaFaturamento':
      return <MetricCard title="Diária Faturamento" value="R$ 0,00" icon={DollarSign} />;
    
    // Projeções
    case 'showProjecaoReceita':
      return <MetricCard title="Projeção Receita" value="R$ 0,00" icon={TrendingUp} />;
    case 'showProjecaoFaturamento':
      return <MetricCard title="Projeção Faturamento" value="R$ 0,00" icon={TrendingUp} />;
    case 'showNoShow':
      return <MetricCard title="No Show" value="0%" icon={Target} />;
    
    // Gráficos comerciais e tabelas - placeholder para agora
    case 'showRevenueEvolutionChart':
    case 'revenueEvolutionChart':
    case 'showBillingEvolutionChart':
    case 'billingEvolutionChart':
    case 'showSellerRevenueChart':
    case 'sellerRevenueChart':
    case 'showSellerBillingChart':
    case 'sellerBillingChart':
    case 'showTemporalRevenueChart':
    case 'temporalRevenueChart':
    case 'showTemporalBillingChart':
    case 'temporalBillingChart':
    case 'showClosersPerformanceTable':
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gráfico/Tabela Comercial em Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Este componente será implementado em breve.</p>
          </CardContent>
        </Card>
      );

    // Novos gráficos de produtos
    case 'showProductRevenueEvolutionChart':
    case 'showProductBillingEvolutionChart':
    case 'showProductSalesEvolutionChart':
    case 'showProductPerformanceChart':
    case 'showProductComparisonChart':
    case 'showProductTemporalChart':
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Gráfico de Produto em Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Este gráfico de produto será implementado em breve.</p>
          </CardContent>
        </Card>
      );
    
    default:
      console.warn(`⚠️ ItemRenderer - Unknown item key: ${itemKey}`);
      return null;
  }
};
