import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Seller, SellerMonthlyGoal, SellerDailyPerformance, SellerType } from '@/types/sellers';
import { useToast } from '@/components/ui/use-toast';

export const useSellers = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSellers = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', userId)
        .order('name');

      if (error) throw error;
      setSellers(data || []);
    } catch (error) {
      console.error('Erro ao carregar vendedores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os vendedores",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createSeller = async (sellerData: {
    name: string;
    email?: string;
    phone?: string;
    seller_type: SellerType;
  }) => {
    if (!userId) return false;

    try {
      const { data, error } = await supabase
        .from('sellers')
        .insert({
          ...sellerData,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      setSellers(prev => [...prev, data]);
      
      const typeLabels = {
        sdr: 'SDR (Pré-vendas)',
        closer: 'Closer (Comercial)',
        pap: 'Porta a Porta',
        vendedor_interno: 'Vendedor Interno',
        outro: 'Outro'
      };
      
      toast({
        title: "Vendedor cadastrado com sucesso!",
        description: `${sellerData.name} foi adicionado como ${typeLabels[sellerData.seller_type]}`,
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o vendedor",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSeller = async (id: string, sellerData: Partial<Seller>) => {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .update(sellerData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSellers(prev => prev.map(s => s.id === id ? data : s));
      toast({
        title: "Sucesso",
        description: "Vendedor atualizado com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o vendedor",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteSeller = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sellers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSellers(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Sucesso",
        description: "Vendedor removido com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover vendedor:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o vendedor",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [userId]);

  return {
    sellers,
    isLoading,
    createSeller,
    updateSeller,
    deleteSeller,
    refetch: fetchSellers,
  };
};
