
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, DollarSign } from 'lucide-react';
import { useIndividualSales } from '@/hooks/useIndividualSales';
import { IndividualSaleFormData } from '@/types/individualSales';
import IndividualSaleForm from './individual-sales/IndividualSaleForm';
import IndividualSalesList from './individual-sales/IndividualSalesList';
import IndividualSalesSummary from './individual-sales/IndividualSalesSummary';

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
  console.log('🔍 [DEBUG] IndividualSalesManager renderizado com:', { sellerId, performanceId });
  
  const { sales, isLoading, addSale, deleteSale } = useIndividualSales(performanceId);
  const [showForm, setShowForm] = useState(false);

  console.log('📋 [DEBUG] Estado atual:', { salesCount: sales.length, isLoading, showForm });

  // Calcular totais
  const totals = React.useMemo(() => {
    const salesCount = sales.length;
    const revenueTotal = sales.reduce((sum, sale) => sum + Number(sale.revenue_amount), 0);
    const billingTotal = sales.reduce((sum, sale) => sum + Number(sale.billing_amount), 0);
    
    console.log('📊 [DEBUG] Totais calculados:', { salesCount, revenueTotal, billingTotal });
    return { salesCount, revenueTotal, billingTotal };
  }, [sales]);

  // Notificar mudanças nos totais
  React.useEffect(() => {
    console.log('📈 [DEBUG] Notificando mudança nos totais:', totals);
    onTotalsChange(totals);
  }, [totals, onTotalsChange]);

  const handleSubmit = async (saleData: IndividualSaleFormData) => {
    console.log('📤 [DEBUG] handleSubmit chamado com:', saleData);
    
    if (!sellerId || !performanceId) {
      console.error('❌ [DEBUG] Faltam sellerId ou performanceId:', { sellerId, performanceId });
      return false;
    }
    
    return await addSale(sellerId, performanceId, saleData);
  };

  const handleAddSaleClick = () => {
    console.log('➕ [DEBUG] Botão Adicionar Venda clicado');
    setShowForm(!showForm);
  };

  const handleCancelForm = () => {
    console.log('❌ [DEBUG] Formulário cancelado');
    setShowForm(false);
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
            onClick={handleAddSaleClick}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Venda
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <IndividualSalesSummary totals={totals} />

        {showForm && (
          <div>
            <IndividualSaleForm
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
              isSubmitting={false}
            />
          </div>
        )}

        <IndividualSalesList
          sales={sales}
          isLoading={isLoading}
          onDelete={deleteSale}
        />
      </CardContent>
    </Card>
  );
};

export default IndividualSalesManager;
