
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Seller } from '@/types/sellers';

interface PerformanceData {
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  leads_count: number;
  meetings_count: number;
  calls_count: number;
  notes: string;
}

export const useSellerToken = (token?: string) => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const validateToken = async (accessToken: string) => {
    console.log('🔍 [DEBUG] useSellerToken - Validando token:', accessToken);
    
    try {
      const { data, error } = await supabase
        .rpc('get_seller_by_access_token', { token_param: accessToken });

      console.log('📝 [DEBUG] useSellerToken - Resultado da validação:', { data, error });

      if (error) {
        console.error('❌ [DEBUG] useSellerToken - Erro na validação:', error);
        throw error;
      }

      if (data && data.length > 0) {
        const sellerData = data[0] as Seller;
        console.log('✅ [DEBUG] useSellerToken - Seller encontrado:', sellerData);
        setSeller(sellerData);
        return sellerData;
      } else {
        console.warn('⚠️ [DEBUG] useSellerToken - Nenhum seller encontrado para o token');
        setSeller(null);
        return null;
      }
    } catch (error) {
      console.error('💥 [DEBUG] useSellerToken - Erro ao validar token:', error);
      setSeller(null);
      return null;
    }
  };

  const handleSubmit = async (data: PerformanceData) => {
    if (!seller) {
      console.error('❌ [DEBUG] useSellerToken - Seller não encontrado para submit');
      toast({
        title: "Erro",
        description: "Vendedor não encontrado",
        variant: "destructive",
      });
      return;
    }

    console.log('📤 [DEBUG] useSellerToken - Enviando performance:', data);

    try {
      const { data: performanceData, error } = await supabase
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
          submitted_at: new Date().toISOString(),
        }, {
          onConflict: 'seller_id,date'
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [DEBUG] useSellerToken - Erro ao salvar performance:', error);
        throw error;
      }

      console.log('✅ [DEBUG] useSellerToken - Performance salva:', performanceData);
      
      toast({
        title: "Sucesso",
        description: "Performance diária salva com sucesso!",
      });
    } catch (error) {
      console.error('💥 [DEBUG] useSellerToken - Erro no handleSubmit:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a performance",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadSeller = async () => {
      if (!token) {
        console.log('⚠️ [DEBUG] useSellerToken - Token não fornecido');
        setIsLoading(false);
        return;
      }

      console.log('🔄 [DEBUG] useSellerToken - Carregando seller para token:', token);
      await validateToken(token);
      setIsLoading(false);
    };

    loadSeller();
  }, [token]);

  return {
    seller,
    isLoading,
    handleSubmit,
  };
};
