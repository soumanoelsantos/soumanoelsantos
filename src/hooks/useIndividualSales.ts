
import { useState, useEffect } from 'react';
import { IndividualSale, IndividualSaleFormData } from '@/types/individualSales';
import { useToast } from '@/hooks/use-toast';
import { fetchIndividualSales, createIndividualSale, deleteIndividualSale } from '@/services/individualSalesService';
import { transformSupabaseResponseListToSales, transformSupabaseResponseToSale } from '@/utils/individualSalesUtils';

export const useIndividualSales = (performanceId?: string) => {
  const { toast } = useToast();
  const [sales, setSales] = useState<IndividualSale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log('🔍 [DEBUG] useIndividualSales inicializado com performanceId:', performanceId);

  const fetchSales = async () => {
    // Se não tem performanceId válido, não buscar vendas
    if (!performanceId || performanceId === 'temp-id') {
      console.log('⚠️ [DEBUG] Sem performanceId válido, definindo sales como array vazio');
      setSales([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await fetchIndividualSales(performanceId);
      console.log('✅ [DEBUG] Vendas carregadas:', data?.length || 0);
      console.log('📊 [DEBUG] Dados das vendas:', data);
      
      const transformedSales = transformSupabaseResponseListToSales(data || []);
      setSales(transformedSales);
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao buscar vendas individuais:', error);
      setSales([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addSale = async (sellerId: string, performanceId: string, saleData: IndividualSaleFormData) => {
    try {
      const data = await createIndividualSale({ sellerId, performanceId, saleData });
      console.log('✅ [DEBUG] Venda adicionada com sucesso:', data);
      
      const transformedSale = transformSupabaseResponseToSale(data);
      setSales(prev => [transformedSale, ...prev]);
      
      toast({
        title: "Sucesso",
        description: "Venda individual adicionada com sucesso",
      });
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao adicionar venda individual:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a venda individual",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteSale = async (saleId: string) => {
    try {
      await deleteIndividualSale(saleId);
      setSales(prev => prev.filter(sale => sale.id !== saleId));
      
      toast({
        title: "Sucesso",
        description: "Venda individual removida com sucesso",
      });
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao remover venda individual:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a venda individual",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    console.log('🔄 [DEBUG] useEffect do useIndividualSales triggered, performanceId:', performanceId);
    fetchSales();
  }, [performanceId]);

  return {
    sales,
    isLoading,
    addSale,
    deleteSale,
    refetch: fetchSales,
  };
};
