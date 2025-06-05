
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
  showCharts: true
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
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setConfig({
          showSales: data.show_sales,
          showLeads: data.show_leads,
          showConversion: data.show_conversion,
          showTeam: data.show_team,
          showRevenue: data.show_revenue,
          showTicketMedio: data.show_ticket_medio,
          companyName: data.company_name || '',
          showMonthlyGoals: data.show_monthly_goals,
          showCharts: data.show_charts
        });
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
        show_charts: newConfig.showCharts
      };

      const { error } = await supabase
        .from('dashboard_configs')
        .upsert(configData, { 
          onConflict: 'user_id'
        });

      if (error) throw error;

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
        description: "Não foi possível salvar suas configurações. Tente novamente."
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
