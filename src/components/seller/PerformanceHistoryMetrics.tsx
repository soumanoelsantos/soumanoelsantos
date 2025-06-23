
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
    console.log('🔍 [DEBUG] PerformanceHistoryMetrics - formatCurrency input:', value);
    const numValue = Number(value) || 0;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numValue);
    console.log('🔍 [DEBUG] PerformanceHistoryMetrics - formatCurrency output:', formatted);
    return formatted;
  };

  // Debug logs para investigar os valores nas métricas
  console.log('🔍 [DEBUG] PerformanceHistoryMetrics - raw performance data:', {
    revenue_amount: performance.revenue_amount,
    billing_amount: performance.billing_amount,
    sales_count: performance.sales_count,
    meetings_count: performance.meetings_count
  });

  // Garantir que todos os valores sejam números válidos
  const revenueAmount = Number(performance.revenue_amount) || 0;
  const billingAmount = Number(performance.billing_amount) || 0;
  const salesCount = Number(performance.sales_count) || 0;
  const meetingsCount = Number(performance.meetings_count) || 0;
  const leadsCount = Number(performance.leads_count) || 0;
  const callsCount = Number(performance.calls_count) || 0;

  console.log('🔍 [DEBUG] PerformanceHistoryMetrics - converted values:', {
    revenueAmount,
    billingAmount,
    salesCount,
    meetingsCount,
    leadsCount,
    callsCount
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {salesCount}
            </p>
            <p className="text-xs text-gray-500">Vendas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(revenueAmount)}
            </p>
            <p className="text-xs text-gray-500">Receita</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(billingAmount)}
            </p>
            <p className="text-xs text-gray-500">Faturamento</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {meetingsCount}
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
                {leadsCount}
              </p>
              <p className="text-xs text-gray-500">Leads</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {callsCount}
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
