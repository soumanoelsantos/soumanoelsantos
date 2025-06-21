
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SellerPerformanceFormComponent from './SellerPerformanceFormComponent';
import SellerPerformanceHistory from './SellerPerformanceHistory';
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
    <Tabs defaultValue="form" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="form">Novo Lançamento</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
      </TabsList>
      
      <TabsContent value="form">
        <SellerPerformanceFormComponent
          seller={seller}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      
      <TabsContent value="history">
        <SellerPerformanceHistory seller={seller} />
      </TabsContent>
    </Tabs>
  );
};

export default SellerPerformanceManager;
