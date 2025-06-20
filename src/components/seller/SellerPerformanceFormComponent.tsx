
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Seller } from '@/types/sellers';
import { toast } from 'sonner';
import PerformanceFormFields from './PerformanceFormFields';
import PerformanceFormSubmit from './PerformanceFormSubmit';
import { getBrazilianDate } from '@/utils/dateUtils';
import { supabase } from '@/integrations/supabase/client';

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
  const [currentPerformanceId, setCurrentPerformanceId] = useState<string | null>(null);
  
  // Obter data atual no fuso brasileiro para o valor padrão
  const today = new Date();
  const brazilianDateString = today.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Converter para formato ISO para o input date
  const [day, month, year] = brazilianDateString.split('/');
  const defaultDate = `${year}-${month}-${day}`;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PerformanceFormData>({
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

  // Buscar ou criar performance para a data atual
  useEffect(() => {
    const getOrCreatePerformance = async () => {
      try {
        // Primeiro, tentar buscar uma performance existente para a data atual
        const { data: existingPerformance, error: fetchError } = await supabase
          .from('seller_daily_performance')
          .select('id')
          .eq('seller_id', seller.id)
          .eq('date', defaultDate)
          .maybeSingle();

        if (fetchError) {
          console.error('Erro ao buscar performance existente:', fetchError);
          return;
        }

        if (existingPerformance) {
          setCurrentPerformanceId(existingPerformance.id);
        } else {
          // Criar uma nova performance para permitir o uso do gerenciador de vendas
          const { data: newPerformance, error: createError } = await supabase
            .from('seller_daily_performance')
            .insert({
              seller_id: seller.id,
              date: defaultDate,
              sales_count: 0,
              revenue_amount: 0,
              billing_amount: 0,
              leads_count: 0,
              meetings_count: 0,
              calls_count: 0,
              notes: '',
              submitted_by_seller: true,
            })
            .select('id')
            .single();

          if (createError) {
            console.error('Erro ao criar nova performance:', createError);
            return;
          }

          setCurrentPerformanceId(newPerformance.id);
        }
      } catch (error) {
        console.error('Erro no getOrCreatePerformance:', error);
      }
    };

    getOrCreatePerformance();
  }, [seller.id, defaultDate]);

  const handleFormSubmit = async (data: PerformanceFormData) => {
    try {
      console.log('📤 [DEBUG] Enviando dados com fuso brasileiro:', data);
      await onSubmit(data);
      
      toast.success("✅ Performance Registrada!", {
        description: `Sua performance foi registrada com sucesso no fuso horário brasileiro!`,
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
          <br />
          <span className="text-xs text-blue-600">
            ⏰ Todas as datas são registradas no fuso horário brasileiro (UTC-3)
          </span>
          {isCloser && (
            <>
              <br />
              <span className="text-xs text-green-600">
                💡 Para closers: Adicione suas vendas individuais com nome do cliente e valores separados
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <PerformanceFormFields 
            register={register}
            errors={errors}
            isCloser={isCloser}
            sellerId={seller.id}
            performanceId={currentPerformanceId || undefined}
            setValue={setValue}
          />
          <PerformanceFormSubmit isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
};

export default SellerPerformanceFormComponent;
