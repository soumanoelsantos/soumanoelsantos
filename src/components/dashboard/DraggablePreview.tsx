
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface MetricItem {
  key: keyof DashboardConfig | 'charts' | 'specificGoals' | 'revenueEvolutionChart' | 'billingEvolutionChart';
  title: string;
  enabled: boolean;
  isChart?: boolean;
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
  // Criando array de métricas que corresponde exatamente ao dashboard real
  const allMetrics: MetricItem[] = [];

  // Lista de todas as chaves de métricas que podem aparecer
  const metricConfigKeys = [
    'showConversion', 'showRevenue',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect'
  ];

  // Nomes amigáveis para as métricas
  const metricTitles: { [key: string]: string[] } = {
    'showConversion': ['Taxa de Conversão'],
    'showRevenue': ['Receita'],
    'showTicketFaturamento': ['Ticket Faturamento'],
    'showTicketReceita': ['Ticket Receita'],
    'showFaltaFaturamento': ['Falta de Faturamento'],
    'showFaltaReceita': ['Falta de Receita'],
    'showDiariaReceita': ['Diária de Receita'],
    'showDiariaFaturamento': ['Diária de Faturamento'],
    'showSuperMetaFaturamento': ['Super Meta Faturamento'],
    'showSuperMetaReceita': ['Super Meta Receita'],
    'showHiperMetaFaturamento': ['Hiper Meta Faturamento'],
    'showHiperMetaReceita': ['Hiper Meta Receita'],
    'showFaltaReceitaSuper': ['Falta Receita (Super)'],
    'showFaltaReceitaHiper': ['Falta Receita (Hiper)'],
    'showFaltaFaturamentoSuper': ['Falta Faturamento (Super)'],
    'showFaltaFaturamentoHiper': ['Falta Faturamento (Hiper)'],
    'showMetaFaturamento': ['Meta Faturamento'],
    'showMetaReceita': ['Meta Receita'],
    'showFaturamento': ['Faturamento'],
    'showReceita': ['Receita'],
    'showQuantidadeVendas': ['Quantidade de Vendas'],
    'showCashCollect': ['Cash Collect']
  };

  // Adiciona cards de métricas habilitadas
  metricConfigKeys.forEach(key => {
    if (config[key as keyof DashboardConfig]) {
      const titles = metricTitles[key] || [key];
      titles.forEach(title => {
        allMetrics.push({ key: key as any, title, enabled: true });
      });
    }
  });

  // Metas específicas se habilitadas
  if (config.showSpecificGoals && config.selectedGoalIds.length > 0) {
    allMetrics.push({ key: 'specificGoals', title: 'Metas Específicas', enabled: true });
  }

  // Gráficos de evolução se habilitados
  if (config.showRevenueEvolutionChart) {
    allMetrics.push({ key: 'revenueEvolutionChart', title: '📊 Evolução de Receita', enabled: true, isChart: true });
  }
  
  if (config.showBillingEvolutionChart) {
    allMetrics.push({ key: 'billingEvolutionChart', title: '📈 Evolução de Faturamento', enabled: true, isChart: true });
  }

  // Ordena as métricas com base na ordem salva
  const orderedMetrics = metricsOrder
    .map(key => allMetrics.find(metric => metric.key === key))
    .filter((metric): metric is MetricItem => metric !== undefined)
    .concat(
      allMetrics.filter(metric => !metricsOrder.includes(metric.key as string))
    );

  // Separa cards e gráficos
  const cards = orderedMetrics.filter(metric => !metric.isChart);
  const charts = orderedMetrics.filter(metric => metric.isChart);

  console.log('Total de métricas habilitadas:', allMetrics.length);
  console.log('Cards habilitados:', cards.length);
  console.log('Gráficos habilitados:', charts.length);
  console.log('Cards:', cards.map(c => c.title));

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
            <div className="space-y-2">
              {/* Cards de métricas em grid de 6 colunas */}
              {cards.length > 0 && (
                <Droppable droppableId="cards" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1"
                    >
                      {cards.map((metric, index) => (
                        <Draggable key={`card-${metric.key}-${index}`} draggableId={`card-${metric.key}-${index}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white p-1 rounded text-xs flex items-center gap-1 transition-shadow ${
                                snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                              }`}
                            >
                              <div {...provided.dragHandleProps} className="cursor-grab">
                                <GripVertical className="h-2 w-2 text-gray-400" />
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
              )}

              {/* Gráficos em grid de 2 colunas */}
              {charts.length > 0 && (
                <Droppable droppableId="charts" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-1.5"
                    >
                      {charts.map((metric, index) => (
                        <Draggable key={`chart-${metric.key}-${index}`} draggableId={`chart-${metric.key}-${index}`} index={index + cards.length}>
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
              )}
            </div>
          </DragDropContext>
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggablePreview;
