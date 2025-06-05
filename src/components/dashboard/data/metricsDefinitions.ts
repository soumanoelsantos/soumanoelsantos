
import { TrendingUp, Users, Target, DollarSign, Award, TrendingDown, Receipt } from 'lucide-react';

export const allMetricsCards = [
  // Métricas básicas
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
  },
  
  // Novas métricas - Tickets
  {
    key: 'showTicketFaturamento',
    title: 'Ticket Faturamento',
    value: 'R$ 8.500',
    description: 'Ticket médio de faturamento',
    icon: Receipt,
    trend: '+10%',
    color: 'text-green-500'
  },
  {
    key: 'showTicketReceita',
    title: 'Ticket Receita',
    value: 'R$ 2.850',
    description: 'Ticket médio de receita',
    icon: Receipt,
    trend: '+7%',
    color: 'text-blue-500'
  },
  
  // Faltas
  {
    key: 'showFaltaFaturamento',
    title: 'Falta de Faturamento',
    value: 'R$ 65.000',
    description: 'Valor para atingir meta',
    icon: TrendingDown,
    trend: '-5%',
    color: 'text-red-500'
  },
  {
    key: 'showFaltaReceita',
    title: 'Falta de Receita',
    value: 'R$ 22.000',
    description: 'Valor para atingir meta',
    icon: TrendingDown,
    trend: '-3%',
    color: 'text-red-400'
  },
  
  // Conversão
  {
    key: 'showConversao',
    title: 'Conversão',
    value: '22%',
    description: 'Taxa de conversão atual',
    icon: Target,
    trend: '+2%',
    color: 'text-green-600'
  },
  
  // Diária de receita
  {
    key: 'showDiariaReceita',
    title: 'Diária de Receita',
    value: 'R$ 1.950',
    description: 'Receita média diária',
    icon: DollarSign,
    trend: '+8%',
    color: 'text-purple-500'
  },
  
  // Super Metas
  {
    key: 'showSuperMetaFaturamento',
    title: 'Super Meta Faturamento',
    value: 'R$ 350.000',
    description: 'Meta estendida de faturamento',
    icon: Target,
    trend: '+20%',
    color: 'text-yellow-600'
  },
  {
    key: 'showSuperMetaReceita',
    title: 'Super Meta Receita',
    value: 'R$ 105.000',
    description: 'Meta estendida de receita',
    icon: Target,
    trend: '+18%',
    color: 'text-yellow-500'
  },
  
  // Hiper Metas
  {
    key: 'showHiperMetaFaturamento',
    title: 'Hiper Meta Faturamento',
    value: 'R$ 500.000',
    description: 'Meta máxima de faturamento',
    icon: TrendingUp,
    trend: '+35%',
    color: 'text-red-600'
  },
  {
    key: 'showHiperMetaReceita',
    title: 'Hiper Meta Receita',
    value: 'R$ 150.000',
    description: 'Meta máxima de receita',
    icon: TrendingUp,
    trend: '+30%',
    color: 'text-red-500'
  },
  
  // Calls e outras métricas
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
    key: 'showFaltaReceitaSuper',
    title: 'Falta Receita (Super)',
    value: 'R$ 45.000',
    description: 'Para atingir super meta',
    icon: TrendingDown,
    trend: '-8%',
    color: 'text-orange-500'
  },
  {
    key: 'showFaltaReceitaHiper',
    title: 'Falta Receita (Hiper)',
    value: 'R$ 90.000',
    description: 'Para atingir hiper meta',
    icon: TrendingDown,
    trend: '-15%',
    color: 'text-red-400'
  },
  
  // Metas básicas
  {
    key: 'showMetaFaturamento',
    title: 'Meta Faturamento',
    value: 'R$ 200.000',
    description: 'Meta mensal de faturamento',
    icon: Target,
    trend: '0%',
    color: 'text-blue-600'
  },
  {
    key: 'showMetaReceita',
    title: 'Meta Receita',
    value: 'R$ 60.000',
    description: 'Meta mensal de receita',
    icon: Target,
    trend: '0%',
    color: 'text-blue-500'
  },
  
  // Faturamento e Receita atuais
  {
    key: 'showFaturamento',
    title: 'Faturamento',
    value: 'R$ 135.000',
    description: 'Faturamento atual',
    icon: DollarSign,
    trend: '+15%',
    color: 'text-green-600'
  },
  {
    key: 'showReceita',
    title: 'Receita',
    value: 'R$ 38.000',
    description: 'Receita atual',
    icon: DollarSign,
    trend: '+12%',
    color: 'text-green-500'
  },
  
  // Quantidade de vendas
  {
    key: 'showQuantidadeVendas',
    title: 'Quantidade de Vendas',
    value: '18',
    description: 'Total de vendas realizadas',
    icon: Target,
    trend: '+22%',
    color: 'text-blue-600'
  },
  
  // Cash Collect
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
