
import React, { useState, useEffect } from 'react';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar, ChevronDown, ChevronRight, Edit, TrendingUp, Users, Phone, DollarSign, Trash2 } from 'lucide-react';
import { getBrazilianDate } from '@/utils/dateUtils';
import IndividualSalesDetails from '@/components/seller/IndividualSalesDetails';
import PerformanceTabHeader from '@/components/seller/PerformanceTabHeader';
import PerformanceFormCard from '@/components/seller/PerformanceFormCard';

interface SellerPerformanceTabProps {
  sellerId: string;
  sellerType?: string;
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

export const SellerPerformanceTab: React.FC<SellerPerformanceTabProps> = ({ sellerId, sellerType }) => {
  const { performances, isLoading, createOrUpdatePerformance, deletePerformance, refetch } = useSellerPerformance(sellerId);
  const [showForm, setShowForm] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Obter data atual no fuso brasileiro
  const today = new Date();
  const brazilianDateString = today.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Converter para formato ISO para o input date
  const [day, month, year] = brazilianDateString.split('/');
  const defaultDate = `${year}-${month}-${day}`;

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<PerformanceFormData>({
    defaultValues: {
      date: defaultDate,
      sales_count: 0,
      revenue_amount: 0,
      billing_amount: 0,
      meetings_count: 0,
      leads_count: 0,
      calls_count: 0,
      notes: '',
    }
  });

  const isSDR = sellerType === 'sdr';
  const isCloser = sellerType === 'closer';

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return getBrazilianDate(dateString);
  };

  const onSubmit = async (data: PerformanceFormData) => {
    console.log('📊 [DEBUG] SellerPerformanceTab - Submitting data com fuso brasileiro:', data);
    const success = await createOrUpdatePerformance({
      ...data,
      submitted_by_seller: false // Indica que foi preenchido pelo admin
    });
    
    if (success) {
      reset({
        date: defaultDate,
        sales_count: 0,
        revenue_amount: 0,
        billing_amount: 0,
        meetings_count: 0,
        leads_count: 0,
        calls_count: 0,
        notes: '',
      });
      setShowForm(false);
    }
  };

  const handleRefresh = () => {
    console.log('🔄 [DEBUG] Refresh manual solicitado para sellerId:', sellerId);
    refetch();
  };

  const handleDelete = async (performanceId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      await deletePerformance(performanceId);
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
      <PerformanceTabHeader
        performanceCount={performances?.length || 0}
        onRefresh={handleRefresh}
        onToggleForm={() => setShowForm(!showForm)}
      />

      {showForm && (
        <PerformanceFormCard
          isSDR={isSDR}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!performances || performances.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhuma performance registrada ainda</p>
              <p className="text-sm">Registre sua primeira performance usando o formulário acima</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico de Performance ({performances.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performances.map((performance) => {
                const isExpanded = expandedItems.has(performance.id);
                
                return (
                  <Collapsible key={performance.id}>
                    <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                      <CollapsibleTrigger 
                        className="w-full" 
                        onClick={() => toggleExpanded(performance.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                              <div className="text-left">
                                <h4 className="font-medium text-gray-900">
                                  {formatDate(performance.date)}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {performance.submitted_by_seller ? 'Enviado pelo vendedor' : 'Registrado pela administração'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {performance.sales_count} vendas
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {formatCurrency(performance.revenue_amount)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {performance.sales_count}
                                </p>
                                <p className="text-xs text-gray-500">Vendas</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatCurrency(performance.revenue_amount)}
                                </p>
                                <p className="text-xs text-gray-500">Receita</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-purple-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatCurrency(performance.billing_amount)}
                                </p>
                                <p className="text-xs text-gray-500">Faturamento</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-orange-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {performance.meetings_count}
                                </p>
                                <p className="text-xs text-gray-500">Reuniões</p>
                              </div>
                            </div>
                          </div>

                          {!isCloser && (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-indigo-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {performance.leads_count}
                                  </p>
                                  <p className="text-xs text-gray-500">Leads</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {performance.calls_count}
                                  </p>
                                  <p className="text-xs text-gray-500">Ligações</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {performance.notes && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong>Observações:</strong> {performance.notes}
                              </p>
                            </div>
                          )}

                          {/* Mostrar detalhes das vendas individuais para Closers */}
                          {isCloser && performance.sales_count > 0 && (
                            <IndividualSalesDetails performanceId={performance.id} />
                          )}

                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(performance.id);
                              }}
                              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Deletar
                            </Button>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
