
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SellerDailyPerformance } from '@/types/sellers';

interface PerformanceMetricsDisplayProps {
  performances: SellerDailyPerformance[];
  isSDR: boolean;
  onDelete: (performanceId: string) => void;
}

const PerformanceMetricsDisplay: React.FC<PerformanceMetricsDisplayProps> = ({
  performances,
  isSDR,
  onDelete
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="space-y-3">
      {performances.map((performance) => (
        <Card key={performance.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <h5 className="font-medium">{formatDate(performance.date)}</h5>
                <Badge variant={performance.submitted_by_seller ? "default" : "secondary"}>
                  {performance.submitted_by_seller ? 'Pelo Vendedor' : 'Pelo Admin'}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(performance.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isSDR ? (
              // Exibição para SDR
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Tentativas:</span>
                  <p className="font-medium">{performance.calls_count}</p>
                </div>
                <div>
                  <span className="text-gray-500">No Show:</span>
                  <p className="font-medium">{performance.leads_count}</p>
                </div>
                <div>
                  <span className="text-gray-500">Agendamentos:</span>
                  <p className="font-medium">{performance.meetings_count}</p>
                </div>
                <div>
                  <span className="text-gray-500">Remarcações:</span>
                  <p className="font-medium">{performance.sales_count}</p>
                </div>
              </div>
            ) : (
              // Exibição para Closers
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Vendas:</span>
                  <p className="font-medium">{performance.sales_count}</p>
                </div>
                <div>
                  <span className="text-gray-500">Receita:</span>
                  <p className="font-medium">{formatCurrency(performance.revenue_amount)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Faturamento:</span>
                  <p className="font-medium">{formatCurrency(performance.billing_amount)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Reuniões:</span>
                  <p className="font-medium">{performance.meetings_count}</p>
                </div>
              </div>
            )}

            {performance.notes && (
              <div className="mt-3 pt-3 border-t">
                <span className="text-gray-500 text-sm">Observações:</span>
                <p className="text-sm">{performance.notes}</p>
              </div>
            )}

            <div className="mt-3 pt-3 border-t text-xs text-gray-500">
              Lançado em: {format(new Date(performance.submitted_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
              <br />
              ID: {performance.id}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetricsDisplay;
