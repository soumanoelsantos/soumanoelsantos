
import { TrendingUp, Users, Target, DollarSign, Award } from 'lucide-react';

export const allMetricsCards = [
  {
    key: 'showSales',
    title: 'Total de Vendas',
    value: 'R$ 30.000,00',
    description: 'Total do período',
    icon: DollarSign,
    trend: '+12%',
    color: 'text-green-600'
  },
  {
    key: 'showSales',
    title: 'Número de Vendas',
    value: '7',
    description: 'Total de vendas',
    icon: Target,
    trend: '+5%',
    color: 'text-blue-600'
  },
  {
    key: 'showLeads',
    title: 'Leads Gerados',
    value: '3',
    description: 'Novos leads',
    icon: Users,
    trend: '+8%',
    color: 'text-purple-600'
  },
  {
    key: 'showTicketMedio',
    title: 'Ticket Médio',
    value: 'R$ 5.420',
    description: 'Valor médio por venda',
    icon: TrendingUp,
    trend: '+15%',
    color: 'text-orange-600'
  },
  {
    key: 'showTeam',
    title: 'Performance da Equipe',
    value: '85%',
    description: 'Média geral da equipe',
    icon: Award,
    trend: '+3%',
    color: 'text-indigo-600'
  }
];
