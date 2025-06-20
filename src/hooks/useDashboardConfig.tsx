
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardConfig } from '@/types/dashboardConfig';
import { dashboardDefaults } from '@/config/dashboardDefaults';

export const useDashboardConfig = (sharedUserId?: string) => {
  const { userId: authUserId } = useAuth();
  const userId = sharedUserId || authUserId;
  
  const [config, setConfig] = useState<DashboardConfig>(dashboardDefaults);
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
        setConfig({
          showConversion: data.show_conversion,
          showRevenue: data.show_revenue,
          showTicketFaturamento: data.show_ticket_faturamento,
          showTicketReceita: data.show_ticket_receita,
          showFaltaFaturamento: data.show_falta_faturamento,
          showFaltaReceita: data.show_falta_receita,
          showDiariaReceita: data.show_diaria_receita,
          showDiariaFaturamento: data.show_diaria_faturamento,
          showSuperMetaFaturamento: data.show_super_meta_faturamento,
          showSuperMetaReceita: data.show_super_meta_receita,
          showHiperMetaFaturamento: data.show_hiper_meta_faturamento,
          showHiperMetaReceita: data.show_hiper_meta_receita,
          showFaltaReceitaSuper: data.show_falta_receita_super,
          showFaltaReceitaHiper: data.show_falta_receita_hiper,
          showFaltaFaturamentoSuper: data.show_falta_faturamento_super,
          showFaltaFaturamentoHiper: data.show_falta_faturamento_hiper,
          showMetaFaturamento: data.show_meta_faturamento,
          showMetaReceita: data.show_meta_receita,
          showFaturamento: data.show_faturamento,
          showReceita: data.show_receita,
          showQuantidadeVendas: data.show_quantidade_vendas,
          showCashCollect: data.show_cash_collect,
          showCac: data.show_cac,
          showProjecaoReceita: data.show_projecao_receita,
          showProjecaoFaturamento: data.show_projecao_faturamento,
          showNoShow: data.show_no_show,
          showClosersPerformanceTable: data.show_closers_performance_table,
          showPreSalesCalls: data.show_pre_sales_calls,
          showPreSalesSchedulings: data.show_pre_sales_schedulings,
          showPreSalesNoShow: data.show_pre_sales_no_show,
          showPreSalesSDRTable: data.show_pre_sales_sdr_table,
          showPreSalesCallsChart: data.show_pre_sales_calls_chart,
          showPreSalesSchedulingChart: data.show_pre_sales_scheduling_chart,
          showPreSalesNoShowChart: data.show_pre_sales_no_show_chart,
          showPreSalesSDRComparisonChart: data.show_pre_sales_sdr_comparison_chart,
          companyName: data.company_name || '',
          metricsOrder: data.metrics_order || dashboardDefaults.metricsOrder,
          preSalesOrder: data.pre_sales_order || dashboardDefaults.preSalesOrder,
          showSpecificGoals: data.show_specific_goals,
          selectedGoalIds: data.selected_goal_ids || [],
          showRevenueEvolutionChart: data.show_revenue_evolution_chart,
          showBillingEvolutionChart: data.show_billing_evolution_chart,
          showSellerRevenueChart: data.show_seller_revenue_chart,
          showSellerBillingChart: data.show_seller_billing_chart,
          showTemporalRevenueChart: data.show_temporal_revenue_chart,
          showTemporalBillingChart: data.show_temporal_billing_chart,
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
