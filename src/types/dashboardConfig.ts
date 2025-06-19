
export interface DashboardConfig {
  showConversion: boolean;
  showRevenue: boolean;
  // Novas opções
  showTicketFaturamento: boolean;
  showTicketReceita: boolean;
  showFaltaFaturamento: boolean;
  showFaltaReceita: boolean;
  showDiariaReceita: boolean;
  showDiariaFaturamento: boolean;
  showSuperMetaFaturamento: boolean;
  showSuperMetaReceita: boolean;
  showHiperMetaFaturamento: boolean;
  showHiperMetaReceita: boolean;
  showFaltaReceitaSuper: boolean;
  showFaltaReceitaHiper: boolean;
  showFaltaFaturamentoSuper: boolean;
  showFaltaFaturamentoHiper: boolean;
  showMetaFaturamento: boolean;
  showMetaReceita: boolean;
  showFaturamento: boolean;
  showReceita: boolean;
  showQuantidadeVendas: boolean;
  showCashCollect: boolean;
  showCac: boolean;
  
  // Novos indicadores de projeção
  showProjecaoReceita: boolean;
  showProjecaoFaturamento: boolean;
  showNoShow: boolean;
  
  companyName: string;
  metricsOrder: string[];
  
  // Novas opções para metas específicas
  showSpecificGoals: boolean;
  selectedGoalIds: string[];

  // Novos gráficos de evolução
  showRevenueEvolutionChart: boolean;
  showBillingEvolutionChart: boolean;
}
