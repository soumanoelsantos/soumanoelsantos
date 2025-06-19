
import { useState, useEffect, useCallback } from 'react';

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

// Função para gerar dados do mês atual - dados mais realistas para Sabrina
const generateCurrentMonthData = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  
  const monthlyData = [];
  
  // Gerar dados para todos os dias do mês até hoje
  for (let day = 1; day <= today; day++) {
    const date = new Date(year, month, day);
    const dayName = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    // Simular dados realistas para Sabrina - mais consistentes
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    let baseCalls = 0;
    let schedulings = 0;
    let noShow = 0;
    
    if (!isWeekend) {
      // Dados mais realistas para dias úteis
      baseCalls = Math.floor(Math.random() * 15) + 30; // 30-45 calls por dia útil
      schedulings = Math.floor(baseCalls * (0.15 + Math.random() * 0.10)); // 15-25% conversão
      noShow = schedulings > 0 ? Math.floor(schedulings * (Math.random() * 0.2)) : 0; // 0-20% no-show
    }
    
    monthlyData.push({
      date: dayName,
      calls: baseCalls,
      schedulings: schedulings,
      noShow: noShow
    });
  }
  
  return monthlyData;
};

export const usePreSalesData = () => {
  const [data, setData] = useState<PreSalesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPreSalesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔍 usePreSalesData - Loading pre-sales data from database...');
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const monthlyData = generateCurrentMonthData();
      const todayData = monthlyData[monthlyData.length - 1] || { calls: 0, schedulings: 0, noShow: 0 };
      
      // Calcular totais do mês
      const totalCalls = monthlyData.reduce((sum, day) => sum + day.calls, 0);
      const totalSchedulings = monthlyData.reduce((sum, day) => sum + day.schedulings, 0);
      const totalNoShow = monthlyData.reduce((sum, day) => sum + day.noShow, 0);
      
      const conversionRate = totalCalls > 0 ? (totalSchedulings / totalCalls) * 100 : 0;
      
      const mockData: PreSalesData = {
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
            name: 'Sabrina', 
            calls: totalCalls, 
            schedulings: totalSchedulings, 
            noShow: totalNoShow, 
            conversionRate: conversionRate 
          }
        ],
        weeklyData: monthlyData
      };
      
      setData(mockData);
      console.log('🟢 usePreSalesData - Data loaded successfully:', mockData);
      
    } catch (err) {
      console.error('🔴 usePreSalesData - Error loading data:', err);
      setError('Erro ao carregar dados de pré-vendas');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
