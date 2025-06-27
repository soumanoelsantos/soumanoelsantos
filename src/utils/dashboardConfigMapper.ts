
import { DashboardConfig } from '@/types/dashboardConfig';

export const mapConfigToDatabase = (config: DashboardConfig) => {
  console.log('🔄 Mapping config to database format:', config);
  
  const dbConfig = {
    metrics_order: config.metricsOrder,
    pre_sales_order: config.preSalesOrder,
    product_order: config.productOrder,
    show_conversion: config.showConversion,
    show_revenue: config.showRevenue,
    show_ticket_faturamento: config.showTicketFaturamento,
    show_ticket_receita: config.showTicketReceita,
    show_falta_faturamento: config.showFaltaFaturamento,
    show_falta_receita: config.showFaltaReceita,
    show_diaria_receita: config.showDiariaReceita,
    show_diaria_faturamento: config.showDiariaFaturamento,
    show_super_meta_faturamento: config.showSuperMetaFaturamento,
    show_super_meta_receita: config.showSuperMetaReceita,
    show_hiper_meta_faturamento: config.showHiperMetaFaturamento,
    show_hiper_meta_receita: config.showHiperMetaReceita,
    show_falta_receita_super: config.showFaltaReceitaSuper,
    show_falta_receita_hiper: config.showFaltaReceitaHiper,
    show_falta_faturamento_super: config.showFaltaFaturamentoSuper,
    show_falta_faturamento_hiper: config.showFaltaFaturamentoHiper,
    show_meta_faturamento: config.showMetaFaturamento,
    show_meta_receita: config.showMetaReceita,
    show_faturamento: config.showFaturamento,
    show_receita: config.showReceita,
    show_quantidade_vendas: config.showQuantidadeVendas,
    show_cash_collect: config.showCashCollect,
    show_cac: config.showCac,
    show_projecao_receita: config.showProjecaoReceita,
    show_projecao_faturamento: config.showProjecaoFaturamento,
    show_no_show: config.showNoShow,
    show_closers_performance_table: config.showClosersPerformanceTable,
    show_pre_sales_calls: config.showPreSalesCalls,
    show_pre_sales_schedulings: config.showPreSalesSchedulings,
    show_pre_sales_no_show: config.showPreSalesNoShow,
    show_pre_sales_sdr_table: config.showPreSalesSDRTable,
    show_pre_sales_calls_chart: config.showPreSalesCallsChart,
    show_pre_sales_scheduling_chart: config.showPreSalesSchedulingChart,
    show_pre_sales_no_show_chart: config.showPreSalesNoShowChart,
    show_pre_sales_sdr_comparison_chart: config.showPreSalesSDRComparisonChart,
    
    // CAMPO NOME DA EMPRESA - CORRIGIDO
    company_name: config.companyName || '',
    
    show_revenue_evolution_chart: config.showRevenueEvolutionChart,
    show_billing_evolution_chart: config.showBillingEvolutionChart,
    show_seller_revenue_chart: config.showSellerRevenueChart,
    show_seller_billing_chart: config.showSellerBillingChart,
    show_temporal_revenue_chart: config.showTemporalRevenueChart,
    show_temporal_billing_chart: config.showTemporalBillingChart,
    show_product_metrics: config.showProductMetrics,
    selected_product_ids: config.selectedProductIds,
    show_product_ticket_receita: config.showProductTicketReceita,
    show_product_ticket_faturamento: config.showProductTicketFaturamento,
    show_product_faturamento: config.showProductFaturamento,
    show_product_receita: config.showProductReceita,
    show_product_quantidade_vendas: config.showProductQuantidadeVendas,
    show_product_meta_faturamento: config.showProductMetaFaturamento,
    show_product_meta_receita: config.showProductMetaReceita,
    show_product_meta_quantidade_vendas: config.showProductMetaQuantidadeVendas,
    show_product_falta_faturamento: config.showProductFaltaFaturamento,
    show_product_falta_receita: config.showProductFaltaReceita,
    show_product_cash_collect: config.showProductCashCollect,
    show_product_projecao_receita: config.showProductProjecaoReceita,
    show_product_projecao_faturamento: config.showProductProjecaoFaturamento,
    
    // Product charts mappings
    show_product_revenue_evolution_chart: config.showProductRevenueEvolutionChart,
    show_product_billing_evolution_chart: config.showProductBillingEvolutionChart,

    // MAPEAMENTOS DE CONTROLE DE ABAS - CORRIGIDO
    enable_commercial_tab: config.enableCommercialTab,
    enable_product_tab: config.enableProductTab,
    enable_pre_sales_tab: config.enablePreSalesTab,
  };
  
  console.log('🔄 Mapped database config:', dbConfig);
  return dbConfig;
};

