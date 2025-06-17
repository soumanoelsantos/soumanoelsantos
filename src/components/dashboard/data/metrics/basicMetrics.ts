
import { Users, Award } from 'lucide-react';

export const basicMetrics = [
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
    key: 'showTeam',
    title: 'Performance da Equipe',
    value: '85%',
    description: 'Média geral da equipe',
    icon: Award,
    trend: '+3%',
    color: 'text-indigo-600'
  }
];
