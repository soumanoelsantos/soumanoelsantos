
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardConfig } from '@/types/dashboardConfig';

const defaultConfig: DashboardConfig = {
  showConversion: true,
  showRevenue: true,
  showTicketFaturamento: false,
  showTicketReceita: false,
  showFaltaFaturamento: false,
  showFaltaReceita: false,
  showDiariaReceita: false,
  showDiariaFaturamento: false,
  showSuperMetaFaturamento: false,
  showSuperMetaReceita: false,
  showHiperMetaFaturamento: false,
  showHiperMetaReceita: false,
  showFaltaReceitaSuper: false,
  showFaltaReceitaHiper: false,
  showFaltaFaturamentoSuper: false,
  showFaltaFaturamentoHiper: false,
  showMetaFaturamento: false,
  showMetaReceita: false,
  showFaturamento: false,
  showReceita: false,
  showQuantidadeVendas: false,
  showCashCollect: false,
  showCac: false,
  showProjecaoReceita: false,
  showProjecaoFaturamento: false,
  showNoShow: false,
  showClosersPerformanceTable: true,
  showPreSalesCalls: true,
  showPreSalesSchedulings: true,
  showPreSalesNoShow: true,
  showPreSalesSDRTable: true,
  showPreSalesCallsChart: true,
  showPreSalesSchedulingChart: true,
  showPreSalesNoShowChart: true,
  showPreSalesSDRComparisonChart: true,
  companyName: '',
  metricsOrder: [],
  preSalesOrder: [],
  productOrder: [],
  showRevenueEvolutionChart: true,
  showBillingEvolutionChart: true,
  showSellerRevenueChart: true,
  showSellerBillingChart: true,
  showTemporalRevenueChart: true,
  showTemporalBillingChart: true,
  showProductMetrics: false,
  selectedProductIds: [],
  showProductTicketReceita: false,
  showProductFaturamento: false,
  showProductReceita: false,
  showProductQuantidadeVendas: false,
  showProductMetaFaturamento: false,
  showProductMetaReceita: false,
  showProductMetaQuantidadeVendas: false,
  showProductTicketFaturamento: false,
  showProductFaltaFaturamento: false,
  showProductFaltaReceita: false,
  showProductCashCollect: false,
  showProductProjecaoReceita: false,
  showProductProjecaoFaturamento: false,
  showProductRevenueEvolutionChart: false,
  showProductBillingEvolutionChart: false,
  enableCommercialTab: true,
  enableProductTab: true,
  enablePreSalesTab: true,
};

const parseJsonToStringArray = (data: any): string[] => {
  if (Array.isArray(data)) {
    return data.filter((item): item is string => typeof item === 'string');
  }
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string');
      }
    } catch (e) {
      console.warn('Failed to parse JSON string to array');
    }
  }
  return [];
};

export const useDashboardConfig = () => {
  const { userId, isAuthenticated } = useAuth();
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      if (!isAuthenticated || !userId) {
        console.log('Usuário não autenticado, usando configuração padrão');
        setConfig(defaultConfig);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Carregando configuração do dashboard para userId:', userId);
        
        const { data, error } = await supabase
          .from('dashboard_configs')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.log('Nenhuma configuração encontrada, usando padrão');
            setConfig(defaultConfig);
          } else {
            console.error('Erro ao carregar configuração:', error);
            setConfig(defaultConfig);
          }
        } else if (data) {
          console.log('Configuração carregada:', data);
          setConfig({
            ...defaultConfig,
            ...data,
            selectedProductIds: parseJsonToStringArray(data.selected_product_ids),
            metricsOrder: parseJsonToStringArray(data.metrics_order),
            preSalesOrder: parseJsonToStringArray(data.pre_sales_order),
            productOrder: parseJsonToStringArray(data.product_order),
          });
        }
      } catch (error) {
        console.error('Erro inesperado ao carregar configuração:', error);
        setConfig(defaultConfig);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [userId, isAuthenticated]);

  const updateConfig = (updates: Partial<DashboardConfig>) => {
    console.log('Atualizando configuração local:', updates);
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return {
    config,
    updateConfig,
    isLoading
  };
};
