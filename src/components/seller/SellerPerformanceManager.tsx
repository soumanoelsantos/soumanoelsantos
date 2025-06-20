
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
  return (
    <SellerPerformanceFormComponent
      seller={seller}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default SellerPerformanceManager;
