
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { IndividualSale, IndividualSaleFormData } from '@/types/individualSales';
import { useToast } from '@/hooks/use-toast';

// Type for the raw response from Supabase
interface IndividualSaleResponse {
  id: string;
  seller_id: string;
  performance_id: string;
  client_name: string;
  revenue_amount: number;
  billing_amount: number;
  product_id?: string | null;
  created_at: string;
  updated_at: string;
  products?: {
    id: string;
    name: string;
  } | null;
}

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

    console.log('📋 [DEBUG] Buscando vendas para performanceId:', performanceId);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .select(`
          *,
          products(
            id,
            name
          )
        `)
        .eq('performance_id', performanceId)
        .order('created_at', { ascending: false });

      console.log('📝 [DEBUG] Resultado da busca de vendas:', { data, error });

      if (error) {
        console.error('❌ [DEBUG] Erro na consulta:', error);
        setSales([]);
      } else {
        console.log('✅ [DEBUG] Vendas carregadas:', data?.length || 0);
        console.log('📊 [DEBUG] Dados das vendas:', data);
        
        // Transform the response to match our IndividualSale type
        // Handle cases where products might be null or malformed
        const transformedSales: IndividualSale[] = (data || []).map((sale: any) => ({
          id: sale.id,
          seller_id: sale.seller_id,
          performance_id: sale.performance_id,
          client_name: sale.client_name,
          revenue_amount: sale.revenue_amount,
          billing_amount: sale.billing_amount,
          product_id: sale.product_id,
          created_at: sale.created_at,
          updated_at: sale.updated_at,
          products: (sale.products && typeof sale.products === 'object' && 'id' in sale.products) 
            ? sale.products 
            : null
        }));
        setSales(transformedSales);
      }
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao buscar vendas individuais:', error);
      setSales([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addSale = async (sellerId: string, performanceId: string, saleData: IndividualSaleFormData) => {
    console.log('📤 [DEBUG] Adicionando venda:', { sellerId, performanceId, saleData });
    
    try {
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .insert({
          seller_id: sellerId,
          performance_id: performanceId,
          client_name: saleData.client_name,
          revenue_amount: saleData.revenue_amount,
          billing_amount: saleData.billing_amount,
          product_id: saleData.product_id || null,
        })
        .select(`
          *,
          products(
            id,
            name
          )
        `)
        .single();

      console.log('📝 [DEBUG] Resultado da inserção:', { data, error });

      if (error) {
        console.error('❌ [DEBUG] Erro na inserção:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Venda adicionada com sucesso:', data);
      
      // Transform the response to match our IndividualSale type
      const transformedSale: IndividualSale = {
        id: data.id,
        seller_id: data.seller_id,
        performance_id: data.performance_id,
        client_name: data.client_name,
        revenue_amount: data.revenue_amount,
        billing_amount: data.billing_amount,
        product_id: data.product_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        products: (data.products && typeof data.products === 'object' && 'id' in data.products) 
          ? data.products 
          : null
      };
      
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
    console.log('🗑️ [DEBUG] Deletando venda:', saleId);
    
    try {
      const { error } = await supabase
        .from('seller_individual_sales')
        .delete()
        .eq('id', saleId);

      if (error) {
        console.error('❌ [DEBUG] Erro ao deletar:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Venda deletada com sucesso');
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