export const mapDatabaseToConfig = (data: any): DashboardConfig => {
  console.log('🔄 Mapping database data to config:', data);
  
  const config = {
    showConversion: data.show_conversion ?? true,
    showRevenue: data.show_revenue ?? true,
    showTicketFaturamento: data.show_ticket_faturamento ?? false,
    showTicketReceita: data.show_ticket_receita ?? false,
    showFaltaFaturamento: data.show_falta_faturamento ?? false,
    showFaltaReceita: data.show_falta_receita ?? false,
    showDiariaReceita: data.show_diaria_receita ?? false,
    showDiariaFaturamento: data.show_diaria_faturamento ?? false,
    showSuperMetaFaturamento: data.show_super_meta_faturamento ?? false,
    showSuperMetaReceita: data.show_super_meta_receita ?? false,
    showHiperMetaFaturamento: data.show_hiper_meta_faturamento ?? false,
    showHiperMetaReceita: data.show_hiper_meta_receita ?? false,
    showFaltaReceitaSuper: data.show_falta_receita_super ?? false,
    showFaltaReceitaHiper: data.show_falta_receita_hiper ?? false,
    showFaltaFaturamentoSuper: data.show_falta_faturamento_super ?? false,
    showFaltaFaturamentoHiper: data.show_falta_faturamento_hiper ?? false,
    showMetaFaturamento: data.show_meta_faturamento ?? false,
    showMetaReceita: data.show_meta_receita ?? false,
    showFaturamento: data.show_faturamento ?? false,
    showReceita: data.show_receita ?? false,
    showQuantidadeVendas: data.show_quantidade_vendas ?? false,
    showCashCollect: data.show_cash_collect ?? false,
    showCac: data.show_cac ?? false,
    showProjecaoReceita: data.show_projecao_receita ?? false,
    showProjecaoFaturamento: data.show_projecao_faturamento ?? false,
    showNoShow: data.show_no_show ?? false,
    showClosersPerformanceTable: data.show_closers_performance_table ?? true,
    showPreSalesCalls: data.show_pre_sales_calls ?? true,
    showPreSalesSchedulings: data.show_pre_sales_schedulings ?? true,
    showPreSalesNoShow: data.show_pre_sales_no_show ?? true,
    showPreSalesSDRTable: data.show_pre_sales_sdr_table ?? true,
    showPreSalesCallsChart: data.show_pre_sales_calls_chart ?? true,
    showPreSalesSchedulingChart: data.show_pre_sales_scheduling_chart ?? true,
    showPreSalesNoShowChart: data.show_pre_sales_no_show_chart ?? true,
    showPreSalesSDRComparisonChart: data.show_pre_sales_sdr_comparison_chart ?? true,
    
    // NOME DA EMPRESA - CORRIGIDO
    companyName: data.company_name || '',
    
    metricsOrder: data.metrics_order || [],
    preSalesOrder: data.pre_sales_order || [],
    productOrder: data.product_order || [],
    showRevenueEvolutionChart: data.show_revenue_evolution_chart ?? true,
    showBillingEvolutionChart: data.show_billing_evolution_chart ?? true,
    showSellerRevenueChart: data.show_seller_revenue_chart ?? true,
    showSellerBillingChart: data.show_seller_billing_chart ?? true,
    showTemporalRevenueChart: data.show_temporal_revenue_chart ?? true,
    showTemporalBillingChart: data.show_temporal_billing_chart ?? true,
    showProductMetrics: data.show_product_metrics ?? false,
    selectedProductIds: data.selected_product_ids || [],
    showProductTicketReceita: data.show_product_ticket_receita ?? false,
    showProductTicketFaturamento: data.show_product_ticket_faturamento ?? false,
    showProductFaturamento: data.show_product_faturamento ?? false,
    showProductReceita: data.show_product_receita ?? false,
    showProductQuantidadeVendas: data.show_product_quantidade_vendas ?? false,
    showProductMetaFaturamento: data.show_product_meta_faturamento ?? false,
    showProductMetaReceita: data.show_product_meta_receita ?? false,
    showProductMetaQuantidadeVendas: data.show_product_meta_quantidade_vendas ?? false,
    showProductFaltaFaturamento: data.show_product_falta_faturamento ?? false,
    showProductFaltaReceita: data.show_product_falta_receita ?? false,
    showProductCashCollect: data.show_product_cash_collect ?? false,
    showProductProjecaoReceita: data.show_product_projecao_receita ?? false,
    showProductProjecaoFaturamento: data.show_product_projecao_faturamento ?? false,
    
    // Product charts fields
    showProductRevenueEvolutionChart: data.show_product_revenue_evolution_chart ?? false,
    showProductBillingEvolutionChart: data.show_product_billing_evolution_chart ?? false,

    // CAMPOS DE CONTROLE DE ABAS - CORRIGIDO
    enableCommercialTab: data.enable_commercial_tab ?? true,
    enableProductTab: data.enable_product_tab ?? true,
    enablePreSalesTab: data.enable_pre_sales_tab ?? true,
  };
  
  console.log('🔄 Mapped config object:', config);
  return config;
};
