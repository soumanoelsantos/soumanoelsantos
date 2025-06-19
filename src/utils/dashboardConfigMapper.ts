
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
    
    companyName: data.company_name || defaultConfig.companyName,
    showCharts: data.show_charts ?? defaultConfig.showCharts,
    metricsOrder: metricsOrder,
    
    showSpecificGoals: data.show_specific_goals ?? defaultConfig.showSpecificGoals,
    selectedGoalIds: selectedGoalIds,

    // Mapeamento explícito dos gráficos de evolução com fallback para true
    showRevenueEvolutionChart: data.show_revenue_evolution_chart !== undefined ? data.show_revenue_evolution_chart : true,
    showBillingEvolutionChart: data.show_billing_evolution_chart !== undefined ? data.show_billing_evolution_chart : true,
  };

  console.log('🟢 dashboardConfigMapper - Final mapped config with evolution charts:', {
    showRevenueEvolutionChart: mappedConfig.showRevenueEvolutionChart,
    showBillingEvolutionChart: mappedConfig.showBillingEvolutionChart
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
    
    show_charts: config.showCharts,
    metrics_order: config.metricsOrder,
    
    show_specific_goals: config.showSpecificGoals,
    selected_goal_ids: config.selectedGoalIds,

    // Novos gráficos de evolução
    show_revenue_evolution_chart: config.showRevenueEvolutionChart,
    show_billing_evolution_chart: config.showBillingEvolutionChart,
  };

  console.log('🟢 dashboardConfigMapper - Final database data:', databaseData);
  return databaseData;
};
