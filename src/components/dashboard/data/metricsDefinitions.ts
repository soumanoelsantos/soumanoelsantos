
import { TrendingUp, Users, Target, DollarSign, Award, TrendingDown, Receipt } from 'lucide-react';

export const allMetricsCards = [
  // Métricas básicas (removidos Total de Vendas, Número de Vendas e Ticket Médio)
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
  },
  
  // Tickets
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
  },
  
  // Faltas
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
    value: 'R$ 1.950,00',
    description: 'Receita média diária',
    icon: DollarSign,
    trend: '+8%',
    color: 'text-purple-500'
  },
  
  // Super Metas
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
  
  // Hiper Metas
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
  },
  
  // Metas básicas
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
  },
  
  // Faturamento e Receita atuais
  {
    key: 'showFaturamento',
    title: 'Faturamento',
    value: 'R$ 135.000,00',
    description: 'Faturamento atual',
    icon: DollarSign,
    trend: '+15%',
    color: 'text-green-600'
  },
  {
    key: 'showReceita',
    title: 'Receita',
    value: 'R$ 38.000,00',
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
