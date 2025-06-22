
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SellerDailyPerformance } from '@/types/sellers';
import { useToast } from '@/hooks/use-toast';
import { ProductSale } from '@/components/seller/ProductSalesSection';

export const useSellerPerformance = (sellerId?: string) => {
  const { toast } = useToast();
  const [performances, setPerformances] = useState<SellerDailyPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPerformances = async () => {
    if (!sellerId) {
      console.log('🔍 [DEBUG] Sem sellerId fornecido, definindo loading como false');
      setIsLoading(false);
      return;
    }

    console.log('🔍 [DEBUG] Buscando performances para o vendedor:', sellerId);
    setIsLoading(true);

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
      console.log('📝 [DEBUG] Dados das performances:', data);
      setPerformances(data || []);
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar performances:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lançamentos",
        variant: "destructive",
      });
      setPerformances([]);
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
    product_sales?: ProductSale[];
  }) => {
    if (!sellerId) {
      console.log('❌ [DEBUG] Sem sellerId para criar/atualizar performance');
      return false;
    }

    try {
      console.log('📤 [DEBUG] Salvando performance para seller_id:', sellerId);
      console.log('📤 [DEBUG] Dados da performance:', performanceData);
      
      // Salvar a performance principal
      const { data: performanceResult, error: performanceError } = await supabase
        .from('seller_daily_performance')
        .upsert({
          seller_id: sellerId,
          date: performanceData.date,
          sales_count: performanceData.sales_count || 0,
          revenue_amount: performanceData.revenue_amount || 0,
          billing_amount: performanceData.billing_amount || 0,
          leads_count: performanceData.leads_count || 0,
          meetings_count: performanceData.meetings_count || 0,
          calls_count: performanceData.calls_count || 0,
          notes: performanceData.notes || '',
          submitted_by_seller: performanceData.submitted_by_seller ?? true,
        }, {
          onConflict: 'seller_id,date',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (performanceError) {
        console.error('❌ [DEBUG] Erro ao salvar performance:', performanceError);
        throw performanceError;
      }

      console.log('✅ [DEBUG] Performance salva com sucesso:', performanceResult);

      // Se há vendas por produto, salvar elas também
      if (performanceData.product_sales && performanceData.product_sales.length > 0) {
        console.log('📤 [DEBUG] Salvando vendas por produto:', performanceData.product_sales);

        // Primeiro, deletar vendas existentes para essa performance/data
        const { error: deleteError } = await supabase
          .from('seller_individual_sales')
          .delete()
          .eq('seller_id', sellerId)
          .eq('performance_id', performanceResult.id);

        if (deleteError) {
          console.error('❌ [DEBUG] Erro ao deletar vendas antigas:', deleteError);
        }

        // Inserir as novas vendas
        const salesData = performanceData.product_sales.map(sale => ({
          seller_id: sellerId,
          performance_id: performanceResult.id,
          product_id: sale.product_id,
          client_name: sale.client_name,
          revenue_amount: sale.revenue_amount,
          billing_amount: sale.billing_amount
        }));

        const { error: salesError } = await supabase
          .from('seller_individual_sales')
          .insert(salesData);

        if (salesError) {
          console.error('❌ [DEBUG] Erro ao salvar vendas por produto:', salesError);
          throw salesError;
        }

        console.log('✅ [DEBUG] Vendas por produto salvas com sucesso');
      }

      // Atualizar a lista local
      await fetchPerformances();

      toast({
        title: "Sucesso",
        description: `Lançamento salvo com sucesso${performanceData.product_sales?.length ? ` com ${performanceData.product_sales.length} vendas por produto` : ''}`,
      });
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao salvar lançamento:', error);
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
      console.log('🗑️ [DEBUG] Deletando performance:', performanceId);
      
      // Primeiro deletar as vendas individuais relacionadas
      const { error: salesError } = await supabase
        .from('seller_individual_sales')
        .delete()
        .eq('performance_id', performanceId);

      if (salesError) {
        console.error('❌ [DEBUG] Erro ao deletar vendas individuais:', salesError);
      }

      // Depois deletar a performance
      const { error } = await supabase
        .from('seller_daily_performance')
        .delete()
        .eq('id', performanceId);

      if (error) {
        console.error('❌ [DEBUG] Erro ao deletar performance:', error);
        throw error;
      }

      console.log('✅ [DEBUG] Performance deletada com sucesso');
      
      setPerformances(prev => prev.filter(p => p.id !== performanceId));
      toast({
        title: "Sucesso",
        description: "Lançamento removido com sucesso",
      });
      return true;
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao remover lançamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o lançamento",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    console.log('🔄 [DEBUG] useEffect triggered, sellerId:', sellerId);
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
