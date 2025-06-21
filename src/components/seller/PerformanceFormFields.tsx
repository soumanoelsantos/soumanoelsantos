
import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import IndividualSalesManager from './IndividualSalesManager';

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
  sellerId: string;
  performanceId?: string;
  setValue: UseFormSetValue<PerformanceFormData>;
}

const PerformanceFormFields: React.FC<PerformanceFormFieldsProps> = ({
  register,
  errors,
  isCloser,
  sellerId,
  performanceId,
  setValue
}) => {
  console.log('🔍 [DEBUG] PerformanceFormFields renderizado:', { isCloser, sellerId, performanceId });

  const handleTotalsChange = (totals: { salesCount: number; revenueTotal: number; billingTotal: number }) => {
    console.log('📊 [DEBUG] Totais das vendas individuais mudaram:', totals);
    setValue('sales_count', totals.salesCount);
    setValue('revenue_amount', totals.revenueTotal);
    setValue('billing_amount', totals.billingTotal);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {isCloser && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Vendas Individuais</h3>
            <IndividualSalesManager
              sellerId={sellerId}
              performanceId={performanceId || 'temp-id'}
              onTotalsChange={handleTotalsChange}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sales_count">Quantidade de Vendas</Label>
          <Input
            id="sales_count"
            type="number"
            min="0"
            {...register('sales_count', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
            readOnly={isCloser}
            className={isCloser ? 'bg-gray-100' : ''}
          />
          {errors.sales_count && (
            <p className="text-sm text-red-600">{errors.sales_count.message}</p>
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
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
            readOnly={isCloser}
            className={isCloser ? 'bg-gray-100' : ''}
          />
          {errors.revenue_amount && (
            <p className="text-sm text-red-600">{errors.revenue_amount.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="billing_amount">Faturamento (R$)</Label>
          <Input
            id="billing_amount"
            type="number"
            step="0.01"
            min="0"
            {...register('billing_amount', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
            readOnly={isCloser}
            className={isCloser ? 'bg-gray-100' : ''}
          />
          {errors.billing_amount && (
            <p className="text-sm text-red-600">{errors.billing_amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="leads_count">Leads</Label>
          <Input
            id="leads_count"
            type="number"
            min="0"
            {...register('leads_count', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
          />
          {errors.leads_count && (
            <p className="text-sm text-red-600">{errors.leads_count.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="meetings_count">Reuniões</Label>
          <Input
            id="meetings_count"
            type="number"
            min="0"
            {...register('meetings_count', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
          />
          {errors.meetings_count && (
            <p className="text-sm text-red-600">{errors.meetings_count.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="calls_count">Ligações</Label>
          <Input
            id="calls_count"
            type="number"
            min="0"
            {...register('calls_count', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Deve ser maior ou igual a 0' }
            })}
          />
          {errors.calls_count && (
            <p className="text-sm text-red-600">{errors.calls_count.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          rows={3}
          {...register('notes')}
          placeholder="Adicione observações sobre sua performance do dia (opcional)"
        />
        {errors.notes && (
          <p className="text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>
    </div>
  );
};

export default PerformanceFormFields;
