
import { IndividualSale } from '@/types/individualSales';
import { SupabaseIndividualSaleResponse } from '@/types/individualSalesApi';

export const transformSupabaseResponseToSale = (sale: SupabaseIndividualSaleResponse): IndividualSale => {
  return {
    id: sale.id,
    seller_id: sale.seller_id,
    performance_id: sale.performance_id,
    client_name: sale.client_name,
    revenue_amount: sale.revenue_amount,
    billing_amount: sale.billing_amount,
    product_id: sale.product_id,
    created_at: sale.created_at,
    updated_at: sale.updated_at,
    products: sale.products
  };
};

export const transformSupabaseResponseListToSales = (salesData: SupabaseIndividualSaleResponse[]): IndividualSale[] => {
  return salesData.map(transformSupabaseResponseToSale);
};
