
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralConfigCard from '@/components/dashboard/config/GeneralConfigCard';
import MetricsConfigCard from '@/components/dashboard/config/MetricsConfigCard';
import PreSalesConfigCard from '@/components/dashboard/config/PreSalesConfigCard';
import ProductChartsConfigCard from '@/components/dashboard/config/ProductChartsConfigCard';
import ProductMetricsConfigCard from '@/components/dashboard/config/ProductMetricsConfigCard';
import SpecificGoalsConfigCard from '@/components/dashboard/config/SpecificGoalsConfigCard';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import ProductsManagementCard from '@/components/dashboard/config/ProductsManagementCard';

const DashboardConfig = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna da esquerda */}
          <div className="space-y-6">
            <GeneralConfigCard />
            <MetricsConfigCard />
            <PreSalesConfigCard />
            <SpecificGoalsConfigCard />
          </div>
          
          {/* Coluna da direita */}
          <div className="space-y-6">
            <ProductChartsConfigCard />
            <ProductMetricsConfigCard />
            <SellersManagementCard />
            <ProductsManagementCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConfig;
