
import React, { useState } from 'react';
import { Seller } from '@/types/sellers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, TrendingUp } from 'lucide-react';
import SellerPerformanceFormComponent from './SellerPerformanceFormComponent';

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
  const [activeTab, setActiveTab] = useState("form");

  const handleFormSuccess = () => {
    // Redirecionar para a aba de performance após o sucesso
    setTimeout(() => {
      setActiveTab("performance");
    }, 1000);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="form" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Registrar Performance
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Performance
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="form" className="mt-6">
        <SellerPerformanceFormComponent 
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          seller={seller}
          onSuccess={handleFormSuccess}
        />
      </TabsContent>
      
      <TabsContent value="performance" className="mt-6">
        <div className="text-center py-8">
          <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Performance Registrada!</h3>
          <p className="text-gray-600">
            Sua performance foi enviada com sucesso. Obrigado por manter seus dados atualizados!
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SellerPerformanceManager;
