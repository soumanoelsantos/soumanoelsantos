
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SellerDailyPerformance, Seller } from '@/types/sellers';
import { getBrazilianDate } from '@/utils/dateUtils';
import PerformanceHistoryMetrics from './PerformanceHistoryMetrics';
import PerformanceHistoryActions from './PerformanceHistoryActions';
import IndividualSalesDetails from './IndividualSalesDetails';

interface PerformanceHistoryCardProps {
  performance: SellerDailyPerformance;
  seller: Seller;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onEdit: (performance: SellerDailyPerformance) => void;
  onDelete: (performanceId: string) => void;
}

const PerformanceHistoryCard: React.FC<PerformanceHistoryCardProps> = ({
  performance,
  seller,
  isExpanded,
  onToggleExpanded,
  onEdit,
  onDelete
}) => {
  const isCloser = seller.seller_type === 'closer';
  const isSDR = seller.seller_type === 'sdr';

  const formatCurrency = (value: number) => {
    console.log('🔍 [DEBUG] PerformanceHistoryCard - formatCurrency input:', value);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
    console.log('🔍 [DEBUG] PerformanceHistoryCard - formatCurrency output:', formatted);
    return formatted;
  };

  const formatDate = (dateString: string) => {
    return getBrazilianDate(dateString);
  };

  // Debug logs para investigar os valores
  console.log('🔍 [DEBUG] PerformanceHistoryCard - performance data:', {
    id: performance.id,
    date: performance.date,
    revenue_amount: performance.revenue_amount,
    billing_amount: performance.billing_amount,
    sales_count: performance.sales_count
  });

  // Garantir que os valores sejam números válidos
  const revenueAmount = Number(performance.revenue_amount) || 0;
  const billingAmount = Number(performance.billing_amount) || 0;
  const salesCount = Number(performance.sales_count) || 0;
  const callsCount = Number(performance.calls_count) || 0;
  const meetingsCount = Number(performance.meetings_count) || 0;

  console.log('🔍 [DEBUG] PerformanceHistoryCard - converted values:', {
    revenueAmount,
    billingAmount,
    salesCount
  });

  return (
    <Collapsible>
      <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
        <CollapsibleTrigger 
          className="w-full" 
          onClick={onToggleExpanded}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">
                    {formatDate(performance.date)}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {performance.submitted_by_seller ? 'Enviado pelo vendedor' : 'Registrado pela administração'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isCloser ? (
                  <>
                    <Badge variant="outline" className="text-xs">
                      {salesCount} vendas
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {formatCurrency(revenueAmount)}
                    </Badge>
                  </>
                ) : isSDR ? (
                  <>
                    <Badge variant="outline" className="text-xs">
                      {callsCount} tentativas
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {meetingsCount} agendamentos
                    </Badge>
                  </>
                ) : null}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <PerformanceHistoryMetrics 
              performance={performance}
              isCloser={isCloser}
            />

            {performance.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Observações:</strong> {performance.notes}
                </p>
              </div>
            )}

            {isCloser && performance.sales_count > 0 && (
              <IndividualSalesDetails performanceId={performance.id} />
            )}

            <PerformanceHistoryActions
              performance={performance}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default PerformanceHistoryCard;
