
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetValue } from 'react-hook-form';
import PerformanceFormFields from './PerformanceFormFields';

interface PerformanceFormData {
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  meetings_count: number;
  leads_count: number;
  calls_count: number;
  notes: string;
}

interface PerformanceFormCardProps {
  isSDR: boolean;
  register: UseFormRegister<PerformanceFormData>;
  handleSubmit: UseFormHandleSubmit<PerformanceFormData>;
  errors: FieldErrors<PerformanceFormData>;
  isSubmitting: boolean;
  onSubmit: (data: PerformanceFormData) => Promise<void>;
  onCancel: () => void;
  sellerId: string;
  performanceId?: string;
  setValue: UseFormSetValue<PerformanceFormData>;
}

const PerformanceFormCard: React.FC<PerformanceFormCardProps> = ({
  isSDR,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  sellerId,
  performanceId,
  setValue
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4" />
          Lançar Performance {isSDR ? '- SDR' : '- Closer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PerformanceFormFields 
            register={register}
            errors={errors}
            isCloser={!isSDR}
            sellerId={sellerId}
            performanceId={performanceId}
            setValue={setValue}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Lançamento'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PerformanceFormCard;
