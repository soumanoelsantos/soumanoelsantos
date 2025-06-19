
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Seller } from '@/types/sellers';
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
      console.log('🔍 [DEBUG] Buscando vendedor com token:', token);
      
      if (!token) {
        console.log('❌ [DEBUG] Token não encontrado na URL');
        setHasError(true);
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔄 [DEBUG] Fazendo consulta direta ao banco...');
        
        const { data, error } = await supabase
          .from('sellers')
          .select('*')
          .eq('access_token', token)
          .single();

        console.log('📋 [DEBUG] Resultado da consulta:', { data, error });

        if (error) {
          console.error('❌ [DEBUG] Erro na consulta:', error);
          setHasError(true);
        } else if (data) {
          console.log('✅ [DEBUG] Vendedor encontrado:', data.name);
          setSeller(data);
          setHasError(false);
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
      }
    };

    fetchSeller();
  }, [token, toast]);

  const onSubmit = async (data: PerformanceFormData) => {
    if (!seller) {
      console.log('❌ [DEBUG] Seller não encontrado');
      toast({
        title: "Erro",
        description: "Vendedor não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('📤 [DEBUG] Enviando dados de performance do vendedor:', seller.name);
      console.log('📤 [DEBUG] Seller ID:', seller.id);
      console.log('📤 [DEBUG] Dados do formulário:', data);
      
      // Preparar dados com estrutura exata da tabela
      const performanceData = {
        seller_id: seller.id,
        date: data.date,
        sales_count: Number(data.sales_count) || 0,
        revenue_amount: Number(data.revenue_amount) || 0,
        billing_amount: Number(data.billing_amount) || 0,
        leads_count: 0,
        meetings_count: Number(data.meetings_count) || 0,
        calls_count: 0,
        notes: '',
        submitted_by_seller: true,
      };

      console.log('📤 [DEBUG] Dados preparados para inserção:', performanceData);
      
      // Tentar inserir os dados
      const { data: savedData, error } = await supabase
        .from('seller_daily_performance')
        .upsert(performanceData, {
          onConflict: 'seller_id,date'
        })
        .select()
        .single();

      console.log('📋 [DEBUG] Resultado da inserção:', { savedData, error });

      if (error) {
        console.error('❌ [DEBUG] Erro detalhado ao salvar:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ [DEBUG] Performance salva com sucesso:', savedData);
      
      toast({
        title: "✅ Sucesso!",
        description: "Performance registrada com sucesso!",
      });

      // Verificar se os dados foram realmente salvos
      const { data: verificacao, error: errorVerificacao } = await supabase
        .from('seller_daily_performance')
        .select('*')
        .eq('seller_id', seller.id)
        .eq('date', data.date)
        .single();

      console.log('🔍 [DEBUG] Verificação dos dados salvos:', { verificacao, errorVerificacao });

    } catch (error: any) {
      console.error('💥 [DEBUG] Erro completo ao salvar performance:', {
        error,
        message: error?.message,
        details: error?.details,
        stack: error?.stack
      });
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

  if (isLoading) {
    return <SellerPerformanceLoading />;
  }

  if (hasError || !seller) {
    return <SellerPerformanceAccessDenied />;
  }

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
