
import { supabase } from '@/integrations/supabase/client';
import { SupabaseIndividualSaleResponse, AddSaleParams } from '@/types/individualSalesApi';

export const fetchIndividualSales = async (performanceId: string) => {
  console.log('📋 [DEBUG] Buscando vendas para performanceId:', performanceId);
  
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
    throw error;
  }

  // Transformar os dados para garantir que atendem ao tipo esperado
  const transformedData: SupabaseIndividualSaleResponse[] = (data || []).map(item => {
    const products = item.products;
    return {
      id: item.id,
      seller_id: item.seller_id,
      performance_id: item.performance_id,
      client_name: item.client_name,
      revenue_amount: item.revenue_amount,
      billing_amount: item.billing_amount,
      product_id: item.product_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      products: (products !== null && typeof products === 'object' && 'id' in products && 'name' in products)
        ? { id: products.id, name: products.name }
        : null
    };
  });

  return transformedData;
};

export const createIndividualSale = async ({ sellerId, performanceId, saleData }: AddSaleParams) => {
  console.log('📤 [DEBUG] Adicionando venda:', { sellerId, performanceId, saleData });
  
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

  // Transformar os dados para garantir que atendem ao tipo esperado
  const products = data.products;
  const transformedData: SupabaseIndividualSaleResponse = {
    id: data.id,
    seller_id: data.seller_id,
    performance_id: data.performance_id,
    client_name: data.client_name,
    revenue_amount: data.revenue_amount,
    billing_amount: data.billing_amount,
    product_id: data.product_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    products: (products !== null && typeof products === 'object' && 'id' in products && 'name' in products)
      ? { id: products.id, name: products.name }
      : null
  };

  return transformedData;
};

export const deleteIndividualSale = async (saleId: string) => {
  console.log('🗑️ [DEBUG] Deletando venda:', saleId);
  
  const { error } = await supabase
    .from('seller_individual_sales')
    .delete()
    .eq('id', saleId);

  if (error) {
    console.error('❌ [DEBUG] Erro ao deletar:', error);
    throw error;
  }

  console.log('✅ [DEBUG] Venda deletada com sucesso');
};
