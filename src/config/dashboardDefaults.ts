
import { DashboardConfig } from '@/types/dashboardConfig';

export const defaultConfig: DashboardConfig = {
  companyName: '',
  
  // Métricas comerciais básicas - habilitadas por padrão
  showConversion: true,
  showRevenue: true,
  
  // Métricas avançadas - desabilitadas por padrão
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
  showProjecaoReceita: false,
  showProjecaoFaturamento: false,
  showNoShow: false,
  
  // Tabela de performance
  showClosersPerformanceTable: true,
  
  // Pré-vendas - habilitadas por padrão
  showPreSalesCalls: true,
  showPreSalesSchedulings: true,
  showPreSalesNoShow: true,
  showPreSalesSDRTable: true,
  showPreSalesCallsChart: true,
  showPreSalesSchedulingChart: true,
  showPreSalesNoShowChart: true,
  showPreSalesSDRComparisonChart: true,
  
  // Gráficos comerciais - habilitados por padrão
  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
  showTemporalRevenueChart: true,
  showTemporalBillingChart: true,
  
  // Produtos - desabilitados por padrão
  showProductMetrics: false,
  selectedProductIds: [],
  showProductTicketReceita: false,
  showProductTicketFaturamento: false,
  showProductFaturamento: false,
  showProductReceita: false,
  showProductQuantidadeVendas: false,
  showProductMetaFaturamento: false,
  showProductMetaReceita: false,
  showProductMetaQuantidadeVendas: false,
  showProductFaltaFaturamento: false,
  showProductFaltaReceita: false,
  showProductCashCollect: false,
  showProductProjecaoReceita: false,
  showProductProjecaoFaturamento: false,
  showProductRevenueEvolutionChart: false,
  showProductBillingEvolutionChart: false,
  
  // Controle de abas - todas habilitadas por padrão
  enableCommercialTab: true,
  enableProductTab: true,
  enablePreSalesTab: true,
  
  // Ordenação
  metricsOrder: [],
  preSalesOrder: [],
  productOrder: []
};
