
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Seller } from '@/types/sellers';
import { useToast } from '@/components/ui/use-toast';
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
}

const SellerPerformanceFormComponent: React.FC<SellerPerformanceFormComponentProps> = ({
  onSubmit,
  isSubmitting,
  seller
}) => {
  const { toast } = useToast();
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
      // Se for closer, zerar os campos não utilizados
      if (seller.seller_type === 'closer') {
        data.leads_count = 0;
        data.calls_count = 0;
        data.notes = '';
      }
      
      await onSubmit(data);
      
      // Mostrar mensagem de sucesso
      toast({
        title: "✅ Performance Registrada!",
        description: "Sua performance foi enviada com sucesso. Obrigado por manter seus dados atualizados!",
        variant: "default",
      });
      
      reset();
    } catch (error) {
      // Mensagem de erro já é tratada no componente pai
      console.error('Erro ao enviar performance:', error);
    }
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
