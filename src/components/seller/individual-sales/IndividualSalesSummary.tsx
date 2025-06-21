
import React from 'react';

interface SalesTotals {
  salesCount: number;
  revenueTotal: number;
  billingTotal: number;
}

interface IndividualSalesSummaryProps {
  totals: SalesTotals;
}

const IndividualSalesSummary: React.FC<IndividualSalesSummaryProps> = ({ totals }) => {
  return (
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
  );
};

export default IndividualSalesSummary;
