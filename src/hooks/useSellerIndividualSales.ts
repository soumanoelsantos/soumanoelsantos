
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface IndividualSale {
  id: string;
  performance_id: string;
  client_name: string;
  product_id?: string;
  revenue_amount: number;
  billing_amount: number;
  product_name?: string;
}

export const useSellerIndividualSales = (performanceId?: string) => {
  const [sales, setSales] = useState<IndividualSale[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!performanceId) {
      setSales([]);
      return;
    }

    const fetchIndividualSales = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('🔍 [DEBUG] Buscando vendas individuais para performance:', performanceId);

        // Buscar vendas individuais com informações do produto
        const { data: salesData, error: salesError } = await supabase
          .from('seller_individual_sales')
          .select(`
            id,
            performance_id,
            client_name,
            product_id,
            revenue_amount,
            billing_amount,
            products:product_id (
              name
            )
          `)
          .eq('performance_id', performanceId);

        if (salesError) {
          console.error('❌ [DEBUG] Erro ao buscar vendas individuais:', salesError);
          throw salesError;
        }

        console.log('✅ [DEBUG] Vendas individuais encontradas:', salesData?.length || 0);

        // Formatar dados incluindo nome do produto
        const formattedSales = (salesData || []).map(sale => ({
          id: sale.id,
          performance_id: sale.performance_id,
          client_name: sale.client_name,
          product_id: sale.product_id,
          revenue_amount: sale.revenue_amount,
          billing_amount: sale.billing_amount,
          product_name: sale.products?.name || 'Produto não informado'
        }));

        setSales(formattedSales);
      } catch (err) {
        console.error('💥 [DEBUG] Erro inesperado ao buscar vendas individuais:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setSales([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndividualSales();
  }, [performanceId]);

  return {
    sales,
    isLoading,
    error
  };
};
