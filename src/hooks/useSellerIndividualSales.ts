
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

        // Buscar vendas individuais
        const { data: salesData, error: salesError } = await supabase
          .from('seller_individual_sales')
          .select('*')
          .eq('performance_id', performanceId);

        if (salesError) {
          console.error('❌ [DEBUG] Erro ao buscar vendas individuais:', salesError);
          throw salesError;
        }

        console.log('✅ [DEBUG] Vendas individuais encontradas:', salesData?.length || 0);

        // Buscar produtos separadamente para evitar problemas de relacionamento
        const productIds = salesData?.map(sale => sale.product_id).filter(Boolean) || [];
        let productsMap: Record<string, string> = {};

        if (productIds.length > 0) {
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('id, name')
            .in('id', productIds);

          if (!productsError && productsData) {
            productsMap = productsData.reduce((acc, product) => {
              acc[product.id] = product.name;
              return acc;
            }, {} as Record<string, string>);
          }
        }

        // Formatar dados incluindo nome do produto
        const formattedSales = (salesData || []).map(sale => ({
          id: sale.id,
          performance_id: sale.performance_id,
          client_name: sale.client_name,
          product_id: sale.product_id,
          revenue_amount: sale.revenue_amount,
          billing_amount: sale.billing_amount,
          product_name: sale.product_id ? (productsMap[sale.product_id] || 'Produto não encontrado') : 'Produto não informado'
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
