
import { TrendingUp, Target, AlertTriangle } from 'lucide-react';

export const projectionMetrics = [
  {
    key: 'showProjecaoReceita',
    title: 'Projeção de Receita',
    value: 'R$ 185.000',
    description: 'Estimativa para o mês',
    icon: TrendingUp,
    trend: '+8%',
    color: 'text-blue-600'
  },
  {
    key: 'showProjecaoFaturamento',
    title: 'Projeção de Faturamento',
    value: 'R$ 420.000',
    description: 'Estimativa para o mês',
    icon: Target,
    trend: '+12%',
    color: 'text-indigo-600'
  },
  {
    key: 'showNoShow',
    title: 'No-Show',
    value: '15%',
    description: 'Taxa de não comparecimento',
    icon: AlertTriangle,
    trend: '-5%',
    color: 'text-orange-600'
  }
];
