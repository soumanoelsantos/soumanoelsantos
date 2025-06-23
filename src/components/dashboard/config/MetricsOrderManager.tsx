
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useMetricsOrder } from './metrics-order/useMetricsOrder';
import { MetricOrderItem } from './metrics-order/MetricOrderItem';
import { EmptyMetricsState } from './metrics-order/EmptyMetricsState';

interface MetricsOrderManagerProps {
  config: DashboardConfig;
  metricsOrder: string[];
  onReorderMetrics: (newOrder: string[]) => void;
}

const MetricsOrderManager: React.FC<MetricsOrderManagerProps> = ({
  config,
  metricsOrder,
  onReorderMetrics
}) => {
  const { getOrderedMetrics } = useMetricsOrder(config);
  const orderedMetrics = getOrderedMetrics(metricsOrder);

  const moveUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...orderedMetrics];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving up - new order:', newOrderKeys);
      onReorderMetrics(newOrderKeys);
    }
  };

  const moveDown = (index: number) => {
    if (index < orderedMetrics.length - 1) {
      const newOrder = [...orderedMetrics];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving down - new order:', newOrderKeys);
      onReorderMetrics(newOrderKeys);
    }
  };

  if (orderedMetrics.length === 0) {
    return <EmptyMetricsState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Ordem dos Indicadores do Comercial
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use os botões para reordenar como os indicadores do comercial aparecerão no dashboard
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {orderedMetrics.map((metric, index) => (
            <MetricOrderItem
              key={metric.key}
              metric={{
                key: metric.key,
                title: metric.label,
                enabled: true
              }}
              index={index}
              isFirst={index === 0}
              isLast={index === orderedMetrics.length - 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsOrderManager;
