
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
    { key: 'showSales', title: 'Vendas', enabled: config.showSales },
    { key: 'showLeads', title: 'Leads', enabled: config.showLeads },
    { key: 'showConversion', title: 'Conversão', enabled: config.showConversion },
    { key: 'showRevenue', title: 'Receita', enabled: config.showRevenue },
    { key: 'showTicketMedio', title: 'Ticket Médio', enabled: config.showTicketMedio },
    { key: 'showTeam', title: 'Equipe', enabled: config.showTeam },
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
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-gray-800">
            {config.companyName || 'Sua Empresa'} - Dashboard
          </h3>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="metrics">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 gap-2"
                >
                  {orderedMetrics.map((metric, index) => (
                    <Draggable key={metric.key} draggableId={metric.key as string} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-white p-2 rounded text-xs flex items-center gap-2 transition-shadow ${
                            snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                          } ${
                            metric.key.includes('Chart') || metric.key.includes('Goal') || metric.key === 'conversionRate' 
                              ? 'col-span-2' 
                              : ''
                          }`}
                        >
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical className="h-3 w-3 text-gray-400" />
                          </div>
                          {metric.title}
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
