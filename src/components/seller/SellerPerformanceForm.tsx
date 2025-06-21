
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, TrendingUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PerformanceFormData, Seller } from '@/types/sellers';

interface SellerPerformanceFormProps {
  seller: Seller;
  onSubmit: (data: PerformanceFormData) => Promise<void>;
  isSubmitting: boolean;
  defaultDate: string;
}

const SellerPerformanceForm: React.FC<SellerPerformanceFormProps> = ({
  seller,
  onSubmit,
  isSubmitting,
  defaultDate
}) => {
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

  const isCloser = seller.seller_type === 'closer';
  const isSDR = seller.seller_type === 'sdr';

  const handleFormSubmit = async (data: PerformanceFormData) => {
    try {
      await onSubmit(data);
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
    } catch (error) {
      console.error('Erro ao enviar performance:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Registrar Performance Diária
        </CardTitle>
        <CardDescription>
          Preencha os dados da sua performance do dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                {...register('date', { required: 'Data é obrigatória' })}
              />
              {errors.date && (
                <span className="text-sm text-red-600">{errors.date.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales_count">Quantidade de Vendas</Label>
              <Input
                id="sales_count"
                type="number"
                min="0"
                {...register('sales_count', { 
                  required: 'Quantidade de vendas é obrigatória',
                  valueAsNumber: true 
                })}
              />
              {errors.sales_count && (
                <span className="text-sm text-red-600">{errors.sales_count.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue_amount">Receita (R$)</Label>
              <Input
                id="revenue_amount"
                type="number"
                step="0.01"
                min="0"
                {...register('revenue_amount', { 
                  required: 'Receita é obrigatória',
                  valueAsNumber: true 
                })}
              />
              {errors.revenue_amount && (
                <span className="text-sm text-red-600">{errors.revenue_amount.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_amount">Faturamento (R$)</Label>
              <Input
                id="billing_amount"
                type="number"
                step="0.01"
                min="0"
                {...register('billing_amount', { 
                  required: 'Faturamento é obrigatório',
                  valueAsNumber: true 
                })}
              />
              {errors.billing_amount && (
                <span className="text-sm text-red-600">{errors.billing_amount.message}</span>
              )}
            </div>

            {/* SDRs precisam registrar leads e ligações */}
            {isSDR && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="leads_count">Leads</Label>
                  <Input
                    id="leads_count"
                    type="number"
                    min="0"
                    {...register('leads_count', { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calls_count">Ligações</Label>
                  <Input
                    id="calls_count"
                    type="number"
                    min="0"
                    {...register('calls_count', { valueAsNumber: true })}
                  />
                </div>
              </>
            )}

            {/* Todos os tipos registram reuniões */}
            <div className="space-y-2">
              <Label htmlFor="meetings_count">Reuniões</Label>
              <Input
                id="meetings_count"
                type="number"
                min="0"
                {...register('meetings_count', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre sua performance..."
              {...register('notes')}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Registrar Performance
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceForm;
