
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

  useEffect(() => {
    const fetchSeller = async () => {
      console.log('Token recebido:', token);
      
      if (!token) {
        console.log('Token não encontrado na URL');
        toast({
          title: "Erro",
          description: "Token de acesso inválido",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        console.log('Buscando vendedor com token:', token);
        
        const { data, error } = await supabase
          .from('sellers')
          .select('*')
          .eq('access_token', token)
          .maybeSingle();

        console.log('Resultado da busca:', { data, error });

        if (error) {
          console.error('Erro na consulta:', error);
          toast({
            title: "Erro",
            description: "Erro ao verificar token de acesso",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (!data) {
          console.log('Nenhum vendedor encontrado com este token');
          toast({
            title: "Erro",
            description: "Token de acesso inválido ou vendedor não encontrado",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        console.log('Vendedor encontrado:', data);
        setSeller(data);
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
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
    if (!seller) return;

    setIsSubmitting(true);
    try {
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

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Performance registrada com sucesso",
      });
    } catch (error) {
      console.error('Erro ao salvar performance:', error);
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

  if (!seller) {
    return <SellerPerformanceAccessDenied />;
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
