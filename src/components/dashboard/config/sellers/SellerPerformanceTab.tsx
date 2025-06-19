
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, BarChart3, Trash2, Edit, Calendar, RefreshCw } from 'lucide-react';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SellerPerformanceTabProps {
  sellerId: string;
}

interface PerformanceFormData {
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  meetings_count: number;
  leads_count: number;
  calls_count: number;
  notes: string;
}

export const SellerPerformanceTab: React.FC<SellerPerformanceTabProps> = ({ sellerId }) => {
  const { performances, isLoading, createOrUpdatePerformance, deletePerformance, refetch } = useSellerPerformance(sellerId);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      meetings_count: 0,
      leads_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

  // Log para debug - mais detalhado
  useEffect(() => {
    console.log('📊 [DEBUG] SellerPerformanceTab - sellerId:', sellerId);
    console.log('📊 [DEBUG] SellerPerformanceTab - performances:', performances);
    console.log('📊 [DEBUG] SellerPerformanceTab - performances.length:', performances?.length);
    console.log('📊 [DEBUG] SellerPerformanceTab - isLoading:', isLoading);
  }, [sellerId, performances, isLoading]);

  const onSubmit = async (data: PerformanceFormData) => {
    console.log('📊 [DEBUG] SellerPerformanceTab - Submitting data:', data);
    const success = await createOrUpdatePerformance({
      ...data,
      submitted_by_seller: false // Indica que foi preenchido pelo admin
    });
    
    if (success) {
      reset();
      setShowForm(false);
    }
  };

  const handleRefresh = () => {
    console.log('🔄 [DEBUG] Refresh manual solicitado para sellerId:', sellerId);
    refetch();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
        Carregando lançamentos...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm text-gray-700">
          Lançamentos de Performance ({performances?.length || 0} registros)
        </h4>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Atualizar
          </Button>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-1" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Lançar Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  {...register('date', { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label>Vendas Realizadas</Label>
                <Input
                  type="number"
                  {...register('sales_count', { valueAsNumber: true })}
                  min="0"
                  placeholder="Quantidade"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Receita (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('revenue_amount', { valueAsNumber: true })}
                    min="0"
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Faturamento (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('billing_amount', { valueAsNumber: true })}
                    min="0"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Reuniões</Label>
                  <Input
                    type="number"
                    {...register('meetings_count', { valueAsNumber: true })}
                    min="0"
                    placeholder="Quantidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Leads</Label>
                  <Input
                    type="number"
                    {...register('leads_count', { valueAsNumber: true })}
                    min="0"
                    placeholder="Quantidade"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ligações</Label>
                <Input
                  type="number"
                  {...register('calls_count', { valueAsNumber: true })}
                  min="0"
                  placeholder="Quantidade"
                />
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Input
                  {...register('notes')}
                  placeholder="Observações sobre a performance"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Lançamento'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!performances || performances.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum lançamento registrado</p>
          <p className="text-sm">Clique em "Novo Lançamento" para começar</p>
          <p className="text-xs mt-2 text-gray-400">
            Vendedor ID: {sellerId}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {performances.map((performance) => (
            <Card key={performance.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <h5 className="font-medium">{formatDate(performance.date)}</h5>
                    <Badge variant={performance.submitted_by_seller ? "default" : "secondary"}>
                      {performance.submitted_by_seller ? 'Pelo Vendedor' : 'Pelo Admin'}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePerformance(performance.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Vendas:</span>
                    <p className="font-medium">{performance.sales_count}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Receita:</span>
                    <p className="font-medium">{formatCurrency(performance.revenue_amount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Faturamento:</span>
                    <p className="font-medium">{formatCurrency(performance.billing_amount)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Reuniões:</span>
                    <p className="font-medium">{performance.meetings_count}</p>
                  </div>
                </div>

                {(performance.leads_count > 0 || performance.calls_count > 0) && (
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <span className="text-gray-500">Leads:</span>
                      <p className="font-medium">{performance.leads_count}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Ligações:</span>
                      <p className="font-medium">{performance.calls_count}</p>
                    </div>
                  </div>
                )}

                {performance.notes && (
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-gray-500 text-sm">Observações:</span>
                    <p className="text-sm">{performance.notes}</p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  Lançado em: {format(new Date(performance.submitted_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  <br />
                  ID: {performance.id}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
