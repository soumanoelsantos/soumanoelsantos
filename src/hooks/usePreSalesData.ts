
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

interface PreSalesFilters {
  startDate?: Date;
  endDate?: Date;
  selectedSalespeople?: string[];
}

export const usePreSalesData = (sharedUserId?: string, filters?: PreSalesFilters) => {
  const { userId: authUserId } = useAuth();
  const userId = sharedUserId || authUserId;
  
  const [data, setData] = useState<PreSalesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para calcular dias úteis no período
  const getBusinessDaysInPeriod = (startDate: Date, endDate: Date) => {
    let businessDays = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // 0 = domingo, 6 = sábado
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        businessDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
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
      console.log('🔍 usePreSalesData - Filters:', filters);
      
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
        const mockData = generateMockData(filters);
        setData(mockData);
        setIsLoading(false);
        return;
      }

      // Definir períodos baseado nos filtros
      const currentDate = new Date();
      
      // Se há filtros de data, usar essas datas
      let startDate: Date;
      let endDate: Date;
      
      if (filters?.startDate && filters?.endDate) {
        startDate = filters.startDate;
        endDate = filters.endDate;
        console.log('📅 Using filtered date range:', { startDate, endDate });
      } else {
        // Usar o mês atual como padrão
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        console.log('📅 Using current month range:', { startDate, endDate });
      }

      // Para o gráfico, se não há filtros específicos, usar últimos 30 dias úteis
      let chartStartDate: Date;
      if (filters?.startDate) {
        chartStartDate = startDate;
      } else {
        chartStartDate = new Date();
        chartStartDate.setDate(chartStartDate.getDate() - 45); // 45 dias para garantir 30 dias úteis
      }

      console.log('📅 Date ranges:', {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        chartStart: chartStartDate.toISOString().split('T')[0],
        today: currentDate.toISOString().split('T')[0]
      });

      // Filtrar por SDRs selecionados se houver
      let sdrIds = sdrData.map(sdr => sdr.id);
      if (filters?.selectedSalespeople && filters.selectedSalespeople.length > 0) {
        const selectedSdrs = sdrData.filter(sdr => filters.selectedSalespeople!.includes(sdr.id));
        sdrIds = selectedSdrs.map(sdr => sdr.id);
        console.log('📊 Filtered SDRs:', selectedSdrs);
      }

      // Buscar dados do período selecionado para métricas
      const { data: periodPerformanceData, error: periodPerfError } = await supabase
        .from('seller_daily_performance')
        .select(`
          seller_id, 
          calls_count, 
          meetings_count, 
          leads_count, 
          date,
          sellers!inner(name)
        `)
        .in('seller_id', sdrIds)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0]);

      if (periodPerfError) {
        console.error('❌ Error fetching period performance data:', periodPerfError);
        throw periodPerfError;
      }

      // Buscar dados para gráfico
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
        .in('seller_id', sdrIds)
        .gte('date', chartStartDate.toISOString().split('T')[0])
        .lte('date', (filters?.endDate || currentDate).toISOString().split('T')[0]);

      if (chartPerfError) {
        console.error('❌ Error fetching chart performance data:', chartPerfError);
        throw chartPerfError;
      }

      console.log('📈 Period performance data found:', periodPerformanceData?.length || 0, 'records');
      console.log('📈 Chart performance data found:', chartPerformanceData?.length || 0, 'records');

      // Calcular totais do período
      const periodTotals = {
        calls: periodPerformanceData?.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0) || 0,
        schedulings: periodPerformanceData?.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0) || 0,
        noShow: periodPerformanceData?.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0) || 0
      };

      // Calcular número de dias úteis no período
      const businessDaysInPeriod = getBusinessDaysInPeriod(startDate, endDate);
      
      // Calcular médias diárias (apenas dias úteis)
      const periodCallsAverage = businessDaysInPeriod > 0 ? Math.round((periodTotals.calls / businessDaysInPeriod) * 100) / 100 : 0;
      const periodSchedulingsAverage = businessDaysInPeriod > 0 ? Math.round((periodTotals.schedulings / businessDaysInPeriod) * 100) / 100 : 0;
      
      // Calcular taxa de no-show do período
      const periodNoShowRate = periodTotals.schedulings > 0 ? Math.round((periodTotals.noShow / periodTotals.schedulings) * 10000) / 100 : 0;

      console.log('📊 Period calculations:', {
        businessDaysInPeriod,
        periodTotals,
        periodCallsAverage,
        periodSchedulingsAverage,
        periodNoShowRate: `${periodNoShowRate}%`
      });

      // Processar dados para cada SDR
      const sdrPerformance = sdrData
        .filter(sdr => sdrIds.includes(sdr.id))
        .map(sdr => {
          const sdrPerf = periodPerformanceData?.filter(p => p.seller_id === sdr.id) || [];
          
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

      // Gerar dados para gráficos baseado no período selecionado
      const chartData = [];
      const currentChartDate = new Date(chartStartDate);
      
      while (currentChartDate <= (filters?.endDate || currentDate)) {
        // Pular fins de semana
        if (currentChartDate.getDay() !== 0 && currentChartDate.getDay() !== 6) {
          const dateStr = currentChartDate.toISOString().split('T')[0];
          
          const dayPerf = chartPerformanceData?.filter(p => p.date === dateStr) || [];
          const calls = dayPerf.reduce((sum, p) => sum + (Number(p.calls_count) || 0), 0);
          const schedulings = dayPerf.reduce((sum, p) => sum + (Number(p.meetings_count) || 0), 0);
          const noShow = dayPerf.reduce((sum, p) => sum + (Number(p.leads_count) || 0), 0);

          chartData.push({
            date: currentChartDate.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit',
              timeZone: 'America/Sao_Paulo'
            }),
            calls,
            schedulings,
            noShow
          });
        }
        currentChartDate.setDate(currentChartDate.getDate() + 1);
      }

      // Calcular dados do último dia (para compatibilidade)
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
        
        // Dados do período selecionado
        monthlyCallsAverage: periodCallsAverage,
        monthlySchedulingsAverage: periodSchedulingsAverage,
        monthlyNoShowRate: periodNoShowRate,
        
        // Dados gerais
        totalSDRs: sdrIds.length,
        averageSchedulingsPerSDR: sdrIds.length > 0 ? Math.round((periodTotals.schedulings / sdrIds.length) * 100) / 100 : 0,
        sdrPerformance,
        weeklyData: chartData
      };
      
      setData(finalData);
      console.log('🟢 usePreSalesData - Real data loaded successfully:', finalData);
      
    } catch (err) {
      console.error('🔴 usePreSalesData - Error loading data:', err);
      setError('Erro ao carregar dados de pré-vendas');
      
      // Em caso de erro, usar dados mock
      const mockData = generateMockData(filters);
      setData(mockData);
    } finally {
      setIsLoading(false);
    }
  }, [userId, filters]);

  // Função para gerar dados mock como fallback
  const generateMockData = (filters?: PreSalesFilters) => {
    const currentDate = new Date();
    
    // Definir período para mock
    let startDate: Date;
    let endDate: Date;
    
    if (filters?.startDate && filters?.endDate) {
      startDate = filters.startDate;
      endDate = filters.endDate;
    } else {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }
    
    const businessDaysInPeriod = getBusinessDaysInPeriod(startDate, endDate);
    
    const mockChartData = [];
    const currentMockDate = new Date(startDate);
    
    // Gerar dados mock para o período selecionado
    let totalCalls = 0;
    let totalSchedulings = 0;
    let totalNoShow = 0;
    
    while (currentMockDate <= endDate) {
      // Pular fins de semana
      if (currentMockDate.getDay() !== 0 && currentMockDate.getDay() !== 6) {
        const baseCalls = Math.floor(Math.random() * 15) + 30;
        const schedulings = Math.floor(baseCalls * (0.15 + Math.random() * 0.10));
        const noShow = schedulings > 0 ? Math.floor(schedulings * (Math.random() * 0.2)) : 0;
        
        totalCalls += baseCalls;
        totalSchedulings += schedulings;
        totalNoShow += noShow;
        
        mockChartData.push({
          date: currentMockDate.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit',
            timeZone: 'America/Sao_Paulo'
          }),
          calls: baseCalls,
          schedulings: schedulings,
          noShow: noShow
        });
      }
      currentMockDate.setDate(currentMockDate.getDate() + 1);
    }
    
    const todayData = mockChartData[mockChartData.length - 1] || { calls: 0, schedulings: 0, noShow: 0 };
    
    // Calcular médias do período
    const periodCallsAverage = businessDaysInPeriod > 0 ? Math.round((totalCalls / businessDaysInPeriod) * 100) / 100 : 0;
    const periodSchedulingsAverage = businessDaysInPeriod > 0 ? Math.round((totalSchedulings / businessDaysInPeriod) * 100) / 100 : 0;
    const periodNoShowRate = totalSchedulings > 0 ? Math.round((totalNoShow / totalSchedulings) * 10000) / 100 : 0;
    
    return {
      dailyCalls: todayData.calls,
      dailyCallsTarget: 40,
      dailySchedulings: todayData.schedulings,
      dailySchedulingsTarget: 8,
      dailyNoShow: todayData.noShow,
      dailyNoShowRate: todayData.schedulings > 0 ? (todayData.noShow / todayData.schedulings) * 100 : 0,
      
      // Dados do período
      monthlyCallsAverage: periodCallsAverage,
      monthlySchedulingsAverage: periodSchedulingsAverage,
      monthlyNoShowRate: periodNoShowRate,
      
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
      weeklyData: mockChartData
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
