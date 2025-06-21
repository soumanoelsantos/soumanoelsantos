
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
  const { sales, isLoading, addSale, deleteSale } = useIndividualSales(performanceId);
  const [showForm, setShowForm] = useState(false);

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

  const handleSubmit = async (saleData: IndividualSaleFormData) => {
    return await addSale(sellerId, performanceId, saleData);
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
        <IndividualSalesSummary totals={totals} />

        {showForm && (
          <IndividualSaleForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isSubmitting={false}
          />
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
