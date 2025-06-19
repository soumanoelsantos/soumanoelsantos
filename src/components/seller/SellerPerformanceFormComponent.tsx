
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { Seller } from '@/types/sellers';

interface PerformanceFormData {
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  leads_count: number;
  meetings_count: number;
  calls_count: number;
  notes: string;
}

interface SellerPerformanceFormComponentProps {
  onSubmit: (data: PerformanceFormData) => Promise<void>;
  isSubmitting: boolean;
  seller: Seller;
}

const SellerPerformanceFormComponent: React.FC<SellerPerformanceFormComponentProps> = ({
  onSubmit,
  isSubmitting,
  seller
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      leads_count: 0,
      meetings_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

  const handleFormSubmit = async (data: PerformanceFormData) => {
    // Se for closer, zerar os campos não utilizados
    if (seller.seller_type === 'closer') {
      data.leads_count = 0;
      data.calls_count = 0;
      data.notes = '';
    }
    
    await onSubmit(data);
    reset();
  };

  const isCloser = seller.seller_type === 'closer';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Dados de Performance
        </CardTitle>
        <CardDescription>
          Preencha os dados da sua performance do dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              {...register('date', { required: 'Data é obrigatória' })}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sales_count">Vendas Realizadas *</Label>
              <Input
                id="sales_count"
                type="number"
                min="0"
                {...register('sales_count', { 
                  required: 'Campo obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                })}
                placeholder="Quantidade de vendas"
              />
              {errors.sales_count && (
                <p className="text-sm text-red-600">{errors.sales_count.message}</p>
              )}
            </div>

            {!isCloser && (
              <div className="space-y-2">
                <Label htmlFor="leads_count">Leads Gerados *</Label>
                <Input
                  id="leads_count"
                  type="number"
                  min="0"
                  {...register('leads_count', { 
                    required: 'Campo obrigatório',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                  })}
                  placeholder="Quantidade de leads"
                />
                {errors.leads_count && (
                  <p className="text-sm text-red-600">{errors.leads_count.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue_amount">Receita (R$) *</Label>
              <Input
                id="revenue_amount"
                type="number"
                step="0.01"
                min="0"
                {...register('revenue_amount', { 
                  required: 'Campo obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                })}
                placeholder="0,00"
              />
              {errors.revenue_amount && (
                <p className="text-sm text-red-600">{errors.revenue_amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_amount">Faturamento (R$) *</Label>
              <Input
                id="billing_amount"
                type="number"
                step="0.01"
                min="0"
                {...register('billing_amount', { 
                  required: 'Campo obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                })}
                placeholder="0,00"
              />
              {errors.billing_amount && (
                <p className="text-sm text-red-600">{errors.billing_amount.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetings_count">Reuniões *</Label>
              <Input
                id="meetings_count"
                type="number"
                min="0"
                {...register('meetings_count', { 
                  required: 'Campo obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                })}
                placeholder="Quantidade de reuniões"
              />
              {errors.meetings_count && (
                <p className="text-sm text-red-600">{errors.meetings_count.message}</p>
              )}
            </div>

            {!isCloser && (
              <div className="space-y-2">
                <Label htmlFor="calls_count">Ligações *</Label>
                <Input
                  id="calls_count"
                  type="number"
                  min="0"
                  {...register('calls_count', { 
                    required: 'Campo obrigatório',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                  })}
                  placeholder="Quantidade de ligações"
                />
                {errors.calls_count && (
                  <p className="text-sm text-red-600">{errors.calls_count.message}</p>
                )}
              </div>
            )}
          </div>

          {!isCloser && (
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Adicione observações sobre seu dia de trabalho..."
                rows={4}
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceFormComponent;
