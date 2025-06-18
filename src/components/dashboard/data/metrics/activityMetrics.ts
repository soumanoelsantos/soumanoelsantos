
import { Target, DollarSign } from 'lucide-react';

export const activityMetrics = [
  {
    key: 'showDiariaReceita',
    title: 'Diária de Receita',
    value: 'R$ 1.950,00',
    description: 'Receita média diária',
    icon: DollarSign,
    trend: '+8%',
    color: 'text-purple-500'
  },
  {
    key: 'showDiariaFaturamento',
    title: 'Diário de Faturamento',
    value: 'R$ 6.750,00',
    description: 'Faturamento médio diário',
    icon: DollarSign,
    trend: '+12%',
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
    value: '25%',
    description: 'Taxa de cobrança',
    icon: DollarSign,
    trend: '+5%',
    color: 'text-purple-600'
  }
];
