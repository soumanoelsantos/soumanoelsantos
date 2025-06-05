
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DashboardConfig {
  showSales: boolean;
  showLeads: boolean;
  showConversion: boolean;
  showTeam: boolean;
  showRevenue: boolean;
  showTicketMedio: boolean;
  // Novas opções
  showTicketFaturamento: boolean;
  showTicketReceita: boolean;
  showFaltaFaturamento: boolean;
  showFaltaReceita: boolean;
  showConversao: boolean;
  showDiariaReceita: boolean;
  showSuperMetaFaturamento: boolean;
  showSuperMetaReceita: boolean;
  showHiperMetaFaturamento: boolean;
  showHiperMetaReceita: boolean;
  showCallsDiarias: boolean;
  showFaltaReceitaSuper: boolean;
  showFaltaReceitaHiper: boolean;
  showMetaFaturamento: boolean;
  showMetaReceita: boolean;
  showFaturamento: boolean;
  showReceita: boolean;
  showQuantidadeVendas: boolean;
  showCashCollect: boolean;
  
  companyName: string;
  showMonthlyGoals: boolean;
  showCharts: boolean;
  metricsOrder: string[];
}

const defaultConfig: DashboardConfig = {
  showSales: true,
  showLeads: true,
  showConversion: true,
  showTeam: false,
  showRevenue: true,
  showTicketMedio: true,
  // Novas opções - padrão false
  showTicketFaturamento: false,
  showTicketReceita: false,
  showFaltaFaturamento: false,
  showFaltaReceita: false,
  showConversao: false,
  showDiariaReceita: false,
  showSuperMetaFaturamento: false,
  showSuperMetaReceita: false,
  showHiperMetaFaturamento: false,
  showHiperMetaReceita: false,
  showCallsDiarias: false,
  showFaltaReceitaSuper: false,
  showFaltaReceitaHiper: false,
  showMetaFaturamento: false,
  showMetaReceita: false,
  showFaturamento: false,
  showReceita: false,
  showQuantidadeVendas: false,
  showCashCollect: false,
  
  companyName: '',
  showMonthlyGoals: true,
  showCharts: true,
  metricsOrder: ['showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam']
};

export const useDashboardConfig = () => {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const { toast } = useToast();

  const loadConfig = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      console.log('Loading config for user:', userId);
      
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading config:', error);
        throw error;
      }

      if (data) {
        console.log('Config loaded:', data);
        
        // Safely parse metrics_order with type checking
        let metricsOrder = defaultConfig.metricsOrder;
        if (data.metrics_order) {
          if (Array.isArray(data.metrics_order)) {
            metricsOrder = data.metrics_order as string[];
          } else {
            console.warn('metrics_order is not an array, using default');
          }
        }
        
        setConfig({
          showSales: data.show_sales,
          showLeads: data.show_leads,
          showConversion: data.show_conversion,
          showTeam: data.show_team,
          showRevenue: data.show_revenue,
          showTicketMedio: data.show_ticket_medio,
          // Novas configurações (com fallback para false se não existir)
          showTicketFaturamento: data.show_ticket_faturamento || false,
          showTicketReceita: data.show_ticket_receita || false,
          showFaltaFaturamento: data.show_falta_faturamento || false,
          showFaltaReceita: data.show_falta_receita || false,
          showConversao: data.show_conversao || false,
          showDiariaReceita: data.show_diaria_receita || false,
          showSuperMetaFaturamento: data.show_super_meta_faturamento || false,
          showSuperMetaReceita: data.show_super_meta_receita || false,
          showHiperMetaFaturamento: data.show_hiper_meta_faturamento || false,
          showHiperMetaReceita: data.show_hiper_meta_receita || false,
          showCallsDiarias: data.show_calls_diarias || false,
          showFaltaReceitaSuper: data.show_falta_receita_super || false,
          showFaltaReceitaHiper: data.show_falta_receita_hiper || false,
          showMetaFaturamento: data.show_meta_faturamento || false,
          showMetaReceita: data.show_meta_receita || false,
          showFaturamento: data.show_faturamento || false,
          showReceita: data.show_receita || false,
          showQuantidadeVendas: data.show_quantidade_vendas || false,
          showCashCollect: data.show_cash_collect || false,
          
          companyName: data.company_name || '',
          showMonthlyGoals: data.show_monthly_goals,
          showCharts: data.show_charts,
          metricsOrder: metricsOrder
        });
      } else {
        console.log('No config found, using defaults');
      }
    } catch (error) {
      console.error('Erro ao carregar configurações do dashboard:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar configurações",
        description: "Não foi possível carregar suas configurações salvas."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (newConfig: DashboardConfig) => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar as configurações."
      });
      return false;
    }

    try {
      setIsLoading(true);
      console.log('Saving config for user:', userId, newConfig);
      
      const configData = {
        user_id: userId,
        company_name: newConfig.companyName,
        show_sales: newConfig.showSales,
        show_leads: newConfig.showLeads,
        show_conversion: newConfig.showConversion,
        show_team: newConfig.showTeam,
        show_revenue: newConfig.showRevenue,
        show_ticket_medio: newConfig.showTicketMedio,
        // Novas configurações
        show_ticket_faturamento: newConfig.showTicketFaturamento,
        show_ticket_receita: newConfig.showTicketReceita,
        show_falta_faturamento: newConfig.showFaltaFaturamento,
        show_falta_receita: newConfig.showFaltaReceita,
        show_conversao: newConfig.showConversao,
        show_diaria_receita: newConfig.showDiariaReceita,
        show_super_meta_faturamento: newConfig.showSuperMetaFaturamento,
        show_super_meta_receita: newConfig.showSuperMetaReceita,
        show_hiper_meta_faturamento: newConfig.showHiperMetaFaturamento,
        show_hiper_meta_receita: newConfig.showHiperMetaReceita,
        show_calls_diarias: newConfig.showCallsDiarias,
        show_falta_receita_super: newConfig.showFaltaReceitaSuper,
        show_falta_receita_hiper: newConfig.showFaltaReceitaHiper,
        show_meta_faturamento: newConfig.showMetaFaturamento,
        show_meta_receita: newConfig.showMetaReceita,
        show_faturamento: newConfig.showFaturamento,
        show_receita: newConfig.showReceita,
        show_quantidade_vendas: newConfig.showQuantidadeVendas,
        show_cash_collect: newConfig.showCashCollect,
        
        show_monthly_goals: newConfig.showMonthlyGoals,
        show_charts: newConfig.showCharts,
        metrics_order: newConfig.metricsOrder
      };

      console.log('Config data to save:', configData);

      // Primeiro, vamos tentar fazer um insert
      const { data: existingConfig } = await supabase
        .from('dashboard_configs')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      let result;
      if (existingConfig) {
        // Update existing config
        result = await supabase
          .from('dashboard_configs')
          .update(configData)
          .eq('user_id', userId);
      } else {
        // Insert new config
        result = await supabase
          .from('dashboard_configs')
          .insert(configData);
      }

      console.log('Save result:', result);

      if (result.error) {
        console.error('Save error:', result.error);
        throw result.error;
      }

      setConfig(newConfig);
      toast({
        title: "Configurações salvas!",
        description: "Suas configurações do dashboard foram salvas com sucesso."
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações do dashboard:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: `Não foi possível salvar suas configurações: ${error.message || 'Tente novamente.'}`
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, [userId]);

  return {
    config,
    setConfig,
    saveConfig,
    loadConfig,
    isLoading
  };
};
