
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
  
  // Novos indicadores de projeção
  showProjecaoReceita: false,
  showProjecaoFaturamento: false,
  showNoShow: false,
  
  companyName: 'Minha Empresa',
  metricsOrder: [
    'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
    'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
    'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow',
    'specificGoals', 'revenueEvolutionChart', 'billingEvolutionChart'
  ],
  
  showSpecificGoals: false,
  selectedGoalIds: [],

  // Novos gráficos de evolução habilitados por padrão
  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
};
