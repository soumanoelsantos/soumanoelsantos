
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SellerDailyPerformance } from '@/types/sellers';
import { useToast } from '@/components/ui/use-toast';

export const useSellerPerformance = (sellerId?: string) => {
  const { toast } = useToast();
  const [performances, setPerformances] = useState<SellerDailyPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPerformances = async () => {
    if (!sellerId) {
      setIsLoading(false);
      return;
    }

    console.log('🔍 [DEBUG] Buscando performances para o vendedor:', sellerId);

    try {
      const { data, error } = await supabase
        .from('seller_daily_performance')
        .select('*')
        .eq('seller_id', sellerId)
        .order('date', { ascending: false });

      console.log('📋 [DEBUG] Resultado da consulta de performances:', { data, error });

      if (error) {
        console.error('❌ [DEBUG] Erro na consulta:', error);
        throw error;
      }
      
      console.log('✅ [DEBUG] Performances encontradas:', data?.length || 0);
      setPerformances(data || []);
    } catch (error) {
      console.error('Erro ao carregar performances:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lançamentos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrUpdatePerformance = async (performanceData: {
    date: string;
    sales_count: number;
    revenue_amount: number;
    billing_amount: number;
    leads_count: number;
    meetings_count: number;
    calls_count: number;
    notes?: string;
    submitted_by_seller?: boolean;
  }) => {
    if (!sellerId) return false;

    try {
      console.log('📤 [DEBUG] Salvando performance:', performanceData);
      
      const { data, error } = await supabase
        .from('seller_daily_performance')
        .upsert({
          seller_id: sellerId,
          submitted_by_seller: performanceData.submitted_by_seller ?? true,
          ...performanceData,
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [DEBUG] Erro ao salvar:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Performance salva:', data);

      // Atualizar a lista local
      await fetchPerformances();

      toast({
        title: "Sucesso",
        description: "Lançamento salvo com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao salvar lançamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o lançamento",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePerformance = async (performanceId: string) => {
    try {
      const { error } = await supabase
        .from('seller_daily_performance')
        .delete()
        .eq('id', performanceId);

      if (error) throw error;

      setPerformances(prev => prev.filter(p => p.id !== performanceId));
      toast({
        title: "Sucesso",
        description: "Lançamento removido com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover lançamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o lançamento",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPerformances();
  }, [sellerId]);

  // Configurar real-time para receber atualizações
  useEffect(() => {
    if (!sellerId) return;

    console.log('🔄 [DEBUG] Configurando real-time para vendedor:', sellerId);

    const channel = supabase
      .channel('seller-performance-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'seller_daily_performance',
          filter: `seller_id=eq.${sellerId}`
        },
        (payload) => {
          console.log('📡 [DEBUG] Real-time update recebido:', payload);
          fetchPerformances(); // Recarregar dados quando houver mudanças
        }
      )
      .subscribe();

    return () => {
      console.log('🔄 [DEBUG] Removendo canal real-time');
      supabase.removeChannel(channel);
    };
  }, [sellerId]);

  return {
    performances,
    isLoading,
    createOrUpdatePerformance,
    deletePerformance,
    refetch: fetchPerformances,
  };
};
