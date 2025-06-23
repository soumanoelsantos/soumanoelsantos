
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return getBrazilianDate(dateString);
  };

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
                <Badge variant="outline" className="text-xs">
                  {performance.sales_count} vendas
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {formatCurrency(performance.revenue_amount)}
                </Badge>
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
