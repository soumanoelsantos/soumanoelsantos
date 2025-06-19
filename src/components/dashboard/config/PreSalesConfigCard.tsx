
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/types/dashboardConfig';
import { Phone, Calendar, UserX, Users, BarChart3, TrendingUp } from 'lucide-react';

interface PreSalesConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const PreSalesConfigCard: React.FC<PreSalesConfigCardProps> = ({ config, onConfigChange }) => {
  const preSalesMetrics = [
    { 
      key: 'showPreSalesCalls', 
      label: 'Tentativas de Ligação Diárias',
      icon: Phone,
      description: 'Card com métricas de tentativas de ligação'
    },
    { 
      key: 'showPreSalesSchedulings', 
      label: 'Agendamentos Diários',
      icon: Calendar,
      description: 'Card com métricas de agendamentos'
    },
    { 
      key: 'showPreSalesNoShow', 
      label: 'No-Show Diário',
      icon: UserX,
      description: 'Card com métricas de no-show'
    },
    { 
      key: 'showPreSalesSDRTable', 
      label: 'Tabela de Performance dos SDRs',
      icon: Users,
      description: 'Tabela detalhada com dados dos SDRs'
    }
  ];

  const preSalesCharts = [
    { 
      key: 'showPreSalesCallsChart', 
      label: 'Gráfico de Tentativas de Ligação',
      icon: TrendingUp,
      description: 'Gráfico de linha mostrando evolução das tentativas'
    },
    { 
      key: 'showPreSalesSchedulingChart', 
      label: 'Gráfico de Agendamentos',
      icon: BarChart3,
      description: 'Gráfico de barras com agendamentos diários'
    },
    { 
      key: 'showPreSalesNoShowChart', 
      label: 'Gráfico de No-Show',
      icon: TrendingUp,
      description: 'Gráfico de linha com evolução do no-show'
    },
    { 
      key: 'showPreSalesSDRComparisonChart', 
      label: 'Comparação entre SDRs',
      icon: BarChart3,
      description: 'Gráfico comparativo de performance dos SDRs'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Indicadores de Pré-vendas
        </CardTitle>
        <CardDescription>
          Selecione quais indicadores e gráficos de pré-vendas deseja exibir no dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cards de Métricas */}
        <div>
          <h4 className="text-sm font-medium mb-3">Cards de Métricas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {preSalesMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <div key={metric.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={metric.key}
                    checked={config[metric.key as keyof DashboardConfig] as boolean}
                    onCheckedChange={(checked) => {
                      onConfigChange(metric.key, checked as boolean);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <Label htmlFor={metric.key} className="text-sm font-medium cursor-pointer">
                        {metric.label}
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráficos */}
        <div>
          <h4 className="text-sm font-medium mb-3">Gráficos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {preSalesCharts.map((chart) => {
              const IconComponent = chart.icon;
              return (
                <div key={chart.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={chart.key}
                    checked={config[chart.key as keyof DashboardConfig] as boolean}
                    onCheckedChange={(checked) => {
                      onConfigChange(chart.key, checked as boolean);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-green-600" />
                      <Label htmlFor={chart.key} className="text-sm font-medium cursor-pointer">
                        {chart.label}
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{chart.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreSalesConfigCard;
