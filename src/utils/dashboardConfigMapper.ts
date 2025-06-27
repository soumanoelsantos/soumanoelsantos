
import { DashboardConfig } from '@/types/dashboardConfig';

export const mapConfigToDatabase = (config: DashboardConfig) => {
  console.log('🔄 Mapping config to database format:', config);
  
  const dbConfig = {
    company_name: config.companyName || '',
    
    // Métricas comerciais - mapeamento consistente
    show_conversion: Boolean(config.showConversion),
    show_revenue: Boolean(config.showRevenue),
    show_ticket_faturamento: Boolean(config.showTicketFaturamento),
    show_ticket_receita: Boolean(config.showTicketReceita),
    show_falta_faturamento: Boolean(config.showFaltaFaturamento),
    show_falta_receita: Boolean(config.showFaltaReceita),
    show_diaria_receita: Boolean(config.showDiariaReceita),
    show_diaria_faturamento: Boolean(config.showDiariaFaturamento),
    show_super_meta_faturamento: Boolean(config.showSuperMetaFaturamento),
    show_super_meta_receita: Boolean(config.showSuperMetaReceita),
    show_hiper_meta_faturamento: Boolean(config.showHiperMetaFaturamento),
    show_hiper_meta_receita: Boolean(config.showHiperMetaReceita),
    show_falta_receita_super: Boolean(config.showFaltaReceitaSuper),
    show_falta_receita_hiper: Boolean(config.showFaltaReceitaHiper),
    show_falta_faturamento_super: Boolean(config.showFaltaFaturamentoSuper),
    show_falta_faturamento_hiper: Boolean(config.showFaltaFaturamentoHiper),
    show_meta_faturamento: Boolean(config.showMetaFaturamento),
    show_meta_receita: Boolean(config.showMetaReceita),
    show_faturamento: Boolean(config.showFaturamento),
    show_receita: Boolean(config.showReceita),
    show_quantidade_vendas: Boolean(config.showQuantidadeVendas),
    show_cash_collect: Boolean(config.showCashCollect),
    show_cac: Boolean(config.showCac),
    show_projecao_receita: Boolean(config.showProjecaoReceita),
    show_projecao_faturamento: Boolean(config.showProjecaoFaturamento),
    show_no_show: Boolean(config.showNoShow),
    show_closers_performance_table: Boolean(config.showClosersPerformanceTable),
    
    // Pré-vendas
    show_pre_sales_calls: Boolean(config.showPreSalesCalls),
    show_pre_sales_schedulings: Boolean(config.showPreSalesSchedulings),
    show_pre_sales_no_show: Boolean(config.showPreSalesNoShow),
    show_pre_sales_sdr_table: Boolean(config.showPreSalesSDRTable),
    show_pre_sales_calls_chart: Boolean(config.showPreSalesCallsChart),
    show_pre_sales_scheduling_chart: Boolean(config.showPreSalesSchedulingChart),
    show_pre_sales_no_show_chart: Boolean(config.showPreSalesNoShowChart),
    show_pre_sales_sdr_comparison_chart: Boolean(config.showPreSalesSDRComparisonChart),
    
    // Arrays - salvando como JSON
    metrics_order: config.metricsOrder || [],
    pre_sales_order: config.preSalesOrder || [],
    product_order: config.productOrder || [],
    selected_product_ids: config.selectedProductIds || [],
    
    // Gráficos comerciais
    show_revenue_evolution_chart: Boolean(config.showRevenueEvolutionChart),
    show_billing_evolution_chart: Boolean(config.showBillingEvolutionChart),
    show_seller_revenue_chart: Boolean(config.showSellerRevenueChart),
    show_seller_billing_chart: Boolean(config.showSellerBillingChart),
    show_temporal_revenue_chart: Boolean(config.showTemporalRevenueChart),
    show_temporal_billing_chart: Boolean(config.showTemporalBillingChart),
    
    // Produtos
    show_product_metrics: Boolean(config.showProductMetrics),
    show_product_ticket_receita: Boolean(config.showProductTicketReceita),
    show_product_ticket_faturamento: Boolean(config.showProductTicketFaturamento),
    show_product_faturamento: Boolean(config.showProductFaturamento),
    show_product_receita: Boolean(config.showProductReceita),
    show_product_quantidade_vendas: Boolean(config.showProductQuantidadeVendas),
    show_product_meta_faturamento: Boolean(config.showProductMetaFaturamento),
    show_product_meta_receita: Boolean(config.showProductMetaReceita),
    show_product_meta_quantidade_vendas: Boolean(config.showProductMetaQuantidadeVendas),
    show_product_falta_faturamento: Boolean(config.showProductFaltaFaturamento),
    show_product_falta_receita: Boolean(config.showProductFaltaReceita),
    show_product_cash_collect: Boolean(config.showProductCashCollect),
    show_product_projecao_receita: Boolean(config.showProductProjecaoReceita),
    show_product_projecao_faturamento: Boolean(config.showProductProjecaoFaturamento),
    show_product_revenue_evolution_chart: Boolean(config.showProductRevenueEvolutionChart),
    show_product_billing_evolution_chart: Boolean(config.showProductBillingEvolutionChart),

    // Controle de abas
    enable_commercial_tab: Boolean(config.enableCommercialTab ?? true),
    enable_product_tab: Boolean(config.enableProductTab ?? true),
    enable_pre_sales_tab: Boolean(config.enablePreSalesTab ?? true),
  };
  
  console.log('🔄 Mapped database config:', dbConfig);
  return dbConfig;
};

