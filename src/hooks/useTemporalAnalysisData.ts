
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface TemporalDataPoint {
  month: string;
  mat: number; // Moving Annual Total
  ytd: number; // Year to Date
  qtr: number; // Quarter
  current: number; // Current month
}

export const useTemporalAnalysisData = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [revenueData, setRevenueData] = useState<TemporalDataPoint[]>([]);
  const [billingData, setBillingData] = useState<TemporalDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTemporalData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de análise temporal');

      // Por enquanto, usando dados de exemplo até implementarmos a coleta real
      const months = [
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho'
      ];

      // Dados de exemplo para receita (baseados no print)
      const exampleRevenueData: TemporalDataPoint[] = months.map((month, index) => {
        const baseValue = 150000;
        const variation = Math.sin(index * 0.5) * 50000;
        
        return {
          month,
          mat: baseValue + variation + 50000, // MAT sempre maior
          ytd: baseValue + variation * 0.8,
          qtr: baseValue + variation * 0.6,
          current: baseValue + variation * 0.4
        };
      });

      // Dados de exemplo para faturamento (valores maiores)
      const exampleBillingData: TemporalDataPoint[] = months.map((month, index) => {
        const baseValue = 500000;
        const variation = Math.sin(index * 0.5) * 150000;
        
        return {
          month,
          mat: baseValue + variation + 150000,
          ytd: baseValue + variation * 0.8,
          qtr: baseValue + variation * 0.6,
          current: baseValue + variation * 0.4
        };
      });

      console.log('✅ [DEBUG] Dados temporais gerados:', {
        revenue: exampleRevenueData.length,
        billing: exampleBillingData.length
      });

      setRevenueData(exampleRevenueData);
      setBillingData(exampleBillingData);

    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar dados temporais:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de análise temporal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemporalData();
  }, [userId]);

  return {
    revenueData,
    billingData,
    isLoading,
    refetch: fetchTemporalData
  };
};
