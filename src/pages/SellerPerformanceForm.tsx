
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart3, User, Calendar, TrendingUp } from 'lucide-react';

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

interface Seller {
  id: string;
  name: string;
  seller_type: string;
  access_token: string;
}

const SellerPerformanceForm = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      leads_count: 0,
      meetings_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

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

      reset();
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

  const getSellerTypeLabel = (type: string) => {
    const labels = {
      pap: 'Porta a Porta (PAP)',
      sdr: 'SDR',
      closer: 'Closer',
      vendedor_interno: 'Vendedor Interno',
      outro: 'Outro'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getSellerTypeColor = (type: string) => {
    const colors = {
      pap: 'bg-blue-100 text-blue-800',
      sdr: 'bg-green-100 text-green-800',
      closer: 'bg-purple-100 text-purple-800',
      vendedor_interno: 'bg-orange-100 text-orange-800',
      outro: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.outro;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acesso Negado
            </h2>
            <p className="text-gray-600">
              Token de acesso inválido ou vendedor não encontrado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Lançamento de Performance
              </h1>
              <p className="text-gray-600">
                Registre sua performance diária
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{seller.name}</p>
                    <p className="text-sm text-gray-500">Vendedor</p>
                  </div>
                </div>
                <Badge className={getSellerTypeColor(seller.seller_type)}>
                  {getSellerTypeLabel(seller.seller_type)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dados de Performance
            </CardTitle>
            <CardDescription>
              Preencha os dados da sua performance do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">Data *</Label>
                <Input
                  id="date"
                  type="date"
                  {...register('date', { required: 'Data é obrigatória' })}
                />
                {errors.date && (
                  <p className="text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales_count">Vendas Realizadas *</Label>
                  <Input
                    id="sales_count"
                    type="number"
                    min="0"
                    {...register('sales_count', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="Quantidade de vendas"
                  />
                  {errors.sales_count && (
                    <p className="text-sm text-red-600">{errors.sales_count.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leads_count">Leads Gerados *</Label>
                  <Input
                    id="leads_count"
                    type="number"
                    min="0"
                    {...register('leads_count', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="Quantidade de leads"
                  />
                  {errors.leads_count && (
                    <p className="text-sm text-red-600">{errors.leads_count.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue_amount">Receita (R$) *</Label>
                  <Input
                    id="revenue_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('revenue_amount', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="0,00"
                  />
                  {errors.revenue_amount && (
                    <p className="text-sm text-red-600">{errors.revenue_amount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_amount">Faturamento (R$) *</Label>
                  <Input
                    id="billing_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('billing_amount', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="0,00"
                  />
                  {errors.billing_amount && (
                    <p className="text-sm text-red-600">{errors.billing_amount.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meetings_count">Reuniões *</Label>
                  <Input
                    id="meetings_count"
                    type="number"
                    min="0"
                    {...register('meetings_count', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="Quantidade de reuniões"
                  />
                  {errors.meetings_count && (
                    <p className="text-sm text-red-600">{errors.meetings_count.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calls_count">Ligações *</Label>
                  <Input
                    id="calls_count"
                    type="number"
                    min="0"
                    {...register('calls_count', { 
                      required: 'Campo obrigatório',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                    })}
                    placeholder="Quantidade de ligações"
                  />
                  {errors.calls_count && (
                    <p className="text-sm text-red-600">{errors.calls_count.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Adicione observações sobre seu dia de trabalho..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Registrar Performance
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Dashboard de Vendas - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default SellerPerformanceForm;
