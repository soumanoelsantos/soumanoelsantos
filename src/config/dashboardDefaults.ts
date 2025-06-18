
import { DashboardConfig } from '@/types/dashboardConfig';

export const defaultConfig: DashboardConfig = {
  showConversion: true,
  showRevenue: true,
  // Novas configurações
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
  
  companyName: '',
  showMonthlyGoals: true,
  showCharts: true,
  metricsOrder: ['showConversion', 'showRevenue'],
  
  // Novas configurações para metas específicas
  showSpecificGoals: false,
  selectedGoalIds: [],
};
