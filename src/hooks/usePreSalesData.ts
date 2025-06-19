
import { useState, useEffect } from 'react';

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

export const usePreSalesData = () => {
  const [data, setData] = useState<PreSalesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreSalesData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // TODO: Implementar integração real com o banco de dados
        // Por enquanto, usar dados mock até a integração ser implementada
        
        console.log('🔍 usePreSalesData - Loading pre-sales data from database...');
        
        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mock - substituir por chamada real ao banco
        const mockData: PreSalesData = {
          dailyCalls: 125,
          dailyCallsTarget: 150,
          dailySchedulings: 18,
          dailySchedulingsTarget: 25,
          dailyNoShow: 3,
          dailyNoShowRate: 16.7,
          totalSDRs: 4,
          averageSchedulingsPerSDR: 4.5,
          sdrPerformance: [
            { name: 'João', calls: 35, schedulings: 6, noShow: 1, conversionRate: 17.1 },
            { name: 'Maria', calls: 42, schedulings: 8, noShow: 0, conversionRate: 19.0 },
            { name: 'Pedro', calls: 28, schedulings: 3, noShow: 1, conversionRate: 10.7 },
            { name: 'Ana', calls: 38, schedulings: 7, noShow: 1, conversionRate: 18.4 }
          ],
          weeklyData: [
            { date: '01/12', calls: 120, schedulings: 15, noShow: 2 },
            { date: '02/12', calls: 135, schedulings: 22, noShow: 4 },
            { date: '03/12', calls: 110, schedulings: 18, noShow: 3 },
            { date: '04/12', calls: 145, schedulings: 28, noShow: 5 },
            { date: '05/12', calls: 155, schedulings: 31, noShow: 6 },
            { date: '06/12', calls: 125, schedulings: 19, noShow: 2 },
            { date: '07/12', calls: 140, schedulings: 24, noShow: 3 }
          ]
        };
        
        setData(mockData);
        console.log('🟢 usePreSalesData - Data loaded successfully:', mockData);
        
      } catch (err) {
        console.error('🔴 usePreSalesData - Error loading data:', err);
        setError('Erro ao carregar dados de pré-vendas');
      } finally {
        setIsLoading(false);
      }
    };

    loadPreSalesData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      // Função para recarregar os dados quando necessário
      setIsLoading(true);
      // Re-executar o useEffect
    }
  };
};
