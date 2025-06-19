
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface PerformanceFormFieldsProps {
  register: UseFormRegister<PerformanceFormData>;
  errors: FieldErrors<PerformanceFormData>;
  isCloser: boolean;
}

const PerformanceFormFields: React.FC<PerformanceFormFieldsProps> = ({
  register,
  errors,
  isCloser
}) => {
  return (
    <>
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
    </>
  );
};

export default PerformanceFormFields;
