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
        // Safely parse arrays from database with proper type conversion
        let metricsOrder = defaultConfig.metricsOrder;
        if (data.metrics_order) {
          if (Array.isArray(data.metrics_order)) {
            metricsOrder = data.metrics_order.filter((item): item is string => typeof item === 'string');
          } else if (typeof data.metrics_order === 'string') {
            try {
              const parsed = JSON.parse(data.metrics_order);
              if (Array.isArray(parsed)) {
                metricsOrder = parsed.filter((item): item is string => typeof item === 'string');
              }
            } catch (e) {
              console.warn('Failed to parse metrics_order');
            }
          }
        }

        let preSalesOrder = defaultConfig.preSalesOrder;
        if (data.pre_sales_order) {
          if (Array.isArray(data.pre_sales_order)) {
            preSalesOrder = data.pre_sales_order.filter((item): item is string => typeof item === 'string');
          } else if (typeof data.pre_sales_order === 'string') {
            try {
              const parsed = JSON.parse(data.pre_sales_order);
              if (Array.isArray(parsed)) {
                preSalesOrder = parsed.filter((item): item is string => typeof item === 'string');
              }
            } catch (e) {
              console.warn('Failed to parse pre_sales_order');
            }
          }
        }

        let productOrder = defaultConfig.productOrder;
        if (data.product_order) {
          if (Array.isArray(data.product_order)) {
            productOrder = data.product_order.filter((item): item is string => typeof item === 'string');
          } else if (typeof data.product_order === 'string') {
            try {
              const parsed = JSON.parse(data.product_order);
              if (Array.isArray(parsed)) {
                productOrder = parsed.filter((item): item is string => typeof item === 'string');
              }
            } catch (e) {
              console.warn('Failed to parse product_order');
            }
          }
        }

        let selectedProductIds = defaultConfig.selectedProductIds;
        if (data.selected_product_ids) {
          if (Array.isArray(data.selected_product_ids)) {
            selectedProductIds = data.selected_product_ids.filter((item): item is string => typeof item === 'string');
          } else if (typeof data.selected_product_ids === 'string') {
            try {
              const parsed = JSON.parse(data.selected_product_ids);
              if (Array.isArray(parsed)) {
                selectedProductIds = parsed.filter((item): item is string => typeof item === 'string');
              }
            } catch (e) {
              console.warn('Failed to parse selected_product_ids');
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
          productOrder: productOrder,
          showRevenueEvolutionChart: data.show_revenue_evolution_chart ?? defaultConfig.showRevenueEvolutionChart,
          showBillingEvolutionChart: data.show_billing_evolution_chart ?? defaultConfig.showBillingEvolutionChart,
          showSellerRevenueChart: data.show_seller_revenue_chart ?? defaultConfig.showSellerRevenueChart,
          showSellerBillingChart: data.show_seller_billing_chart ?? defaultConfig.showSellerBillingChart,
          showTemporalRevenueChart: data.show_temporal_revenue_chart ?? defaultConfig.showTemporalRevenueChart,
          showTemporalBillingChart: data.show_temporal_billing_chart ?? defaultConfig.showTemporalBillingChart,
          
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
          showProductCashCollect: data.show_product_cash_collect ?? defaultConfig.showProductCashCollect,
          showProductProjecaoReceita: data.show_product_projecao_receita ?? defaultConfig.showProductProjecaoReceita,
          showProductProjecaoFaturamento: data.show_product_projecao_faturamento ?? defaultConfig.showProductProjecaoFaturamento,

          // Product charts fields - apenas os dois que ficaram
          showProductRevenueEvolutionChart: data.show_product_revenue_evolution_chart ?? defaultConfig.showProductRevenueEvolutionChart,
          showProductBillingEvolutionChart: data.show_product_billing_evolution_chart ?? defaultConfig.showProductBillingEvolutionChart,

          // CAMPOS DE CONTROLE DE ABAS - CORRIGIDO
          enableCommercialTab: data.enable_commercial_tab ?? defaultConfig.enableCommercialTab,
          enableProductTab: data.enable_product_tab ?? defaultConfig.enableProductTab,
          enablePreSalesTab: data.enable_pre_sales_tab ?? defaultConfig.enablePreSalesTab,
        });
      }
    } catch (error) {
      console.error('Error in loadConfig:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (updates: Partial<DashboardConfig>) => {
    if (!authUserId || sharedUserId) return; // Não permitir updates em visualização compartilhada

    console.log('🔄 [DEBUG] Atualizando configuração local:', updates);
    
    // Atualizar estado local imediatamente
    setConfig(prev => ({ ...prev, ...updates }));
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
