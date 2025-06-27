
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

        // Função para converter valor para boolean de forma segura
        const safeBool = (value: any, defaultVal: boolean = false): boolean => {
          if (value === null || value === undefined) return defaultVal;
          return Boolean(value);
        };

        // Mapeamento completo e seguro dos dados
        const mappedConfig: DashboardConfig = {
          // Configurações básicas
          companyName: data.company_name || defaultConfig.companyName,
          
          // Métricas comerciais básicas - usando conversão segura
          showConversion: safeBool(data.show_conversion, defaultConfig.showConversion),
          showRevenue: safeBool(data.show_revenue, defaultConfig.showRevenue),
          showTicketFaturamento: safeBool(data.show_ticket_faturamento, defaultConfig.showTicketFaturamento),
          showTicketReceita: safeBool(data.show_ticket_receita, defaultConfig.showTicketReceita),
          showFaltaFaturamento: safeBool(data.show_falta_faturamento, defaultConfig.showFaltaFaturamento),
          showFaltaReceita: safeBool(data.show_falta_receita, defaultConfig.showFaltaReceita),
          showDiariaReceita: safeBool(data.show_diaria_receita, defaultConfig.showDiariaReceita),
          showDiariaFaturamento: safeBool(data.show_diaria_faturamento, defaultConfig.showDiariaFaturamento),
          showSuperMetaFaturamento: safeBool(data.show_super_meta_faturamento, defaultConfig.showSuperMetaFaturamento),
          showSuperMetaReceita: safeBool(data.show_super_meta_receita, defaultConfig.showSuperMetaReceita),
          showHiperMetaFaturamento: safeBool(data.show_hiper_meta_faturamento, defaultConfig.showHiperMetaFaturamento),
          showHiperMetaReceita: safeBool(data.show_hiper_meta_receita, defaultConfig.showHiperMetaReceita),
          showFaltaReceitaSuper: safeBool(data.show_falta_receita_super, defaultConfig.showFaltaReceitaSuper),
          showFaltaReceitaHiper: safeBool(data.show_falta_receita_hiper, defaultConfig.showFaltaReceitaHiper),
          showFaltaFaturamentoSuper: safeBool(data.show_falta_faturamento_super, defaultConfig.showFaltaFaturamentoSuper),
          showFaltaFaturamentoHiper: safeBool(data.show_falta_faturamento_hiper, defaultConfig.showFaltaFaturamentoHiper),
          showMetaFaturamento: safeBool(data.show_meta_faturamento, defaultConfig.showMetaFaturamento),
          showMetaReceita: safeBool(data.show_meta_receita, defaultConfig.showMetaReceita),
          showFaturamento: safeBool(data.show_faturamento, defaultConfig.showFaturamento),
          showReceita: safeBool(data.show_receita, defaultConfig.showReceita),
          showQuantidadeVendas: safeBool(data.show_quantidade_vendas, defaultConfig.showQuantidadeVendas),
          showCashCollect: safeBool(data.show_cash_collect, defaultConfig.showCashCollect),
          showCac: safeBool(data.show_cac, defaultConfig.showCac),
          showProjecaoReceita: safeBool(data.show_projecao_receita, defaultConfig.showProjecaoReceita),
          showProjecaoFaturamento: safeBool(data.show_projecao_faturamento, defaultConfig.showProjecaoFaturamento),
          showNoShow: safeBool(data.show_no_show, defaultConfig.showNoShow),
          showClosersPerformanceTable: safeBool(data.show_closers_performance_table, defaultConfig.showClosersPerformanceTable),

          // Pré-vendas
          showPreSalesCalls: safeBool(data.show_pre_sales_calls, defaultConfig.showPreSalesCalls),
          showPreSalesSchedulings: safeBool(data.show_pre_sales_schedulings, defaultConfig.showPreSalesSchedulings),
          showPreSalesNoShow: safeBool(data.show_pre_sales_no_show, defaultConfig.showPreSalesNoShow),
          showPreSalesSDRTable: safeBool(data.show_pre_sales_sdr_table, defaultConfig.showPreSalesSDRTable),
          showPreSalesCallsChart: safeBool(data.show_pre_sales_calls_chart, defaultConfig.showPreSalesCallsChart),
          showPreSalesSchedulingChart: safeBool(data.show_pre_sales_scheduling_chart, defaultConfig.showPreSalesSchedulingChart),
          showPreSalesNoShowChart: safeBool(data.show_pre_sales_no_show_chart, defaultConfig.showPreSalesNoShowChart),
          showPreSalesSDRComparisonChart: safeBool(data.show_pre_sales_sdr_comparison_chart, defaultConfig.showPreSalesSDRComparisonChart),
          
          // Arrays - parseando com segurança
          metricsOrder: parseJsonArray(data.metrics_order, defaultConfig.metricsOrder),
          preSalesOrder: parseJsonArray(data.pre_sales_order, defaultConfig.preSalesOrder),
          productOrder: parseJsonArray(data.product_order, defaultConfig.productOrder),
          selectedProductIds: parseJsonArray(data.selected_product_ids, defaultConfig.selectedProductIds),
          
          // Gráficos comerciais
          showRevenueEvolutionChart: safeBool(data.show_revenue_evolution_chart, defaultConfig.showRevenueEvolutionChart),
          showBillingEvolutionChart: safeBool(data.show_billing_evolution_chart, defaultConfig.showBillingEvolutionChart),
          showSellerRevenueChart: safeBool(data.show_seller_revenue_chart, defaultConfig.showSellerRevenueChart),
          showSellerBillingChart: safeBool(data.show_seller_billing_chart, defaultConfig.showSellerBillingChart),
          showTemporalRevenueChart: safeBool(data.show_temporal_revenue_chart, defaultConfig.showTemporalRevenueChart),
          showTemporalBillingChart: safeBool(data.show_temporal_billing_chart, defaultConfig.showTemporalBillingChart),
          
          // Produtos
          showProductMetrics: safeBool(data.show_product_metrics, defaultConfig.showProductMetrics),
          showProductTicketReceita: safeBool(data.show_product_ticket_receita, defaultConfig.showProductTicketReceita),
          showProductTicketFaturamento: safeBool(data.show_product_ticket_faturamento, defaultConfig.showProductTicketFaturamento),
          showProductFaturamento: safeBool(data.show_product_faturamento, defaultConfig.showProductFaturamento),
          showProductReceita: safeBool(data.show_product_receita, defaultConfig.showProductReceita),
          showProductQuantidadeVendas: safeBool(data.show_product_quantidade_vendas, defaultConfig.showProductQuantidadeVendas),
          showProductMetaFaturamento: safeBool(data.show_product_meta_faturamento, defaultConfig.showProductMetaFaturamento),
          showProductMetaReceita: safeBool(data.show_product_meta_receita, defaultConfig.showProductMetaReceita),
          showProductMetaQuantidadeVendas: safeBool(data.show_product_meta_quantidade_vendas, defaultConfig.showProductMetaQuantidadeVendas),
          showProductFaltaFaturamento: safeBool(data.show_product_falta_faturamento, defaultConfig.showProductFaltaFaturamento),
          showProductFaltaReceita: safeBool(data.show_product_falta_receita, defaultConfig.showProductFaltaReceita),
          showProductCashCollect: safeBool(data.show_product_cash_collect, defaultConfig.showProductCashCollect),
          showProductProjecaoReceita: safeBool(data.show_product_projecao_receita, defaultConfig.showProductProjecaoReceita),
          showProductProjecaoFaturamento: safeBool(data.show_product_projecao_faturamento, defaultConfig.showProductProjecaoFaturamento),
          showProductRevenueEvolutionChart: safeBool(data.show_product_revenue_evolution_chart, defaultConfig.showProductRevenueEvolutionChart),
          showProductBillingEvolutionChart: safeBool(data.show_product_billing_evolution_chart, defaultConfig.showProductBillingEvolutionChart),

          // Controle de abas - sempre habilitado
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
        // Garantir que todas as propriedades existam
        const safeUpdates = { ...updates };
        const newConfig = { ...prev, ...safeUpdates };
        
        console.log('🔄 [DEBUG] New configuration state updated successfully:', newConfig);
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
