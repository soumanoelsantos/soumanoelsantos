
import React from 'react';
import { TrendingUp, Users, Phone, DollarSign } from 'lucide-react';
import { SellerDailyPerformance } from '@/types/sellers';

interface PerformanceHistoryMetricsProps {
  performance: SellerDailyPerformance;
  isCloser: boolean;
}

const PerformanceHistoryMetrics: React.FC<PerformanceHistoryMetricsProps> = ({
  performance,
  isCloser
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {performance.sales_count}
            </p>
            <p className="text-xs text-gray-500">Vendas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(performance.revenue_amount)}
            </p>
            <p className="text-xs text-gray-500">Receita</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(performance.billing_amount)}
            </p>
            <p className="text-xs text-gray-500">Faturamento</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {performance.meetings_count}
            </p>
            <p className="text-xs text-gray-500">Reuniões</p>
          </div>
        </div>
      </div>

      {!isCloser && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {performance.leads_count}
              </p>
              <p className="text-xs text-gray-500">Leads</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {performance.calls_count}
              </p>
              <p className="text-xs text-gray-500">Ligações</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceHistoryMetrics;
