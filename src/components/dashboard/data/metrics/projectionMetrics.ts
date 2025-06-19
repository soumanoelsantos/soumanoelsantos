
import { TrendingUp, TrendingDown, UserX } from 'lucide-react';

export const projectionMetrics = [
  {
    key: 'showProjecaoReceita',
    title: 'Projeção de Receita',
    value: 'R$ 125.400',
    description: 'Projeção para fim do mês',
    trend: '+18%',
    icon: TrendingUp,
    color: 'text-purple-600'
  },
  {
    key: 'showProjecaoFaturamento', 
    title: 'Projeção de Faturamento',
    value: 'R$ 186.200',
    description: 'Projeção para fim do mês',
    trend: '+22%',
    icon: TrendingUp,
    color: 'text-indigo-600'
  },
  {
    key: 'showNoShow',
    title: 'No-Show',
    value: '12',
    description: 'Faltas confirmadas hoje',
    trend: '-8%',
    icon: UserX,
    color: 'text-red-600'
  }
];