export const mapDatabaseToConfig = (data: any): DashboardConfig => {
  console.log('🔄 Mapping database data to config:', data);
  
  const config = {
    companyName: data.company_name || '',
    
    // Métricas comerciais - conversão consistente para boolean
    showConversion: Boolean(data.show_conversion ?? true),
    showRevenue: Boolean(data.show_revenue ?? true),
    showTicketFaturamento: Boolean(data.show_ticket_faturamento ?? false),
    showTicketReceita: Boolean(data.show_ticket_receita ?? false),
    showFaltaFaturamento: Boolean(data.show_falta_faturamento ?? false),
    showFaltaReceita: Boolean(data.show_falta_receita ?? false),
    showDiariaReceita: Boolean(data.show_diaria_receita ?? false),
    showDiariaFaturamento: Boolean(data.show_diaria_faturamento ?? false),
    showSuperMetaFaturamento: Boolean(data.show_super_meta_faturamento ?? false),
    showSuperMetaReceita: Boolean(data.show_super_meta_receita ?? false),
    showHiperMetaFaturamento: Boolean(data.show_hiper_meta_faturamento ?? false),
    showHiperMetaReceita: Boolean(data.show_hiper_meta_receita ?? false),
    showFaltaReceitaSuper: Boolean(data.show_falta_receita_super ?? false),
    showFaltaReceitaHiper: Boolean(data.show_falta_receita_hiper ?? false),
    showFaltaFaturamentoSuper: Boolean(data.show_falta_faturamento_super ?? false),
    showFaltaFaturamentoHiper: Boolean(data.show_falta_faturamento_hiper ?? false),
    showMetaFaturamento: Boolean(data.show_meta_faturamento ?? false),
    showMetaReceita: Boolean(data.show_meta_receita ?? false),
    showFaturamento: Boolean(data.show_faturamento ?? false),
    showReceita: Boolean(data.show_receita ?? false),
    showQuantidadeVendas: Boolean(data.show_quantidade_vendas ?? false),
    showCashCollect: Boolean(data.show_cash_collect ?? false),
    showCac: Boolean(data.show_cac ?? false),
    showProjecaoReceita: Boolean(data.show_projecao_receita ?? false),
    showProjecaoFaturamento: Boolean(data.show_projecao_faturamento ?? false),
    showNoShow: Boolean(data.show_no_show ?? false),
    showClosersPerformanceTable: Boolean(data.show_closers_performance_table ?? true),
    
    // Pré-vendas
    showPreSalesCalls: Boolean(data.show_pre_sales_calls ?? true),
    showPreSalesSchedulings: Boolean(data.show_pre_sales_schedulings ?? true),
    showPreSalesNoShow: Boolean(data.show_pre_sales_no_show ?? true),
    showPreSalesSDRTable: Boolean(data.show_pre_sales_sdr_table ?? true),
    showPreSalesCallsChart: Boolean(data.show_pre_sales_calls_chart ?? true),
    showPreSalesSchedulingChart: Boolean(data.show_pre_sales_scheduling_chart ?? true),
    showPreSalesNoShowChart: Boolean(data.show_pre_sales_no_show_chart ?? true),
    showPreSalesSDRComparisonChart: Boolean(data.show_pre_sales_sdr_comparison_chart ?? true),
    
    // Arrays - tratamento seguro
    metricsOrder: Array.isArray(data.metrics_order) ? data.metrics_order : [],
    preSalesOrder: Array.isArray(data.pre_sales_order) ? data.pre_sales_order : [],
    productOrder: Array.isArray(data.product_order) ? data.product_order : [],
    selectedProductIds: Array.isArray(data.selected_product_ids) ? data.selected_product_ids : [],
    
    // Gráficos comerciais
    showRevenueEvolutionChart: Boolean(data.show_revenue_evolution_chart ?? true),
    showBillingEvolutionChart: Boolean(data.show_billing_evolution_chart ?? true),
    showSellerRevenueChart: Boolean(data.show_seller_revenue_chart ?? true),
    showSellerBillingChart: Boolean(data.show_seller_billing_chart ?? true),
    showTemporalRevenueChart: Boolean(data.show_temporal_revenue_chart ?? true),
    showTemporalBillingChart: Boolean(data.show_temporal_billing_chart ?? true),
    
    // Produtos
    showProductMetrics: Boolean(data.show_product_metrics ?? false),
    showProductTicketReceita: Boolean(data.show_product_ticket_receita ?? false),
    showProductTicketFaturamento: Boolean(data.show_product_ticket_faturamento ?? false),
    showProductFaturamento: Boolean(data.show_product_faturamento ?? false),
    showProductReceita: Boolean(data.show_product_receita ?? false),
    showProductQuantidadeVendas: Boolean(data.show_product_quantidade_vendas ?? false),
    showProductMetaFaturamento: Boolean(data.show_product_meta_faturamento ?? false),
    showProductMetaReceita: Boolean(data.show_product_meta_receita ?? false),
    showProductMetaQuantidadeVendas: Boolean(data.show_product_meta_quantidade_vendas ?? false),
    showProductFaltaFaturamento: Boolean(data.show_product_falta_faturamento ?? false),
    showProductFaltaReceita: Boolean(data.show_product_falta_receita ?? false),
    showProductCashCollect: Boolean(data.show_product_cash_collect ?? false),
    showProductProjecaoReceita: Boolean(data.show_product_projecao_receita ?? false),
    showProductProjecaoFaturamento: Boolean(data.show_product_projecao_faturamento ?? false),
    showProductRevenueEvolutionChart: Boolean(data.show_product_revenue_evolution_chart ?? false),
    showProductBillingEvolutionChart: Boolean(data.show_product_billing_evolution_chart ?? false),

    // Controle de abas - com valores padrão seguros
    enableCommercialTab: Boolean(data.enable_commercial_tab ?? true),
    enableProductTab: Boolean(data.enable_product_tab ?? true),
    enablePreSalesTab: Boolean(data.enable_pre_sales_tab ?? true),
  };
  
  console.log('🔄 Mapped config object:', config);
  return config;
};
