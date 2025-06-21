
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Seller } from '@/types/sellers';
import { useSellerPerformance } from './useSellerPerformance';
import { ProductSale } from '@/components/seller/ProductSalesSection';

export const useSellerToken = (token?: string) => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { createOrUpdatePerformance } = useSellerPerformance(seller?.id);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchSeller = async () => {
      try {
        console.log('🔍 [DEBUG] Buscando vendedor pelo token:', token);
        
        const { data, error } = await supabase
          .rpc('get_seller_by_access_token', { token_param: token });

        if (error) {
          console.error('❌ [DEBUG] Erro ao buscar vendedor:', error);
          setSeller(null);
        } else if (data && data.length > 0) {
          console.log('✅ [DEBUG] Vendedor encontrado:', data[0]);
          setSeller(data[0]);
        } else {
          console.log('❌ [DEBUG] Nenhum vendedor encontrado para o token');
          setSeller(null);
        }
      } catch (error) {
        console.error('💥 [DEBUG] Erro na consulta:', error);
        setSeller(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeller();
  }, [token]);

  const handleSubmit = async (data: {
    date: string;
    sales_count: number;
    revenue_amount: number;
    billing_amount: number;
    leads_count: number;
    meetings_count: number;
    calls_count: number;
    notes: string;
    product_sales?: ProductSale[];
  }) => {
    if (!seller) {
      throw new Error('Vendedor não encontrado');
    }

    console.log('📤 [DEBUG] Enviando dados de performance:', data);

    const success = await createOrUpdatePerformance({
      ...data,
      submitted_by_seller: true,
    });

    if (!success) {
      throw new Error('Falha ao salvar a performance');
    }

    return success;
  };

  return {
    seller,
    isLoading,
    handleSubmit,
  };
};
