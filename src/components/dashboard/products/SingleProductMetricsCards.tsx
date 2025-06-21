import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { DashboardConfig } from '@/types/dashboardConfig';
import { formatCurrency, calculateRemainingDaysInMonth, calculateDailyTarget } from '@/utils/goalCalculations';

interface SingleProductMetricsCardsProps {
  config: DashboardConfig;
  selectedProductId: string | null;
  indicatorKey?: string; // Novo prop para especificar qual indicador renderizar
}

const SingleProductMetricsCards: React.FC<SingleProductMetricsCardsProps> = ({ 
  config, 
  selectedProductId,
  indicatorKey 
}) => {
  const { products } = useProducts();
  const currentDate = new Date();
  const { goals } = useMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());
  
  if (!config.showProductMetrics || !selectedProductId) {
    return null;
  }

  const selectedProduct = products.find(product => product.id === selectedProductId);
  
  if (!selectedProduct) {
    return null;
  }

  const getProductGoals = (productId: string) => {
    return goals.filter(goal => goal.product_id === productId);
  };

  const calculateProductMetrics = (productId: string) => {
    const productGoals = getProductGoals(productId);
    
    // Simular dados de performance do produto
    // Em uma implementação real, esses dados viriam de uma API
    const currentReceita = Math.random() * 50000;
    const currentFaturamento = Math.random() * 150000;
    const currentVendas = Math.floor(Math.random() * 50);
    
    const receitaGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'receita'
    );
    const faturamentoGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'faturamento'
    );
    const quantidadeGoal = productGoals.find(g => g.target_type === 'quantity');

    // Calcular Cash Collect como percentual da diferença entre faturamento e receita
    const cashCollectPercent = currentFaturamento > 0 ? ((currentFaturamento - currentReceita) / currentFaturamento) * 100 : 0;
    
    return {
      receita: currentReceita,
      faturamento: currentFaturamento,
      vendas: currentVendas,
      metaReceita: receitaGoal?.target_value || 0,
      metaFaturamento: faturamentoGoal?.target_value || 0,
      metaQuantidade: quantidadeGoal?.target_value || 0,
      faltaReceita: Math.max((receitaGoal?.target_value || 0) - currentReceita, 0),
      faltaFaturamento: Math.max((faturamentoGoal?.target_value || 0) - currentFaturamento, 0),
      ticketReceita: currentVendas > 0 ? currentReceita / currentVendas : 0,
      ticketFaturamento: currentVendas > 0 ? currentFaturamento / currentVendas : 0,
      cashCollect: cashCollectPercent,
      projecaoReceita: currentReceita * (30 / new Date().getDate()),
      projecaoFaturamento: currentFaturamento * (30 / new Date().getDate()),
      currency: receitaGoal?.currency || faturamentoGoal?.currency || 'BRL'
    };
  };

  const renderMetricCard = (title: string, value: string, icon: any) => (
    <Card className="h-40 flex flex-col border-r border-b border-gray-200 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <CardTitle className="text-xs font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Package className="h-3 w-3 text-purple-600" />
          {React.createElement(icon, { className: "h-3 w-3 text-blue-600" })}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between p-3">
        <div className="text-lg font-bold">{value}</div>
        <div className="mt-auto">
          <p className="text-xs text-purple-600 font-medium mt-1">
            {selectedProduct.name}
          </p>
          <div className="text-xs text-green-600 mt-1">
            Atemporal
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const metrics = calculateProductMetrics(selectedProductId);

  // Se um indicador específico foi passado, renderizar apenas esse
  if (indicatorKey) {
    // Verificar se o indicador está habilitado na configuração
    if (!config[indicatorKey as keyof DashboardConfig]) return null;

    switch (indicatorKey) {
      case 'showProductReceita':
        return renderMetricCard(
          'Receita do Produto',
          formatCurrency(metrics.receita, metrics.currency),
          DollarSign
        );
      case 'showProductFaturamento':
        return renderMetricCard(
          'Faturamento do Produto',
          formatCurrency(metrics.faturamento, metrics.currency),
          DollarSign
        );
      case 'showProductQuantidadeVendas':
        return renderMetricCard(
          'Quantidade de Vendas',
          `${metrics.vendas} vendas`,
          Target
        );
      case 'showProductTicketReceita':
        return renderMetricCard(
          'Ticket Receita',
          formatCurrency(metrics.ticketReceita, metrics.currency),
          TrendingUp
        );
      case 'showProductTicketFaturamento':
        return renderMetricCard(
          'Ticket Faturamento',
          formatCurrency(metrics.ticketFaturamento, metrics.currency),
          TrendingUp
        );
      case 'showProductMetaReceita':
        return renderMetricCard(
          'Meta Receita',
          formatCurrency(metrics.metaReceita, metrics.currency),
          Target
        );
      case 'showProductMetaFaturamento':
        return renderMetricCard(
          'Meta Faturamento',
          formatCurrency(metrics.metaFaturamento, metrics.currency),
          Target
        );
      case 'showProductMetaQuantidadeVendas':
        return renderMetricCard(
          'Meta Quantidade Vendas',
          `${metrics.metaQuantidade} vendas`,
          Target
        );
      case 'showProductFaltaReceita':
        return renderMetricCard(
          'Falta Receita',
          formatCurrency(metrics.faltaReceita, metrics.currency),
          Target
        );
      case 'showProductFaltaFaturamento':
        return renderMetricCard(
          'Falta Faturamento',
          formatCurrency(metrics.faltaFaturamento, metrics.currency),
          Target
        );
      case 'showProductCashCollect':
        return renderMetricCard(
          'Cash Collect',
          `${metrics.cashCollect.toFixed(1)}%`,
          DollarSign
        );
      case 'showProductProjecaoReceita':
        return renderMetricCard(
          'Projeção Receita',
          formatCurrency(metrics.projecaoReceita, metrics.currency),
          TrendingUp
        );
      case 'showProductProjecaoFaturamento':
        return renderMetricCard(
          'Projeção Faturamento',
          formatCurrency(metrics.projecaoFaturamento, metrics.currency),
          TrendingUp
        );
      default:
        return null;
    }
  }

  // Se nenhum indicador específico foi passado, renderizar todos (comportamento antigo para compatibilidade)
  // Usar a ordem configurada dos produtos ou ordem padrão se não configurada
  const productOrder = config.productOrder && config.productOrder.length > 0 
    ? config.productOrder 
    : [
        'showProductReceita',
        'showProductFaturamento', 
        'showProductQuantidadeVendas',
        'showProductTicketReceita',
        'showProductTicketFaturamento',
        'showProductMetaReceita',
        'showProductMetaFaturamento',
        'showProductMetaQuantidadeVendas',
        'showProductFaltaReceita',
        'showProductFaltaFaturamento',
        'showProductCashCollect',
        'showProductProjecaoReceita',
        'showProductProjecaoFaturamento'
      ];

  const cards: JSX.Element[] = [];

  // Processar apenas os indicadores que estão habilitados E na ordem configurada
  productOrder.forEach((indicator, index) => {
    // Verificar se o indicador está habilitado na configuração
    if (!config[indicator as keyof DashboardConfig]) return;

    const key = `${indicator}-${index}`;

    switch (indicator) {
      case 'showProductReceita':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Receita do Produto',
              formatCurrency(metrics.receita, metrics.currency),
              DollarSign
            )}
          </div>
        );
        break;
      case 'showProductFaturamento':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Faturamento do Produto',
              formatCurrency(metrics.faturamento, metrics.currency),
              DollarSign
            )}
          </div>
        );
        break;
      case 'showProductQuantidadeVendas':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Quantidade de Vendas',
              `${metrics.vendas} vendas`,
              Target
            )}
          </div>
        );
        break;
      case 'showProductTicketReceita':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Ticket Receita',
              formatCurrency(metrics.ticketReceita, metrics.currency),
              TrendingUp
            )}
          </div>
        );
        break;
      case 'showProductTicketFaturamento':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Ticket Faturamento',
              formatCurrency(metrics.ticketFaturamento, metrics.currency),
              TrendingUp
            )}
          </div>
        );
        break;
      case 'showProductMetaReceita':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Meta Receita',
              formatCurrency(metrics.metaReceita, metrics.currency),
              Target
            )}
          </div>
        );
        break;
      case 'showProductMetaFaturamento':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Meta Faturamento',
              formatCurrency(metrics.metaFaturamento, metrics.currency),
              Target
            )}
          </div>
        );
        break;
      case 'showProductMetaQuantidadeVendas':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Meta Quantidade Vendas',
              `${metrics.metaQuantidade} vendas`,
              Target
            )}
          </div>
        );
        break;
      case 'showProductFaltaReceita':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Falta Receita',
              formatCurrency(metrics.faltaReceita, metrics.currency),
              Target
            )}
          </div>
        );
        break;
      case 'showProductFaltaFaturamento':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Falta Faturamento',
              formatCurrency(metrics.faltaFaturamento, metrics.currency),
              Target
            )}
          </div>
        );
        break;
      case 'showProductCashCollect':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Cash Collect',
              `${metrics.cashCollect.toFixed(1)}%`,
              DollarSign
            )}
          </div>
        );
        break;
      case 'showProductProjecaoReceita':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Projeção Receita',
              formatCurrency(metrics.projecaoReceita, metrics.currency),
              TrendingUp
            )}
          </div>
        );
        break;
      case 'showProductProjecaoFaturamento':
        cards.push(
          <div key={key}>
            {renderMetricCard(
              'Projeção Faturamento',
              formatCurrency(metrics.projecaoFaturamento, metrics.currency),
              TrendingUp
            )}
          </div>
        );
        break;
    }
  });

  return <>{cards}</>;
};

export default SingleProductMetricsCards;
