
export interface SellerChartDataPoint {
  day: string;
  [key: string]: string | number; // Para permitir nomes dinâmicos de vendedores
}
