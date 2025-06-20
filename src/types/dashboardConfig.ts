
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
  
  // Nova configuração para tabela de performance dos closers
  showClosersPerformanceTable: boolean;
  
  // Configurações de pré-vendas
  showPreSalesCalls: boolean;
  showPreSalesSchedulings: boolean;
  showPreSalesNoShow: boolean;
  showPreSalesSDRTable: boolean;
  showPreSalesCallsChart: boolean;
  showPreSalesSchedulingChart: boolean;
  showPreSalesNoShowChart: boolean;
  showPreSalesSDRComparisonChart: boolean;
  
  companyName: string;
  metricsOrder: string[];
  preSalesOrder: string[];
  productOrder: string[];
  
  // Novas opções para metas específicas
  showSpecificGoals: boolean;
  selectedGoalIds: string[];

  // Gráficos de evolução
  showRevenueEvolutionChart: boolean;
  showBillingEvolutionChart: boolean;
  
  // Gráficos de performance dos vendedores
  showSellerRevenueChart: boolean;
  showSellerBillingChart: boolean;
  
  // Novos gráficos de análise temporal
  showTemporalRevenueChart: boolean;
  showTemporalBillingChart: boolean;

  // Novos indicadores de produtos (atemporais)
  showProductMetrics: boolean;
  selectedProductIds: string[];
  
  // Indicadores específicos por produto
  showProductTicketReceita: boolean;
  showProductFaturamento: boolean;
  showProductReceita: boolean;
  showProductQuantidadeVendas: boolean;
  showProductMetaFaturamento: boolean;
  showProductMetaReceita: boolean;
  showProductMetaQuantidadeVendas: boolean;
  showProductTicketFaturamento: boolean;
  showProductFaltaFaturamento: boolean;
  showProductFaltaReceita: boolean;
  showProductCashCollect: boolean;
  showProductProjecaoReceita: boolean;
  showProductProjecaoFaturamento: boolean;

  // Novos gráficos e visualizações de produtos
  showProductRevenueEvolutionChart: boolean;
  showProductBillingEvolutionChart: boolean;
  showProductSalesEvolutionChart: boolean;
  showProductPerformanceChart: boolean;
  showProductComparisonChart: boolean;
  showProductTemporalChart: boolean;
}
