
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
        setConfig({
          showSales: data.show_sales,
          showLeads: data.show_leads,
          showConversion: data.show_conversion,
          showTeam: data.show_team,
          showRevenue: data.show_revenue,
          showTicketMedio: data.show_ticket_medio,
          companyName: data.company_name || '',
          showMonthlyGoals: data.show_monthly_goals,
          showCharts: data.show_charts,
          metricsOrder: data.metrics_order || defaultConfig.metricsOrder
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
