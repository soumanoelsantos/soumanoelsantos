
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
  showTotalsReadonly?: boolean;
  noSalesToday?: boolean;
  onNoSalesTodayChange?: (checked: boolean) => void;
}

const PerformanceFormFields: React.FC<PerformanceFormFieldsProps> = ({
  register,
  errors,
  isCloser,
  showTotalsReadonly = false,
  noSalesToday = false,
  onNoSalesTodayChange
}) => {
  const isSDR = !isCloser;

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

      {/* Checkbox para "Não houve vendas hoje" - apenas para Closers */}
      {isCloser && onNoSalesTodayChange && (
        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border">
          <Checkbox
            id="noSalesToday"
            checked={noSalesToday}
            onCheckedChange={onNoSalesTodayChange}
          />
          <Label htmlFor="noSalesToday" className="text-sm font-medium">
            Não houve vendas hoje (registrar apenas reuniões)
          </Label>
        </div>
      )}

      {/* Campos específicos para SDR */}
      {isSDR && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calls_count">Número de Tentativas *</Label>
              <Input
                id="calls_count"
                type="number"
                min="0"
                {...register('calls_count', { 
                  required: 'Número de tentativas é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.calls_count && (
                <p className="text-sm text-red-600">{errors.calls_count.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetings_count">Número de Agendamentos *</Label>
              <Input
                id="meetings_count"
                type="number"
                min="0"
                {...register('meetings_count', { 
                  required: 'Número de agendamentos é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.meetings_count && (
                <p className="text-sm text-red-600">{errors.meetings_count.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leads_count">Número de No Show *</Label>
              <Input
                id="leads_count"
                type="number"
                min="0"
                {...register('leads_count', { 
                  required: 'Número de no show é obrigatório',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.leads_count && (
                <p className="text-sm text-red-600">{errors.leads_count.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campos específicos para Closer */}
      {isCloser && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sales_count">
                Quantidade de Vendas
                <span className="text-xs text-blue-600 ml-2">(Calculado automaticamente)</span>
                {noSalesToday && <span className="text-xs text-gray-500 ml-2">(Sem vendas hoje)</span>}
              </Label>
              <Input
                id="sales_count"
                type="number"
                min="0"
                readOnly={true}
                className="bg-gray-100 cursor-not-allowed"
                {...register('sales_count', { 
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.sales_count && (
                <p className="text-sm text-red-600">{errors.sales_count.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue_amount">
                Receita (R$)
                <span className="text-xs text-blue-600 ml-2">(Calculado automaticamente)</span>
                {noSalesToday && <span className="text-xs text-gray-500 ml-2">(Sem vendas hoje)</span>}
              </Label>
              <Input
                id="revenue_amount"
                type="number"
                step="0.01"
                min="0"
                readOnly={true}
                className="bg-gray-100 cursor-not-allowed"
                {...register('revenue_amount', { 
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.revenue_amount && (
                <p className="text-sm text-red-600">{errors.revenue_amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_amount">
                Faturamento (R$)
                <span className="text-xs text-blue-600 ml-2">(Calculado automaticamente)</span>
                {noSalesToday && <span className="text-xs text-gray-500 ml-2">(Sem vendas hoje)</span>}
              </Label>
              <Input
                id="billing_amount"
                type="number"
                step="0.01"
                min="0"
                readOnly={true}
                className="bg-gray-100 cursor-not-allowed"
                {...register('billing_amount', { 
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.billing_amount && (
                <p className="text-sm text-red-600">{errors.billing_amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetings_count">Reuniões *</Label>
              <Input
                id="meetings_count"
                type="number"
                min="0"
                {...register('meetings_count', { 
                  required: 'Quantidade de reuniões é obrigatória',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Deve ser maior ou igual a 0' }
                })}
              />
              {errors.meetings_count && (
                <p className="text-sm text-red-600">{errors.meetings_count.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

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
