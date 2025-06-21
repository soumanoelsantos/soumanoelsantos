
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { config, isLoading: configLoading } = useDashboardConfig();

  if (isLoading || configLoading) {
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
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <DashboardMetrics config={config} />
      </main>
    </div>
  );
};

export default Dashboard;
