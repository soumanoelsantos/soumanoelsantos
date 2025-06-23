
import { Target, DollarSign } from 'lucide-react';
import { calculateRemainingDaysInMonth, calculateDailyTarget, formatCurrency } from '@/utils/goalCalculations';

// Valores de exemplo - em uma implementação real, estes viriam de uma API ou contexto
const MONTHLY_REVENUE_GOAL = 60000; // R$ 60.000 meta mensal de receita
const CURRENT_REVENUE = 35000; // R$ 35.000 receita atual
const MONTHLY_BILLING_GOAL = 120000; // R$ 120.000 meta mensal de faturamento
const CURRENT_BILLING = 80000; // R$ 80.000 faturamento atual

// Valores para CAC
const TOTAL_PAID_TRAFFIC_SPENT = 5000; // R$ 5.000 gasto total com tráfego pago
const TOTAL_SALES = 25; // 25 vendas realizadas
const CAC_VALUE = TOTAL_SALES > 0 ? TOTAL_PAID_TRAFFIC_SPENT / TOTAL_SALES : 0;

// Calcular Cash Collect corretamente: (Receita / Faturamento) × 100
const CASH_COLLECT_PERCENT = CURRENT_BILLING > 0 ? (CURRENT_REVENUE / CURRENT_BILLING) * 100 : 0;

const remainingDays = calculateRemainingDaysInMonth();
const dailyRevenueTarget = calculateDailyTarget(MONTHLY_REVENUE_GOAL, CURRENT_REVENUE, remainingDays);
const dailyBillingTarget = calculateDailyTarget(MONTHLY_BILLING_GOAL, CURRENT_BILLING, remainingDays);

export const activityMetrics = [
  {
    key: 'showDiariaReceita',
    title: 'Meta Diária de Receita',
    value: formatCurrency(dailyRevenueTarget),
    description: `Para atingir a meta em ${remainingDays} dias`,
    icon: DollarSign,
    trend: `${remainingDays} dias restantes`,
    color: 'text-purple-500'
  },
  {
    key: 'showDiariaFaturamento',
    title: 'Meta Diária de Faturamento',
    value: formatCurrency(dailyBillingTarget),
    description: `Para atingir a meta em ${remainingDays} dias`,
    icon: DollarSign,
    trend: `${remainingDays} dias restantes`,
    color: 'text-green-500'
  },
  {
    key: 'showQuantidadeVendas',
    title: 'Quantidade de Vendas',
    value: '18',
    description: 'Total de vendas realizadas',
    icon: Target,
    trend: '+22%',
    color: 'text-blue-600'
  },
  {
    key: 'showCashCollect',
    title: 'Cash Collect',
    value: `${CASH_COLLECT_PERCENT.toFixed(2)}%`,
    description: 'Taxa de conversão de faturamento em receita',
    icon: DollarSign,
    trend: 'Receita / Faturamento × 100',
    color: 'text-purple-600'
  },
  {
    key: 'showCac',
    title: 'CAC (Custo de Aquisição)',
    value: formatCurrency(CAC_VALUE),
    description: 'Custo para adquirir um cliente',
    icon: DollarSign,
    trend: '-8%',
    color: 'text-orange-600'
  }
];
