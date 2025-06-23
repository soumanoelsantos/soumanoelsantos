
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { SellerChartDataPoint } from './useSellerPerformanceCharts/types';
import { fetchSellersData, fetchPerformanceData } from './useSellerPerformanceCharts/dataFetching';
import { processPerformanceData } from './useSellerPerformanceCharts/dataProcessing';
import { generateExampleData } from './useSellerPerformanceCharts/exampleData';

export const useSellerPerformanceCharts = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [revenueData, setRevenueData] = useState<SellerChartDataPoint[]>([]);
  const [billingData, setBillingData] = useState<SellerChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerNames, setSellerNames] = useState<string[]>([]);

  const fetchSellerPerformanceData = async () => {
    if (!userId) {
      console.log('❌ [DEBUG] useSellerPerformanceCharts - No userId available');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const sellersData = await fetchSellersData(userId);

      if (!sellersData || sellersData.length === 0) {
        console.log('⚠️ [DEBUG] useSellerPerformanceCharts - Nenhum vendedor encontrado, usando dados de exemplo');
        const exampleData = generateExampleData();
        setSellerNames(exampleData.sellerNames);
        setRevenueData(exampleData.revenueData);
        setBillingData(exampleData.billingData);
        return;
      }

      // Extrair nomes dos vendedores
      const names = sellersData.map(seller => seller.name);
      setSellerNames(names);
      console.log('📊 [DEBUG] useSellerPerformanceCharts - Nomes dos vendedores:', names);

      // Buscar dados de performance dos últimos 30 dias
      const currentDate = new Date();
      const startDate = new Date();
      startDate.setDate(currentDate.getDate() - 30);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = currentDate.toISOString().split('T')[0];

      const performanceData = await fetchPerformanceData(
        sellersData.map(s => s.id),
        startDateStr,
        endDateStr
      );

      // Processar dados para os gráficos (acumulado diário)
      const { revenueData: processedRevenueData, billingData: processedBillingData } = 
        processPerformanceData(sellersData, performanceData, currentDate);

      console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de gráficos processados:', {
        revenueDataLength: processedRevenueData.length,
        billingDataLength: processedBillingData.length,
        sellerNames: names,
        sampleRevenueData: processedRevenueData.slice(-3), // últimos 3 dias
        sampleBillingData: processedBillingData.slice(-3)
      });

      setRevenueData(processedRevenueData);
      setBillingData(processedBillingData);

    } catch (error) {
      console.error('💥 [DEBUG] useSellerPerformanceCharts - Erro ao carregar dados de performance dos vendedores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de performance dos vendedores",
        variant: "destructive",
      });
      
      // Em caso de erro, usar dados de exemplo
      const exampleData = generateExampleData();
      setSellerNames(exampleData.sellerNames);
      setRevenueData(exampleData.revenueData);
      setBillingData(exampleData.billingData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerPerformanceData();
  }, [userId]);

  return {
    revenueData,
    billingData,
    sellerNames,
    isLoading,
    refetch: fetchSellerPerformanceData
  };
};
