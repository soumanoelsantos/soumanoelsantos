
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, User, Clock } from 'lucide-react';
import { SellerDailyPerformance } from '@/types/sellers';
import { formatToBrazilianTimezone, formatDateToBrazilian } from '@/utils/dateUtils';

interface PerformanceMetricsDisplayProps {
  performances: SellerDailyPerformance[];
  isSDR: boolean;
  onDelete: (performanceId: string) => Promise<boolean>;
}

const PerformanceMetricsDisplay: React.FC<PerformanceMetricsDisplayProps> = ({
  performances,
  isSDR,
  onDelete
}) => {
  const handleDelete = async (performanceId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      await onDelete(performanceId);
    }
  };

  const renderSDRMetrics = (performance: SellerDailyPerformance) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm text-gray-500">Tentativas:</p>
        <p className="text-lg font-semibold">{performance.calls_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">No Show:</p>
        <p className="text-lg font-semibold">{performance.leads_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Agendamentos:</p>
        <p className="text-lg font-semibold">{performance.meetings_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Remarcações:</p>
        <p className="text-lg font-semibold">{performance.sales_count}</p>
      </div>
    </div>
  );

  const renderCloserMetrics = (performance: SellerDailyPerformance) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm text-gray-500">Vendas:</p>
        <p className="text-lg font-semibold">{performance.sales_count}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Receita:</p>
        <p className="text-lg font-semibold">
          R$ {performance.revenue_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Faturamento:</p>
        <p className="text-lg font-semibold">
          R$ {performance.billing_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Reuniões:</p>
        <p className="text-lg font-semibold">{performance.meetings_count}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Lançamentos de Performance ({performances.length} registros)
      </h3>
      
      {performances.map((performance) => (
        <Card key={performance.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                {formatDateToBrazilian(performance.date)}
                <Badge variant={performance.submitted_by_seller ? "default" : "secondary"}>
                  {performance.submitted_by_seller ? "Pelo Vendedor" : "Pelo Admin"}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(performance.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isSDR ? renderSDRMetrics(performance) : renderCloserMetrics(performance)}
            
            {performance.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Observações:</p>
                <p className="text-sm bg-gray-50 p-2 rounded">{performance.notes}</p>
              </div>
            )}
            
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Lançado em: {formatToBrazilianTimezone(performance.submitted_at)}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                ID: {performance.id.substring(0, 8)}...
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetricsDisplay;
