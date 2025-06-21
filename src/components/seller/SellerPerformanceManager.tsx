
import React, { useState, useEffect } from 'react';
import { useSellerPerformance } from '@/hooks/useSellerPerformance';
import PerformanceFormCard from './PerformanceFormCard';
import SellerPerformanceHistory from './SellerPerformanceHistory';
import IndividualSalesManager from './IndividualSalesManager';
import { PerformanceFormData } from '@/types/sellers';
import { Seller } from '@/types/sellers';

interface SellerPerformanceManagerProps {
  seller: Seller;
  onSubmit: (data: PerformanceFormData) => Promise<void>;
  isSubmitting: boolean;
}

const SellerPerformanceManager: React.FC<SellerPerformanceManagerProps> = ({
  seller,
  onSubmit,
  isSubmitting
}) => {
  const {
    currentPerformance,
    performances,
    isLoading,
    createPerformance,
    updatePerformance,
    deletePerformance
  } = useSellerPerformance(seller.id);

  const [individualSalesTotals, setIndividualSalesTotals] = useState({
    salesCount: 0,
    revenueTotal: 0,
    billingTotal: 0
  });

  console.log('🔍 [DEBUG] SellerPerformanceManager - seller:', seller);
  console.log('📋 [DEBUG] currentPerformance:', currentPerformance);

  const handleSubmit = async (data: PerformanceFormData) => {
    try {
      if (currentPerformance?.id) {
        await updatePerformance(currentPerformance.id, data);
      } else {
        await createPerformance(data);
      }
      await onSubmit(data);
    } catch (error) {
      console.error('Erro ao salvar performance:', error);
    }
  };

  const handleIndividualSalesTotalsChange = (totals: { salesCount: number; revenueTotal: number; billingTotal: number }) => {
    console.log('📊 [DEBUG] Totais de vendas individuais atualizados:', totals);
    setIndividualSalesTotals(totals);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <PerformanceFormCard
        seller={seller}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        currentPerformance={currentPerformance}
        individualSalesTotals={individualSalesTotals}
      />

      <IndividualSalesManager
        sellerId={seller.id}
        performanceId={currentPerformance?.id || 'temp-id'}
        ownerUserId={seller.user_id} // Passar o user_id do vendedor como ownerUserId
        onTotalsChange={handleIndividualSalesTotalsChange}
      />

      <SellerPerformanceHistory
        performances={performances}
        isLoading={isLoading}
        onDelete={deletePerformance}
      />
    </div>
  );
};

export default SellerPerformanceManager;
