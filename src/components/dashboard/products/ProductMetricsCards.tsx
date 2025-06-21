
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useProductGoals } from '@/hooks/useProductGoals';
import { DashboardConfig } from '@/types/dashboardConfig';
import { formatCurrency } from '@/utils/goalCalculations';

interface ProductMetricsCardsProps {
  config: DashboardConfig;
  selectedProductId?: string | null;
}

const ProductMetricsCards: React.FC<ProductMetricsCardsProps> = ({ config, selectedProductId }) => {
  const { products } = useProducts();
  const { productGoals } = useProductGoals();
  
  if (!config.showProductMetrics || config.selectedProductIds.length === 0) {
    return null;
  }

  // Filtrar produtos baseado no filtro selecionado
  let selectedProducts = products.filter(product => 
    config.selectedProductIds.includes(product.id)
  );

  // Se há um produto específico selecionado no filtro, mostrar apenas esse
  if (selectedProductId) {
    selectedProducts = selectedProducts.filter(product => product.id === selectedProductId);
  }

  console.log('🔍 ProductMetricsCards - Products after filter:', {
    allConfiguredProducts: config.selectedProductIds,
    selectedProductId,
    filteredProducts: selectedProducts.map(p => ({ id: p.id, name: p.name }))
  });

  // Se nenhum produto restou após o filtro, não renderizar nada
  if (selectedProducts.length === 0) {
    return null;
  }

  const calculateProductMetrics = (productId: string) => {
    // Buscar meta real do produto na tabela product_goals
    const productGoal = productGoals.find(goal => goal.product_id === productId && goal.is_active);
    
    // Simular dados de performance do produto
    // Em uma implementação real, esses dados viriam de uma API
    const currentReceita = Math.random() * 50000;
    const currentFaturamento = Math.random() * 150000;
    const currentVendas = Math.floor(Math.random() * 50);
    
    // Usar metas reais da tabela product_goals se existirem
    const metaReceita = productGoal?.revenue_goal || 0;
    const metaFaturamento = productGoal?.billing_goal || 0;
    const metaQuantidade = productGoal?.quantity_goal || 0;
    const currency = (productGoal?.currency || 'BRL') as 'BRL' | 'USD';

    // Calcular Cash Collect como percentual da diferença entre faturamento e receita
    const cashCollectPercent = currentFaturamento > 0 ? ((currentFaturamento - currentReceita) / currentFaturamento) * 100 : 0;
    
    return {
      receita: currentReceita,
      faturamento: currentFaturamento,
      vendas: currentVendas,
      metaReceita,
      metaFaturamento,
      metaQuantidade,
      faltaReceita: Math.max(metaReceita - currentReceita, 0),
      faltaFaturamento: Math.max(metaFaturamento - currentFaturamento, 0),
      ticketReceita: currentVendas > 0 ? currentReceita / currentVendas : 0,
      ticketFaturamento: currentVendas > 0 ? currentFaturamento / currentVendas : 0,
      cashCollect: cashCollectPercent,
      projecaoReceita: currentReceita * (30 / new Date().getDate()),
      projecaoFaturamento: currentFaturamento * (30 / new Date().getDate()),
      currency
    };
  };

  const renderMetricCard = (title: string, value: string, icon: any, productName: string) => (
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
            {productName}
          </p>
          <div className="text-xs text-green-600 mt-1">
            Atemporal
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

  // NOVA LÓGICA: Agrupar por produto e depois por indicador para evitar repetições
  selectedProducts.forEach((product) => {
    const metrics = calculateProductMetrics(product.id);

    productOrder.forEach((indicator, index) => {
      // Verificar se o indicador está habilitado na configuração
      if (!config[indicator as keyof DashboardConfig]) return;

      const key = `${product.id}-${indicator}-${index}`;

      switch (indicator) {
        case 'showProductReceita':
          cards.push(
            <div key={key}>
              {renderMetricCard(
                'Receita do Produto',
                formatCurrency(metrics.receita, metrics.currency),
                DollarSign,
                product.name
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
                DollarSign,
                product.name
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
                Target,
                product.name
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
                TrendingUp,
                product.name
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
                TrendingUp,
                product.name
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
                Target,
                product.name
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
                Target,
                product.name
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
                Target,
                product.name
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
                Target,
                product.name
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
                Target,
                product.name
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
                DollarSign,
                product.name
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
                TrendingUp,
                product.name
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
                TrendingUp,
                product.name
              )}
            </div>
          );
          break;
      }
    });
  });

  console.log('🔍 ProductMetricsCards - Total cards generated:', cards.length);

  return <>{cards}</>;
};

export default ProductMetricsCards;
