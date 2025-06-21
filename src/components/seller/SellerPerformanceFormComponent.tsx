
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Seller } from '@/types/sellers';
import { toast } from 'sonner';
import PerformanceFormFields from './PerformanceFormFields';
import PerformanceFormSubmit from './PerformanceFormSubmit';
import ProductSalesSection, { ProductSale } from './ProductSalesSection';
import { getBrazilianDate } from '@/utils/dateUtils';

interface PerformanceFormData {
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  leads_count: number;
  meetings_count: number;
  calls_count: number;
  notes: string;
  product_sales?: ProductSale[];
}

interface SellerPerformanceFormComponentProps {
  onSubmit: (data: PerformanceFormData) => Promise<void>;
  isSubmitting: boolean;
  seller: Seller;
  onSuccess?: () => void;
}

const SellerPerformanceFormComponent: React.FC<SellerPerformanceFormComponentProps> = ({
  onSubmit,
  isSubmitting,
  seller,
  onSuccess
}) => {
  // Obter data atual no fuso brasileiro para o valor padrão
  const today = new Date();
  const brazilianDateString = today.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  const [day, month, year] = brazilianDateString.split('/');
  const defaultDate = `${year}-${month}-${day}`;

  const [productSales, setProductSales] = useState<ProductSale[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: defaultDate,
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      leads_count: 0,
      meetings_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

  // Atualizar automaticamente os totais baseados nas vendas por produto
  useEffect(() => {
    const totalRevenue = productSales.reduce((sum, sale) => sum + sale.revenue_amount, 0);
    const totalBilling = productSales.reduce((sum, sale) => sum + sale.billing_amount, 0);
    const totalSales = productSales.length;

    // Atualizar os campos do formulário automaticamente
    reset(prev => ({
      ...prev,
      sales_count: totalSales,
      revenue_amount: totalRevenue,
      billing_amount: totalBilling
    }));
  }, [productSales, reset]);

  const handleFormSubmit = async (data: PerformanceFormData) => {
    try {
      console.log('📤 [DEBUG] Enviando dados com vendas por produto:', {
        ...data,
        product_sales: productSales
      });

      // Validar se tem vendas por produto quando é closer
      const isCloser = seller.seller_type === 'closer';
      if (isCloser && data.sales_count > 0 && productSales.length === 0) {
        toast.error("❌ Erro de Validação", {
          description: "Como Closer, você deve registrar as vendas por produto quando há vendas.",
          duration: 4000,
        });
        return;
      }

      // Validar se todas as vendas por produto estão completas
      if (productSales.length > 0) {
        const incompleteSales = productSales.filter(sale => 
          !sale.product_id || !sale.client_name.trim()
        );
        
        if (incompleteSales.length > 0) {
          toast.error("❌ Erro de Validação", {
            description: "Todas as vendas devem ter produto e nome do cliente preenchidos.",
            duration: 4000,
          });
          return;
        }
      }

      await onSubmit({
        ...data,
        product_sales: productSales
      });
      
      toast.success("✅ Performance Registrada!", {
        description: `Sua performance foi registrada com sucesso! ${productSales.length > 0 ? `${productSales.length} vendas por produto incluídas.` : ''}`,
        duration: 4000,
      });
      
      reset({
        date: defaultDate,
        sales_count: 0,
        revenue_amount: 0,
        billing_amount: 0,
        leads_count: 0,
        meetings_count: 0,
        calls_count: 0,
        notes: '',
      });
      
      setProductSales([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('❌ Erro ao enviar performance:', error);
      toast.error("❌ Erro ao Registrar", {
        description: `Não foi possível salvar sua performance: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        duration: 4000,
      });
    }
  };

  const isSDR = seller.seller_type === 'sdr';
  const isCloser = !isSDR;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Dados de Performance - {seller.name}
          </CardTitle>
          <CardDescription>
            Preencha os dados da sua performance do dia - {isSDR ? 'SDR (Pré-vendas)' : 'Closer (Comercial)'}
            <br />
            <span className="text-xs text-blue-600">
              ⏰ Todas as datas são registradas no fuso horário brasileiro (UTC-3)
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <PerformanceFormFields 
              register={register}
              errors={errors}
              isCloser={isCloser}
              showTotalsReadonly={productSales.length > 0}
            />
            
            {isCloser && (
              <div className="border-t pt-6">
                <ProductSalesSection
                  productSales={productSales}
                  onProductSalesChange={setProductSales}
                />
              </div>
            )}
            
            <PerformanceFormSubmit isSubmitting={isSubmitting} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPerformanceFormComponent;
