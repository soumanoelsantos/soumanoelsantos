
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface MetricItem {
  key: keyof DashboardConfig | 'charts' | 'salesChart' | 'growthChart' | 'conversionRate' | 'revenueGoal' | 'salesGoal';
  title: string;
  enabled: boolean;
}

interface DraggablePreviewProps {
  config: DashboardConfig;
  metricsOrder: string[];
  onReorderMetrics: (newOrder: string[]) => void;
}

const DraggablePreview: React.FC<DraggablePreviewProps> = ({
  config,
  metricsOrder,
  onReorderMetrics
}) => {
  const allMetrics: MetricItem[] = [
    { key: 'showSales', title: 'Total de Vendas', enabled: config.showSales },
    { key: 'showSales', title: 'Número de Vendas', enabled: config.showSales },
    { key: 'showLeads', title: 'Leads Gerados', enabled: config.showLeads },
    { key: 'showTicketMedio', title: 'Ticket Médio', enabled: config.showTicketMedio },
    { key: 'showTeam', title: 'Performance da Equipe', enabled: config.showTeam },
    { key: 'salesChart', title: '📊 Vendas por Mês', enabled: config.showCharts },
    { key: 'growthChart', title: '📈 Tendência de Crescimento', enabled: config.showCharts },
    { key: 'conversionRate', title: 'Taxa de Conversão', enabled: config.showMonthlyGoals && config.showConversion },
    { key: 'revenueGoal', title: 'Meta de Faturamento', enabled: config.showMonthlyGoals && config.showRevenue },
    { key: 'salesGoal', title: 'Meta de Receita', enabled: config.showMonthlyGoals && config.showRevenue }
  ];

  // Ordena as métricas com base na ordem salva
  const orderedMetrics = metricsOrder
    .map(key => allMetrics.find(metric => metric.key === key))
    .filter((metric): metric is MetricItem => metric !== undefined && metric.enabled)
    .concat(
      allMetrics.filter(metric => !metricsOrder.includes(metric.key as string) && metric.enabled)
    );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(orderedMetrics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const newOrder = items.map(item => item.key as string);
    onReorderMetrics(newOrder);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <p className="text-sm text-gray-600">
          Arraste e solte para reordenar os indicadores
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-lg p-3 space-y-2">
          <h3 className="font-medium text-gray-800 text-sm">
            {config.companyName || 'Sua Empresa'} - Dashboard
          </h3>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="metrics">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5"
                >
                  {orderedMetrics.map((metric, index) => (
                    <Draggable key={`${metric.key}-${index}`} draggableId={`${metric.key}-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-white p-1.5 rounded text-xs flex items-center gap-1 transition-shadow ${
                            snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical className="h-2.5 w-2.5 text-gray-400" />
                          </div>
                          <span className="text-xs truncate">{metric.title}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggablePreview;
