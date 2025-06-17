
import { Target, Users, DollarSign } from 'lucide-react';

export const activityMetrics = [
  {
    key: 'showConversao',
    title: 'Conversão',
    value: '22%',
    description: 'Taxa de conversão atual',
    icon: Target,
    trend: '+2%',
    color: 'text-green-600'
  },
  {
    key: 'showCallsDiarias',
    title: 'Calls Diárias',
    value: '25',
    description: 'Chamadas realizadas hoje',
    icon: Users,
    trend: '+12%',
    color: 'text-indigo-500'
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
