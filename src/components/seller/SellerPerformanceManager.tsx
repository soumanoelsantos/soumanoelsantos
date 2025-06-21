
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
    performances,
    isLoading,
    createOrUpdatePerformance,
    deletePerformance
  } = useSellerPerformance(seller.id);

  const [individualSalesTotals, setIndividualSalesTotals] = useState({
    salesCount: 0,
    revenueTotal: 0,
    billingTotal: 0
  });

  console.log('🔍 [DEBUG] SellerPerformanceManager - seller:', seller);
  console.log('📋 [DEBUG] performances:', performances);

  // Get the most recent performance for today
  const today = new Date().toISOString().split('T')[0];
  const currentPerformance = performances.find(p => p.date === today);

  const handleSubmit = async (data: PerformanceFormData) => {
    try {
      await createOrUpdatePerformance({
        date: data.date,
        sales_count: data.sales_count,
        revenue_amount: data.revenue_amount,
        billing_amount: data.billing_amount,
        leads_count: data.leads_count,
        meetings_count: data.meetings_count,
        calls_count: data.calls_count,
        notes: data.notes,
        submitted_by_seller: true
      });
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
      <IndividualSalesManager
        sellerId={seller.id}
        performanceId={currentPerformance?.id || 'temp-id'}
        ownerUserId={seller.user_id}
        onTotalsChange={handleIndividualSalesTotalsChange}
      />

      <SellerPerformanceHistory
        seller={seller}
      />
    </div>
  );
};

export default SellerPerformanceManager;
