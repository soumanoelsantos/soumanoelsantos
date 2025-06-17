
import { DashboardConfig } from '@/types/dashboardConfig';
import { defaultConfig } from '@/config/dashboardDefaults';

export const mapDatabaseToConfig = (data: any): DashboardConfig => {
  // Safely parse metrics_order with type checking
  let metricsOrder = defaultConfig.metricsOrder;
  if (data.metrics_order) {
    if (Array.isArray(data.metrics_order)) {
      metricsOrder = data.metrics_order as string[];
    } else {
      console.warn('metrics_order is not an array, using default');
    }
  }

  // Safely parse selected_goal_ids with type checking
  let selectedGoalIds = defaultConfig.selectedGoalIds;
  if (data.selected_goal_ids) {
    if (Array.isArray(data.selected_goal_ids)) {
      selectedGoalIds = data.selected_goal_ids as string[];
    } else {
      console.warn('selected_goal_ids is not an array, using default');
    }
  }

  return {
    showLeads: data.show_leads ?? defaultConfig.showLeads,
    showConversion: data.show_conversion ?? defaultConfig.showConversion,
    showTeam: data.show_team ?? defaultConfig.showTeam,
    showRevenue: data.show_revenue ?? defaultConfig.showRevenue,
    // Novas configurações com safe access
    showTicketFaturamento: data.show_ticket_faturamento ?? false,
    showTicketReceita: data.show_ticket_receita ?? false,
    showFaltaFaturamento: data.show_falta_faturamento ?? false,
    showFaltaReceita: data.show_falta_receita ?? false,
    showConversao: data.show_conversao ?? false,
    showDiariaReceita: data.show_diaria_receita ?? false,
    showSuperMetaFaturamento: data.show_super_meta_faturamento ?? false,
    showSuperMetaReceita: data.show_super_meta_receita ?? false,
    showHiperMetaFaturamento: data.show_hiper_meta_faturamento ?? false,
    showHiperMetaReceita: data.show_hiper_meta_receita ?? false,
    showCallsDiarias: data.show_calls_diarias ?? false,
    showFaltaReceitaSuper: data.show_falta_receita_super ?? false,
    showFaltaReceitaHiper: data.show_falta_receita_hiper ?? false,
    showMetaFaturamento: data.show_meta_faturamento ?? false,
    showMetaReceita: data.show_meta_receita ?? false,
    showFaturamento: data.show_faturamento ?? false,
    showReceita: data.show_receita ?? false,
    showQuantidadeVendas: data.show_quantidade_vendas ?? false,
    showCashCollect: data.show_cash_collect ?? false,
    
    companyName: data.company_name || '',
    showMonthlyGoals: data.show_monthly_goals ?? defaultConfig.showMonthlyGoals,
    showCharts: data.show_charts ?? defaultConfig.showCharts,
    metricsOrder: metricsOrder,
    
    // Novas configurações para metas específicas
    showSpecificGoals: data.show_specific_goals ?? false,
    selectedGoalIds: selectedGoalIds
  };
};

export const mapConfigToDatabase = (config: DashboardConfig, userId: string) => {
  return {
    user_id: userId,
    company_name: config.companyName,
    show_leads: config.showLeads,
    show_conversion: config.showConversion,
    show_team: config.showTeam,
    show_revenue: config.showRevenue,
    // Novas configurações
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
    show_meta_faturamento: config.showMetaFaturamento,
    show_meta_receita: config.showMetaReceita,
    show_faturamento: config.showFaturamento,
    show_receita: config.showReceita,
    show_quantidade_vendas: config.showQuantidadeVendas,
    show_cash_collect: config.showCashCollect,
    
    show_monthly_goals: config.showMonthlyGoals,
    show_charts: config.showCharts,
    metrics_order: config.metricsOrder,
    
    // Novas configurações para metas específicas
    show_specific_goals: config.showSpecificGoals,
    selected_goal_ids: config.selectedGoalIds
  };
};
