
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
    showLeads: data.show_leads ?? defaultConfig.showLeads,
    showConversion: data.show_conversion ?? defaultConfig.showConversion,
    showTeam: data.show_team ?? defaultConfig.showTeam,
    showRevenue: data.show_revenue ?? defaultConfig.showRevenue,
    showTicketFaturamento: data.show_ticket_faturamento ?? defaultConfig.showTicketFaturamento,
    showTicketReceita: data.show_ticket_receita ?? defaultConfig.showTicketReceita,
    showFaltaFaturamento: data.show_falta_faturamento ?? defaultConfig.showFaltaFaturamento,
    showFaltaReceita: data.show_falta_receita ?? defaultConfig.showFaltaReceita,
    showConversao: data.show_conversao ?? defaultConfig.showConversao,
    showDiariaReceita: data.show_diaria_receita ?? defaultConfig.showDiariaReceita,
    showSuperMetaFaturamento: data.show_super_meta_faturamento ?? defaultConfig.showSuperMetaFaturamento,
    showSuperMetaReceita: data.show_super_meta_receita ?? defaultConfig.showSuperMetaReceita,
    showHiperMetaFaturamento: data.show_hiper_meta_faturamento ?? defaultConfig.showHiperMetaFaturamento,
    showHiperMetaReceita: data.show_hiper_meta_receita ?? defaultConfig.showHiperMetaReceita,
    showCallsDiarias: data.show_calls_diarias ?? defaultConfig.showCallsDiarias,
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
    
    companyName: data.company_name || defaultConfig.companyName,
    showMonthlyGoals: data.show_monthly_goals ?? defaultConfig.showMonthlyGoals,
    showCharts: data.show_charts ?? defaultConfig.showCharts,
    metricsOrder: metricsOrder,
    
    showSpecificGoals: data.show_specific_goals ?? defaultConfig.showSpecificGoals,
    selectedGoalIds: selectedGoalIds
  };

  console.log('🟢 dashboardConfigMapper - Final mapped config:', mappedConfig);
  return mappedConfig;
};

export const mapConfigToDatabase = (config: DashboardConfig, userId: string) => {
  console.log('🔵 dashboardConfigMapper - Mapping config to database format:', config);
  
  const databaseData = {
    user_id: userId,
    company_name: config.companyName,
    show_leads: config.showLeads,
    show_conversion: config.showConversion,
    show_team: config.showTeam,
    show_revenue: config.showRevenue,
    show_ticket_faturamento: config.showTicketFaturamento,
    show_ticket_receita: config.showTicketReceita,
    show_falta_faturamento: config.showFaltaFaturamento,
    show_falta_receita: config.showFaltaReceita,
    show_conversao: config.showConversao,
    show_diaria_receita: config.showDiariaReceita,
    show_super_meta_faturamento: config.showSuperMetaFaturamento,
    show_super_meta_receita: config.showSuperMetaReceita,
    show_hiper_meta_faturamento: config.showHiperMetaFaturamento,
    show_hiper_meta_receita: config.showHiperMetaReceita,
    show_calls_diarias: config.showCallsDiarias,
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
    
    show_monthly_goals: config.showMonthlyGoals,
    show_charts: config.showCharts,
    metrics_order: config.metricsOrder,
    
    show_specific_goals: config.showSpecificGoals,
    selected_goal_ids: config.selectedGoalIds
  };

  console.log('🟢 dashboardConfigMapper - Final database data:', databaseData);
  return databaseData;
};
