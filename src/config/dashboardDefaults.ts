
import { DashboardConfig } from '@/types/dashboardConfig';

export const defaultConfig: DashboardConfig = {
  showSales: true,
  showLeads: true,
  showConversion: true,
  showTeam: false,
  showRevenue: true,
  showTicketMedio: true,
  // Novas configurações
  showTicketFaturamento: false,
  showTicketReceita: false,
  showFaltaFaturamento: false,
  showFaltaReceita: false,
  showConversao: false,
  showDiariaReceita: false,
  showSuperMetaFaturamento: false,
  showSuperMetaReceita: false,
  showHiperMetaFaturamento: false,
  showHiperMetaReceita: false,
  showCallsDiarias: false,
  showFaltaReceitaSuper: false,
  showFaltaReceitaHiper: false,
  showMetaFaturamento: false,
  showMetaReceita: false,
  showFaturamento: false,
  showReceita: false,
  showQuantidadeVendas: false,
  showCashCollect: false,
  
  companyName: '',
  showMonthlyGoals: true,
  showCharts: true,
  metricsOrder: ['showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam'],
  
  // Novas configurações para metas específicas
  showSpecificGoals: false,
  selectedGoalIds: [],
};
