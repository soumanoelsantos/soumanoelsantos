
import { DashboardConfig } from '@/types/dashboardConfig';

export const defaultConfig: DashboardConfig = {
  showConversion: true,
  showRevenue: true,
  showTicketFaturamento: false,
  showTicketReceita: false,
  showFaltaFaturamento: false,
  showFaltaReceita: false,
  showDiariaReceita: false,
  showDiariaFaturamento: false,
  showSuperMetaFaturamento: false,
  showSuperMetaReceita: false,
  showHiperMetaFaturamento: false,
  showHiperMetaReceita: false,
  showFaltaReceitaSuper: false,
  showFaltaReceitaHiper: false,
  showFaltaFaturamentoSuper: false,
  showFaltaFaturamentoHiper: false,
  showMetaFaturamento: false,
  showMetaReceita: false,
  showFaturamento: false,
  showReceita: false,
  showQuantidadeVendas: false,
  showCashCollect: false,
  showCac: false,
  
  // Novos indicadores de projeção com valores padrão corretos
  showProjecaoReceita: false,
  showProjecaoFaturamento: false,
  showNoShow: false,
  
  // Nova configuração para tabela de closers
  showClosersPerformanceTable: true,
  
  // Configurações de pré-vendas com valores padrão
  showPreSalesCalls: true,
  showPreSalesSchedulings: true,
  showPreSalesNoShow: true,
  showPreSalesSDRTable: true,
  showPreSalesCallsChart: true,
  showPreSalesSchedulingChart: true,
  showPreSalesNoShowChart: true,
  showPreSalesSDRComparisonChart: true,
  
  companyName: '',
  metricsOrder: [
    'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
    'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
    'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    // Incluir os novos indicadores na ordem padrão
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow',
    // Incluir a tabela de closers na ordem padrão
    'closersPerformanceTable'
  ],
  preSalesOrder: [
    'showPreSalesCalls', 'showPreSalesSchedulings', 'showPreSalesNoShow', 'showPreSalesSDRTable',
    'showPreSalesCallsChart', 'showPreSalesSchedulingChart', 'showPreSalesNoShowChart', 'showPreSalesSDRComparisonChart'
  ],
  
  showSpecificGoals: false,
  selectedGoalIds: [],

  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
  // Add the new seller chart properties
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
  
  // Add the new temporal chart properties
  showTemporalRevenueChart: true,
  showTemporalBillingChart: true,
};
