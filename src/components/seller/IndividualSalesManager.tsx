
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, User, DollarSign } from 'lucide-react';
import { useIndividualSales } from '@/hooks/useIndividualSales';
import { IndividualSaleFormData } from '@/types/individualSales';

interface IndividualSalesManagerProps {
  sellerId: string;
  performanceId: string;
  onTotalsChange: (totals: { salesCount: number; revenueTotal: number; billingTotal: number }) => void;
}

const IndividualSalesManager: React.FC<IndividualSalesManagerProps> = ({
  sellerId,
  performanceId,
  onTotalsChange
}) => {
  const { sales, isLoading, addSale, deleteSale } = useIndividualSales(performanceId);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<IndividualSaleFormData>({
    client_name: '',
    revenue_amount: 0,
    billing_amount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular totais
  const totals = React.useMemo(() => {
    const salesCount = sales.length;
    const revenueTotal = sales.reduce((sum, sale) => sum + Number(sale.revenue_amount), 0);
    const billingTotal = sales.reduce((sum, sale) => sum + Number(sale.billing_amount), 0);
    
    return { salesCount, revenueTotal, billingTotal };
  }, [sales]);

  // Notificar mudanças nos totais
  React.useEffect(() => {
    onTotalsChange(totals);
  }, [totals, onTotalsChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name.trim()) {
      return;
    }

    setIsSubmitting(true);
    const success = await addSale(sellerId, performanceId, formData);
    
    if (success) {
      setFormData({
        client_name: '',
        revenue_amount: 0,
        billing_amount: 0,
      });
      setShowForm(false);
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (saleId: string) => {
    if (window.confirm('Tem certeza que deseja remover esta venda?')) {
      await deleteSale(saleId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Vendas Individuais
            <Badge variant="outline">
              {sales.length} venda{sales.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Venda
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Resumo dos totais */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total de Vendas</p>
            <p className="text-lg font-semibold">{totals.salesCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Receita Total</p>
            <p className="text-lg font-semibold">
              R$ {totals.revenueTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Faturamento Total</p>
            <p className="text-lg font-semibold">
              R$ {totals.billingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Formulário para adicionar venda */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nova Venda</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Nome do Cliente *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    placeholder="Digite o nome do cliente"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revenue_amount">Receita (R$) *</Label>
                    <Input
                      id="revenue_amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.revenue_amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, revenue_amount: Number(e.target.value) }))}
                      placeholder="0,00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing_amount">Faturamento (R$) *</Label>
                    <Input
                      id="billing_amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.billing_amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, billing_amount: Number(e.target.value) }))}
                      placeholder="0,00"
                      required
                    />
                  </div>
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
                    {isSubmitting ? 'Salvando...' : 'Salvar Venda'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de vendas */}
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando vendas...</p>
        ) : sales.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma venda individual registrada</p>
        ) : (
          <div className="space-y-2">
            {sales.map((sale) => (
              <Card key={sale.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{sale.client_name}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Receita: R$ {Number(sale.revenue_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span>Faturamento: R$ {Number(sale.billing_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(sale.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IndividualSalesManager;
