
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PreSalesData {
  dailyCalls: number;
  dailyCallsTarget: number;
  dailySchedulings: number;
  dailySchedulingsTarget: number;
  dailyNoShow: number;
  dailyNoShowRate: number;
  totalSDRs: number;
  averageSchedulingsPerSDR: number;
  sdrPerformance: Array<{
    name: string;
    calls: number;
    schedulings: number;
    noShow: number;
    conversionRate: number;
  }>;
  weeklyData: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
}

export const usePreSalesData = (sharedUserId?: string) => {
  const { userId: authUserId } = useAuth();
  const userId = sharedUserId || authUserId;
  
  const [data, setData] = useState<PreSalesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPreSalesData = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔍 usePreSalesData - Loading pre-sales data from database for user:', userId);
      
      // Buscar SDRs do usuário
      const { data: sdrData, error: sdrError } = await supabase
        .from('sellers')
        .select('id, name')
        .eq('user_id', userId)
        .eq('seller_type', 'sdr')
        .eq('is_active', true);

      if (sdrError) {
        console.error('❌ Error fetching SDRs:', sdrError);
        throw sdrError;
      }

      console.log('📊 Found SDRs:', sdrData);

      if (!sdrData || sdrData.length === 0) {
        console.log('⚠️ No SDRs found, using mock data');
        const mockData = generateMockData();
        setData(mockData);
        setIsLoading(false);
        return;
      }

      // Definir período - últimos 30 dias para histórico, últimos 7 dias para gráficos semanais
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      console.log('📅 Date range:', {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });

      // Buscar performance dos SDRs com join para obter nomes
      const { data: performanceData, error: perfError } = await supabase
        .from('seller_daily_performance')
        .select(`
          seller_id, 
          calls_count, 
          meetings_count, 
          leads_count, 
          date,
          sellers!inner(name)
        `)
        .in('seller_id', sdrData.map(sdr => sdr.id))
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0]);

      if (perfError) {
        console.error('❌ Error fetching performance data:', perfError);
        throw perfError;
      }

      console.log('📈 Performance data found:', performanceData?.length || 0, 'records');
      console.log('📈 Sample performance data:', performanceData?.slice(0, 3));

      // Processar dados para cada SDR
      const sdrPerformance = sdrData.map(sdr => {
        const sdrPerf = performanceData?.filter(p => p.seller_id === sdr.id) || [];
        
        const totalCalls = sdrPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
        const totalSchedulings = sdrPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
        const totalNoShow = sdrPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);
        const conversionRate = totalCalls > 0 ? (totalSchedulings / totalCalls) * 100 : 0;

        console.log(`👤 SDR ${sdr.name} performance:`, {
          totalCalls,
          totalSchedulings,
          totalNoShow,
          conversionRate,
          recordsCount: sdrPerf.length
        });

        return {
          name: sdr.name,
          calls: totalCalls,
          schedulings: totalSchedulings,
          noShow: totalNoShow,
          conversionRate: Math.round(conversionRate * 100) / 100
        };
      });

      console.log('👥 SDR Performance processed:', sdrPerformance);

      // Gerar dados dos últimos 7 dias para gráficos
      const weeklyData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayPerf = performanceData?.filter(p => p.date === dateStr) || [];
        const calls = dayPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
        const schedulings = dayPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
        const noShow = dayPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);

        weeklyData.push({
          date: date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit',
            timeZone: 'America/Sao_Paulo'
          }),
          calls,
          schedulings,
          noShow
        });
      }

      console.log('📊 Weekly data processed:', weeklyData);

      // Calcular totais do dia atual
      const today = new Date().toISOString().split('T')[0];
      const todayPerf = performanceData?.filter(p => p.date === today) || [];
      const dailyCalls = todayPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
      const dailySchedulings = todayPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
      const dailyNoShow = todayPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);

      console.log('📅 Today performance:', {
        dailyCalls,
        dailySchedulings,
        dailyNoShow,
        todayRecords: todayPerf.length
      });

      // Calcular totais gerais
      const totalSchedulings = sdrPerformance.reduce((sum, sdr) => sum + sdr.schedulings, 0);
      const totalNoShow = sdrPerformance.reduce((sum, sdr) => sum + sdr.noShow, 0);
      const dailyNoShowRate = totalSchedulings > 0 ? (totalNoShow / totalSchedulings) * 100 : 0;

      const finalData: PreSalesData = {
        dailyCalls,
        dailyCallsTarget: 40,
        dailySchedulings,
        dailySchedulingsTarget: 8,
        dailyNoShow,
        dailyNoShowRate: Math.round(dailyNoShowRate * 100) / 100,
        totalSDRs: sdrData.length,
        averageSchedulingsPerSDR: sdrData.length > 0 ? Math.round((totalSchedulings / sdrData.length) * 100) / 100 : 0,
        sdrPerformance,
        weeklyData
      };
      
      setData(finalData);
      console.log('🟢 usePreSalesData - Real data loaded successfully:', finalData);
      
    } catch (err) {
      console.error('🔴 usePreSalesData - Error loading data:', err);
      setError('Erro ao carregar dados de pré-vendas');
      
      // Em caso de erro, usar dados mock
      const mockData = generateMockData();
      setData(mockData);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Função para gerar dados mock como fallback
  const generateMockData = () => {
    const monthlyData = [];
    const now = new Date();
    const today = now.getDate();
    
    for (let day = Math.max(1, today - 6); day <= today; day++) {
      const date = new Date(now.getFullYear(), now.getMonth(), day);
      const dayName = date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      let baseCalls = 0;
      let schedulings = 0;
      let noShow = 0;
      
      if (!isWeekend) {
        baseCalls = Math.floor(Math.random() * 15) + 30;
        schedulings = Math.floor(baseCalls * (0.15 + Math.random() * 0.10));
        noShow = schedulings > 0 ? Math.floor(schedulings * (Math.random() * 0.2)) : 0;
      }
      
      monthlyData.push({
        date: dayName,
        calls: baseCalls,
        schedulings: schedulings,
        noShow: noShow
      });
    }
    
    const todayData = monthlyData[monthlyData.length - 1] || { calls: 0, schedulings: 0, noShow: 0 };
    const totalCalls = monthlyData.reduce((sum, day) => sum + day.calls, 0);
    const totalSchedulings = monthlyData.reduce((sum, day) => sum + day.schedulings, 0);
    const totalNoShow = monthlyData.reduce((sum, day) => sum + day.noShow, 0);
    const conversionRate = totalCalls > 0 ? (totalSchedulings / totalCalls) * 100 : 0;
    
    return {
      dailyCalls: todayData.calls,
      dailyCallsTarget: 40,
      dailySchedulings: todayData.schedulings,
      dailySchedulingsTarget: 8,
      dailyNoShow: todayData.noShow,
      dailyNoShowRate: totalSchedulings > 0 ? (totalNoShow / totalSchedulings) * 100 : 0,
      totalSDRs: 1,
      averageSchedulingsPerSDR: totalSchedulings,
      sdrPerformance: [
        { 
          name: 'SDR Mock', 
          calls: totalCalls, 
          schedulings: totalSchedulings, 
          noShow: totalNoShow, 
          conversionRate: Math.round(conversionRate * 100) / 100
        }
      ],
      weeklyData: monthlyData
    };
  };

  useEffect(() => {
    loadPreSalesData();
  }, [loadPreSalesData]);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      console.log('🔄 usePreSalesData - Refetching data...');
      loadPreSalesData();
    }
  };
};
