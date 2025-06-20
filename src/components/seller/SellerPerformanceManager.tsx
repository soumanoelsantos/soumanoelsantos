
import React from 'react';
import SellerPerformanceFormComponent from './SellerPerformanceFormComponent';
import { Seller } from '@/types/sellers';

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
  console.log('🔍 [DEBUG] SellerPerformanceManager - seller:', seller);
  console.log('🔍 [DEBUG] SellerPerformanceManager - seller.seller_type:', seller.seller_type);

  return (
    <div className="space-y-6">
      <SellerPerformanceFormComponent
        seller={seller}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SellerPerformanceManager;
