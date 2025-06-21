
import React, { useState, useEffect } from 'react';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import PerformanceTabHeader from '@/components/seller/PerformanceTabHeader';
import PerformanceFormCard from '@/components/seller/PerformanceFormCard';
import EmptyPerformanceState from '@/components/seller/EmptyPerformanceState';
import PerformanceMetricsDisplay from '@/components/seller/PerformanceMetricsDisplay';
import { getBrazilianDate } from '@/utils/dateUtils';

interface SellerPerformanceTabProps {
  sellerId: string;
  sellerType?: string;
}

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

export const SellerPerformanceTab: React.FC<SellerPerformanceTabProps> = ({ sellerId, sellerType }) => {
  const { performances, isLoading, createOrUpdatePerformance, deletePerformance, refetch } = useSellerPerformance(sellerId);
  const [showForm, setShowForm] = useState(false);

  // Obter data atual no fuso brasileiro
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

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting, errors } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: defaultDate,
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      meetings_count: 0,
      leads_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

  const isSDR = sellerType === 'sdr';

  // Log para debug - mais detalhado
  useEffect(() => {
    console.log('📊 [DEBUG] SellerPerformanceTab - sellerId:', sellerId);
    console.log('📊 [DEBUG] SellerPerformanceTab - sellerType:', sellerType);
    console.log('📊 [DEBUG] SellerPerformanceTab - isSDR:', isSDR);
    console.log('📊 [DEBUG] SellerPerformanceTab - performances:', performances);
    console.log('📊 [DEBUG] SellerPerformanceTab - performances.length:', performances?.length);
    console.log('📊 [DEBUG] SellerPerformanceTab - isLoading:', isLoading);
    console.log('📊 [DEBUG] SellerPerformanceTab - data padrão (fuso brasileiro):', defaultDate);
  }, [sellerId, sellerType, isSDR, performances, isLoading, defaultDate]);

  const onSubmit = async (data: PerformanceFormData) => {
    console.log('📊 [DEBUG] SellerPerformanceTab - Submitting data com fuso brasileiro:', data);
    const success = await createOrUpdatePerformance({
      ...data,
      submitted_by_seller: false // Indica que foi preenchido pelo admin
    });
    
    if (success) {
      reset({
        date: defaultDate,
        sales_count: 0,
        revenue_amount: 0,
        billing_amount: 0,
        meetings_count: 0,
        leads_count: 0,
        calls_count: 0,
        notes: '',
      });
      setShowForm(false);
    }
  };

  const handleRefresh = () => {
    console.log('🔄 [DEBUG] Refresh manual solicitado para sellerId:', sellerId);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
        Carregando lançamentos...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PerformanceTabHeader
        performanceCount={performances?.length || 0}
        onRefresh={handleRefresh}
        onToggleForm={() => setShowForm(!showForm)}
      />

      {showForm && (
        <PerformanceFormCard
          isSDR={isSDR}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={() => setShowForm(false)}
          sellerId={sellerId}
          setValue={setValue}
        />
      )}

      {!performances || performances.length === 0 ? (
        <EmptyPerformanceState 
          sellerId={sellerId}
          sellerType={sellerType}
        />
      ) : (
        <PerformanceMetricsDisplay
          performances={performances}
          isSDR={isSDR}
          onDelete={deletePerformance}
        />
      )}
    </div>
  );
};
