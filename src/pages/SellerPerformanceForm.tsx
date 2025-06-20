
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
        console.log('🔄 [DEBUG] Usando nova função get_seller_by_access_token...');
        
        // Usar a nova função do banco de dados
        const { data, error } = await supabase.rpc('get_seller_by_access_token', {
          token_param: token
        });

        console.log('📋 [DEBUG] Resultado da função RPC:', { data, error });

        if (error) {
          console.error('❌ [DEBUG] Erro na função RPC:', error);
          
          // Fallback: tentar consulta direta
          console.log('🔄 [DEBUG] Tentando consulta direta como fallback...');
          const { data: directData, error: directError } = await supabase
            .from('sellers')
            .select('*')
            .eq('access_token', token)
            .eq('is_active', true)
            .single();

          if (directError) {
            console.error('❌ [DEBUG] Erro na consulta direta:', directError);
            setHasError(true);
          } else if (directData) {
            console.log('✅ [DEBUG] Vendedor encontrado via consulta direta:', directData.name);
            setSeller(directData);
            setHasError(false);
          } else {
            console.log('📝 [DEBUG] Nenhum vendedor encontrado');
            setHasError(true);
          }
        } else if (data && data.length > 0) {
          console.log('✅ [DEBUG] Vendedor encontrado via RPC:', data[0].name);
          setSeller(data[0]);
          setHasError(false);
        } else {
          console.log('📝 [DEBUG] Nenhum vendedor encontrado via RPC');
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
      console.log('📤 [DEBUG] Seller Type:', seller.seller_type);
      console.log('📤 [DEBUG] Dados do formulário:', data);
      
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
