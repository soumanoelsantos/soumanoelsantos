
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface SellerOption {
  id: string;
  name: string;
}

export const useSDRSellersList = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [sellers, setSellers] = useState<SellerOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSellers = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 [DEBUG] Buscando vendedores SDR para filtro');
      
      const { data, error } = await supabase
        .from('sellers')
        .select('id, name')
        .eq('user_id', userId)
        .eq('is_active', true)
        .eq('seller_type', 'sdr')
        .order('name');

      if (error) {
        console.error('❌ [DEBUG] Erro ao buscar vendedores SDR:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Vendedores SDR encontrados para filtro:', data);
      setSellers(data || []);
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar vendedores SDR:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de vendedores SDR",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [userId]);

  return {
    sellers,
    isLoading,
    refetch: fetchSellers,
  };
};
