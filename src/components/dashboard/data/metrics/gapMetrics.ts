
import { TrendingDown } from 'lucide-react';

export const gapMetrics = [
  {
    key: 'showFaltaFaturamento',
    title: 'Falta de Faturamento',
    value: 'R$ 65.000,00',
    description: 'Valor para atingir meta',
    icon: TrendingDown,
    trend: '-5%',
    color: 'text-red-500'
  },
  {
    key: 'showFaltaReceita',
    title: 'Falta de Receita',
    value: 'R$ 22.000,00',
    description: 'Valor para atingir meta',
    icon: TrendingDown,
    trend: '-3%',
    color: 'text-red-400'
  },
  {
    key: 'showFaltaFaturamentoSuper',
    title: 'Falta Faturamento (Super)',
    value: 'R$ 85.000,00',
    description: 'Para atingir super meta',
    icon: TrendingDown,
    trend: '-12%',
    color: 'text-orange-600'
  },
  {
    key: 'showFaltaFaturamentoHiper',
    title: 'Falta Faturamento (Hiper)',
    value: 'R$ 130.000,00',
    description: 'Para atingir hiper meta',
    icon: TrendingDown,
    trend: '-20%',
    color: 'text-red-600'
  },
  {
    key: 'showFaltaReceitaSuper',
    title: 'Falta Receita (Super)',
    value: 'R$ 45.000,00',
    description: 'Para atingir super meta',
    icon: TrendingDown,
    trend: '-8%',
    color: 'text-orange-500'
  },
  {
    key: 'showFaltaReceitaHiper',
    title: 'Falta Receita (Hiper)',
    value: 'R$ 90.000,00',
    description: 'Para atingir hiper meta',
    icon: TrendingDown,
    trend: '-15%',
    color: 'text-red-400'
  }
];
