import { DashboardConfig } from '@/types/dashboardConfig';
import { defaultConfig } from '@/config/dashboardDefaults';

export const mapDatabaseToConfig = (data: any): DashboardConfig => {
  console.log('🔵 dashboardConfigMapper - Mapping database data to config:', data);
  
  // Safely parse metrics_order with type checking
  let metricsOrder = defaultConfig.metricsOrder;
  if (data.metrics_order) {
    if (Array.isArray(data.metrics_order)) {
      metricsOrder = data.metrics_order as string[];
    } else if (typeof data.metrics_order === 'string') {
      try {
        const parsed = JSON.parse(data.metrics_order);
        if (Array.isArray(parsed)) {
          metricsOrder = parsed;
        }
      } catch (e) {
        console.warn('🟡 Failed to parse metrics_order, using default');
      }
    }
  }

  // Safely parse pre_sales_order with type checking
  let preSalesOrder = defaultConfig.preSalesOrder;
  if (data.pre_sales_order) {
    if (Array.isArray(data.pre_sales_order)) {
      preSalesOrder = data.pre_sales_order as string[];
    } else if (typeof data.pre_sales_order === 'string') {
      try {
        const parsed = JSON.parse(data.pre_sales_order);
        if (Array.isArray(parsed)) {
          preSalesOrder = parsed;
        }
      } catch (e) {
        console.warn('🟡 Failed to parse pre_sales_order, using default');
      }
    }
  }

  // Safely parse product_order with type checking
  let productOrder = defaultConfig.productOrder;
  if (data.product_order) {
    if (Array.isArray(data.product_order)) {
      productOrder = data.product_order as string[];
    } else if (typeof data.product_order === 'string') {
      try {
        const parsed = JSON.parse(data.product_order);
        if (Array.isArray(parsed)) {
          productOrder = parsed;
        }
      } catch (e) {
        console.warn('🟡 Failed to parse product_order, using default');
      }
    }
  }

  // Safely parse selected_goal_ids with type checking
  let selectedGoalIds = defaultConfig.selectedGoalIds;
  if (data.selected_goal_ids) {
    if (Array.isArray(data.selected_goal_ids)) {
      selectedGoalIds = data.selected_goal_ids as string[];
    } else if (typeof data.selected_goal_ids === 'string') {
      try {
        const parsed = JSON.parse(data.selected_goal_ids);
        if (Array.isArray(parsed)) {
          selectedGoalIds = parsed;
        }
      } catch (e) {
        console.warn('🟡 Failed to parse selected_goal_ids, using default');
      }
    }
  }

  // Safely parse selected_product_ids with type checking
  let selectedProductIds = defaultConfig.selectedProductIds;
  if (data.selected_product_ids) {
    if (Array.isArray(data.selected_product_ids)) {
      selectedProductIds = data.selected_product_ids as string[];
    } else if (typeof data.selected_product_ids === 'string') {
      try {
        const parsed = JSON.parse(data.selected_product_ids);
        if (Array.isArray(parsed)) {
          selectedProductIds = parsed;
        }
      } catch (e) {
        console.warn('🟡 Failed to parse selected_product_ids, using default');
      }
    }
  }

  const mappedConfig = {
    showConversion: data.show_conversion ?? defaultConfig.showConversion,
    showRevenue: data.show_revenue ?? defaultConfig.showRevenue,
    showTicketFaturamento: data.show_ticket_faturamento ?? defaultConfig.showTicketFaturamento,
    showTicketReceita: data.show_ticket_receita ?? defaultConfig.showTicketReceita,
    showFaltaFaturamento: data.show_falta_faturamento ?? defaultConfig.showFaltaFaturamento,
    showFaltaReceita: data.show_falta_receita ?? defaultConfig.showFaltaReceita,
    showDiariaReceita: data.show_diaria_receita ?? defaultConfig.showDiariaReceita,
    showDiariaFaturamento: data.show_diaria_faturamento ?? defaultConfig.showDiariaFaturamento,
    showSuperMetaFaturamento: data.show_super_meta_faturamento ?? defaultConfig.showSuperMetaFaturamento,
    showSuperMetaReceita: data.show_super_meta_receita ?? defaultConfig.showSuperMetaReceita,
    showHiperMetaFaturamento: data.show_hiper_meta_faturamento ?? defaultConfig.showHiperMetaFaturamento,
    showHiperMetaReceita: data.show_hiper_meta_receita ?? defaultConfig.showHiperMetaReceita,
    showFaltaReceitaSuper: data.show_falta_receita_super ?? defaultConfig.showFaltaReceitaSuper,
    showFaltaReceitaHiper: data.show_falta_receita_hiper ?? defaultConfig.showFaltaReceitaHiper,
    showFaltaFaturamentoSuper: data.show_falta_faturamento_super ?? defaultConfig.showFaltaFaturamentoSuper,
    showFaltaFaturamentoHiper: data.show_falta_faturamento_hiper ?? defaultConfig.showFaltaFaturamentoHiper,
    showMetaFaturamento: data.show_meta_faturamento ?? defaultConfig.showMetaFaturamento,
    showMetaReceita: data.show_meta_receita ?? defaultConfig.showMetaReceita,
    showFaturamento: data.show_faturamento ?? defaultConfig.showFaturamento,
    showReceita: data.show_receita ?? defaultConfig.showReceita,
    showQuantidadeVendas: data.show_quantidade_vendas ?? defaultConfig.showQuantidadeVendas,
    showCashCollect: data.show_cash_collect ?? defaultConfig.showCashCollect,
    showCac: data.show_cac ?? defaultConfig.showCac,
    
    // Novos indicadores de projeção - mapeamento correto com as colunas do banco
    showProjecaoReceita: data.show_projecao_receita ?? defaultConfig.showProjecaoReceita,
    showProjecaoFaturamento: data.show_projecao_faturamento ?? defaultConfig.showProjecaoFaturamento,
    showNoShow: data.show_no_show ?? defaultConfig.showNoShow,
    
    // Nova tabela de performance dos closers
    showClosersPerformanceTable: data.show_closers_performance_table ?? defaultConfig.showClosersPerformanceTable,
    
    // Configurações de pré-vendas
    showPreSalesCalls: data.show_pre_sales_calls ?? defaultConfig.showPreSalesCalls,
    showPreSalesSchedulings: data.show_pre_sales_schedulings ?? defaultConfig.showPreSalesSchedulings,
    showPreSalesNoShow: data.show_pre_sales_no_show ?? defaultConfig.showPreSalesNoShow,
    showPreSalesSDRTable: data.show_pre_sales_sdr_table ?? defaultConfig.showPreSalesSDRTable,
    showPreSalesCallsChart: data.show_pre_sales_calls_chart ?? defaultConfig.showPreSalesCallsChart,
    showPreSalesSchedulingChart: data.show_pre_sales_scheduling_chart ?? defaultConfig.showPreSalesSchedulingChart,
    showPreSalesNoShowChart: data.show_pre_sales_no_show_chart ?? defaultConfig.showPreSalesNoShowChart,
    showPreSalesSDRComparisonChart: data.show_pre_sales_sdr_comparison_chart ?? defaultConfig.showPreSalesSDRComparisonChart,
    
    companyName: data.company_name || defaultConfig.companyName,
    metricsOrder: metricsOrder,
    preSalesOrder: preSalesOrder,
    productOrder: productOrder,
    
    showSpecificGoals: data.show_specific_goals ?? defaultConfig.showSpecificGoals,
    selectedGoalIds: selectedGoalIds,

    // Mapeamento explícito dos gráficos de evolução com fallback para true
    showRevenueEvolutionChart: data.show_revenue_evolution_chart !== undefined ? data.show_revenue_evolution_chart : true,
    showBillingEvolutionChart: data.show_billing_evolution_chart !== undefined ? data.show_billing_evolution_chart : true,
    
    // Mapeamento dos novos gráficos de vendedores
    showSellerRevenueChart: data.show_seller_revenue_chart !== undefined ? data.show_seller_revenue_chart : true,
    showSellerBillingChart: data.show_seller_billing_chart !== undefined ? data.show_seller_billing_chart : true,
    
    // Mapeamento dos novos gráficos de análise temporal
    showTemporalRevenueChart: data.show_temporal_revenue_chart !== undefined ? data.show_temporal_revenue_chart : true,
    showTemporalBillingChart: data.show_temporal_billing_chart !== undefined ? data.show_temporal_billing_chart : true,

    // Product metrics fields
    showProductMetrics: data.show_product_metrics ?? defaultConfig.showProductMetrics,
    selectedProductIds: selectedProductIds,
    showProductTicketReceita: data.show_product_ticket_receita ?? defaultConfig.showProductTicketReceita,
    showProductTicketFaturamento: data.show_product_ticket_faturamento ?? defaultConfig.showProductTicketFaturamento,
    showProductFaturamento: data.show_product_faturamento ?? defaultConfig.showProductFaturamento,
    showProductReceita: data.show_product_receita ?? defaultConfig.showProductReceita,
    showProductQuantidadeVendas: data.show_product_quantidade_vendas ?? defaultConfig.showProductQuantidadeVendas,
    showProductMetaFaturamento: data.show_product_meta_faturamento ?? defaultConfig.showProductMetaFaturamento,
    showProductMetaReceita: data.show_product_meta_receita ?? defaultConfig.showProductMetaReceita,
    showProductMetaQuantidadeVendas: data.show_product_meta_quantidade_vendas ?? defaultConfig.showProductMetaQuantidadeVendas,
    showProductFaltaFaturamento: data.show_product_falta_faturamento ?? defaultConfig.showProductFaltaFaturamento,
    showProductFaltaReceita: data.show_product_falta_receita ?? defaultConfig.showProductFaltaReceita,
    showProductDiariaReceita: data.show_product_diaria_receita ?? defaultConfig.showProductDiariaReceita,
    showProductDiariaFaturamento: data.show_product_diaria_faturamento ?? defaultConfig.showProductDiariaFaturamento,
    showProductCashCollect: data.show_product_cash_collect ?? defaultConfig.showProductCashCollect,
    showProductProjecaoReceita: data.show_product_projecao_receita ?? defaultConfig.showProductProjecaoReceita,
    showProductProjecaoFaturamento: data.show_product_projecao_faturamento ?? defaultConfig.showProductProjecaoFaturamento,
  };

  console.log('🟢 dashboardConfigMapper - Final mapped config with projection indicators:', {
    showProjecaoReceita: mappedConfig.showProjecaoReceita,
    showProjecaoFaturamento: mappedConfig.showProjecaoFaturamento,
    showNoShow: mappedConfig.showNoShow,
    showClosersPerformanceTable: mappedConfig.showClosersPerformanceTable,
    preSalesOrder: mappedConfig.preSalesOrder,
    productOrder: mappedConfig.productOrder
  });
  
  return mappedConfig;
};

