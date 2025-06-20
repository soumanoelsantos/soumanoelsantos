
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Seller, SellerType } from '@/types/sellers';
import SellerPerformanceHeader from '@/components/seller/SellerPerformanceHeader';
import SellerPerformanceManager from '@/components/seller/SellerPerformanceManager';
import SellerPerformanceLoading from '@/components/seller/SellerPerformanceLoading';
import SellerPerformanceAccessDenied from '@/components/seller/SellerPerformanceAccessDenied';
import SellerPerformanceFooter from '@/components/seller/SellerPerformanceFooter';

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

const SellerPerformanceForm = () => {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchSeller = async () => {
      console.log('🔍 [DEBUG] Iniciando busca do vendedor com token:', token);
      
      if (!token) {
        console.log('❌ [DEBUG] Token não encontrado na URL');
        setHasError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        
        console.log('🔄 [DEBUG] Fazendo consulta direta na tabela sellers...');
        
        // Consulta direta simples
        const { data: sellerData, error: sellerError } = await supabase
          .from('sellers')
          .select('*')
          .eq('access_token', token)
          .eq('is_active', true)
          .single();

        console.log('📋 [DEBUG] Resultado da consulta direta:', { sellerData, sellerError });

        if (sellerError) {
          console.error('❌ [DEBUG] Erro na consulta direta:', sellerError);
          setHasError(true);
        } else if (sellerData) {
          console.log('✅ [DEBUG] Vendedor encontrado:', sellerData.name, 'Tipo:', sellerData.seller_type);
          
          // Garantir que seller_type é do tipo correto
          const formattedSeller: Seller = {
            ...sellerData,
            seller_type: sellerData.seller_type as SellerType
          };
          
          setSeller(formattedSeller);
          setHasError(false);
          console.log('✅ [DEBUG] Seller definido com sucesso');
        } else {
          console.log('📝 [DEBUG] Nenhum vendedor encontrado');
          setHasError(true);
        }
        
      } catch (error) {
        console.error('💥 [DEBUG] Erro durante a busca:', error);
        setHasError(true);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do vendedor",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        console.log('🏁 [DEBUG] Busca finalizada. Loading:', false, 'HasError:', hasError, 'Seller:', seller?.name);
      }
    };

    fetchSeller();
  }, [token, toast]);

  const onSubmit = async (data: PerformanceFormData) => {
    if (!seller) {
      console.log('❌ [DEBUG] Seller não encontrado para submit');
      toast({
        title: "Erro",
        description: "Vendedor não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('📤 [DEBUG] Enviando dados de performance:', {
        sellerId: seller.id,
        sellerName: seller.name,
        sellerType: seller.seller_type,
        formData: data
      });
      
      // Preparar dados para inserção
      const performanceData = {
        seller_id: seller.id,
        date: data.date,
        sales_count: Number(data.sales_count) || 0,
        revenue_amount: Number(data.revenue_amount) || 0,
        billing_amount: Number(data.billing_amount) || 0,
        leads_count: Number(data.leads_count) || 0,
        meetings_count: Number(data.meetings_count) || 0,
        calls_count: Number(data.calls_count) || 0,
        notes: data.notes || '',
        submitted_by_seller: true,
      };

      console.log('📤 [DEBUG] Dados preparados para inserção:', performanceData);
      
      // Usar upsert para criar ou atualizar
      const { data: savedData, error } = await supabase
        .from('seller_daily_performance')
        .upsert(performanceData, {
          onConflict: 'seller_id,date'
        })
        .select()
        .single();

      console.log('📋 [DEBUG] Resultado da inserção:', { savedData, error });

      if (error) {
        console.error('❌ [DEBUG] Erro ao salvar:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Performance salva com sucesso:', savedData);
      
      toast({
        title: "✅ Sucesso!",
        description: "Performance registrada com sucesso!",
      });

    } catch (error: any) {
      console.error('💥 [DEBUG] Erro ao salvar performance:', error);
      toast({
        title: "❌ Erro",
        description: `Não foi possível salvar a performance: ${error?.message || 'Erro desconhecido'}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug dos estados
  console.log('🔍 [DEBUG] Estados atuais:', {
    isLoading,
    hasError,
    seller: seller?.name,
    sellerType: seller?.seller_type
  });

  if (isLoading) {
    console.log('🔄 [DEBUG] Renderizando tela de loading...');
    return <SellerPerformanceLoading />;
  }

  if (hasError || !seller) {
    console.log('❌ [DEBUG] Renderizando tela de acesso negado...');
    return <SellerPerformanceAccessDenied />;
  }

  console.log('✅ [DEBUG] Renderizando formulário principal para:', seller.name);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <SellerPerformanceHeader seller={seller} />
        <SellerPerformanceManager 
          seller={seller}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
        <SellerPerformanceFooter />
      </div>
    </div>
  );
};

export default SellerPerformanceForm;
