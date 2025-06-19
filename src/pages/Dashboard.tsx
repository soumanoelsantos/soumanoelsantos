
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import PreSalesMetrics from '@/components/dashboard/PreSalesMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('comercial');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="comercial">Comercial</TabsTrigger>
            <TabsTrigger value="pre-vendas">Pré-vendas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comercial">
            <DashboardMetrics />
          </TabsContent>
          
          <TabsContent value="pre-vendas">
            <PreSalesMetrics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
