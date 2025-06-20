
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { IndividualSale, IndividualSaleFormData } from '@/types/individualSales';
import { useToast } from '@/hooks/use-toast';

export const useIndividualSales = (performanceId?: string) => {
  const { toast } = useToast();
  const [sales, setSales] = useState<IndividualSale[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSales = async () => {
    if (!performanceId) {
      setSales([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .select('*')
        .eq('performance_id', performanceId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSales(data || []);
    } catch (error) {
      console.error('Erro ao buscar vendas individuais:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as vendas individuais",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSale = async (sellerId: string, performanceId: string, saleData: IndividualSaleFormData) => {
    try {
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .insert({
          seller_id: sellerId,
          performance_id: performanceId,
          client_name: saleData.client_name,
          revenue_amount: saleData.revenue_amount,
          billing_amount: saleData.billing_amount,
        })
        .select()
        .single();

      if (error) throw error;

      setSales(prev => [data, ...prev]);
      toast({
        title: "Sucesso",
        description: "Venda individual adicionada com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao adicionar venda individual:', error);
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
      const { error } = await supabase
        .from('seller_individual_sales')
        .delete()
        .eq('id', saleId);

      if (error) throw error;

      setSales(prev => prev.filter(sale => sale.id !== saleId));
      toast({
        title: "Sucesso",
        description: "Venda individual removida com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover venda individual:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a venda individual",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
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
