
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Seller } from '@/types/sellers';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
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

  // Usar o hook useSellerPerformance para manter consistência
  const { createOrUpdatePerformance } = useSellerPerformance(seller?.id);

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
      console.log('📤 [DEBUG] Dados:', data);
      
      // Usar o hook para salvar os dados - isso garante consistência
      const success = await createOrUpdatePerformance({
        date: data.date,
        sales_count: data.sales_count,
        revenue_amount: data.revenue_amount,
        billing_amount: data.billing_amount,
        leads_count: 0, // Campo removido
        meetings_count: data.meetings_count,
        calls_count: 0, // Campo removido
        notes: '', // Campo removido
        submitted_by_seller: true, // Marcado como preenchido pelo vendedor
      });

      if (!success) {
        throw new Error('Falha ao salvar performance');
      }

      console.log('✅ [DEBUG] Performance salva com sucesso via hook');
    } catch (error) {
      console.error('💥 [DEBUG] Erro ao salvar performance:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a performance. Tente novamente.",
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