export const mapConfigToDatabase = (config: DashboardConfig, userId: string) => {
  console.log('🔵 dashboardConfigMapper - Mapping config to database format:', config);
  
  const databaseData = {
    user_id: userId,
    company_name: config.companyName,
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
    
    // Novos indicadores de projeção - mapeamento correto para as colunas do banco
    show_projecao_receita: config.showProjecaoReceita,
    show_projecao_faturamento: config.showProjecaoFaturamento,
    show_no_show: config.showNoShow,
    
    // Nova tabela de performance dos closers
    show_closers_performance_table: config.showClosersPerformanceTable,
    
    // Configurações de pré-vendas
    show_pre_sales_calls: config.showPreSalesCalls,
    show_pre_sales_schedulings: config.showPreSalesSchedulings,
    show_pre_sales_no_show: config.showPreSalesNoShow,
    show_pre_sales_sdr_table: config.showPreSalesSDRTable,
    show_pre_sales_calls_chart: config.showPreSalesCallsChart,
    show_pre_sales_scheduling_chart: config.showPreSalesSchedulingChart,
    show_pre_sales_no_show_chart: config.showPreSalesNoShowChart,
    show_pre_sales_sdr_comparison_chart: config.showPreSalesSDRComparisonChart,
    
    metrics_order: config.metricsOrder,
    pre_sales_order: config.preSalesOrder,
    product_order: config.productOrder,
    
    show_specific_goals: config.showSpecificGoals,
    selected_goal_ids: config.selectedGoalIds,

    // Novos gráficos de evolução
    show_revenue_evolution_chart: config.showRevenueEvolutionChart,
    show_billing_evolution_chart: config.showBillingEvolutionChart,
    
    // Novos gráficos de vendedores
    show_seller_revenue_chart: config.showSellerRevenueChart,
    show_seller_billing_chart: config.showSellerBillingChart,
    
    // Novos gráficos de análise temporal
    show_temporal_revenue_chart: config.showTemporalRevenueChart,
    show_temporal_billing_chart: config.showTemporalBillingChart,

    // Product metrics mappings
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
  };

  console.log('🟢 dashboardConfigMapper - Final database data with projection indicators:', {
    show_projecao_receita: databaseData.show_projecao_receita,
    show_projecao_faturamento: databaseData.show_projecao_faturamento,
    show_no_show: databaseData.show_no_show,
    show_closers_performance_table: databaseData.show_closers_performance_table,
    pre_sales_order: databaseData.pre_sales_order,
    product_order: databaseData.product_order
  });
  
  return databaseData;
};
