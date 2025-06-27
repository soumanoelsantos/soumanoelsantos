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
      console.log('⚠️ [DEBUG] No userId provided, using default config');
      setConfig(defaultConfig);
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 [DEBUG] Loading dashboard config for userId:', userId);
      
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('❌ [DEBUG] Error loading dashboard config:', error);
        setConfig(defaultConfig);
        setIsLoading(false);
        return;
      }

      if (data) {
        console.log('✅ [DEBUG] Dashboard config loaded from database:', data);
        
        // Parse arrays with better error handling
        const parseJsonArray = (field: any, fallback: string[] = []): string[] => {
          if (Array.isArray(field)) return field.filter((item): item is string => typeof item === 'string');
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : fallback;
            } catch (e) {
              console.warn(`Failed to parse ${field}:`, e);
              return fallback;
            }
          }
          return fallback;
        };

        const mappedConfig: DashboardConfig = {
          // ... keep existing code (basic fields mapping)
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
          
          // Company name mapping
          companyName: data.company_name || defaultConfig.companyName,
          
          // Arrays parsing
          metricsOrder: parseJsonArray(data.metrics_order, defaultConfig.metricsOrder),
          preSalesOrder: parseJsonArray(data.pre_sales_order, defaultConfig.preSalesOrder),
          productOrder: parseJsonArray(data.product_order, defaultConfig.productOrder),
          selectedProductIds: parseJsonArray(data.selected_product_ids, defaultConfig.selectedProductIds),
          
          // Charts configuration
          showRevenueEvolutionChart: data.show_revenue_evolution_chart ?? defaultConfig.showRevenueEvolutionChart,
          showBillingEvolutionChart: data.show_billing_evolution_chart ?? defaultConfig.showBillingEvolutionChart,
          showSellerRevenueChart: data.show_seller_revenue_chart ?? defaultConfig.showSellerRevenueChart,
          showSellerBillingChart: data.show_seller_billing_chart ?? defaultConfig.showSellerBillingChart,
          showTemporalRevenueChart: data.show_temporal_revenue_chart ?? defaultConfig.showTemporalRevenueChart,
          showTemporalBillingChart: data.show_temporal_billing_chart ?? defaultConfig.showTemporalBillingChart,
          
          // Product metrics
          showProductMetrics: data.show_product_metrics ?? defaultConfig.showProductMetrics,
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
          showProductRevenueEvolutionChart: data.show_product_revenue_evolution_chart ?? defaultConfig.showProductRevenueEvolutionChart,
          showProductBillingEvolutionChart: data.show_product_billing_evolution_chart ?? defaultConfig.showProductBillingEvolutionChart,

          // TAB CONTROLS - ALWAYS ENABLED NOW
          enableCommercialTab: true,
          enableProductTab: true,
          enablePreSalesTab: true,
        };
        
        console.log('✅ [DEBUG] Final mapped configuration loaded successfully');
        setConfig(mappedConfig);
      } else {
        console.log('⚠️ [DEBUG] No configuration found, using defaults');
        setConfig(defaultConfig);
      }
    } catch (error) {
      console.error('❌ [DEBUG] Error in loadConfig:', error);
      setConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (updates: Partial<DashboardConfig>) => {
    // Permitir updates apenas se for o usuário autenticado (não em visualização compartilhada)
    if (!authUserId || sharedUserId) {
      console.warn('⚠️ [DEBUG] Updates blocked - user not authenticated or in shared view');
      return;
    }

    console.log('🔄 [DEBUG] Updating local configuration:', updates);
    
    // Atualizar estado local imediatamente com tratamento de erro
    setConfig(prev => {
      try {
        const newConfig = { ...prev, ...updates };
        console.log('🔄 [DEBUG] New configuration state updated successfully');
        return newConfig;
      } catch (error) {
        console.error('❌ [DEBUG] Error updating config state:', error);
        return prev; // Retorna estado anterior em caso de erro
      }
    });
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
