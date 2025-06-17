
export interface DashboardConfig {
  showSales: boolean;
  showLeads: boolean;
  showConversion: boolean;
  showTeam: boolean;
  showRevenue: boolean;
  showTicketMedio: boolean;
  // Novas opções
  showTicketFaturamento: boolean;
  showTicketReceita: boolean;
  showFaltaFaturamento: boolean;
  showFaltaReceita: boolean;
  showConversao: boolean;
  showDiariaReceita: boolean;
  showSuperMetaFaturamento: boolean;
  showSuperMetaReceita: boolean;
  showHiperMetaFaturamento: boolean;
  showHiperMetaReceita: boolean;
  showCallsDiarias: boolean;
  showFaltaReceitaSuper: boolean;
  showFaltaReceitaHiper: boolean;
  showMetaFaturamento: boolean;
  showMetaReceita: boolean;
  showFaturamento: boolean;
  showReceita: boolean;
  showQuantidadeVendas: boolean;
  showCashCollect: boolean;
  
  companyName: string;
  showMonthlyGoals: boolean;
  showCharts: boolean;
  metricsOrder: string[];
  
  // Novas opções para metas específicas
  showSpecificGoals: boolean;
  selectedGoalIds: string[];
}
