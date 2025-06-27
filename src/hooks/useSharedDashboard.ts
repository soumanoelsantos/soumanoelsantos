
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SharedDashboardData {
  user_id: string;
  company_name: string;
  is_public: boolean;
  share_token: string;
}

export const useSharedDashboard = (shareToken?: string) => {
  const [dashboardData, setDashboardData] = useState<SharedDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedDashboard = async () => {
      if (!shareToken) {
        setError('Token de compartilhamento não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Loading shared dashboard with token:', shareToken);

        const { data, error: fetchError } = await supabase
          .from('dashboard_configs')
          .select('user_id, company_name, is_public, share_token')
          .eq('share_token', shareToken)
          .eq('is_public', true)
          .maybeSingle();

        if (fetchError) {
          console.error('❌ Error fetching shared dashboard:', fetchError);
          throw fetchError;
        }

        if (!data) {
          console.log('⚠️ No shared dashboard found for token');
          setError('Dashboard compartilhado não encontrado');
          setDashboardData(null);
        } else {
          console.log('✅ Shared dashboard loaded:', data);
          setDashboardData(data);
        }
      } catch (err) {
        console.error('🔴 Error loading shared dashboard:', err);
        setError('Erro ao carregar dashboard compartilhado');
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedDashboard();
  }, [shareToken]);

  return {
    dashboardData,
    isLoading,
    error
  };
};
