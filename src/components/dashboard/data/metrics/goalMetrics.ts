
import { Target, TrendingUp } from 'lucide-react';

export const goalMetrics = [
  {
    key: 'showSuperMetaFaturamento',
    title: 'Super Meta Faturamento',
    value: 'R$ 350.000,00',
    description: 'Meta estendida de faturamento',
    icon: Target,
    trend: '+20%',
    color: 'text-yellow-600'
  },
  {
    key: 'showSuperMetaReceita',
    title: 'Super Meta Receita',
    value: 'R$ 105.000,00',
    description: 'Meta estendida de receita',
    icon: Target,
    trend: '+18%',
    color: 'text-yellow-500'
  },
  {
    key: 'showHiperMetaFaturamento',
    title: 'Hiper Meta Faturamento',
    value: 'R$ 500.000,00',
    description: 'Meta máxima de faturamento',
    icon: TrendingUp,
    trend: '+35%',
    color: 'text-red-600'
  },
  {
    key: 'showHiperMetaReceita',
    title: 'Hiper Meta Receita',
    value: 'R$ 150.000,00',
    description: 'Meta máxima de receita',
    icon: TrendingUp,
    trend: '+30%',
    color: 'text-red-500'
  },
  {
    key: 'showMetaFaturamento',
    title: 'Meta Faturamento',
    value: 'R$ 200.000,00',
    description: 'Meta mensal de faturamento',
    icon: Target,
    trend: '0%',
    color: 'text-blue-600'
  },
  {
    key: 'showMetaReceita',
    title: 'Meta Receita',
    value: 'R$ 60.000,00',
    description: 'Meta mensal de receita',
    icon: Target,
    trend: '0%',
    color: 'text-blue-500'
  }
];
