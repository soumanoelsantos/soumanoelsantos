
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Seller } from '@/types/sellers';
import { toast } from 'sonner';
import PerformanceFormFields from './PerformanceFormFields';
import PerformanceFormSubmit from './PerformanceFormSubmit';

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
  onSuccess?: () => void;
}

const SellerPerformanceFormComponent: React.FC<SellerPerformanceFormComponentProps> = ({
  onSubmit,
  isSubmitting,
  seller,
  onSuccess
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
    try {
      await onSubmit(data);
      
      toast.success("✅ Performance Registrada!", {
        description: "Sua performance foi enviada com sucesso!",
        duration: 4000,
      });
      
      reset();
      
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Dados de Performance - {seller.name}
        </CardTitle>
        <CardDescription>
          Preencha os dados da sua performance do dia - {isSDR ? 'SDR (Pré-vendas)' : 'Closer (Comercial)'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <PerformanceFormFields 
            register={register}
            errors={errors}
            isCloser={isCloser}
          />
          <PerformanceFormSubmit isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceFormComponent;
