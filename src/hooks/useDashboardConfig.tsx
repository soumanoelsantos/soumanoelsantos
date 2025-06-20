
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardConfig } from '@/types/dashboardConfig';
import { defaultConfig } from '@/config/dashboardDefaults';

export const useDashboardConfig = (sharedUserId?: string) => {
  const { userId: authUserId } = useAuth();
  const userId = sharedUserId || authUserId;
  
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading dashboard config:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        // Safely parse arrays from database
        let metricsOrder = defaultConfig.metricsOrder;
        if (data.metrics_order) {
          if (Array.isArray(data.metrics_order)) {
            metricsOrder = data.metrics_order;
          } else if (typeof data.metrics_order === 'string') {
            try {
              const parsed = JSON.parse(data.metrics_order);
              if (Array.isArray(parsed)) {
                metricsOrder = parsed;
              }
            } catch (e) {
              console.warn('Failed to parse metrics_order');
            }
          }
        }

        let preSalesOrder = defaultConfig.preSalesOrder;
        if (data.pre_sales_order) {
          if (Array.isArray(data.pre_sales_order)) {
            preSalesOrder = data.pre_sales_order;
          } else if (typeof data.pre_sales_order === 'string') {
            try {
              const parsed = JSON.parse(data.pre_sales_order);
              if (Array.isArray(parsed)) {
                preSalesOrder = parsed;
              }
            } catch (e) {
              console.warn('Failed to parse pre_sales_order');
            }
          }
        }

        let selectedGoalIds = defaultConfig.selectedGoalIds;
        if (data.selected_goal_ids) {
          if (Array.isArray(data.selected_goal_ids)) {
            selectedGoalIds = data.selected_goal_ids;
          } else if (typeof data.selected_goal_ids === 'string') {
            try {
              const parsed = JSON.parse(data.selected_goal_ids);
              if (Array.isArray(parsed)) {
                selectedGoalIds = parsed;
              }
            } catch (e) {
              console.warn('Failed to parse selected_goal_ids');
            }
          }
        }

        setConfig({
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
          showProjecaoReceita: data.show_projecao_receita ?? defaultConfig.showProjecaoReceita,
          showProjecaoFaturamento: data.show_projecao_faturamento ?? defaultConfig.showProjecaoFaturamento,
          showNoShow: data.show_no_show ?? defaultConfig.showNoShow,
          showClosersPerformanceTable: data.show_closers_performance_table ?? defaultConfig.showClosersPerformanceTable,
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
          showSpecificGoals: data.show_specific_goals ?? defaultConfig.showSpecificGoals,
          selectedGoalIds: selectedGoalIds,
          showRevenueEvolutionChart: data.show_revenue_evolution_chart ?? defaultConfig.showRevenueEvolutionChart,
          showBillingEvolutionChart: data.show_billing_evolution_chart ?? defaultConfig.showBillingEvolutionChart,
          showSellerRevenueChart: data.show_seller_revenue_chart ?? defaultConfig.showSellerRevenueChart,
          showSellerBillingChart: data.show_seller_billing_chart ?? defaultConfig.showSellerBillingChart,
          showTemporalRevenueChart: data.show_temporal_revenue_chart ?? defaultConfig.showTemporalRevenueChart,
          showTemporalBillingChart: data.show_temporal_billing_chart ?? defaultConfig.showTemporalBillingChart,
        });
      }
    } catch (error) {
      console.error('Error in loadConfig:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async (updates: Partial<DashboardConfig>) => {
    if (!authUserId || sharedUserId) return; // Não permitir updates em visualização compartilhada

    try {
      const mappedUpdates = {
        show_conversion: updates.showConversion,
        show_revenue: updates.showRevenue,
        show_ticket_faturamento: updates.showTicketFaturamento,
        show_ticket_receita: updates.showTicketReceita,
        show_falta_faturamento: updates.showFaltaFaturamento,
        show_falta_receita: updates.showFaltaReceita,
        show_diaria_receita: updates.showDiariaReceita,
        show_diaria_faturamento: updates.showDiariaFaturamento,
        show_super_meta_faturamento: updates.showSuperMetaFaturamento,
        show_super_meta_receita: updates.showSuperMetaReceita,
        show_hiper_meta_faturamento: updates.showHiperMetaFaturamento,
        show_hiper_meta_receita: updates.showHiperMetaReceita,
        show_falta_receita_super: updates.showFaltaReceitaSuper,
        show_falta_receita_hiper: updates.showFaltaReceitaHiper,
        show_falta_faturamento_super: updates.showFaltaFaturamentoSuper,
        show_falta_faturamento_hiper: updates.showFaltaFaturamentoHiper,
        show_meta_faturamento: updates.showMetaFaturamento,
        show_meta_receita: updates.showMetaReceita,
        show_faturamento: updates.showFaturamento,
        show_receita: updates.showReceita,
        show_quantidade_vendas: updates.showQuantidadeVendas,
        show_cash_collect: updates.showCashCollect,
        show_cac: updates.showCac,
        show_projecao_receita: updates.showProjecaoReceita,
        show_projecao_faturamento: updates.showProjecaoFaturamento,
        show_no_show: updates.showNoShow,
        show_closers_performance_table: updates.showClosersPerformanceTable,
        show_pre_sales_calls: updates.showPreSalesCalls,
        show_pre_sales_schedulings: updates.showPreSalesSchedulings,
        show_pre_sales_no_show: updates.showPreSalesNoShow,
        show_pre_sales_sdr_table: updates.showPreSalesSDRTable,
        show_pre_sales_calls_chart: updates.showPreSalesCallsChart,
        show_pre_sales_scheduling_chart: updates.showPreSalesSchedulingChart,
        show_pre_sales_no_show_chart: updates.showPreSalesNoShowChart,
        show_pre_sales_sdr_comparison_chart: updates.showPreSalesSDRComparisonChart,
        company_name: updates.companyName,
        metrics_order: updates.metricsOrder,
        pre_sales_order: updates.preSalesOrder,
        show_specific_goals: updates.showSpecificGoals,
        selected_goal_ids: updates.selectedGoalIds,
        show_revenue_evolution_chart: updates.showRevenueEvolutionChart,
        show_billing_evolution_chart: updates.showBillingEvolutionChart,
        show_seller_revenue_chart: updates.showSellerRevenueChart,
        show_seller_billing_chart: updates.showSellerBillingChart,
        show_temporal_revenue_chart: updates.showTemporalRevenueChart,
        show_temporal_billing_chart: updates.showTemporalBillingChart,
      };

      // Remove undefined values
      const cleanUpdates = Object.fromEntries(
        Object.entries(mappedUpdates).filter(([_, v]) => v !== undefined)
      );

      const { error } = await supabase
        .from('dashboard_configs')
        .upsert({
          user_id: authUserId,
          ...cleanUpdates
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error updating dashboard config:', error);
        return;
      }

      setConfig(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error in updateConfig:', error);
    }
  };

  useEffect(() => {
    loadConfig();
  }, [userId]);

  return {
    config,
    updateConfig,
    isLoading,
    refetch: loadConfig
  };
};
