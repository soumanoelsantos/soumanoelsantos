
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Seller, SellerType } from '@/types/sellers';

export const useSellerToken = (token: string | undefined) => {
  const { toast } = useToast();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!token) {
        console.log('❌ Token não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔍 Buscando vendedor com token:', token.substring(0, 10) + '...');
        
        const { data, error } = await supabase
          .from('sellers')
          .select('*')
          .eq('access_token', token)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('❌ Erro ao buscar vendedor:', error);
          setIsLoading(false);
          return;
        }

        if (!data) {
          console.log('❌ Vendedor não encontrado');
          setIsLoading(false);
          return;
        }

        console.log('✅ Vendedor encontrado:', data.name, 'Tipo:', data.seller_type);
        
        const sellerData: Seller = {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          seller_type: data.seller_type as SellerType,
          is_active: data.is_active,
          access_token: data.access_token,
          created_at: data.created_at,
          updated_at: data.updated_at
        };

        setSeller(sellerData);
        setIsLoading(false);
        
      } catch (error) {
        console.error('💥 Erro na busca:', error);
        setIsLoading(false);
      }
    };

    fetchSeller();
  }, [token]);

  const handleSubmit = async (data: any) => {
    if (!seller) {
      toast({
        title: "Erro",
        description: "Vendedor não encontrado",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('📤 Enviando performance para:', seller.name);
      
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

      const { error } = await supabase
        .from('seller_daily_performance')
        .upsert(performanceData, {
          onConflict: 'seller_id,date'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "✅ Sucesso!",
        description: "Performance registrada com sucesso!",
      });

    } catch (error: any) {
      console.error('💥 Erro ao salvar:', error);
      toast({
        title: "❌ Erro",
        description: `Erro ao salvar: ${error?.message || 'Erro desconhecido'}`,
        variant: "destructive",
      });
    }
  };

  return {
    seller,
    isLoading,
    handleSubmit
  };
};
