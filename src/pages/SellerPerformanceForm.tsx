
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Seller } from '@/types/sellers';
import SellerPerformanceHeader from '@/components/seller/SellerPerformanceHeader';
import SellerPerformanceFormComponent from '@/components/seller/SellerPerformanceFormComponent';
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
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const fetchSeller = async () => {
      console.log('🔍 [DEBUG] Iniciando busca do vendedor');
      console.log('🔍 [DEBUG] Token da URL:', token);
      console.log('🔍 [DEBUG] Length do token:', token?.length);
      
      setDebugInfo(`Token: ${token?.substring(0, 10)}...`);
      
      if (!token) {
        console.log('❌ [DEBUG] Token não encontrado na URL');
        setHasError(true);
        setIsLoading(false);
        setDebugInfo('Erro: Token não encontrado na URL');
        return;
      }

      try {
        console.log('🔄 [DEBUG] Fazendo consulta ao banco de dados...');
        console.log('🔄 [DEBUG] Supabase client initialized');
        
        // Tentar diferentes abordagens de consulta
        console.log('🔄 [DEBUG] Tentativa 1: Consulta direta');
        const { data: directData, error: directError } = await supabase
          .from('sellers')
          .select('*')
          .eq('access_token', token);

        console.log('📋 [DEBUG] Resultado consulta direta:', { 
          data: directData, 
          error: directError,
          count: directData?.length 
        });

        if (directError) {
          console.error('❌ [DEBUG] Erro na consulta direta:', directError);
          setDebugInfo(`Erro consulta: ${directError.message}`);
        }

        if (directData && directData.length > 0) {
          const sellerData = directData[0];
          console.log('✅ [DEBUG] Vendedor encontrado via consulta direta:', sellerData.name);
          setSeller(sellerData);
          setHasError(false);
          setDebugInfo(`Sucesso: ${sellerData.name}`);
          setIsLoading(false);
          return;
        }

        // Se a primeira tentativa falhou, tentar com RPC
        console.log('🔄 [DEBUG] Tentativa 2: Usando RPC function');
        try {
          const { data: rpcData, error: rpcError } = await supabase
            .rpc('get_seller_by_token' as any, { token_param: token });

          console.log('📋 [DEBUG] Resultado RPC:', { data: rpcData, error: rpcError });

          if (rpcError) {
            console.error('❌ [DEBUG] Erro RPC:', rpcError);
            setDebugInfo(`Erro RPC: ${rpcError.message}`);
          }

          if (rpcData && typeof rpcData === 'object' && 'name' in rpcData) {
            console.log('✅ [DEBUG] Vendedor encontrado via RPC:', rpcData.name);
            setSeller(rpcData as Seller);
            setHasError(false);
            setDebugInfo(`Sucesso RPC: ${rpcData.name}`);
            setIsLoading(false);
            return;
          }
        } catch (rpcError) {
          console.error('❌ [DEBUG] RPC não disponível ou erro:', rpcError);
          setDebugInfo(`RPC indisponível: ${rpcError}`);
        }

        // Se chegou até aqui, não encontrou o vendedor
        console.log('📝 [DEBUG] Nenhum vendedor encontrado com este token');
        setHasError(true);
        setDebugInfo('Vendedor não encontrado');
        
      } catch (error) {
        console.error('💥 [DEBUG] Erro durante a busca:', error);
        setHasError(true);
        setDebugInfo(`Erro geral: ${error}`);
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
      toast({
        title: "Erro",
        description: "Vendedor não encontrado",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('📤 [DEBUG] Enviando dados de performance:', data);
      
      const { error } = await supabase
        .from('seller_daily_performance')
        .upsert({
          seller_id: seller.id,
          date: data.date,
          sales_count: data.sales_count,
          revenue_amount: data.revenue_amount,
          billing_amount: data.billing_amount,
          leads_count: data.leads_count,
          meetings_count: data.meetings_count,
          calls_count: data.calls_count,
          notes: data.notes,
          submitted_by_seller: true,
        });

      if (error) {
        console.error('❌ [DEBUG] Erro ao salvar performance:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Performance salva com sucesso');
      toast({
        title: "Sucesso!",
        description: "Performance registrada com sucesso",
      });
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao salvar performance:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a performance",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <SellerPerformanceLoading />;
  }

  if (hasError || !seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <SellerPerformanceAccessDenied />
          <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-600">
            <strong>Debug Info:</strong> {debugInfo}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <SellerPerformanceHeader seller={seller} />
        <SellerPerformanceFormComponent onSubmit={onSubmit} isSubmitting={isSubmitting} />
        <SellerPerformanceFooter />
      </div>
    </div>
  );
};

export default SellerPerformanceForm;
