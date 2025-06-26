
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
  // Novos campos para as médias mensais
  monthlyCallsAverage: number;
  monthlySchedulingsAverage: number;
  monthlyNoShowRate: number;
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

  // Função para calcular dias úteis no mês
  const getBusinessDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let businessDays = 0;
    
    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
      // 0 = domingo, 6 = sábado
      if (day.getDay() !== 0 && day.getDay() !== 6) {
        businessDays++;
      }
    }
    
    return businessDays;
  };

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

      // Definir períodos
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Primeiro dia do mês atual
      const monthStart = new Date(currentYear, currentMonth, 1);
      // Último dia do mês atual
      const monthEnd = new Date(currentYear, currentMonth + 1, 0);
      
      // Para o gráfico, buscar últimos 45 dias para garantir 30 dias úteis
      const chartStartDate = new Date();
      chartStartDate.setDate(chartStartDate.getDate() - 45);

      console.log('📅 Date ranges:', {
        monthStart: monthStart.toISOString().split('T')[0],
        monthEnd: monthEnd.toISOString().split('T')[0],
        chartStart: chartStartDate.toISOString().split('T')[0],
        today: currentDate.toISOString().split('T')[0]
      });

      // Buscar dados do mês atual
      const { data: monthlyPerformanceData, error: monthlyPerfError } = await supabase
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
        .gte('date', monthStart.toISOString().split('T')[0])
        .lte('date', monthEnd.toISOString().split('T')[0]);

      if (monthlyPerfError) {
        console.error('❌ Error fetching monthly performance data:', monthlyPerfError);
        throw monthlyPerfError;
      }

      // Buscar dados para gráfico (últimos 45 dias)
      const { data: chartPerformanceData, error: chartPerfError } = await supabase
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
        .gte('date', chartStartDate.toISOString().split('T')[0])
        .lte('date', currentDate.toISOString().split('T')[0]);

      if (chartPerfError) {
        console.error('❌ Error fetching chart performance data:', chartPerfError);
        throw chartPerfError;
      }

      console.log('📈 Monthly performance data found:', monthlyPerformanceData?.length || 0, 'records');
      console.log('📈 Chart performance data found:', chartPerformanceData?.length || 0, 'records');

      // Calcular totais mensais
      const monthlyTotals = {
        calls: monthlyPerformanceData?.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0) || 0,
        schedulings: monthlyPerformanceData?.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0) || 0,
        noShow: monthlyPerformanceData?.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0) || 0
      };

      // Calcular número de dias úteis no mês atual
      const businessDaysInMonth = getBusinessDaysInMonth(currentYear, currentMonth);
      
      // Calcular médias diárias (apenas dias úteis)
      const monthlyCallsAverage = businessDaysInMonth > 0 ? Math.round((monthlyTotals.calls / businessDaysInMonth) * 100) / 100 : 0;
      const monthlySchedulingsAverage = businessDaysInMonth > 0 ? Math.round((monthlyTotals.schedulings / businessDaysInMonth) * 100) / 100 : 0;
      
      // Calcular taxa de no-show mensal
      const monthlyNoShowRate = monthlyTotals.schedulings > 0 ? Math.round((monthlyTotals.noShow / monthlyTotals.schedulings) * 10000) / 100 : 0;

      console.log('📊 Monthly calculations:', {
        businessDaysInMonth,
        monthlyTotals,
        monthlyCallsAverage,
        monthlySchedulingsAverage,
        monthlyNoShowRate: `${monthlyNoShowRate}%`
      });

      // Processar dados para cada SDR
      const sdrPerformance = sdrData.map(sdr => {
        const sdrPerf = monthlyPerformanceData?.filter(p => p.seller_id === sdr.id) || [];
        
        const totalCalls = sdrPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
        const totalSchedulings = sdrPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
        const totalNoShow = sdrPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);
        const conversionRate = totalCalls > 0 ? (totalSchedulings / totalCalls) * 100 : 0;

        return {
          name: sdr.name,
          calls: totalCalls,
          schedulings: totalSchedulings,
          noShow: totalNoShow,
          conversionRate: Math.round(conversionRate * 100) / 100
        };
      });

      // Gerar dados dos últimos 30 dias úteis para gráficos
      const weeklyData = [];
      let daysAdded = 0;
      let currentDay = 0;
      
      while (daysAdded < 30) {
        const date = new Date();
        date.setDate(date.getDate() - currentDay);
        
        // Pular fins de semana
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          const dateStr = date.toISOString().split('T')[0];
          
          const dayPerf = chartPerformanceData?.filter(p => p.date === dateStr) || [];
          const calls = dayPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
          const schedulings = dayPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
          const noShow = dayPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);

          weeklyData.unshift({
            date: date.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit',
              timeZone: 'America/Sao_Paulo'
            }),
            calls,
            schedulings,
            noShow
          });
          
          daysAdded++;
        }
        currentDay++;
      }

      // Calcular dados do dia atual (para manter compatibilidade)
      const today = new Date().toISOString().split('T')[0];
      const todayPerf = chartPerformanceData?.filter(p => p.date === today) || [];
      const dailyCalls = todayPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
      const dailySchedulings = todayPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
      const dailyNoShow = todayPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);
      const dailyNoShowRate = dailySchedulings > 0 ? (dailyNoShow / dailySchedulings) * 100 : 0;

      const finalData: PreSalesData = {
        // Dados diários (para compatibilidade)
        dailyCalls,
        dailyCallsTarget: 40,
        dailySchedulings,
        dailySchedulingsTarget: 8,
        dailyNoShow,
        dailyNoShowRate: Math.round(dailyNoShowRate * 100) / 100,
        
        // Novos dados mensais
        monthlyCallsAverage,
        monthlySchedulingsAverage,
        monthlyNoShowRate,
        
        // Dados gerais
        totalSDRs: sdrData.length,
        averageSchedulingsPerSDR: sdrData.length > 0 ? Math.round((monthlyTotals.schedulings / sdrData.length) * 100) / 100 : 0,
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
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const businessDaysInMonth = getBusinessDaysInMonth(currentYear, currentMonth);
    
    const monthlyData = [];
    let daysAdded = 0;
    let currentDay = 0;
    
    // Gerar 30 dias úteis de dados mock
    while (daysAdded < 30) {
      const date = new Date();
      date.setDate(date.getDate() - currentDay);
      
      // Pular fins de semana
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const dayName = date.toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit',
          timeZone: 'America/Sao_Paulo'
        });
        
        const baseCalls = Math.floor(Math.random() * 15) + 30;
        const schedulings = Math.floor(baseCalls * (0.15 + Math.random() * 0.10));
        const noShow = schedulings > 0 ? Math.floor(schedulings * (Math.random() * 0.2)) : 0;
        
        monthlyData.unshift({
          date: dayName,
          calls: baseCalls,
          schedulings: schedulings,
          noShow: noShow
        });
        
        daysAdded++;
      }
      currentDay++;
    }
    
    const todayData = monthlyData[monthlyData.length - 1] || { calls: 0, schedulings: 0, noShow: 0 };
    const totalCalls = monthlyData.reduce((sum, day) => sum + day.calls, 0);
    const totalSchedulings = monthlyData.reduce((sum, day) => sum + day.schedulings, 0);
    const totalNoShow = monthlyData.reduce((sum, day) => sum + day.noShow, 0);
    
    // Calcular médias mensais
    const monthlyCallsAverage = businessDaysInMonth > 0 ? Math.round((totalCalls / businessDaysInMonth) * 100) / 100 : 0;
    const monthlySchedulingsAverage = businessDaysInMonth > 0 ? Math.round((totalSchedulings / businessDaysInMonth) * 100) / 100 : 0;
    const monthlyNoShowRate = totalSchedulings > 0 ? Math.round((totalNoShow / totalSchedulings) * 10000) / 100 : 0;
    
    return {
      dailyCalls: todayData.calls,
      dailyCallsTarget: 40,
      dailySchedulings: todayData.schedulings,
      dailySchedulingsTarget: 8,
      dailyNoShow: todayData.noShow,
      dailyNoShowRate: todayData.schedulings > 0 ? (todayData.noShow / todayData.schedulings) * 100 : 0,
      
      // Novos dados mensais
      monthlyCallsAverage,
      monthlySchedulingsAverage,
      monthlyNoShowRate,
      
      totalSDRs: 1,
      averageSchedulingsPerSDR: totalSchedulings,
      sdrPerformance: [
        { 
          name: 'SDR Mock', 
          calls: totalCalls, 
          schedulings: totalSchedulings, 
          noShow: totalNoShow, 
          conversionRate: totalCalls > 0 ? Math.round((totalSchedulings / totalCalls) * 10000) / 100 : 0
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
