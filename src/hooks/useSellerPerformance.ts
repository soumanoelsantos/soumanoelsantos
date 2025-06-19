
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

    try {
      const { data, error } = await supabase
        .from('seller_daily_performance')
        .select('*')
        .eq('seller_id', sellerId)
        .order('date', { ascending: false });

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('seller_daily_performance')
        .upsert({
          seller_id: sellerId,
          submitted_by_seller: false,
          ...performanceData,
        })
        .select()
        .single();

      if (error) throw error;

      setPerformances(prev => {
        const existing = prev.find(p => p.date === performanceData.date);
        if (existing) {
          return prev.map(p => p.id === existing.id ? data : p);
        } else {
          return [data, ...prev];
        }
      });

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

  return {
    performances,
    isLoading,
    createOrUpdatePerformance,
    deletePerformance,
    refetch: fetchPerformances,
  };
};
