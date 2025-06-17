
import { Receipt } from 'lucide-react';

export const ticketMetrics = [
  {
    key: 'showTicketFaturamento',
    title: 'Ticket Faturamento',
    value: 'R$ 8.500,00',
    description: 'Ticket médio de faturamento',
    icon: Receipt,
    trend: '+10%',
    color: 'text-green-500'
  },
  {
    key: 'showTicketReceita',
    title: 'Ticket Receita',
    value: 'R$ 2.850,00',
    description: 'Ticket médio de receita',
    icon: Receipt,
    trend: '+7%',
    color: 'text-blue-500'
  }
];
